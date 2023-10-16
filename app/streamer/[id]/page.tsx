'use client';

import Image from 'next/image'
import Flower from '@/src/assets/flower.jpg'
import platformLogo from '@/src/utils/platformLogo';
import { StreamerType } from '@/src/types/streamer';
import BackButton from '@/src/components/BackButton';

async function getStreamerById(id: string) {
  const res = await fetch(`http://localhost:4000/streamer/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}


export default async function Page({ params }: { params: { id: string } }) {
  let streamer: StreamerType = {
    _id: '',
    name: '',
    description: '',
    downvotes: 0,
    upvotes: 0,
    platform: "youtube"
  }
  
  try {
    streamer = await getStreamerById(params.id)
  } catch (error){
    return (
      <div>Error! Streamer not found</div>
    )
  }

    const logo = () => platformLogo(streamer.platform)

    return (
      <main className="p-5 text-base">
        <BackButton/>
      <div className="flex flex-row items-center gap-x-5">
        <Image priority width={128} src={Flower} alt={streamer.name} className='rounded-lg'/>
        <div>
          <h1 className='text-2xl'>{streamer.name}</h1>
          <span>Platform: {streamer.platform}</span>
        </div>
        <Image width={40} height={40} src={logo()} alt={`${streamer.platform}'s logo`} />
      </div>
      <div className="flex flex-col mt-4">
        <p className='text-lg'>Description:</p>
        <span>{streamer.description}</span>
      </div>
    </main>
    )
}