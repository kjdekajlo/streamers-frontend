import { FC, useState } from "react"
import StreamerType from "../types/streamer"

const labelStyle = () => {
    return 'flex flex-col'
}

const inputStyle = () => {
    return 'text-black px-4 py-2 rounded-[10px]'
}

const SubmitStreamer: FC = () => {

  const [streamerName, setStreamerName] = useState('')
  const [platform, setPlatform] = useState('')
  const [description, setDescription] = useState('')

  const clearForm = () => {
    setStreamerName('')
    setPlatform('')
    setDescription('')
  }

  const createStreamer = async (streamer: StreamerType) => {
      fetch('http://localhost:4000/streamers', {
      method: 'POST',
      body: JSON.stringify(streamer),
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  const isCreatable = () => {
    if (streamerName === '') {
      alert('Streamer should have a valid name!')
      return false
    } else if (platform === '') {
      alert('Streamer should a platform selected!')
      return false
    } else if (description === '') {
        alert('Streamer should have a valid description!')
      return false
    }
    
    return true
  }

  const handleSubmit = (e: any) => {

    e.preventDefault()

    if (isCreatable()) {
      let newStreamer: StreamerType = {
        name: streamerName,
        description: description,
        downvotes: 0,
        upvotes: 0,
        platform: platform
      }

      createStreamer(newStreamer)
      clearForm()
    }
  }

  
    return (
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
    )
  }
  
  export default SubmitStreamer
