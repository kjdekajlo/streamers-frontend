'use client';

import { FC } from 'react'
import Streamer from './Streamer'
import { StreamerType } from '@/src/types/streamer'
import s from './StreamersList.module.scss'

import Image from 'next/image'
import DownVote from '@/src/assets/StreamersList/downvote.png'
import UpVote from '@/src/assets/StreamersList/upvote.png'

type StreamersListProp = {
  streamers: StreamerType[]
}

const StreamersList: FC<StreamersListProp> = ({ streamers }) => {

  const streamersList = streamers.map((streamer) => (
      <Streamer streamer={streamer} key={streamer._id} />
  ))

  return (
    <div>
      <div className="mb-[22px] text-3xl">Streamers</div>
      <div className={s.votes}>
        <p></p>
        <Image src={DownVote} alt="Downvote" height={38} width={38} className='rotate-180'/>
        <Image src={UpVote} alt="Upvote" height={40} width={40}/>
      </div>
      <div className={s.streamersList}>{streamersList}</div> 
    </div>
  )
}

export default StreamersList
