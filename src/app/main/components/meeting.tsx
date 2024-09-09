import { useState, useRef } from 'react';
import { DefaultDeviceController, MeetingSessionConfiguration, ConsoleLogger, LogLevel, DefaultMeetingSession } from 'amazon-chime-sdk-js';

export default function Meeting() {
  const [meetingInfo, setMeetingInfo] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const joinMeeting = async () => {
    try {
      const response = await fetch('/api/join-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'my-meeting',
          attendeeName: 'John Doe',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMeetingInfo(data);

      const logger = new ConsoleLogger('MeetingLogs', LogLevel.INFO);
      const deviceController = new DefaultDeviceController(logger);
      
      const configuration = new MeetingSessionConfiguration(data.Meeting, data.Attendee);
      const meetingSession = new DefaultMeetingSession(configuration, logger, deviceController);

      const audioInputDevices = await meetingSession.audioVideo.listAudioInputDevices();
      const audioOutputDevices = await meetingSession.audioVideo.listAudioOutputDevices();
      const videoInputDevices = await meetingSession.audioVideo.listVideoInputDevices();
      
      await meetingSession.audioVideo.startAudioInput(audioInputDevices[0].deviceId);
      await meetingSession.audioVideo.chooseAudioOutput(audioOutputDevices[0].deviceId);
      await meetingSession.audioVideo.startVideoInput(videoInputDevices[0].deviceId);

      // ビデオプレビューの設定
      if (videoRef.current) {
        meetingSession.audioVideo.startVideoPreviewForVideoInput(videoRef.current);
      }

      meetingSession.audioVideo.start();
    } catch (error) {
      console.error('Failed to join meeting:', error);
    }
  };

  return (
    <div>
      <h1>Join a Meeting</h1>
      <button onClick={joinMeeting}>Join Meeting</button>
      {meetingInfo && <pre>{JSON.stringify(meetingInfo, null, 2)}</pre>}
      <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }}></video>
    </div>
  );
}
