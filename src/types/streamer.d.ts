export type StreamerType = {
  _id: string,
  name: string
  description: string
  downvotes: number
  upvotes: number
  platform: StreamingPlatform
}

export type StreamingPlatform = 'youtube' | 'twitch' | 'tiktok' | 'kick' | 'rumble';
  
