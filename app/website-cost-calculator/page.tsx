import type { Metadata } from 'next'
import CalculatorClient from './CalculatorClient'
import Footer from '@/components/Footer'
import DotBackground from '@/components/DotBackground'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
export const metadata: Metadata = {
  title: 'Website Cost Calculator — Get an Instant Price Estimate',
  description: 'Estimate your website\'s cost in 60 seconds. Transparent, no-hidden-fees pricing based on real project data. Try it free to calculate website cost.',
  keywords: 'website cost calculator, website price calculator, website design cost calculator in india, calculate website cost, website development cost calculator india, website cost estimator',
  alternates: {
    canonical: '/website-cost-calculator',
  },
  openGraph: {
    title: 'Website Cost Calculator — Get an Instant Price Estimate',
    description: 'Estimate your website\'s cost in 60 seconds. Transparent, no-hidden-fees pricing based on real project data.',
    type: 'website',
  },
}

export default function CalculatorPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "WebXCrafting Website Cost Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "An interactive tool to estimate the cost of web development projects including e-commerce, SaaS, and business websites in India.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to use the website cost calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply select your website type (e.g. Business, E-commerce, SaaS), choose the number of pages, select your design complexity, and pick any add-ons. Our website price calculator instantly generates an accurate estimate."
            }
          },
          {
            "@type": "Question",
            "name": "Is this website design cost calculator in India accurate for global clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! While it is a website development cost calculator India based on our primary agency location, the pricing reflects our premium offshore rates, making it an excellent benchmark for global businesses wanting to outsource web development."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a basic business website cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A standard 1-5 page business website typically starts around ₹8,000 to ₹12,000. You can use our website cost estimator above to add specific features and see how it affects the total budget."
            }
          },
          {
            "@type": "Question",
            "name": "Are there hidden fees when I calculate website cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No hidden fees. The estimate you see is exactly what we charge for development. Third-party services like domain names or server hosting are separate and will be clearly communicated upfront."
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
        
        {/* Calculator Tool */}
        <div style={{ position: 'relative', zIndex: 50 }}>
          <CalculatorClient />
        </div>

        {/* SEO Rich Text Section */}
        <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 5, color: '#8892b0' }}>
          <div style={{ background: 'rgba(10,14,28,0.7)', borderRadius: '24px', padding: 'clamp(24px, 5vw, 48px)', border: '1px solid rgba(99,120,255,0.1)', backdropFilter: 'blur(20px)' }}>
            <h1 style={{ fontFamily: 'Syne', fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', marginBottom: '24px', fontStyle: 'italic', fontWeight: 800 }}>
              <span style={{ color: '#4f6fff' }}>Website Price Calculator</span> & Cost Estimator
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Building a professional website is an investment in your business's future. However, pricing in the web development industry can often feel confusing. If you want to <strong>calculate website cost</strong> before committing to an agency, you are in the right place. Our transparent <strong>website design cost calculator in India</strong> provides a real-time estimate based on current market standards for both domestic and international clients.
            </p>
            
            <h3 style={{ fontSize: '20px', color: '#e8eaf6', marginTop: '32px', marginBottom: '16px', fontWeight: 700 }}>How Does Our Website Cost Estimator Work?</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <li><strong>Type & Scale:</strong> A simple 5-page business website requires significantly less time than a fully custom E-commerce store or a SaaS portal.</li>
              <li><strong>UI/UX Design Complexity:</strong> Standard templates reduce costs, while custom-designed interfaces with Framer Motion animations require specialized frontend expertise.</li>
              <li><strong>Premium Add-ons:</strong> Features like payment gateway integration, advanced SEO optimization, and custom admin dashboards directly impact the final output of the <strong>website development cost calculator India</strong>.</li>
            </ul>

            <h3 style={{ fontSize: '20px', color: '#e8eaf6', marginTop: '32px', marginBottom: '16px', fontWeight: 700 }}>Comparison: Freelancer vs Agency Costs</h3>
            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e8eaf6', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(99,120,255,0.2)' }}>
                    <th style={{ padding: '12px' }}>Project Type</th>
                    <th style={{ padding: '12px' }}>Average Freelancer (India)</th>
                    <th style={{ padding: '12px' }}>WebXCrafting Premium Agency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px' }}>Basic Business Site (5 Pages)</td>
                    <td style={{ padding: '12px' }}>₹5,000 - ₹8,000</td>
                    <td style={{ padding: '12px' }}>₹8,000 (Includes SEO & Pro UI)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px' }}>E-Commerce Store</td>
                    <td style={{ padding: '12px' }}>₹15,000 - ₹25,000</td>
                    <td style={{ padding: '12px' }}>₹20,000 (Custom CMS & Payments)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px' }}>Custom Web App (SaaS)</td>
                    <td style={{ padding: '12px' }}>₹30,000+</td>
                    <td style={{ padding: '12px' }}>₹45,000 (Scalable Architecture)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '20px', color: '#e8eaf6', marginTop: '32px', marginBottom: '16px', fontWeight: 700 }}>Why Use Our Website Cost Calculator?</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.8 }}>
              Unlike generic agencies that hide their pricing until after a long sales call, WebXCrafting provides an upfront estimate instantly. Whether you need a landing page for lead generation or a luxury 3D-animated web application, you can use our <strong>website cost calculator</strong> above and download a customized PDF proposal immediately. No waiting for quotes, no hidden fees.
            </p>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
