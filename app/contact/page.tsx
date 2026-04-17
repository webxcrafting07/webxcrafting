import type { Metadata } from 'next'
import ContactClient from './ContactClient'
export const metadata: Metadata = { title: 'Contact Us', description: 'Get in touch to start your web development project. Free consultation and custom quotes.' }
export default function ContactPage() { return <ContactClient /> }
