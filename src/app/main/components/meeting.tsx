'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  ChimeSDKMeetings,
  CreateMeetingCommand,
  CreateAttendeeCommand
} from "@aws-sdk/client-chime-sdk-meetings"
import type { Meeting, Attendee } from "@aws-sdk/client-chime-sdk-meetings"
import { 
  ConsoleLogger,
  DefaultDeviceController,
  MeetingSessionConfiguration,
  DefaultMeetingSession,
  VideoTileState
} from 'amazon-chime-sdk-js'
import type { MeetingSession, AudioVideoFacade } from 'amazon-chime-sdk-js'
import { toast } from "@/hooks/use-toast"
import Call from '@/assets/svg/call.svg'
import Endcall from '@/assets/svg/endcall.svg'

const CHIME_SDK_MEETINGS_CLIENT = new ChimeSDKMeetings({ region: "ap-northeast-1" }) // Replace with your region

export default function Meeting() {
  const [meetingSession, setMeetingSession] = useState<MeetingSession | null>(null)
  const [isJoined, setIsJoined] = useState(false)
  const [isVideoPreviewOn, setIsVideoPreviewOn] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const joinMeeting = async () => {
    try {
      // Create a meeting
      const createMeetingCommand = new CreateMeetingCommand({
        ClientRequestToken: Date.now().toString(),
        MediaRegion: "ap-northeast-1", // Replace with your preferred region
        ExternalMeetingId: "MyMeetingId"
      })
      const meetingResponse = await CHIME_SDK_MEETINGS_CLIENT.send(createMeetingCommand)

      // Create an attendee
      const createAttendeeCommand = new CreateAttendeeCommand({
        MeetingId: meetingResponse.Meeting!.MeetingId!,
        ExternalUserId: `user-${Date.now()}`
      })
      const attendeeResponse = await CHIME_SDK_MEETINGS_CLIENT.send(createAttendeeCommand)

      // Configure the meeting session
      const logger = new ConsoleLogger('MeetingLogs')
      const deviceController = new DefaultDeviceController(logger)
      const configuration = new MeetingSessionConfiguration(
        meetingResponse.Meeting as Meeting, 
        attendeeResponse.Attendee as Attendee
      )
      const newMeetingSession = new DefaultMeetingSession(configuration, logger, deviceController)

      setMeetingSession(newMeetingSession)
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
          const audioVideo = meetingSession.audioVideo as AudioVideoFacade
          const audioInputDevices = await audioVideo.listAudioInputDevices()
          const audioOutputDevices = await audioVideo.listAudioOutputDevices()
          const videoInputDevices = await audioVideo.listVideoInputDevices()

          await audioVideo.startAudioInput(audioInputDevices[0].deviceId)
          await audioVideo.chooseAudioOutput(audioOutputDevices[0].deviceId)
          await audioVideo.startVideoInput(videoInputDevices[0].deviceId)

          if (videoRef.current) {
            await audioVideo.startVideoPreviewForVideoInput(videoRef.current)
            setIsVideoPreviewOn(true)
          }

          audioVideo.addObserver({
            videoTileDidUpdate: (tileState: VideoTileState) => {
              if (!tileState.boundAttendeeId || !videoRef.current) {
                return
              }
              audioVideo.bindVideoElement(tileState.tileId!, videoRef.current)
            },
          })

          await audioVideo.start()
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
        const audioVideo = meetingSession.audioVideo as AudioVideoFacade
        if (isVideoPreviewOn) {
          if (videoRef.current) {
            await audioVideo.stopVideoPreviewForVideoInput(videoRef.current)
          }
          setIsVideoPreviewOn(false)
        }
        await audioVideo.stopVideoInput()
        await audioVideo.stopAudioInput()
        audioVideo.stop()
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