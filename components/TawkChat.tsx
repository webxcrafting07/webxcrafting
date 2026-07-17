'use client'
import Script from 'next/script'

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

export default function TawkChat() {
  const TAWK_PROPERTY_ID = '69f491b84451ae1c35c0f8d7'
  const TAWK_WIDGET_ID = '1jnhlieso'

  return (
    <>
      <Script
        id="tawk-to-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();
            window.Tawk_API.customStyle = {
              visibility: {
                desktop: { position: 'br', xOffset: 20, yOffset: 100 },
                mobile: { position: 'br', xOffset: 20, yOffset: 90 }
              }
            };
          `,
        }}
      />
      <Script
        id="tawk-to-script"
        strategy="lazyOnload"
        src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
        crossOrigin="*"
      />
    </>
  )
}
