import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Admin from '@/models/Admin'
import Project from '@/models/Project'
import Service from '@/models/Service'

export async function POST() {
  try {
    await connectDB()
    
    // Clear existing data for a clean seed
    await Admin.deleteMany({})
    await Service.deleteMany({})
    await Project.deleteMany({})

    // Create admin if not exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL })
    if (!existingAdmin) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@webcraft.pro',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
      })
    }

    // Seed services if empty
    const serviceCount = await Service.countDocuments()
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: 'Business Website',
          description: 'Professional multi-page website for your business with SEO optimization, contact forms, and responsive design.',
          price: 8000,
          originalPrice: 12000,
          icon: '🌐',
          popular: false,
          order: 1,
          features: ['5 Pages', 'SEO Optimized', 'Mobile Responsive', 'Contact Form', '1 Month Support'],
        },
        {
          title: 'E-commerce Website',
          description: 'Full-featured online store with product management, cart, payment gateway, and order tracking.',
          price: 25000,
          originalPrice: 35000,
          icon: '🛒',
          popular: true,
          order: 2,
          features: ['Unlimited Products', 'Payment Gateway', 'Order Management', 'Inventory System', '3 Month Support'],
        },
        {
          title: 'Job Portal',
          description: 'Complete job listing platform with employer/candidate dashboards, application tracking, and search filters.',
          price: 45000,
          originalPrice: 60000,
          icon: '💼',
          popular: false,
          order: 3,
          features: ['Employer Dashboard', 'Candidate Portal', 'Application Tracking', 'Search & Filters', '6 Month Support'],
        },
        {
          title: 'Custom Website',
          description: 'Tailored solution built exactly to your specs — SaaS platforms, web apps, dashboards, and more.',
          price: 60000,
          originalPrice: 80000,
          icon: '⚙️',
          popular: false,
          order: 4,
          features: ['Custom Features', 'API Integration', 'Admin Dashboard', 'Cloud Deployment', '1 Year Support'],
        },
      ])
    }

    // Seed projects if empty
    const projectCount = await Project.countDocuments()
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'TechStart Landing',
          description: 'Modern landing page for a tech startup with animated sections, lead capture, and blog integration.',
          category: 'Business',
          status: 'completed',
          liveLink: 'https://example.com',
          featured: true,
        },
        {
          title: 'FashionHub Store',
          description: 'Full e-commerce platform with 500+ products, Razorpay integration, and inventory management.',
          category: 'E-commerce',
          status: 'completed',
          liveLink: 'https://example.com',
          featured: true,
        },
        {
          title: 'JobsIndia Portal',
          description: 'Job listing platform with employer and candidate dashboards, real-time notifications, and AI job matching.',
          category: 'Job Portal',
          status: 'ongoing',
          liveLink: '',
          featured: true,
        },
        {
          title: 'HealthCare Pro',
          description: 'Healthcare clinic website with appointment booking, doctor profiles, and patient portal.',
          category: 'Business',
          status: 'completed',
          liveLink: 'https://example.com',
          featured: false,
        },
        {
          title: 'CryptoTrack Dashboard',
          description: 'Real-time crypto portfolio tracker with charts, price alerts, and multi-wallet support.',
          category: 'Custom',
          status: 'ongoing',
          liveLink: '',
          featured: false,
        },
        {
          title: 'EduLearn Platform',
          description: 'Online learning platform with video courses, quizzes, progress tracking, and certificates.',
          category: 'Custom',
          status: 'completed',
          liveLink: 'https://example.com',
          featured: true,
        },
      ])
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully! Admin: admin@webcraft.pro / Admin@123',
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'POST to this endpoint to seed the database' })
}
