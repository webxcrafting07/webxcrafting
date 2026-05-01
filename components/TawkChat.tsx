'use client'
import { useEffect } from 'react'

export default function TawkChat() {
  useEffect(() => {
    // Replace the IDs below with your actual Tawk.to IDs
    const TAWK_PROPERTY_ID = 'YOUR_PROPERTY_ID'
    const TAWK_WIDGET_ID = 'YOUR_WIDGET_ID'

    if (TAWK_PROPERTY_ID !== 'YOUR_PROPERTY_ID') {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode?.insertBefore(s1, s0);
    }
  }, [])

  return null // This component doesn't render anything visually
}
