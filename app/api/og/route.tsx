import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Professional Web Development Services';
    
    // Determine category based on keywords
    let category = "INDUSTRY INSIGHTS";
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('seo') || lowerTitle.includes('ranking')) category = "SEO STRATEGY";
    if (lowerTitle.includes('e-commerce') || lowerTitle.includes('ecommerce')) category = "E-COMMERCE EXPERTISE";
    if (lowerTitle.includes('design') || lowerTitle.includes('ui/ux')) category = "PREMIUM WEB DESIGN";
    if (lowerTitle.includes('development') || lowerTitle.includes('react') || lowerTitle.includes('next.js')) category = "ENGINEERING EXCELLENCE";



    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#020205',
            fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Ambient Glows */}
          <div style={{ position: 'absolute', top: -300, left: -200, width: 800, height: 800, background: 'radial-gradient(circle, rgba(62,115,255,0.4) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -400, right: -200, width: 900, height: 900, background: 'radial-gradient(circle, rgba(169,89,255,0.3) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }} />

          {/* Dotted Grid Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Huge faded logo in background right */}
          <div style={{
            position: 'absolute',
            right: -100,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            opacity: 0.1,
          }}>
            <img src="https://www.webxcrafting.in/logo-wxc.png" width="800" height="800" />
          </div>

          {/* Main Layout: Left Content, Bottom Right Info */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '70px', paddingBottom: '210px', zIndex: 10 }}>
            
            {/* Top Bar: Logo & Brand */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '60px' }}>
              <img src="https://www.webxcrafting.in/logo-wxc.png" width="64" height="64" style={{ marginRight: 20 }} />
              <div style={{ display: 'flex', fontSize: 40, fontWeight: 900, color: '#ffffff', letterSpacing: '-1px' }}>
                WebX<span style={{ color: '#4f6fff' }}>Crafting</span>
              </div>
            </div>

            {/* Category Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(79, 111, 255, 0.1)',
                color: '#6378ff',
                fontSize: 18,
                fontWeight: 800,
                padding: '10px 24px',
                borderRadius: '8px',
                marginBottom: '30px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                borderLeft: '4px solid #6378ff',
                alignSelf: 'flex-start',
              }}
            >
              {category}
            </div>

            {/* Giant Title (constrained so it doesn't overlap) */}
            <div
              style={{
                display: 'flex',
                fontSize: title.length > 50 ? 60 : 75,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                width: '85%',
                letterSpacing: '-2px',
                textShadow: '0 10px 30px rgba(0,0,0,0.8)',
                overflow: 'hidden',
              }}
            >
              {title}
            </div>

            {/* Bottom Glassmorphism Contact Bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 70px',
              background: 'linear-gradient(to right, rgba(10, 15, 30, 0.95), rgba(20, 10, 30, 0.95))',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#00e5ff', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 6 }}>Email For Enquiries</span>
                <span style={{ color: '#ffffff', fontSize: 28, fontWeight: 500 }}>webxcrafting@gmail.com</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: '#a259ff', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 6 }}>Call Us Direct</span>
                <span style={{ color: '#ffffff', fontSize: 28, fontWeight: 500 }}>+91 9102615343 | +91 7974579107</span>
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
