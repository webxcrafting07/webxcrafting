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
  },
  'gurgaon': {
    name: 'Gurgaon',
    state: 'Haryana',
    description: 'Looking for a top web development company in Gurgaon? We build hyper-scalable corporate websites, custom SaaS, and eCommerce solutions for startups and enterprises.',
    keywords: 'web development company in gurgaon, web design gurgaon, software development gurugram, ecommerce agency gurgaon'
  },
  'noida': {
    name: 'Noida',
    state: 'Uttar Pradesh',
    description: 'Best web development company in Noida. WebXCrafting delivers ultra-fast, premium React and Next.js applications tailored to elevate your corporate branding.',
    keywords: 'web development company in noida, website developers noida, web design noida, top it company noida'
  },
  'dehradun': {
    name: 'Dehradun',
    state: 'Uttarakhand',
    description: 'Leading web development company in Dehradun. Grow your local business with stunning, search-engine-optimized websites and custom digital platforms.',
    keywords: 'web development company in dehradun, web design dehradun, it services uttarakhand, website makers dehradun'
  },
  'bhubaneswar': {
    name: 'Bhubaneswar',
    state: 'Odisha',
    description: 'Premium website design and development services in Bhubaneswar. Unlock your digital potential with custom web applications and business portfolios.',
    keywords: 'web development company in bhubaneswar, web design odisha, website developers bhubaneswar, it companies in odisha'
  },
  'ranchi': {
    name: 'Ranchi',
    state: 'Jharkhand',
    description: 'Top-tier web development company in Ranchi. We specialize in dynamic B2B portals, ecommerce websites, and high-performance business applications.',
    keywords: 'web development company in ranchi, web design ranchi, website developers jharkhand, ranchi software developers'
  },
  'rajkot': {
    name: 'Rajkot',
    state: 'Gujarat',
    description: 'Expert web development company in Rajkot. Accelerate your manufacturing or retail business with blazing-fast eCommerce sites and corporate portals.',
    keywords: 'web development company in rajkot, website design rajkot, ecommerce development gujarat, rajkot web developers'
  },
  'jodhpur': {
    name: 'Jodhpur',
    state: 'Rajasthan',
    description: 'Leading website development company in Jodhpur. Build a premium digital identity for your business with bespoke web design and custom software.',
    keywords: 'web development company in jodhpur, web design jodhpur, rajasthan website developers, ecommerce jodhpur'
  },
  'mysore': {
    name: 'Mysore',
    state: 'Karnataka',
    description: 'WebXCrafting is the premier web development company in Mysore. We deliver custom SaaS, dynamic corporate sites, and fast e-commerce stores.',
    keywords: 'web development company in mysore, web design mysore, karnataka software developers, it company mysore'
  },
  'madurai': {
    name: 'Madurai',
    state: 'Tamil Nadu',
    description: 'Best web development company in Madurai. Take your local brand global with highly-optimized, fast-loading, and mobile-friendly business websites.',
    keywords: 'web development company in madurai, website design madurai, tamil nadu web developers, ecommerce madurai'
  },
  'mangalore': {
    name: 'Mangalore',
    state: 'Karnataka',
    description: 'Top web development agency in Mangalore. We craft beautiful UI/UX designs and robust backend systems for enterprises and digital startups.',
    keywords: 'web development company in mangalore, web design mangalore, software company mangalore, mangalore website makers'
  },
  'udaipur': {
    name: 'Udaipur',
    state: 'Rajasthan',
    description: 'Premium web development company in Udaipur. From luxury hospitality websites to robust eCommerce engines, we build digital excellence.',
    keywords: 'web development company in udaipur, web design udaipur, rajasthan web developers, hospitality web design udaipur'
  },
  'jalandhar': {
    name: 'Jalandhar',
    state: 'Punjab',
    description: 'Expert web development company in Jalandhar. Scale your sports, manufacturing, or service business with tailored, high-performance websites.',
    keywords: 'web development company in jalandhar, web design jalandhar, punjab web developers, website makers jalandhar'
  },
  'amritsar': {
    name: 'Amritsar',
    state: 'Punjab',
    description: 'Leading website development company in Amritsar. We build lead-generating, SEO-optimized digital platforms for progressive businesses.',
    keywords: 'web development company in amritsar, web design amritsar, it company amritsar, punjab software development'
  },
  'faridabad': {
    name: 'Faridabad',
    state: 'Haryana',
    description: 'Top-rated web development company in Faridabad. Industrial strength web solutions, corporate portals, and eCommerce applications built to scale.',
    keywords: 'web development company in faridabad, website design faridabad, haryana web developers, faridabad software companies'
  },
  'ghaziabad': {
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    description: 'Grow your enterprise with the best web development company in Ghaziabad. We specialize in fast Next.js applications and digital marketing platforms.',
    keywords: 'web development company in ghaziabad, web design ghaziabad, up website developers, ghaziabad it services'
  },
  'navi-mumbai': {
    name: 'Navi Mumbai',
    state: 'Maharashtra',
    description: 'Premium web development company in Navi Mumbai. Experience world-class web engineering, SaaS development, and bespoke React digital portals.',
    keywords: 'web development company in navi mumbai, web design navi mumbai, software developers navi mumbai, ecommerce navi mumbai'
  },
  'thane': {
    name: 'Thane',
    state: 'Maharashtra',
    description: 'Expert website development company in Thane. We help businesses automate and grow through high-end web applications and corporate websites.',
    keywords: 'web development company in thane, web design thane, thane software company, website creators thane'
  },
  'raipur': {
    name: 'Raipur',
    state: 'Chhattisgarh',
    description: 'Best web development company in Raipur. Empower your brand with cutting-edge website design and highly scalable corporate digital software.',
    keywords: 'web development company in raipur, web design raipur, chhattisgarh web developers, it services raipur'
  },
  'gwalior': {
    name: 'Gwalior',
    state: 'Madhya Pradesh',
    description: 'Leading web development company in Gwalior. Transform your vision into reality with our premium web design and custom software solutions.',
    keywords: 'web development company in gwalior, website design gwalior, mp web developers, gwalior it company'
  },
  'jabalpur': {
    name: 'Jabalpur',
    state: 'Madhya Pradesh',
    description: 'Top web development agency in Jabalpur. We build extremely fast, responsive, and secure websites for growing startups and established businesses.',
    keywords: 'web development company in jabalpur, web design jabalpur, software development mp, jabalpur website developers'
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
