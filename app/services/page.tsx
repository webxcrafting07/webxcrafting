import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
export const metadata: Metadata = {
  title: "Professional Web Design & Development Services | WebXCrafting",
  description:
    "Explore our premium global web development services. From custom e-commerce solutions to enterprise-grade web applications, we build digital products that drive growth.",
  alternates: {
    canonical: '/services',
  }
};
export default function ServicesPage() { return <ServicesClient /> }
