import YoutubeLogo from 'src/assets/logos/youtube.png'
import TwitchLogo from 'src/assets/logos/twitch.png'
import TiktokLogo from 'src/assets/logos/tiktok.png'
import KickLogo from 'src/assets/logos/kick.png'
import RumbleLogo from 'src/assets/logos/rumble.png'
import { StaticImageData } from 'next/image'

function platformLogo(platform: 'youtube' | 'twitch' | 'tiktok' | 'kick' | 'rumble'): StaticImageData {
    let logo = null

    switch (platform) {
        case 'youtube':
        logo = YoutubeLogo
        break
        case 'twitch':
        logo = TwitchLogo
        break
        case 'tiktok':
        logo = TiktokLogo
        break
        case 'kick':
        logo = KickLogo
        break
        case 'rumble':
        logo = RumbleLogo
        break
    }

    return logo
  }
  
  export default platformLogo
  