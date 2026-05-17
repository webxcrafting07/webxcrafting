import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationClient from './LocationClient'

// Supported cities config
export const CITIES_CONFIG: Record<string, { name: string; state: string; description: string; keywords: string }> = {
  'bangalore': {
    name: 'Bangalore',
    state: 'Karnataka',
    description: 'Looking for the best web development company in Bangalore? WebXCrafting builds high-performance, premium, and SEO-optimized business websites & e-commerce stores for Bangalore startups and enterprises.',
    keywords: 'web development company in bangalore, website design agency bangalore, web developers bangalore, software development bangalore'
  },
  'mumbai': {
    name: 'Mumbai',
    state: 'Maharashtra',
    description: 'Top web development company in Mumbai. WebXCrafting delivers premium website design, e-commerce portals, and custom SaaS software to accelerate business growth for brands in Mumbai.',
    keywords: 'web development company in mumbai, website developers mumbai, ecommerce website design mumbai, web design agency mumbai'
  },
  'delhi-ncr': {
    name: 'Delhi NCR',
    state: 'Delhi',
    description: 'Empower your brand with the leading website development company in Delhi NCR, Noida, and Gurgaon. We craft luxury websites, custom portals, and high-converting landing pages.',
    keywords: 'web development company in delhi ncr, web design agency noida, website developers gurgaon, delhi web development agency'
  },
  'pune': {
    name: 'Pune',
    state: 'Maharashtra',
    description: 'Top website design & development company in Pune. We develop fast, premium, secure corporate websites and custom software solutions designed for high conversion and scale.',
    keywords: 'web development company in pune, website design agency pune, website developers in pune, corporate web design pune'
  },
  'hyderabad': {
    name: 'Hyderabad',
    state: 'Telangana',
    description: 'Build your digital presence with Hyderabad\'s premier web development company. WebXCrafting crafts ultra-fast React/Next.js corporate sites and custom portals.',
    keywords: 'web development company in hyderabad, web designers hyderabad, top website developers hyderabad, nextjs developers hyderabad'
  },
  'ahmedabad': {
    name: 'Ahmedabad',
    state: 'Gujarat',
    description: 'Premium website design and development services in Ahmedabad. Transform your local business with automated sales pipelines, high-end UI/UX, and robust search presence.',
    keywords: 'web development company in ahmedabad, website designer ahmedabad, ecommerce development ahmedabad, web design gujarat'
  },
  'chennai': {
    name: 'Chennai',
    state: 'Tamil Nadu',
    description: 'Expert web development company in Chennai offering custom eCommerce, corporate websites, and enterprise software solutions to scale your business digitally.',
    keywords: 'web development company in chennai, best website design chennai, software developers chennai, ecommerce website maker chennai'
  },
  'kolkata': {
    name: 'Kolkata',
    state: 'West Bengal',
    description: 'Looking for a premium web development company in Kolkata? We build high-speed, SEO-optimized business websites and SaaS platforms for brands across West Bengal.',
    keywords: 'web development company in kolkata, web designers kolkata, it company kolkata, top website developers west bengal'
  },
  'jaipur': {
    name: 'Jaipur',
    state: 'Rajasthan',
    description: 'Leading web design and development company in Jaipur. WebXCrafting helps Rajasthan businesses grow with cutting-edge React websites and digital portals.',
    keywords: 'web development company in jaipur, website design agency jaipur, web developers rajasthan, ecommerce development jaipur'
  },
  'lucknow': {
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    description: 'Transform your digital presence with the best web development company in Lucknow. We craft fast, responsive, and lead-generating websites for UP enterprises.',
    keywords: 'web development company in lucknow, website design lucknow, web developer in uttar pradesh, lucknow it companies'
  },
  'surat': {
    name: 'Surat',
    state: 'Gujarat',
    description: 'Top web development company in Surat. Scale your diamond, textile, or retail business with our ultra-fast eCommerce and corporate website solutions.',
    keywords: 'web development company in surat, ecommerce developers surat, website design agency surat, software company surat'
  },
  'nagpur': {
    name: 'Nagpur',
    state: 'Maharashtra',
    description: 'WebXCrafting is the premier web development company in Nagpur. We deliver secure, scalable, and beautifully designed websites and enterprise portals.',
    keywords: 'web development company in nagpur, website developers nagpur, web design nagpur, it services nagpur'
  },
  'indore': {
    name: 'Indore',
    state: 'Madhya Pradesh',
    description: 'Grow your startup or enterprise with the top web development company in Indore. We specialize in high-conversion Next.js applications and robust websites.',
    keywords: 'web development company in indore, web design agency indore, software developers madhya pradesh, indore website designers'
  },
  'chandigarh': {
    name: 'Chandigarh',
    state: 'Chandigarh',
    description: 'Best web development company in Chandigarh offering world-class website design, custom software, and SEO-driven digital marketing solutions.',
    keywords: 'web development company in chandigarh, website design chandigarh, web developers tricity, ecommerce developers chandigarh'
  },
  'patna': {
    name: 'Patna',
    state: 'Bihar',
    description: 'Leading web development company in Patna. We empower Bihar businesses with modern, fast, and premium web applications and e-commerce stores.',
    keywords: 'web development company in patna, website design patna, web developers bihar, it company in patna'
  },
  'bhopal': {
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    description: 'Premium website design and software development company in Bhopal. Experience world-class digital solutions tailored for your business growth.',
    keywords: 'web development company in bhopal, web design bhopal, website developer madhya pradesh, ecommerce bhopal'
  },
  'vadodara': {
    name: 'Vadodara',
    state: 'Gujarat',
    description: 'Top-tier web development company in Vadodara. We build high-end corporate websites and B2B portals for manufacturing and retail industries.',
    keywords: 'web development company in vadodara, web design vadodara, website makers baroda, software development vadodara'
  },
  'ludhiana': {
    name: 'Ludhiana',
    state: 'Punjab',
    description: 'Best web development company in Ludhiana. Expand your local business globally with our highly optimized and lead-focused web design services.',
    keywords: 'web development company in ludhiana, web developers punjab, website design ludhiana, ecommerce developers punjab'
  },
  'agra': {
    name: 'Agra',
    state: 'Uttar Pradesh',
    description: 'Expert web development agency in Agra. Connect with your target audience through stunning, fast, and secure business websites and digital platforms.',
    keywords: 'web development company in agra, web design agra, website developers up, agra software companies'
  },
  'nashik': {
    name: 'Nashik',
    state: 'Maharashtra',
    description: 'Leading website development company in Nashik. We create responsive, fast-loading, and SEO-friendly corporate websites and custom portals.',
    keywords: 'web development company in nashik, web design nashik, software developers nashik, website makers nashik'
  },
  'kochi': {
    name: 'Kochi',
    state: 'Kerala',
    description: 'Premium web development company in Kochi. Build scalable SaaS, custom applications, and e-commerce websites with Kerala\'s finest developers.',
    keywords: 'web development company in kochi, web design kerala, website developers kochi, ernakulam web developers'
  },
  'thiruvananthapuram': {
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    description: 'Top website development company in Thiruvananthapuram (Trivandrum). We deliver robust, high-performance websites for startups and global enterprises.',
    keywords: 'web development company in thiruvananthapuram, web design trivandrum, kerala web developers, software development trivandrum'
  },
  'visakhapatnam': {
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    description: 'Grow your brand with the best web development company in Visakhapatnam (Vizag). Custom web design, ecommerce, and scalable web software.',
    keywords: 'web development company in visakhapatnam, web design vizag, website developers andhra pradesh, vizag software services'
  },
  'coimbatore': {
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    description: 'Leading web development company in Coimbatore. We craft high-speed, SEO-optimized business portals and industrial websites for Tamil Nadu businesses.',
    keywords: 'web development company in coimbatore, web design coimbatore, ecommerce development coimbatore, tamil nadu web developers'
  },
  'kanpur': {
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    description: 'Premium web development company in Kanpur. We provide end-to-end web design and robust digital marketing solutions to skyrocket your growth.',
    keywords: 'web development company in kanpur, web design kanpur, website developers up, kanpur software company'
  },
  'guwahati': {
    name: 'Guwahati',
    state: 'Assam',
    description: 'Top web development company in Guwahati. Empowering Northeast India businesses with premium, scalable, and responsive digital web solutions.',
    keywords: 'web development company in guwahati, web design assam, website developers guwahati, northeast web development'
  }
}

interface PageProps {
  params: Promise<{ city: string }>
}

// Generate static pages at build time for blistering 100/100 speed score
export async function generateStaticParams() {
  return Object.keys(CITIES_CONFIG).map((cityKey) => ({
    city: `web-development-company-in-${cityKey}`
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityKey = city.replace('web-development-company-in-', '')
  const cityInfo = CITIES_CONFIG[cityKey]

  if (!cityInfo) {
    return { title: 'Not Found' }
  }

  const title = `Best Web Development Company in ${cityInfo.name} | WebXCrafting`
  const description = cityInfo.description

  return {
    title,
    description,
    keywords: cityInfo.keywords,
    alternates: {
      canonical: `/locations/web-development-company-in-${cityKey}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    }
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params
  const cityKey = city.replace('web-development-company-in-', '')
  const cityInfo = CITIES_CONFIG[cityKey]

  if (!cityInfo) {
    notFound()
  }

  return <LocationClient cityKey={cityKey} cityInfo={cityInfo} />
}
