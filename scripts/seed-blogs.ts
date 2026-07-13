import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local')
  process.exit(1)
}

// Minimal Blog Schema for the script
const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  category: String,
  tags: [String],
  coverImage: String,
  author: String,
  status: String,
  readTime: Number,
  metaTitle: String,
  metaDescription: String,
  featured: Boolean,
  publishDate: Date,
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

const blogs = [
  {
    title: "The Ultimate Guide to Website Development Costs in India (2026 Edition)",
    slug: "website-development-cost-in-india-2026",
    excerpt: "Discover the true cost of website development in India in 2026. From basic landing pages to advanced custom Next.js web applications, we break down pricing, hidden fees, and what you should expect to pay.",
    category: "Web Development",
    tags: ["Pricing", "Web Development", "India", "E-commerce", "Startups"],
    coverImage: "",
    author: "WebXCrafting Team",
    status: "published",
    readTime: 12,
    metaTitle: "Website Development Cost in India (2026) | Complete Pricing Guide",
    metaDescription: "How much does a website cost in India? Get the exact breakdown for business sites, e-commerce, and custom web apps. Avoid hidden fees and overpaying.",
    featured: true,
    publishDate: new Date(),
    content: `
<h2>Introduction: Navigating Web Development Pricing in India</h2>
<p>If you are a business owner or startup founder in India looking to establish a digital presence, one of your first questions is likely: <strong>"How much does it cost to build a website?"</strong></p>
<p>In 2026, the landscape of web development has shifted dramatically. With the rise of advanced frameworks like Next.js and React, businesses are no longer settling for slow, outdated WordPress templates. They demand high-performance, SEO-optimized digital experiences. However, with thousands of agencies and freelancers offering drastically different quotes, understanding the true cost can be incredibly confusing.</p>
<p>In this comprehensive guide, we will break down the exact costs of website development in India, categorize pricing based on business needs, and expose the hidden fees you must avoid.</p>

<h2>Category 1: Basic Landing Pages and Single-Page Sites</h2>
<p>A landing page is a focused, single-page website designed to capture leads, showcase a specific product, or provide essential business contact information. These are ideal for local service providers, consultants, and new product launches.</p>
<h3>Average Cost: ₹5,000 - ₹12,000</h3>
<p>What you should expect for this price:</p>
<ul>
  <li>A clean, modern, and mobile-responsive layout.</li>
  <li>Contact forms and WhatsApp integration (crucial for Indian businesses).</li>
  <li>Basic on-page SEO setup (Title tags and Meta descriptions).</li>
  <li>Fast deployment (usually within 3 to 7 days).</li>
</ul>
<p><strong>Warning:</strong> Be cautious of freelancers offering websites for ₹2,000. These are almost always pirated, bloated themes that will run incredibly slow and offer zero security. If you want to rank on Google, especially for local searches like <a href="/locations/web-development-company-in-Bangalore">web development in Bangalore</a>, you need a custom-coded approach.</p>

<h2>Category 2: Small to Medium Business (SMB) Websites</h2>
<p>This is the most common requirement for growing businesses in India. A standard SMB website typically consists of 5 to 15 pages, including Home, About Us, Services, Portfolio, Blog, and Contact.</p>
<h3>Average Cost: ₹15,000 - ₹35,000</h3>
<p>What this package typically includes:</p>
<ul>
  <li>Custom UI/UX design tailored to your brand identity.</li>
  <li>Dynamic content management (e.g., the ability to upload blogs or portfolio items).</li>
  <li>Advanced SEO structure (schema markup, dynamic sitemaps, fast core web vitals).</li>
  <li>Integration with analytics tools (Google Analytics, Search Console).</li>
  <li>Performance optimization for mobile devices.</li>
</ul>
<p>At <a href="/">WebXCrafting</a>, we build these business websites using Next.js, guaranteeing sub-second load times that give you a massive advantage in SEO rankings over competitors using heavy CMS platforms.</p>

<h2>Category 3: E-Commerce Stores</h2>
<p>Selling online requires a robust, secure, and highly scalable platform. Whether you have 10 products or 10,000, an e-commerce website involves complex logic, payment gateways, and inventory management.</p>
<h3>Average Cost: ₹30,000 - ₹80,000+</h3>
<p>The price variation here depends heavily on the platform and custom features:</p>
<ul>
  <li><strong>Shopify / WooCommerce Setup:</strong> ₹25,000 - ₹45,000. These are great for quick launches, but you are locked into their ecosystem and monthly fees.</li>
  <li><strong>Custom Next.js Headless E-commerce:</strong> ₹50,000 - ₹100,000+. This is the gold standard for 2026. A headless setup provides ultimate speed, complete design freedom, and zero monthly platform fees.</li>
</ul>
<p>Essential e-commerce features include Razorpay/Stripe integration, automated email receipts, advanced product filtering, user accounts, and highly secure checkout flows.</p>

<h2>Category 4: Custom Web Applications & SaaS Platforms</h2>
<p>If you are building a product, a custom CRM, a job portal, or a Learning Management System (LMS), you are moving beyond a "website" into the realm of "web applications."</p>
<h3>Average Cost: ₹75,000 - ₹5,00,000+</h3>
<p>These projects require dedicated software engineering. Costs are usually calculated based on development hours or sprints. Key requirements include:</p>
<ul>
  <li>Custom database architecture (MongoDB, PostgreSQL).</li>
  <li>Complex user roles and authentication (JWT, OAuth).</li>
  <li>Third-party API integrations (Payment gateways, SMS providers, AI APIs).</li>
  <li>Real-time features (WebSockets, live chat).</li>
  <li>High-level security and data compliance.</li>
</ul>

<h2>Hidden Costs You Must Factor In</h2>
<p>When budgeting for a website, the initial development fee is not the only expense. Be prepared for these recurring costs:</p>
<ul>
  <li><strong>Domain Name:</strong> ₹800 - ₹1,500 per year.</li>
  <li><strong>Premium Hosting:</strong> ₹3,000 - ₹12,000 per year (depending on traffic). AWS or Vercel hosting for Next.js apps may scale with usage.</li>
  <li><strong>SSL Certificate:</strong> Often free (via Let's Encrypt), but premium EV SSLs can cost ₹3,000+ annually.</li>
  <li><strong>Maintenance & Security Updates:</strong> ₹5,000 - ₹15,000+ per month. Keeping the code updated and secure is crucial.</li>
  <li><strong>SEO & Marketing:</strong> Building the site is just step one. Monthly SEO services to rank in competitive markets like <a href="/locations/web-development-company-in-Mumbai">Mumbai</a> or <a href="/locations/web-development-company-in-Delhi-NCR">Delhi NCR</a> require ongoing investment.</li>
</ul>

<h2>Why Choose WebXCrafting for Your Next Project?</h2>
<p>While the Indian market is flooded with cheap template designers, serious businesses understand that a website is an investment, not an expense. A slow website will cost you thousands in lost sales and poor Google rankings.</p>
<p>At WebXCrafting, we do not use templates. We engineer every platform from scratch using cutting-edge React and Next.js technology. This ensures perfect Lighthouse scores, incredible user experiences, and a digital asset that actually generates revenue.</p>
<p>Ready to get an exact quote? <a href="/contact">Contact us today</a> for a free consultation and project roadmap.</p>
    `
  },
  {
    title: "Why Your Local Business Needs a Custom Next.js Website Over WordPress",
    slug: "why-nextjs-over-wordpress-for-local-business",
    excerpt: "WordPress powers much of the web, but for local businesses in 2026 seeking top Google rankings and ultimate speed, Next.js is the superior choice. Learn why custom-coded sites outrank templates every time.",
    category: "Technology",
    tags: ["Next.js", "WordPress", "SEO", "Performance", "Web Development"],
    coverImage: "",
    author: "WebXCrafting Team",
    status: "published",
    readTime: 10,
    metaTitle: "Next.js vs WordPress: The Best Choice for Local Business SEO",
    metaDescription: "Stop losing customers to slow WordPress sites. Discover why custom Next.js web development guarantees better SEO, faster speeds, and higher conversions for your business.",
    featured: true,
    publishDate: new Date(),
    content: `
<h2>The Shift in Modern Web Development</h2>
<p>For over a decade, WordPress was the undisputed king of web development. It democratized website creation, allowing anyone to piece together a site using themes and plugins. However, as we move through 2026, the internet has evolved. User expectations for speed are higher than ever, and Google's ranking algorithms have become merciless toward slow, bloated websites.</p>
<p>Enter <strong>Next.js</strong>—a React framework that has revolutionized how high-performance websites are built. If you own a local business and are looking to dominate search results, choosing Next.js over WordPress is one of the most profitable technical decisions you can make.</p>
<p>In this article, we will break down exactly why custom-coded Next.js websites completely outperform traditional WordPress setups.</p>

<h2>1. The Speed Advantage: Sub-Second Load Times</h2>
<p>Speed is no longer a luxury; it is a necessity. Google’s Core Web Vitals heavily penalize slow websites. If your site takes longer than 3 seconds to load, over 50% of mobile users will bounce.</p>
<p><strong>The WordPress Problem:</strong> WordPress is built on a legacy PHP architecture. Every time a user visits a page, the server has to query the database, process the PHP code, and render the HTML. If you have 20 plugins installed (which is typical for a WordPress site), this process becomes incredibly slow. Even with caching plugins, WordPress struggles to achieve perfect speed scores.</p>
<p><strong>The Next.js Solution:</strong> Next.js utilizes Server-Side Rendering (SSR) and Static Site Generation (SSG). This means the HTML for your website is pre-built and served instantly via a global CDN. When a customer in <a href="/locations/web-development-company-in-Pune">Pune</a> visits your site, it loads in milliseconds, feeling exactly like a native app.</p>

<h2>2. Unmatched Security</h2>
<p>Security breaches can ruin a local business's reputation overnight.</p>
<p><strong>The WordPress Problem:</strong> Because WordPress powers over 40% of the internet, it is the #1 target for hackers. Vulnerabilities in outdated plugins or themes are constantly exploited. You have to constantly monitor, update, and patch your site to prevent malicious code injections.</p>
<p><strong>The Next.js Solution:</strong> Next.js websites are fundamentally "headless." The frontend is decoupled from the backend database. In many cases, the site is served as static files, meaning there is no database exposed to the public internet for hackers to inject SQL into. This architecture makes Next.js exponentially more secure out of the box.</p>

<h2>3. Ultimate SEO Dominance</h2>
<p>For a local business, SEO is the lifeblood of customer acquisition. You need to rank #1 when someone searches for your services.</p>
<p><strong>The WordPress Problem:</strong> While WordPress has great SEO plugins like Yoast, the underlying bloated code hurts your rankings. Excessive DOM elements, heavy CSS/JS files from unused plugins, and slow Time to First Byte (TTFB) actively harm your Google standing.</p>
<p><strong>The Next.js Solution:</strong> Next.js was built with SEO in mind. It provides pristine, semantic, and lightweight HTML. Developers have granular control over meta tags, dynamic sitemaps, and structured schema data. Because Next.js sites achieve perfect 100/100 Lighthouse scores, Google naturally favors them in competitive local markets like <a href="/locations/web-development-company-in-Hyderabad">Hyderabad</a> and <a href="/locations/web-development-company-in-Ahmedabad">Ahmedabad</a>.</p>

<h2>4. Custom Design Without Limitations</h2>
<p>Your website is your digital storefront. It needs to stand out.</p>
<p><strong>The WordPress Problem:</strong> Most agencies use page builders like Elementor. While these tools are easy to use, they inject massive amounts of unnecessary code (div soup) and heavily restrict custom animations. You are boxed into what the theme allows.</p>
<p><strong>The Next.js Solution:</strong> With Next.js and React, developers code the UI from scratch. We can implement breathtaking micro-animations (using libraries like Framer Motion), glassmorphism effects, and highly interactive components that are impossible or incredibly janky on WordPress. Your brand looks premium, bespoke, and professional.</p>

<h2>5. Scalability for the Future</h2>
<p>If your business grows, your website needs to handle the traffic.</p>
<p><strong>The WordPress Problem:</strong> Scaling a WordPress site requires expensive, high-tier hosting, load balancers, and constant database optimization. A sudden spike in traffic can easily crash a standard WordPress server.</p>
<p><strong>The Next.js Solution:</strong> Next.js sites hosted on platforms like Vercel scale automatically and infinitely. Whether you have 100 visitors a day or 100,000 visitors an hour, the infrastructure handles it seamlessly without any downtime or configuration headaches on your part.</p>

<h2>Conclusion: The WebXCrafting Approach</h2>
<p>At <a href="/">WebXCrafting</a>, we refuse to deliver mediocre digital experiences. We exclusively build custom Next.js platforms because we know they deliver the highest ROI for our clients. By investing in modern technology, you secure better rankings, higher conversion rates, and a future-proof foundation for your business.</p>
<p>Stop settling for slow templates. <a href="/services">Explore our premium web development services</a> and let’s build something extraordinary.</p>
    `
  }
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string)
    console.log('Connected to DB')
    
    // Check if these blogs already exist to avoid duplicates
    for (const blogData of blogs) {
      const existing = await Blog.findOne({ slug: blogData.slug })
      if (!existing) {
        await Blog.create(blogData)
        console.log(`Inserted blog: ${blogData.title}`)
      } else {
        console.log(`Blog already exists: ${blogData.title}`)
      }
    }
    
    console.log('Seeding complete! You now have highly optimized cornerstone content.')
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seed()
