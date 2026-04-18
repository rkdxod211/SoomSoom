import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#7C6FCD',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
          <path
            d="M14 36 Q14 16 32 16 Q50 16 50 36 L50 54 L44 50 L38 54 L32 50 L26 54 L20 50 L14 54 Z"
            fill="white"
          />
          <ellipse cx="25.5" cy="35" rx="3.5" ry="4.5" fill="#7C6FCD" />
          <ellipse cx="38.5" cy="35" rx="3.5" ry="4.5" fill="#7C6FCD" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
