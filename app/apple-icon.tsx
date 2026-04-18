import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(145deg, #C4B5FD 0%, #7C6FCD 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <svg width="128" height="128" viewBox="0 0 64 64" fill="none">
          <path
            d="M14 36 Q14 16 32 16 Q50 16 50 36 L50 54 L44 50 L38 54 L32 50 L26 54 L20 50 L14 54 Z"
            fill="white"
          />
          <circle cx="26" cy="36" r="3.5" fill="#2F2B3A" />
          <circle cx="38" cy="36" r="3.5" fill="#2F2B3A" />
          <circle cx="27.5" cy="34.5" r="1.2" fill="white" />
          <circle cx="39.5" cy="34.5" r="1.2" fill="white" />
          <ellipse cx="22" cy="40" rx="4" ry="2.5" fill="#FFB5BA" fillOpacity="0.65" />
          <ellipse cx="42" cy="40" rx="4" ry="2.5" fill="#FFB5BA" fillOpacity="0.65" />
          <path
            d="M28 43 Q32 46 36 43"
            stroke="#2F2B3A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
