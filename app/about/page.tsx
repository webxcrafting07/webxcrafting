import type { Metadata } from 'next'
import AboutClient from './AboutClient'
export const metadata: Metadata = { 
  title: 'About Us', 
  description: 'Learn about WebXCrafting — our team, skills, and mission to build premium websites at affordable prices.',
  alternates: {
    canonical: '/about',
  }
}
export default function AboutPage() { return <AboutClient /> }
