import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
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
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          {/* Ghost head */}
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
            <div style={{ position: 'absolute', top: 148, left: 68, width: 42, height: 54, background: '#2F2B3A', borderRadius: '50%' }} />
            {/* Left eye shine */}
            <div style={{ position: 'absolute', top: 158, left: 88, width: 14, height: 14, background: 'white', borderRadius: '50%' }} />
            {/* Right eye */}
            <div style={{ position: 'absolute', top: 148, right: 68, width: 42, height: 54, background: '#2F2B3A', borderRadius: '50%' }} />
            {/* Right eye shine */}
            <div style={{ position: 'absolute', top: 158, right: 88, width: 14, height: 14, background: 'white', borderRadius: '50%' }} />
            {/* Left cheek */}
            <div style={{ position: 'absolute', top: 210, left: 36, width: 66, height: 36, background: '#FFB5C8', borderRadius: '50%', opacity: 0.55 }} />
            {/* Right cheek */}
            <div style={{ position: 'absolute', top: 210, right: 36, width: 66, height: 36, background: '#FFB5C8', borderRadius: '50%', opacity: 0.55 }} />
            {/* Smile */}
            <div style={{ position: 'absolute', top: 228, left: 112, width: 76, height: 34, background: '#2F2B3A', borderRadius: '0 0 38px 38px' }} />
          </div>
          {/* Ghost wavy bottom */}
          <div
            style={{
              display: 'flex',
              width: 300,
              height: 58,
              background: 'linear-gradient(145deg, #C4B5FD 0%, #7C6FCD 100%)',
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
