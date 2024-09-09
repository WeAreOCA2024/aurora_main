// pages/api/join-meeting.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChimeSDKMeetings, CreateMeetingCommand, CreateAttendeeCommand } from '@aws-sdk/client-chime-sdk-meetings';
import { v4 as uuidv4 } from 'uuid';

const region = 'ap-northeast-1'; // 使用するAWSリージョンを指定

const chimeSDKMeetings = new ChimeSDKMeetings({ region });

const joinMeetingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' }); // POSTメソッド以外のリクエストには405を返す
  }

  try {
    const { title, attendeeName } = req.body;
    
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
    res.status(201).json({
      Meeting,
      Attendee,
    });
  } catch (error) {
    console.error('Error creating/joining meeting:', error);
    res.status(500).json({ error: 'Failed to join meeting' });
  }
};

export default joinMeetingHandler;
