import { NextResponse } from 'next/server';
import { ChimeSDKMeetings, CreateMeetingCommand, CreateAttendeeCommand } from '@aws-sdk/client-chime-sdk-meetings';
import { v4 as uuidv4 } from 'uuid';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';

const region = 'ap-northeast-1'; // 使用するAWSリージョンを指定
const identityPoolId = process.env.AUTH_COGNITO_ID;

if (!identityPoolId) {
  throw new Error('POOL_ID is not set in environment variables');
}

const cognitoIdentityClient = new CognitoIdentityClient({ region });

const credentialsProvider = fromCognitoIdentityPool({
  client: cognitoIdentityClient,
  identityPoolId,
});

const chimeSDKMeetings = new ChimeSDKMeetings({
  region,
  // credentials: credentialsProvider,
});

export async function POST(req: Request) {
  try {
    const { title, attendeeName } = await req.json();

    // ミーティングが存在しなければ作成
    const meetingCommand = new CreateMeetingCommand({
      ClientRequestToken: uuidv4(),
      MediaRegion: region,
      ExternalMeetingId: title.substring(0, 64),
    });
    const { Meeting } = await chimeSDKMeetings.send(meetingCommand);

    if (!Meeting) {
      throw new Error('Meeting creation failed');
    }

    // 参加者を作成
    const meetingId = Meeting.MeetingId;
    const attendeeCommand = new CreateAttendeeCommand({
      MeetingId: meetingId,
      ExternalUserId: uuidv4(),
    });
    const { Attendee } = await chimeSDKMeetings.send(attendeeCommand);

    if (!Attendee) {
      throw new Error('Attendee creation failed');
    }

    const responsePayload = {
      Meeting,
      Attendee,
    };
    
    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Error creating/joining meeting:', error);
    return NextResponse.json({ error: 'Failed to join meeting', }, { status: 500 });
  }
}
