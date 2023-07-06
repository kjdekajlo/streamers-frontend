'use client';

import { FC } from 'react'
import StreamerType from '@/src/types/streamer'
import classNames from '@/src/utils/classNames'
import s from './Streamer.module.scss'

import Image from 'next/image'
import Link from 'next/link'
import platformLogo from '@/src/utils/platformLogo'


type StreamerProps = {
  streamer: StreamerType
}

const Streamer: FC<StreamerProps> = ({ streamer }) => {
  const logo = platformLogo(streamer.platform!)

  return (
    <div className={`text-xl gap-x-3 ${s.streamer}`}>
      <Image alt="logo of a streaming platform" src={logo} className={s.logo} height={20} width={20} />
      <Link href={`/streamer/${streamer._id}`}>
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
        <div>{streamer.name}</div>
        <div>{streamer.downvotes}</div>
        <div>{streamer.upvotes}</div>
      </div>
      </Link>
    </div>
    
  )
}

export default Streamer
