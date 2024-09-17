'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  DefaultDeviceController, 
  MeetingSessionConfiguration, 
  ConsoleLogger, 
  LogLevel, 
  DefaultMeetingSession,
  VideoTileState
} from 'amazon-chime-sdk-js'
import { toast } from "@/hooks/use-toast"
import Call from '@/assets/svg/call.svg'
import Endcall from '@/assets/svg/endcall.svg'

export default function Meeting() {
  const [meetingSession, setMeetingSession] = useState<DefaultMeetingSession | null>(null)
  const [isJoined, setIsJoined] = useState(false)
  const [isVideoPreviewOn, setIsVideoPreviewOn] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const joinMeeting = async () => {
    try {
      const response = await fetch('/api/join-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'my-meeting',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`)
      }

      const data = await response.json()
      
      const logger = new ConsoleLogger('MeetingLogs', LogLevel.INFO)
      const deviceController = new DefaultDeviceController(logger)

      const configuration = new MeetingSessionConfiguration(data.Meeting, data.Attendee)
      const session = new DefaultMeetingSession(configuration, logger, deviceController)

      setMeetingSession(session)
      setIsJoined(true)

      toast({
        title: "Meeting Joined",
        description: "You have successfully joined the meeting.",
      })
    } catch (error) {
      console.error('Failed to join meeting:', error)
      toast({
        title: "Error",
        description: "Failed to join the meeting. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (meetingSession && isJoined) {
      const startAudioVideoDevices = async () => {
        try {
          const audioInputDevices = await meetingSession.audioVideo.listAudioInputDevices()
          const audioOutputDevices = await meetingSession.audioVideo.listAudioOutputDevices()
          const videoInputDevices = await meetingSession.audioVideo.listVideoInputDevices()

          await meetingSession.audioVideo.startAudioInput(audioInputDevices[0].deviceId)
          await meetingSession.audioVideo.chooseAudioOutput(audioOutputDevices[0].deviceId)
          await meetingSession.audioVideo.startVideoInput(videoInputDevices[0].deviceId)

          if (videoRef.current) {
            await meetingSession.audioVideo.startVideoPreviewForVideoInput(videoRef.current)
            setIsVideoPreviewOn(true)
          }

          meetingSession.audioVideo.addObserver({
            videoTileDidUpdate: (tileState: VideoTileState) => {
              if (!tileState.boundAttendeeId) {
                return
              }
              meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoRef.current)
            },
          })

          await meetingSession.audioVideo.start()
        } catch (error) {
          console.error('Failed to start audio/video devices:', error)
          toast({
            title: "Error",
            description: "Failed to start audio/video devices. Please check your permissions.",
            variant: "destructive",
          })
        }
      }

      startAudioVideoDevices()
    }
  }, [meetingSession, isJoined])

  const leaveMeeting = async () => {
    if (meetingSession) {
      try {
        if (isVideoPreviewOn) {
          if (videoRef.current) {
            await meetingSession.audioVideo.stopVideoPreviewForVideoInput(videoRef.current)
          }
          setIsVideoPreviewOn(false)
        }
        await meetingSession.audioVideo.stopVideoInput()
        await meetingSession.audioVideo.stopAudioInput()
        meetingSession.audioVideo.stop()
        setMeetingSession(null)
        setIsJoined(false)
        toast({
          title: "Meeting Left",
          description: "You have left the meeting.",
        })
      } catch (error) {
        console.error('Failed to leave meeting:', error)
        toast({
          title: "Error",
          description: "Failed to leave the meeting properly. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div>
      {!isJoined ? (
        <Call onClick={joinMeeting} className="w-full mb-4" />
      ) : (
        <Endcall onClick={leaveMeeting} className="w-full mb-4" variant="destructive" />
      )}
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        className={`w-full h-auto rounded-lg ${isVideoPreviewOn ? 'block' : 'hidden'}`} 
      />
    </div>
  )
}