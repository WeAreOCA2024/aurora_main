'use client'

import React, { useState, useEffect } from 'react';
import { MessagingSessionConfiguration, ConsoleLogger, DefaultMessagingSession } from 'amazon-chime-sdk-js';

interface ChatProps {
  channelArn: string;
  userId: string;
  chimeBearer: string;  // Add this line
}

export default function Chat({ channelArn, userId, chimeBearer }: ChatProps) {
  // ... (previous state declarations)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/chime', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ channelArn, chimeBearer }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        // setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    // ... (rest of the useEffect logic)
  }, [channelArn, userId, chimeBearer]);

  // ... (rest of the component code)
}