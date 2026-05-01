import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
export const metadata: Metadata = {
  title: "Professional Web Design & Development Services India",
  description:
    "Affordable and premium web development services. We specialize in Business Websites, E-commerce Stores, Job Portals, and Custom Web Applications with transparent pricing.",
  alternates: {
    canonical: '/services',
  }
};
export default function ServicesPage() { return <ServicesClient /> }
