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
        <div style={{ display: 'flex', flexDirection: 'column', width: 108 }}>
          {/* Ghost head + body */}
          <div
            style={{
              width: 108,
              height: 108,
              background: 'white',
              borderRadius: '54px 54px 0 0',
              position: 'relative',
              display: 'flex',
            }}
          >
            {/* Left eye */}
            <div
              style={{
                position: 'absolute',
                top: 53,
                left: 24,
                width: 15,
                height: 20,
                background: '#7C6FCD',
                borderRadius: '50%',
              }}
            />
            {/* Right eye */}
            <div
              style={{
                position: 'absolute',
                top: 53,
                right: 24,
                width: 15,
                height: 20,
                background: '#7C6FCD',
                borderRadius: '50%',
              }}
            />
          </div>
          {/* Ghost wavy bottom — 3 bumps */}
          <div
            style={{
              display: 'flex',
              width: 108,
              height: 22,
              background: '#7C6FCD',
              justifyContent: 'space-between',
              padding: '0 4px',
            }}
          >
            <div style={{ width: 30, height: 22, background: 'white', borderRadius: '0 0 15px 15px' }} />
            <div style={{ width: 30, height: 22, background: 'white', borderRadius: '0 0 15px 15px' }} />
            <div style={{ width: 30, height: 22, background: 'white', borderRadius: '0 0 15px 15px' }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
