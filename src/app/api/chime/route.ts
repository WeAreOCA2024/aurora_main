// app/api/chime/route.ts
import { ChimeSDKMessagingClient, ListChannelMessagesCommand, ListChannelMessagesCommandInput } from "@aws-sdk/client-chime-sdk-messaging";
import { NextResponse } from 'next/server';

const chimeClient = new ChimeSDKMessagingClient({
  region: 'your-aws-region',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const { channelArn, chimeBearer } = await request.json();

  if (!chimeBearer) {
    return NextResponse.json({ error: 'ChimeBearer token is required' }, { status: 400 });
  }

  try {
    const input: ListChannelMessagesCommandInput = {
      ChannelArn: channelArn,
      ChimeBearer: chimeBearer,
    };

    const command = new ListChannelMessagesCommand(input);
    const response = await chimeClient.send(command);
    
    return NextResponse.json(response.ChannelMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}