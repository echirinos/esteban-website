import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/* Whiteprint OG card: blueprint field, sheet frame, white title — no more
   hotlinked leerob.io background. */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title') ?? 'Esteban Chirinos';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#101f58',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            border: '2px solid rgba(255,255,255,0.3)',
            padding: 96,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: 8,
            }}
          >
            Sht A-01 · Esteban Chirinos
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 110,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: -2,
              whiteSpace: 'pre-wrap',
            }}
          >
            {postTitle}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 34,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: 8,
            }}
          >
            <span>estebanchirinos.xyz</span>
            <span>Est. 2019 — Present</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
