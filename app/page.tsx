'use client';

import StreamersList from "@/src/components/StreamersList/StreamersList";

import home from './home.module.scss'

import { useEffect, useState } from 'react'
import StreamerType from "@/src/types/streamer";

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
    fetchStreamers()
  }, [])

  const labelStyle = () => {
    return 'flex flex-col'
  }

  const inputStyle = () => {
    return 'text-black px-4 py-2 rounded-[10px]'
  }

  const [streamerName, setStreamerName] = useState('')
  const [platform, setPlatform] = useState('')
  const [description, setDescription] = useState('')

  const clearStreamer = () => {
    setStreamerName('')
    setPlatform('')
    setDescription('')
  }

  const createStreamer = async (streamer: StreamerType) => {
    const res = await fetch('http://localhost:4000/streamers', {
      method: 'POST',
      body: JSON.stringify(streamer),
      headers: {
        'Content-Type': 'application/json'
      }})
  } 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    let newStreamer: StreamerType = {
      name: streamerName,
      description: description,
      downvotes: 0,
      upvotes: 0,
      platform: platform
    }

    createStreamer(newStreamer)
    clearStreamer()
    fetchStreamers()
  }
 
  return (
  <main className={home.main}>
      <aside>
      <div>
      <div className="text-3xl mb-14">Add a new streamer</div>
      <form className="flex flex-col text-2xl gap-y-2">
        <label className={labelStyle()}>
          {'Name'}
          <input value={streamerName} onChange={(e) => setStreamerName(e.target.value)} className={inputStyle()}></input>
        </label>
        <label className={labelStyle()}>
          {'Platform'}
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="text-black">
            <option value="" className={inputStyle()}>
              {'-- select --'}
            </option>
            <option value="youtube">
              YouTube
            </option>
            <option value="twitch">
              Twitch
            </option>
            <option value="tiktok">
              TikTok
            </option>
            <option value="kick">
              Kick
            </option>
            <option value="rumble">
              Rumble
            </option>
          </select>
        </label>
        <label className={labelStyle()}>
          {'Description'}
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" className={inputStyle()}></textarea>
        </label>
      </form>
      <button onClick={handleSubmit} className='px-4 py-1 mt-4 text-lg text-black transition-all bg-white rounded-lg hover:bg-slate-100'>SUBMIT</button>
    </div>
      </aside>
      <aside>
        <StreamersList streamers={streamers}/>
      </aside>
    </main>
  )
}