'use client';

import StreamersList from "@/src/components/StreamersList/StreamersList";
import SubmitStreamer from "@/src/components/SubmitStreamer";

import home from './home.module.scss'

import { useContext, useEffect, useState } from 'react'

import { WebSocketContext, WebSocketProvider } from '@/src/contexts/WebSocket'

export default function Page() {

  const [streamers, setStreamers] = useState([])

  const fetchStreamers = () => {
    fetch('http://localhost:4000/streamers')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setStreamers(data)
      })
  }

  const socket = useContext(WebSocketContext)

  useEffect(() => {
    fetchStreamers()

    socket.on('onStreamersChanged', () => {
      fetchStreamers()
    })
    return () => {
      socket.off('onStreamersChanged')
      socket.close()
    }
  }, [socket])

  
  return (
  <main className={home.main}>
      <aside>
        <SubmitStreamer />
      </aside>
      <aside>
        <WebSocketProvider value={socket}>
          <StreamersList streamers={streamers}/>
        </WebSocketProvider>
      </aside>
    </main>
  )
}