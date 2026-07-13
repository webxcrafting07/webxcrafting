import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Professional Web Development Services';
    
    // Determine category based on keywords for a bit of dynamic text
    let category = "INDUSTRY INSIGHTS";
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('seo') || lowerTitle.includes('ranking')) category = "SEO STRATEGY";
    if (lowerTitle.includes('e-commerce')) category = "E-COMMERCE";
    if (lowerTitle.includes('design')) category = "WEB DESIGN";
    if (lowerTitle.includes('development') || lowerTitle.includes('react') || lowerTitle.includes('next.js')) category = "ENGINEERING";

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#050510',
            fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Abstract Glowing Orbs in Background */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '60%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(79, 111, 255, 0.4) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-20%',
              width: '70%',
              height: '90%',
              background: 'radial-gradient(circle, rgba(162, 89, 255, 0.3) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
            }}
          />

          {/* Grid overlay for a tech feel */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              padding: '80px',
              zIndex: 10,
            }}
          >
            {/* Category Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(79, 111, 255, 0.15)',
                color: '#6378ff',
                fontSize: 22,
                fontWeight: 800,
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '30px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                border: '1px solid rgba(79, 111, 255, 0.3)',
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6378ff', marginRight: 12 }}></div>
              {category}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                maxWidth: '90%',
                letterSpacing: '-1px',
                marginBottom: '40px',
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Bar Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '40px 80px',
              backgroundColor: 'rgba(10, 14, 28, 0.8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              zIndex: 10,
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 42,
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-1.5px',
              }}
            >
              <div style={{ 
                width: 42, 
                height: 42, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #4f6fff, #a259ff)', 
                marginRight: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 20
              }}>
                W
              </div>
              WebX<span style={{ color: '#4f6fff' }}>Crafting</span>
            </div>

            {/* Contact Details */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '40px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#7b82a8', fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Email Us</span>
                <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 500 }}>webxcrafting@gmail.com</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#7b82a8', fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Call Us</span>
                <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 500 }}>+91 9102615343</span>
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
