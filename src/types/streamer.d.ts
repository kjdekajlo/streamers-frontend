type StreamerType = {
    _id: string,
    name: string
    description: string
    downvotes: number
    upvotes: number
    platform: 'youtube' | 'twitch' | 'tiktok' | 'kick' | 'rumble'
  }
  
  export default StreamerType