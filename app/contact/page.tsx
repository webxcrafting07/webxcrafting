import type { Metadata } from 'next'
import ContactClient from './ContactClient'
export const metadata: Metadata = { 
  title: 'Contact the Best Web Developers in India | WebXCrafting', 
  description: 'Looking for a top web development company in India? Contact WebXCrafting for a free consultation and premium web design services.',
  alternates: {
    canonical: '/contact',
  }
}
export default function ContactPage() { return <ContactClient /> }
