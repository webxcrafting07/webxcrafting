import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
export const metadata: Metadata = { title: 'Services & Pricing', description: 'Transparent pricing for business websites, e-commerce stores, job portals, and custom web apps.' }
export default function ServicesPage() { return <ServicesClient /> }
