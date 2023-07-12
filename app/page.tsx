'use client';

import StreamersList from "@/src/components/StreamersList/StreamersList";
import SubmitStreamer from "@/src/components/SubmitStreamer";

import home from './home.module.scss'

import { useEffect, useState } from 'react'

import { socket } from '@/src/WebSocket'

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
    <main className={home.main}>
      <aside>
        <SubmitStreamer />
      </aside>
      <aside>
        <StreamersList streamers={streamers}/>
      </aside>
    </main>
  )
}