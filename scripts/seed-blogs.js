require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) { console.error('MONGODB_URI not found'); process.exit(1) }

const BlogSchema = new mongoose.Schema({
  title: String, slug: String, excerpt: String, content: String, category: String,
  tags: [String], coverImage: String, author: { type: String, default: 'WebXCrafting' },
  status: { type: String, default: 'published' }, readTime: Number,
  metaTitle: String, metaDescription: String, featured: { type: Boolean, default: false },
  publishDate: Date,
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

function getDate(daysFromNow) {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  d.setHours(9, 0, 0, 0)
  return d
}

const blogs = [
// ─── 1 ───
{
  title: 'Why Every Business Needs a Website in 2026',
  slug: 'why-every-business-needs-a-website-in-2026',
  category: 'Business Tips',
  tags: ['business website', 'online presence', 'digital marketing', 'small business'],
  metaTitle: 'Why Every Business Needs a Website in 2026',
  metaDescription: 'Discover why having a professional website is essential for every business in 2026 and how it drives growth, credibility, and revenue.',
  excerpt: 'In the digital-first world of 2026, not having a website means losing customers every single day. Learn why a professional website is the most important investment for your business.',
  featured: true,
  publishDate: getDate(0),
  content: `<h2>The Digital Landscape Has Changed Forever</h2>
<p>In 2026, over <strong>85% of consumers</strong> research products and services online before making a purchase decision. If your business doesn't have a website, you're essentially invisible to the vast majority of potential customers. A professional website isn't just a digital brochure — it's your most powerful sales tool, working 24/7 to attract, engage, and convert visitors into customers.</p>

<h2>1. First Impressions Matter — A Lot</h2>
<p>Studies show that it takes just <strong>0.05 seconds</strong> for visitors to form an opinion about your website. That first impression determines whether they stay or leave. A professionally designed website with modern aesthetics, fast loading times, and intuitive navigation instantly builds trust and credibility.</p>
<p>Think about it from a customer's perspective: if they search for your business and find nothing, or worse, find an outdated website, they'll immediately question your legitimacy. Your competitors with polished websites will capture those customers instead.</p>

<h2>2. Your Website Works While You Sleep</h2>
<p>Unlike a physical store that has fixed operating hours, your website is available <strong>24 hours a day, 7 days a week, 365 days a year</strong>. Customers can browse your products, read about your services, check pricing, and even make purchases at any time — whether it's 2 PM or 2 AM.</p>
<p>This round-the-clock availability means you never miss an opportunity. While you're sleeping, your website could be:</p>
<ul>
<li>Generating leads through contact forms</li>
<li>Processing orders on your e-commerce store</li>
<li>Answering frequently asked questions</li>
<li>Building your email subscriber list</li>
<li>Showcasing your portfolio to potential clients</li>
</ul>

<h2>3. Credibility and Trust Building</h2>
<p>A well-designed website serves as social proof for your business. It tells visitors that you're a <strong>legitimate, professional operation</strong> that takes itself seriously. Key trust-building elements include:</p>
<ul>
<li><strong>Customer testimonials</strong> and reviews</li>
<li><strong>Case studies</strong> showcasing successful projects</li>
<li><strong>About page</strong> with team information</li>
<li><strong>SSL certificate</strong> (HTTPS) for security</li>
<li><strong>Professional design</strong> that reflects your brand</li>
</ul>

<h2>4. Cost-Effective Marketing</h2>
<p>Compared to traditional advertising methods like newspaper ads, billboards, or TV commercials, a website is incredibly cost-effective. A one-time investment in a professional website gives you a platform that you fully own and control. Unlike social media profiles (which can be suspended or algorithm-throttled), your website is <strong>your digital property</strong>.</p>
<p>When combined with SEO (Search Engine Optimization), your website can attract thousands of visitors organically — without paying for each click. This makes it one of the highest-ROI marketing investments you can make.</p>

<h2>5. Compete with Bigger Players</h2>
<p>A professional website levels the playing field. A small bakery in Ranchi can have a website that looks just as professional as a chain with hundreds of locations. With the right design and SEO strategy, small businesses can <strong>outrank larger competitors</strong> in local search results.</p>
<blockquote>In the digital world, the quality of your website matters more than the size of your company.</blockquote>

<h2>6. Data-Driven Decision Making</h2>
<p>With tools like Google Analytics, your website becomes a goldmine of insights. You can track:</p>
<ul>
<li>How many people visit your site daily</li>
<li>Which pages are most popular</li>
<li>Where your visitors come from (Google, social media, referrals)</li>
<li>What devices they use</li>
<li>How long they stay on each page</li>
</ul>
<p>This data helps you make <strong>informed business decisions</strong> and optimize your marketing strategy for maximum results.</p>

<h2>7. Customer Convenience</h2>
<p>Modern customers expect convenience. They want to find information quickly, compare options easily, and take action immediately. A website with clear navigation, comprehensive service descriptions, transparent pricing, and easy contact options delivers exactly what today's consumers demand.</p>

<h2>The Bottom Line</h2>
<p>In 2026, a website isn't optional — it's <strong>essential</strong>. Whether you're a freelancer, a local shop, a startup, or an established business, your website is the foundation of your digital presence. It builds credibility, attracts customers, and drives revenue around the clock.</p>
<p>The question isn't whether you can afford to have a website. The question is: <strong>can you afford not to?</strong></p>`
},

// ─── 2 ───
{
  title: 'How Much Does a Website Cost in India? Complete 2026 Guide',
  slug: 'how-much-does-a-website-cost-in-india',
  category: 'Business Tips',
  tags: ['website cost', 'web development pricing', 'India', 'budget website'],
  metaTitle: 'How Much Does a Website Cost in India in 2026?',
  metaDescription: 'Complete breakdown of website development costs in India — from basic sites at ₹5,000 to custom web apps at ₹1,00,000+. Know what you should pay.',
  excerpt: 'Planning to build a website? Here\'s a transparent, no-BS breakdown of how much websites actually cost in India in 2026 — from simple landing pages to complex web applications.',
  featured: true,
  publishDate: getDate(1),
  content: `<h2>Website Pricing: The Honest Truth</h2>
<p>One of the most common questions we get at WebXCrafting is: <strong>"How much will my website cost?"</strong> The answer depends on several factors, but we believe in complete transparency. This guide breaks down real costs so you can budget effectively.</p>

<h2>Factors That Affect Website Cost</h2>
<p>Before diving into numbers, understand that website pricing depends on:</p>
<ul>
<li><strong>Type of website</strong> — landing page, business site, e-commerce, portal</li>
<li><strong>Number of pages</strong> — 5-page vs 50-page site</li>
<li><strong>Design complexity</strong> — template-based vs fully custom</li>
<li><strong>Features required</strong> — contact forms, payment gateway, dashboards</li>
<li><strong>Technology stack</strong> — WordPress, React, Next.js, etc.</li>
<li><strong>Content creation</strong> — copywriting, photography, videos</li>
<li><strong>Ongoing maintenance</strong> — updates, hosting, SSL</li>
</ul>

<h2>Cost Breakdown by Website Type</h2>

<h3>1. Basic Landing Page (₹3,000 – ₹8,000)</h3>
<p>A single-page website designed to promote one product, service, or event. Perfect for freelancers, small campaigns, or product launches.</p>
<ul>
<li>1 page with sections (hero, about, features, contact)</li>
<li>Mobile responsive design</li>
<li>Basic SEO setup</li>
<li>Contact form</li>
<li>Delivery: 3–5 days</li>
</ul>

<h3>2. Business Website (₹8,000 – ₹20,000)</h3>
<p>A multi-page website for established businesses that need to showcase services, build credibility, and generate leads.</p>
<ul>
<li>5–10 pages (Home, About, Services, Portfolio, Contact)</li>
<li>Professional custom design</li>
<li>SEO optimization</li>
<li>Google Maps integration</li>
<li>WhatsApp and call-to-action buttons</li>
<li>Delivery: 1–2 weeks</li>
</ul>

<h3>3. E-Commerce Website (₹25,000 – ₹60,000)</h3>
<p>A full online store with product listings, shopping cart, and payment processing.</p>
<ul>
<li>Product catalog with categories and filters</li>
<li>Shopping cart and checkout flow</li>
<li>Razorpay/PhonePe payment integration</li>
<li>Order management dashboard</li>
<li>Inventory tracking</li>
<li>Customer accounts</li>
<li>Delivery: 3–5 weeks</li>
</ul>

<h3>4. Job Portal / Web Application (₹45,000 – ₹1,00,000+)</h3>
<p>Complex platforms with multiple user roles, dashboards, and advanced functionality.</p>
<ul>
<li>Multi-role authentication (admin, employer, candidate)</li>
<li>Advanced search and filtering</li>
<li>Dashboard analytics</li>
<li>Email notifications</li>
<li>API integrations</li>
<li>Delivery: 4–8 weeks</li>
</ul>

<h2>Hidden Costs to Watch Out For</h2>
<p>Many developers quote a low price initially but add charges later. Be aware of:</p>
<ul>
<li><strong>Domain registration:</strong> ₹500–₹1,200/year</li>
<li><strong>Hosting:</strong> ₹2,000–₹10,000/year depending on traffic</li>
<li><strong>SSL Certificate:</strong> Often free with good hosting</li>
<li><strong>Maintenance:</strong> ₹500–₹3,000/month for updates</li>
<li><strong>Content writing:</strong> ₹1–₹5 per word for professional copy</li>
</ul>

<h2>Why Cheap Isn't Always Better</h2>
<p>You might find developers offering websites for ₹2,000 on freelancing platforms. Here's why that's risky:</p>
<ul>
<li>Often use pirated themes and plugins</li>
<li>No original design — cookie-cutter templates</li>
<li>Poor SEO that won't rank on Google</li>
<li>No post-launch support</li>
<li>Slow, unoptimized code</li>
</ul>
<blockquote>Your website is your digital storefront. Would you rent the cheapest shop in a back alley to save money?</blockquote>

<h2>How WebXCrafting Keeps Costs Fair</h2>
<p>At WebXCrafting, we use modern technologies like <strong>Next.js and React</strong> that deliver fast, SEO-friendly websites. Our pricing is transparent with no hidden charges, and every project includes responsive design, SEO basics, and post-launch support.</p>

<h2>Conclusion</h2>
<p>The right website is an <strong>investment, not an expense</strong>. A ₹15,000 website that generates 10 leads per month is infinitely more valuable than a ₹2,000 website that generates zero. Focus on value and ROI, not just the price tag.</p>`
},

// ─── 3 ───
{
  title: '10 Must-Have Features for Every E-Commerce Website',
  slug: '10-must-have-features-for-ecommerce-website',
  category: 'E-Commerce',
  tags: ['e-commerce', 'online store', 'shopping website', 'Razorpay', 'features'],
  metaTitle: '10 Must-Have Features for Every E-Commerce Website',
  metaDescription: 'Planning an online store? These 10 essential e-commerce features will maximize sales, improve UX, and keep customers coming back.',
  excerpt: 'Building an online store? Don\'t launch without these 10 critical features that separate successful e-commerce websites from the ones that fail.',
  publishDate: getDate(2),
  content: `<h2>What Makes an E-Commerce Website Successful?</h2>
<p>India's e-commerce market is projected to reach <strong>$200 billion by 2027</strong>. With more consumers shopping online than ever, having a feature-rich e-commerce website isn't optional — it's your ticket to capturing this massive market. But simply listing products online isn't enough. You need the right features to convert browsers into buyers.</p>

<h2>1. Mobile-Responsive Design</h2>
<p>Over <strong>75% of online shoppers in India</strong> use mobile devices. If your store doesn't look and work perfectly on smartphones, you're losing three-quarters of your potential customers.</p>
<p>Mobile responsiveness isn't just about fitting content to a smaller screen — it's about optimizing the entire shopping experience: large tap targets, easy-to-read text, streamlined checkout, and fast load times on mobile data.</p>

<h2>2. Fast Loading Speed</h2>
<p>Amazon found that every <strong>100ms of latency</strong> costs them 1% in sales. For smaller stores, the impact is even greater. Your e-commerce site must load in under 3 seconds. This means:</p>
<ul>
<li>Optimized and compressed product images</li>
<li>Efficient code with minimal JavaScript bundles</li>
<li>CDN (Content Delivery Network) for faster asset delivery</li>
<li>Server-side rendering for instant page loads</li>
</ul>

<h2>3. Secure Payment Gateway</h2>
<p>Indian consumers need to trust your payment process. Integrate reliable gateways like <strong>Razorpay, PayU, or Cashfree</strong> that support UPI, credit/debit cards, net banking, and wallets. Display security badges prominently and ensure your site has an SSL certificate.</p>

<h2>4. Advanced Search and Filtering</h2>
<p>If customers can't find what they want in seconds, they'll leave. Essential search features include:</p>
<ul>
<li>Auto-suggestions as users type</li>
<li>Filter by price range, category, size, color, and brand</li>
<li>Sort by popularity, price, newest, and ratings</li>
<li>Search results that handle typos and synonyms</li>
</ul>

<h2>5. High-Quality Product Pages</h2>
<p>Your product pages are where buying decisions happen. Each page should include:</p>
<ul>
<li><strong>Multiple high-resolution images</strong> with zoom capability</li>
<li><strong>Detailed descriptions</strong> with key specifications</li>
<li><strong>Customer reviews and ratings</strong></li>
<li><strong>Stock availability</strong> indicator</li>
<li><strong>Related products</strong> section for cross-selling</li>
<li><strong>Clear pricing</strong> with any discounts highlighted</li>
</ul>

<h2>6. Streamlined Checkout Process</h2>
<p><strong>Cart abandonment rates average 70%</strong> globally. The number one reason? A complicated checkout process. Reduce friction by offering guest checkout, minimal form fields, multiple payment options, and order summary visibility throughout the process.</p>

<h2>7. Inventory Management Dashboard</h2>
<p>Behind the scenes, you need tools to manage your business efficiently: real-time stock tracking, low-stock alerts, bulk product upload capability, order processing workflows, and sales analytics.</p>

<h2>8. Customer Accounts and Order Tracking</h2>
<p>Let customers create accounts to save addresses, view order history, track shipments, and manage wishlists. Returning customers spend <strong>67% more</strong> than new ones, so make repeat purchases effortless.</p>

<h2>9. SEO-Optimized Structure</h2>
<p>Your store needs to be discoverable on Google. This means clean URL structures, unique meta titles and descriptions for every product, structured data markup, fast page loads, and a sitemap that auto-updates when you add products.</p>

<h2>10. WhatsApp and Live Chat Integration</h2>
<p>In India, <strong>WhatsApp is the preferred communication channel</strong>. Adding a WhatsApp button for instant queries, order updates, and customer support dramatically improves conversion rates and customer satisfaction.</p>

<h2>Bonus: Analytics and Reporting</h2>
<p>Track what's working and what isn't with built-in analytics: best-selling products, traffic sources, conversion rates, average order values, and customer behavior patterns.</p>

<h2>Ready to Build Your Online Store?</h2>
<p>At WebXCrafting, we build e-commerce websites with all these features and more — using modern technologies that ensure speed, security, and scalability. <strong>Get a free consultation</strong> to discuss your online store project.</p>`
},

// ─── 4 ───
{
  title: 'Next.js vs WordPress: Which is Better for Your Business?',
  slug: 'nextjs-vs-wordpress-which-is-better',
  category: 'Technology',
  tags: ['Next.js', 'WordPress', 'web development', 'comparison', 'CMS'],
  metaTitle: 'Next.js vs WordPress: Which is Better for Business?',
  metaDescription: 'Honest comparison of Next.js and WordPress for business websites. Learn which technology is right for your project based on speed, SEO, and cost.',
  excerpt: 'Confused between Next.js and WordPress? This honest, side-by-side comparison helps you pick the right technology for your business website.',
  publishDate: getDate(3),
  content: `<h2>The Great Web Development Debate</h2>
<p>When it comes to building a website, two approaches dominate the conversation: <strong>WordPress</strong> (the world's most popular CMS, powering 43% of all websites) and <strong>Next.js</strong> (a modern React framework favored by companies like Netflix, Nike, and Uber). But which one is right for YOUR business?</p>

<h2>WordPress: The Familiar Giant</h2>
<h3>Pros</h3>
<ul>
<li><strong>Huge plugin ecosystem</strong> — 60,000+ plugins for every feature imaginable</li>
<li><strong>No coding required</strong> — visual page builders like Elementor make it easy</li>
<li><strong>Large community</strong> — millions of tutorials and support resources</li>
<li><strong>Lower initial cost</strong> — many free themes and plugins available</li>
<li><strong>Built-in CMS</strong> — easy content management for non-technical users</li>
</ul>
<h3>Cons</h3>
<ul>
<li><strong>Slow performance</strong> — plugin bloat makes sites heavy and slow</li>
<li><strong>Security vulnerabilities</strong> — most hacked platform on the internet</li>
<li><strong>Regular maintenance needed</strong> — constant plugin and core updates</li>
<li><strong>Limited customization</strong> — you're confined to what themes and plugins allow</li>
<li><strong>Poor Core Web Vitals</strong> — struggles with Google's page experience metrics</li>
</ul>

<h2>Next.js: The Modern Powerhouse</h2>
<h3>Pros</h3>
<ul>
<li><strong>Blazing fast</strong> — server-side rendering and static generation for instant loads</li>
<li><strong>Perfect SEO</strong> — built-in support for meta tags, sitemaps, and structured data</li>
<li><strong>Rock-solid security</strong> — no plugins to exploit, no database exposed</li>
<li><strong>Unlimited customization</strong> — build exactly what you need</li>
<li><strong>Excellent Core Web Vitals</strong> — Google loves fast, well-built Next.js sites</li>
<li><strong>Scales infinitely</strong> — handles millions of visitors without breaking</li>
</ul>
<h3>Cons</h3>
<ul>
<li><strong>Requires a developer</strong> — not a DIY solution</li>
<li><strong>Higher initial cost</strong> — custom development takes more time</li>
<li><strong>Smaller ecosystem</strong> — no drag-and-drop page builders</li>
</ul>

<h2>Head-to-Head Comparison</h2>
<table>
<tr><th>Factor</th><th>WordPress</th><th>Next.js</th></tr>
<tr><td>Page Load Speed</td><td>2–6 seconds</td><td>Under 1 second</td></tr>
<tr><td>SEO Performance</td><td>Good (with plugins)</td><td>Excellent (built-in)</td></tr>
<tr><td>Security</td><td>Vulnerable</td><td>Very Secure</td></tr>
<tr><td>Customization</td><td>Limited by themes</td><td>Unlimited</td></tr>
<tr><td>Maintenance</td><td>Weekly updates needed</td><td>Minimal</td></tr>
<tr><td>Hosting Cost</td><td>₹3,000–₹15,000/yr</td><td>Free–₹5,000/yr (Vercel)</td></tr>
<tr><td>Mobile Performance</td><td>Average</td><td>Excellent</td></tr>
<tr><td>Content Management</td><td>Built-in dashboard</td><td>Custom admin panel</td></tr>
</table>

<h2>When to Choose WordPress</h2>
<p>WordPress makes sense when you need a simple blog or content site, have a very tight budget, want to manage content yourself without any technical knowledge, or need a quick solution within 2–3 days.</p>

<h2>When to Choose Next.js</h2>
<p>Next.js is the superior choice when performance and SEO are critical, you're building an e-commerce store or web application, you want a unique custom design, security is a priority, or you need the site to scale as your business grows.</p>

<h2>Our Recommendation</h2>
<p>At WebXCrafting, we specialize in <strong>Next.js development</strong> because we believe our clients deserve websites that are fast, secure, and SEO-optimized out of the box. The slightly higher initial investment pays for itself through better Google rankings, higher conversion rates, and zero maintenance headaches.</p>
<p>That said, every project is unique. <strong>Contact us for a free consultation</strong> and we'll recommend the best technology for your specific needs and budget.</p>`
},

// ─── 5 ───
{
  title: 'How SEO-Friendly Websites Boost Your Revenue',
  slug: 'how-seo-friendly-websites-boost-revenue',
  category: 'SEO',
  tags: ['SEO', 'search engine optimization', 'Google ranking', 'organic traffic', 'revenue'],
  metaTitle: 'How SEO-Friendly Websites Boost Your Revenue',
  metaDescription: 'Learn how SEO-optimized websites drive free organic traffic, build trust, and directly increase your business revenue in 2026.',
  excerpt: 'SEO isn\'t just about ranking on Google — it\'s about driving qualified traffic that converts into paying customers. Here\'s how an SEO-friendly website directly impacts your bottom line.',
  publishDate: getDate(4),
  content: `<h2>What Is an SEO-Friendly Website?</h2>
<p>An SEO-friendly website is built from the ground up to be easily discovered, crawled, and indexed by search engines like Google. It goes beyond just adding keywords — it encompasses <strong>technical performance, content quality, user experience, and site structure</strong>. When done right, SEO turns your website into a 24/7 lead generation machine.</p>

<h2>The Revenue Impact of SEO</h2>
<p>Consider these statistics:</p>
<ul>
<li><strong>53% of all website traffic</strong> comes from organic search</li>
<li>SEO leads have a <strong>14.6% close rate</strong>, compared to 1.7% for outbound leads</li>
<li>The first result on Google gets <strong>31.7% of all clicks</strong></li>
<li>Businesses that blog get <strong>55% more website visitors</strong></li>
</ul>
<p>In other words, ranking on Google's first page for relevant keywords can be the difference between a struggling business and a thriving one.</p>

<h2>Key Elements of an SEO-Friendly Website</h2>

<h3>1. Fast Loading Speed</h3>
<p>Google has confirmed that page speed is a ranking factor. Every second of delay reduces conversions by <strong>7%</strong>. An SEO-friendly website loads in under 2 seconds through optimized images, efficient code, caching, and server-side rendering.</p>

<h3>2. Mobile-First Design</h3>
<p>Google uses <strong>mobile-first indexing</strong>, meaning it primarily uses the mobile version of your site for ranking. If your site isn't mobile-optimized, you're fighting a losing battle for rankings regardless of how good your desktop version looks.</p>

<h3>3. Clean URL Structure</h3>
<p>Compare these two URLs:</p>
<ul>
<li>Bad: <code>example.com/page?id=123&cat=45</code></li>
<li>Good: <code>example.com/services/web-development</code></li>
</ul>
<p>Clean, descriptive URLs help both search engines and users understand what each page is about.</p>

<h3>4. Proper Heading Hierarchy</h3>
<p>Using a logical heading structure (H1, H2, H3) helps Google understand the content hierarchy of your pages. Every page should have exactly one H1 tag containing the primary keyword.</p>

<h3>5. Meta Tags and Structured Data</h3>
<p>Unique title tags and meta descriptions for every page tell Google what your content is about and entice users to click. <strong>Structured data (Schema markup)</strong> can earn you rich snippets in search results — star ratings, FAQs, prices — that dramatically increase click-through rates.</p>

<h3>6. Quality Content</h3>
<p>Content is still king in SEO. Google rewards websites that provide <strong>genuinely useful, original content</strong> that answers user questions comprehensively. This is why maintaining a blog with helpful articles is one of the most effective SEO strategies.</p>

<h3>7. Internal Linking</h3>
<p>Strategic internal links help search engines discover all your pages and understand their relative importance. They also keep visitors on your site longer, reducing bounce rates and increasing engagement.</p>

<h2>SEO vs Paid Ads: The Long Game</h2>
<p>While Google Ads deliver instant visibility, the moment you stop paying, the traffic stops. SEO is different — once you rank, you continue receiving <strong>free organic traffic</strong> month after month. Think of SEO as a long-term investment that compounds over time, while paid ads are a recurring expense.</p>

<h2>Real Results You Can Expect</h2>
<p>A properly SEO-optimized business website targeting local keywords can realistically achieve:</p>
<ul>
<li><strong>Month 1–3:</strong> Technical foundation, content creation, initial indexing</li>
<li><strong>Month 3–6:</strong> Rankings start improving, organic traffic grows steadily</li>
<li><strong>Month 6–12:</strong> First page rankings for target keywords, significant traffic increase</li>
<li><strong>Month 12+:</strong> Established authority, compounding returns, dominant local presence</li>
</ul>

<h2>How WebXCrafting Builds SEO Into Every Site</h2>
<p>Every website we build includes technical SEO foundations: optimized meta tags, clean URLs, fast performance, mobile responsiveness, structured data, XML sitemaps, and robots.txt configuration. We don't treat SEO as an add-on — it's <strong>built into the DNA</strong> of every project.</p>
<p>Ready to turn your website into a revenue-generating machine? <strong>Contact us for a free SEO consultation</strong>.</p>`
},
]

// Will be extended with articles 6-20 below
module.exports = { blogs, Blog, getDate }
