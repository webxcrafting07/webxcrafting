import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    
    // Default title if none provided
    const displayTitle = title ? title : 'Professional Web Development Services';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(to bottom right, #0a0a0a 0%, #171717 50%, #000000 100%)',
            fontFamily: 'sans-serif',
            padding: '80px 60px',
            position: 'relative',
          }}
        >
          {/* Accent border at the top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'center',
            }}
          >
            {/* Tag / Category Badge */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#3b82f6',
                fontSize: 24,
                fontWeight: 700,
                padding: '12px 24px',
                borderRadius: '999px',
                marginBottom: '40px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              Industry Insights
            </div>

            {/* Main Title */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.2,
                maxWidth: '900px',
                whiteSpace: 'pre-wrap',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {displayTitle}
            </div>
          </div>

          {/* Footer with Branding and Contact */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '30px',
            }}
          >
            {/* Branding */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 36,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-1px',
              }}
            >
              WebX<span style={{ color: '#3b82f6' }}>Crafting</span>
            </div>

            {/* Contact Info */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                color: '#9ca3af',
                fontSize: 20,
                fontWeight: 500,
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', marginRight: '10px' }}>Email:</span> webxcrafting@gmail.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#8b5cf6', marginRight: '10px' }}>Phone:</span> +91 9102615343
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
