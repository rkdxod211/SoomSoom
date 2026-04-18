import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'soomsoom',
    short_name: 'soomsoom',
    description: '캐릭터로 숨어서 솔직하게',
    start_url: '/feed',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FFFDF8',
    theme_color: '#7C6FCD',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
