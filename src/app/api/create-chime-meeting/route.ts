import { NextResponse } from 'next/server';
import { ChimeSDKMeetingsClient, CreateMeetingCommand, CreateAttendeeCommand } from "@aws-sdk/client-chime-sdk-meetings";
import { v4 as uuid } from 'uuid';

const client = new ChimeSDKMeetingsClient({ region: 'ap-northeast-1' });

export async function POST() {
  try {
    const meetingCommand = new CreateMeetingCommand({
      ClientRequestToken: uuid(),
      MediaRegion: 'ap-northeast-1',
      ExternalMeetingId: uuid(),
    });
    const meetingResponse = await client.send(meetingCommand);

    const attendeeCommand = new CreateAttendeeCommand({
      MeetingId: meetingResponse.Meeting?.MeetingId,
      ExternalUserId: uuid(),
    });
    const attendeeResponse = await client.send(attendeeCommand);

    return NextResponse.json({
      meeting: meetingResponse,
      attendee: attendeeResponse,
    });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json({ message: 'Failed to create meeting', error }, { status: 500 });
  }
}
