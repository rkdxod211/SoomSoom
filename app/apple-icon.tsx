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
        <div style={{ display: 'flex', flexDirection: 'column', width: 108 }}>
          {/* Ghost head */}
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
            <div style={{ position: 'absolute', top: 53, left: 24, width: 15, height: 19, background: '#2F2B3A', borderRadius: '50%' }} />
            {/* Left eye shine */}
            <div style={{ position: 'absolute', top: 57, left: 31, width: 5, height: 5, background: 'white', borderRadius: '50%' }} />
            {/* Right eye */}
            <div style={{ position: 'absolute', top: 53, right: 24, width: 15, height: 19, background: '#2F2B3A', borderRadius: '50%' }} />
            {/* Right eye shine */}
            <div style={{ position: 'absolute', top: 57, right: 31, width: 5, height: 5, background: 'white', borderRadius: '50%' }} />
            {/* Left cheek */}
            <div style={{ position: 'absolute', top: 76, left: 13, width: 24, height: 13, background: '#FFB5C8', borderRadius: '50%', opacity: 0.55 }} />
            {/* Right cheek */}
            <div style={{ position: 'absolute', top: 76, right: 13, width: 24, height: 13, background: '#FFB5C8', borderRadius: '50%', opacity: 0.55 }} />
            {/* Smile */}
            <div style={{ position: 'absolute', top: 82, left: 40, width: 28, height: 12, background: '#2F2B3A', borderRadius: '0 0 14px 14px' }} />
          </div>
          {/* Ghost wavy bottom */}
          <div
            style={{
              display: 'flex',
              width: 108,
              height: 22,
              background: 'linear-gradient(145deg, #C4B5FD 0%, #7C6FCD 100%)',
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
