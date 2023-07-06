'use client';

import { FC } from 'react'
import { useRouter } from "next/navigation"

const BackButton: FC = () => {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()} className='px-4 py-1 mb-4 text-black transition-all bg-white rounded-lg hover:bg-slate-100'>
      Return
    </button>
  )
}

export default BackButton
