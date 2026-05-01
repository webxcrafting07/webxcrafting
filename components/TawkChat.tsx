'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

export default function TawkChat() {
  useEffect(() => {
    // Replace the IDs below with your actual Tawk.to IDs
    const TAWK_PROPERTY_ID = '69f491b84451ae1c35c0f8d7'
    const TAWK_WIDGET_ID = '1jnhlieso'

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: { position: 'br', xOffset: 20, yOffset: 100 },
        mobile: { position: 'br', xOffset: 20, yOffset: 90 }
      }
    };

    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0);
  }, [])

  return null // This component doesn't render anything visually
}
