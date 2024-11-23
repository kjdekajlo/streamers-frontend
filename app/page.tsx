'use client';

import StreamersList from "@/src/components/StreamersList/StreamersList";
import SubmitStreamer from "@/src/components/SubmitStreamer";

import home from './home.module.scss'

import { useEffect, useState } from 'react'

import { socket } from '@/src/WebSocket'
import { Streamer } from "@/src/types/streamer";

export default function Page() {

  const [streamers, setStreamers] = useState<Streamer[]>([])

  const fetchStreamers = async () => {
    try {
      const response = await fetch('http://localhost:4000/streamers')
      const data = await response.json()
      setStreamers(data.streamers)
    } catch {
      setStreamers([
        {_id: 'uvgfy',
        name: 'Name',
        description: 'Description',
        downvotes: 2,
        upvotes: 2,
        platform: 'youtube'
        }
      ])
    }
  }

  useEffect(() => {
    socket.on('onStreamersChanged', () => {
      fetchStreamers()
    })

    fetchStreamers()

    return function cleanup() {
      socket.off('onStreamersChanged')
    }

  }, [])
  return (
    <main className="flex justify-around flex-wrap gap-16 py-16 px-4">
      <aside>
        <SubmitStreamer />
      </aside>
      <aside>
        <StreamersList streamers={streamers}/>
      </aside>
    </main>
  )
}