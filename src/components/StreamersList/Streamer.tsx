'use client';

import { FC } from 'react'
import { StreamerType } from '@/src/types/streamer'
import classNames from '@/src/utils/classNames'
import s from './Streamer.module.scss'

import Image from 'next/image'
import Link from 'next/link'
import platformLogo from '@/src/utils/platformLogo'


const upvoteStreamer = async (id: string) => {
  await fetch(`http://localhost:4000/streamer/${id}/upvote`, {
    method: 'PUT'
  })
}

const downvoteStreamer = async (id: string) => {
  await fetch(`http://localhost:4000/streamer/${id}/downvote`, {
    method: 'PUT'
  })
}

async function deleteStreamer(id: string) {
  const res = await fetch(`http://localhost:4000/streamer/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Failed to delete data')
  }
}

type StreamerProps = {
  streamer: StreamerType
}

const Streamer: FC<StreamerProps> = ({ streamer }) => {
  const logo = platformLogo(streamer.platform!)

  return (
    <div className={`text-xl gap-x-3 ${s.streamer}`}>
      <Image alt="logo of a streaming platform" src={logo} className={s.logo} height={20} width={20} />
        <div
        className={classNames(
          `${s.containerStyle}`,
          streamer.platform == 'youtube' && `${s.youtubeBorder}`,
          streamer.platform == 'twitch' && `${s.twitchBorder}`,
          streamer.platform == 'tiktok' && `${s.tiktokBorder}`,
          streamer.platform == 'kick' && `${s.kickBorder}`,
          streamer.platform == 'rumble' && `${s.rumbleBorder}`,
        )}
      >
        <Link href={`/streamer/${streamer._id}`}><div>{streamer.name}</div></Link>
        <div onClick={() => downvoteStreamer(streamer._id)} className='cursor-pointer'>{streamer.downvotes}</div>
        <div onClick={() => upvoteStreamer(streamer._id)} className='cursor-pointer'>{streamer.upvotes}</div>
      </div>
      <div onClick={() => deleteStreamer(streamer._id)} className='cursor-pointer'>X</div>
    </div>
  )
}

export default Streamer
