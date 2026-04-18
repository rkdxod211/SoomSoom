import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
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
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          {/* Ghost head + body */}
          <div
            style={{
              width: 300,
              height: 300,
              background: 'white',
              borderRadius: '150px 150px 0 0',
              position: 'relative',
              display: 'flex',
            }}
          >
            {/* Left eye */}
            <div
              style={{
                position: 'absolute',
                top: 148,
                left: 68,
                width: 42,
                height: 54,
                background: '#7C6FCD',
                borderRadius: '50%',
              }}
            />
            {/* Right eye */}
            <div
              style={{
                position: 'absolute',
                top: 148,
                right: 68,
                width: 42,
                height: 54,
                background: '#7C6FCD',
                borderRadius: '50%',
              }}
            />
          </div>
          {/* Ghost wavy bottom — 3 bumps */}
          <div
            style={{
              display: 'flex',
              width: 300,
              height: 58,
              background: '#7C6FCD',
              justifyContent: 'space-between',
              padding: '0 12px',
            }}
          >
            <div style={{ width: 80, height: 58, background: 'white', borderRadius: '0 0 40px 40px' }} />
            <div style={{ width: 80, height: 58, background: 'white', borderRadius: '0 0 40px 40px' }} />
            <div style={{ width: 80, height: 58, background: 'white', borderRadius: '0 0 40px 40px' }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
