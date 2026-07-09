import { ImageResponse } from 'next/og'

export const alt = 'AVXStore — Acesso ilimitado para criar sem freio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c0907',
          backgroundImage:
            'radial-gradient(circle at 70% 30%, rgba(255,151,82,0.25), transparent 60%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff9752, #f2540b)',
            marginBottom: 40,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" fill="#ffffff" />
          </svg>
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#f5f2ee' }}>
          AVX<span style={{ color: '#f2540b' }}>Store</span>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#a89a8f', marginTop: 16 }}>
          Acesso ilimitado para você criar sem freio
        </div>
      </div>
    ),
    { ...size }
  )
}
