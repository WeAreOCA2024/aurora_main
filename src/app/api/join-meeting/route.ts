// src/app/api/join-meeting/route.ts
import { NextResponse } from 'next/server';
import { ChimeSDKMeetings, CreateMeetingCommand, CreateAttendeeCommand } from '@aws-sdk/client-chime-sdk-meetings';
import { v4 as uuidv4 } from 'uuid';

const region = 'ap-northeast-1'; // 使用するAWSリージョンを指定

const chimeSDKMeetings = new ChimeSDKMeetings({ region });

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
    
    // 参加者を作成
    const meetingId = Meeting?.MeetingId;
    const attendeeCommand = new CreateAttendeeCommand({
      MeetingId: meetingId!,
      ExternalUserId: uuidv4(),
    });
    const { Attendee } = await chimeSDKMeetings.send(attendeeCommand);
    
    // ミーティング情報と参加者情報をレスポンスとして返す
    return NextResponse.json({
      Meeting,
      Attendee,
    });
  } catch (error) {
    console.error('Error creating/joining meeting:', error);
    return NextResponse.json({ error: 'Failed to join meeting' }, { status: 500 });
  }
}
