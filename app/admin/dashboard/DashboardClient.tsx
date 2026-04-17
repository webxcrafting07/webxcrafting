'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

/* ── helpers ── */
function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : ''
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

const catColors: Record<string, string> = { Business: '#4f6fff', 'E-commerce': '#a259ff', Custom: '#00e5ff', 'Job Portal': '#00e676' }

/* ── stat card ── */
function StatCard({ icon, value, label, color }: any) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass" style={{ padding: 24, borderRadius: 16 }}>
      <div style={{ fontSize: 30, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: 'Syne', fontSize: 38, fontWeight: 800, color }}>{value}</div>
      <div style={{ color: '#7b82a8', fontSize: 13, marginTop: 4 }}>{label}</div>
    </motion.div>
  )
}

/* ── sidebar ── */
const sidebarTabs = [
  { key: 'overview', label: 'Overview', icon: '📊' },
  { key: 'projects', label: 'Projects', icon: '🗂' },
  { key: 'leads', label: 'Leads', icon: '📬' },
  { key: 'services', label: 'Services', icon: '⚙️' },
  { key: 'invoices', label: 'Invoices', icon: '🧾' },
]

/* ─────────────────────────── MAIN ─────────────────────────── */
export default function DashboardClient() {
  const router = useRouter()
  const [tab, setTab] = useState('overview')
  const [projects, setProjects] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [bills, setBills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ type: string; mode: string; item?: any } | null>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  /* ── auth check ── */
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { router.push('/admin/login'); return }
    fetchAll()
  }, [])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [p, l, s, b] = await Promise.all([
        fetch('/api/projects', { headers: authHeaders() }).then((r) => r.json()),
        fetch('/api/leads', { headers: authHeaders() }).then((r) => r.json()),
        fetch('/api/services', { headers: authHeaders() }).then((r) => r.json()),
        fetch('/api/bills', { headers: authHeaders() }).then((r) => r.json()),
      ])
      if (p.success) setProjects(p.data)
      if (l.success) setLeads(l.data)
      if (s.success) setServices(s.data)
      if (b.success) setBills(b.data)
    } catch { toast.error('Failed to load data') }
    finally { setLoading(false) }
  }, [])

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    localStorage.removeItem('admin_token')
    router.push('/')
  }

  /* ── modal helpers ── */
  const openAdd = (type: string) => { 
    setModal({ type, mode: 'add' }); 
    if (type === 'bill') {
      setForm({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        discountPercent: 0,
        status: 'draft',
        notes: '',
        generatedBy: '',
        utrNumber: ''
      });
    } else {
      setForm({});
    }
  }

  const openEdit = (type: string, item: any) => { setModal({ type, mode: 'edit', item }); setForm({ ...item }) }
  const closeModal = () => { setModal(null); setForm({}) }
  const setF = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const updateBillItem = (idx: number, field: string, value: any) => {
    if (!form.items) return;
    const newItems = [...form.items];
    // Allow empty string for better input handling, otherwise convert to number if numeric field
    let finalVal = value;
    if ((field === 'quantity' || field === 'price') && value !== '') {
      finalVal = Number(value);
    }
    newItems[idx] = { ...newItems[idx], [field]: finalVal };
    setF('items', newItems);
  }

  /* ── CRUD: Projects ── */
  const saveProject = async () => {
    if (!form.title || !form.category) { toast.error('Title and category required'); return }
    setSaving(true)
    try {
      const url = modal?.mode === 'add' ? '/api/projects' : `/api/projects/${modal?.item?._id}`
      const method = modal?.mode === 'add' ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) {
        toast.success(modal?.mode === 'add' ? 'Project added!' : 'Project updated!')
        fetchAll(); closeModal()
      } else { toast.error(data.message) }
    } catch { toast.error('Error saving project') }
    finally { setSaving(false) }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: authHeaders() })
    const data = await res.json()
    if (data.success) { toast.success('Project deleted'); fetchAll() }
    else toast.error(data.message)
  }

  const updateProjectStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }) })
    const data = await res.json()
    if (data.success) { fetchAll() } else toast.error(data.message)
  }

  /* ── CRUD: Leads ── */
  const updateLeadStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/leads/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }) })
    const data = await res.json()
    if (data.success) fetchAll(); else toast.error(data.message)
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Remove this lead?')) return
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: authHeaders() })
    const data = await res.json()
    if (data.success) { toast.success('Lead removed'); fetchAll() }
    else toast.error(data.message)
  }

  /* ── CRUD: Services ── */
  const saveService = async () => {
    if (!form.title || !form.price) { toast.error('Title and price required'); return }
    setSaving(true)
    try {
      const url = modal?.mode === 'add' ? '/api/services' : `/api/services/${modal?.item?._id}`
      const method = modal?.mode === 'add' ? 'POST' : 'PUT'
      const body = { 
        ...form, 
        price: Number(form.price), 
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        features: typeof form.features === 'string' ? form.features.split('\n').filter(Boolean) : form.features 
      }
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (data.success) {
        toast.success(modal?.mode === 'add' ? 'Service added!' : 'Service updated!')
        fetchAll(); closeModal()
      } else toast.error(data.message)
    } catch { toast.error('Error saving service') }
    finally { setSaving(false) }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE', headers: authHeaders() })
    const data = await res.json()
    if (data.success) { toast.success('Service deleted'); fetchAll() }
    else toast.error(data.message)
  }

  /* ── CRUD: Bills ── */
  const saveBill = async () => {
    if (!form.clientName || !form.clientEmail || !form.items?.length) {
      toast.error('Client info and items are required'); return
    }
    setSaving(true)
    try {
      const url = modal?.mode === 'add' ? '/api/bills' : `/api/bills/${modal?.item?._id}`
      const method = modal?.mode === 'add' ? 'POST' : 'PUT'
      
      console.log('DEBUG: Saving Bill with form data:', form);
      const subtotal = form.items.reduce((acc: number, item: any) => acc + (Number(item.price || 0) * Number(item.quantity || 0)), 0)
      const discountAmount = (subtotal * (form.discountPercent || 0)) / 100
      const totalAmount = subtotal - discountAmount

      const body = { 
        ...form, 
        subtotal, 
        discountAmount, 
        totalAmount,
        generatedBy: form.generatedBy || '', // Explicitly ensure it's mapped
        utrNumber: form.utrNumber || '',
        items: form.items.map((it: any) => ({
          ...it,
          price: Number(it.price || 0),
          quantity: Number(it.quantity || 0)
        }))
      }
      console.log('DEBUG: Constructed request body:', body);
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) })
      const data = await res.json()
      if (data.success) {
        toast.success(modal?.mode === 'add' ? 'Bill created!' : 'Bill updated!')
        fetchAll(); closeModal()
      } else toast.error(data.message)
    } catch { toast.error('Error saving bill') }
    finally { setSaving(false) }
  }

  const deleteBill = async (id: string) => {
    if (!confirm('Delete this bill?')) return
    const res = await fetch(`/api/bills/${id}`, { method: 'DELETE', headers: authHeaders() })
    const data = await res.json()
    if (data.success) { toast.success('Bill deleted'); fetchAll() }
    else toast.error(data.message)
  }

  const updateBillStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bills/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }) })
    const data = await res.json()
    if (data.success) fetchAll(); else toast.error(data.message)
  }

  const sendBillEmail = async (id: string) => {
    const loadId = toast.loading('Sending invoice...')
    try {
      const res = await fetch(`/api/bills/${id}/send`, { method: 'POST', headers: authHeaders() })
      const data = await res.json()
      if (data.success) {
        toast.success('Invoice sent to email!', { id: loadId })
        fetchAll()
      } else {
        toast.error(data.message, { id: loadId })
      }
    } catch { toast.error('Error sending email', { id: loadId }) }
  }

  /* ── PDF Generation ── */
  const generatePDF = (bill: any) => {
    console.log('DEBUG: Generating PDF for bill:', bill);
    const doc = new jsPDF()
    const charcoal: [number, number, number] = [17, 24, 39] // Deep Charcoal
    const electricBlue: [number, number, number] = [79, 111, 255] // Accent Blue
    const softGray: [number, number, number] = [243, 244, 246]
    
    // Background Accent (Subtle Electric Blue Bar)
    doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2])
    doc.rect(0, 0, 8, 297, 'F')
    
    // Header Block
    doc.setFillColor(charcoal[0], charcoal[1], charcoal[2])
    doc.rect(8, 0, 202, 50, 'F')
    
    // Brand Name
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(28)
    doc.text('WebXCrafting', 20, 25)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(162, 89, 255) // Purple accent
    doc.text('PREMIUM DIGITAL SOLUTIONS', 20, 33)
    
    // Invoice Label (Right side of header)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(32)
    doc.text('INVOICE', 145, 32)
    
    // Horizontal Line after header
    doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2])
    doc.setLineWidth(0.5)
    doc.line(20, 50, 195, 50)
    
    // --- INFO SECTION (2-Column) ---
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    
    // LEFT: Company Info
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('FROM:', 20, 65)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text('WebXCrafting', 20, 72)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99) // Muted text
    doc.text('webxcrafting@gmail.com', 20, 78)
    doc.text('+91 9102615343 | +91 7974579107', 20, 84)
    doc.text('www.webxcrafting.in', 20, 90)
    
    // RIGHT: Invoice Metadata
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    doc.setFont('helvetica', 'bold')
    doc.text('DETAILS:', 130, 65)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99)
    doc.text(`Invoice Number:`, 130, 72)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    doc.text(`#${bill.invoiceNumber}`, 165, 72)
    
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(75, 85, 99)
    doc.text(`Date:`, 130, 78)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    doc.text(`${new Date(bill.createdAt).toLocaleDateString('en-IN')}`, 165, 78)
    
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(75, 85, 99)
    doc.text(`Status / UTR:`, 130, 84)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(electricBlue[0], electricBlue[1], electricBlue[2])
    const statusText = bill.utrNumber ? `${bill.status.toUpperCase()} (${bill.utrNumber})` : bill.status.toUpperCase()
    doc.text(statusText, 165, 84)
    
    // --- CLIENT SECTION ---
    doc.setFillColor(softGray[0], softGray[1], softGray[2])
    doc.rect(20, 100, 175, 25, 'F')
    
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('BILL TO:', 25, 108)
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text(bill.clientName, 25, 117)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99)
    doc.text(`${bill.clientEmail}  |  ${bill.clientPhone}`, 85, 117)
    
    // --- TABLE SECTION ---
    const tableData = bill.items.map((item: any) => [
      item.description,
      item.quantity,
      `INR ${item.price.toLocaleString('en-IN')}`,
      `INR ${(item.price * item.quantity).toLocaleString('en-IN')}`
    ])
    
    autoTable(doc, {
      startY: 135,
      margin: { left: 20, right: 15 },
      head: [['DESCRIPTION', 'QTY', 'UNIT PRICE', 'TOTAL']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: charcoal, 
        textColor: [255, 255, 255], 
        fontSize: 10, 
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 4
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right', fontStyle: 'bold' }
      },
      styles: { 
        fontSize: 10, 
        font: 'helvetica', 
        cellPadding: 4,
        lineColor: [229, 231, 235], // Light border
        lineWidth: 0.1
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      }
    })
    
    // --- FINANCIALS ---
    const finalY = (doc as any).lastAutoTable.finalY + 15
    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99)
    
    doc.text(`Subtotal :`, 130, finalY)
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    doc.text(`INR ${(bill.subtotal || 0).toLocaleString('en-IN')}`, 195, finalY, { align: 'right' })
    
    doc.setTextColor(75, 85, 99)
    doc.text(`Discount (${bill.discountPercent || 0}%) :`, 130, finalY + 8)
    doc.setTextColor(255, 0, 0) // Red for discount
    doc.text(`- INR ${(bill.discountAmount || 0).toLocaleString('en-IN')}`, 195, finalY + 8, { align: 'right' })
    
    // Grand Total Box
    doc.setFillColor(electricBlue[0], electricBlue[1], electricBlue[2])
    doc.rect(125, finalY + 15, 75, 15, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(`GRAND TOTAL`, 130, finalY + 25)
    doc.setFontSize(14)
    doc.text(`INR ${(bill.totalAmount || 0).toLocaleString('en-IN')}`, 195, finalY + 25, { align: 'right' })
    
    // --- FOOTER & SIGNATURE ---
    const currentY = (doc as any).lastAutoTable.finalY + 30
    const footerY = currentY > 230 ? currentY : 240 // Dynamic positioning if content is long
    
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Notes & Terms:', 20, footerY)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(75, 85, 99)
    doc.text(bill.notes || '1. Please pay within 7 days. \n2. Bank details will be shared on WhatsApp for payment. \n3. Thank you for your business!', 20, footerY + 6, { maxWidth: 100 })
    
    // Signature Area
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2])
    const signName = bill.generatedBy || 'Authorized Signature'
    doc.text(signName.toUpperCase(), 167, footerY + 12, { align: 'center' }) // Name above line

    // Signature Line
    doc.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2])
    doc.setLineWidth(0.5)
    doc.line(140, footerY + 15, 195, footerY + 15)
    
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('(Authorized Signatory)', 167, footerY + 20, { align: 'center' })
    
    // Bottom Accent Bar (Sticky-ish at the bottom of the current page)
    doc.setFillColor(charcoal[0], charcoal[1], charcoal[2])
    doc.rect(8, 285, 202, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.text('Questions? Contact us on WhatsApp: +91 9102615343 | +91 7974579107   •   www.webxcrafting.in', 35, 292)
    
    doc.save(`${bill.invoiceNumber}.pdf`)
  }

  const shareWhatsApp = (bill: any) => {
    const text = `Hello ${bill.clientName}, your invoice ${bill.invoiceNumber} for INR ${bill.totalAmount.toLocaleString('en-IN')} has been generated. View it here: ${window.location.origin}/bills/${bill._id}`
    window.open(`https://wa.me/${bill.clientPhone.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`, '_blank')
  }

  /* ── computed stats ── */
  const completed = projects.filter((p) => p.status === 'completed').length
  const ongoing = projects.filter((p) => p.status === 'ongoing').length
  const newLeads = leads.filter((l) => l.status === 'new').length

  /* ── input style ── */
  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', background: 'rgba(10,14,28,0.8)', border: '1px solid rgba(99,120,255,.2)', borderRadius: 10, color: '#e8eaf6', fontFamily: 'DM Sans', fontSize: 14, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12, color: '#7b82a8', marginBottom: 6, fontWeight: 500 }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#03050a', maxWidth: '100vw', overflowX: 'hidden' }}>

      {/* ── Sidebar Overlay (Mobile) ── */}
      {isSidebarOpen && (
        <div className="sidebar-overlay hide-desktop" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* ── Sidebar ── */}
      <div className={`glass-strong sidebar-mobile ${isSidebarOpen ? 'open' : ''}`} style={{ width: 230, minHeight: '100vh', padding: '24px 14px', borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 32, padding: '0 6px' }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 800, fontSize: 17, color: '#fff' }}>X</div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: '#e8eaf6' }}>WebXCrafting</span>
        </Link>

        <div style={{ fontSize: 11, color: '#7b82a8', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', padding: '0 10px', marginBottom: 10 }}>Menu</div>
        {sidebarTabs.map((t) => (
          <button key={t.key} onClick={() => { setTab(t.key); setIsSidebarOpen(false) }} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 14px', borderRadius: 10, marginBottom: 4, cursor: 'pointer',
            background: tab === t.key ? 'linear-gradient(135deg,rgba(79,111,255,.2),rgba(162,89,255,.15))' : 'transparent',
            border: tab === t.key ? '1px solid rgba(79,111,255,.3)' : '1px solid transparent',
            color: tab === t.key ? '#e8eaf6' : '#7b82a8', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14, textAlign: 'left', transition: 'all .2s',
          }}>
            <span>{t.icon}</span>{t.label}
            {t.key === 'leads' && newLeads > 0 && (
              <span style={{ marginLeft: 'auto', background: '#ff5252', borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700, color: '#fff' }}>{newLeads}</span>
            )}
          </button>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(99,120,255,.1)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', color: '#7b82a8', textDecoration: 'none', fontSize: 14, marginBottom: 4, borderRadius: 10, transition: 'all .2s' }}
            onMouseEnter={(e: any) => { e.currentTarget.style.color = '#e8eaf6'; e.currentTarget.style.background = 'rgba(99,120,255,.08)' }}
            onMouseLeave={(e: any) => { e.currentTarget.style.color = '#7b82a8'; e.currentTarget.style.background = 'transparent' }}
          >🌐 View Site</Link>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', borderRadius: 10, background: 'none', border: 'none', color: '#ff5252', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 14, transition: 'all .2s' }}
            onMouseEnter={(e: any) => e.currentTarget.style.background = 'rgba(255,82,82,.08)'}
            onMouseLeave={(e: any) => e.currentTarget.style.background = 'transparent'}
          >🚪 Logout</button>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="mobile-p-4" style={{ flex: 1, padding: '36px 40px', maxWidth: '100%', overflowX: 'hidden' }}>
        {/* Mobile Header (Hamburger) */}
        <div className="show-mobile" style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, width: '100%' }}>
          <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#e8eaf6', cursor: 'pointer', padding: 4 }}>
            <span style={{ fontSize: 28 }}>☰</span>
          </button>
          <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18, color: '#e8eaf6' }}>Admin Dashboard</div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, gap: 16, color: '#7b82a8' }}>
            <div className="spinner" />Loading dashboard…
          </div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {tab === 'overview' && (
              <div>
                <div style={{ marginBottom: 32 }}>
                  <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 30, marginBottom: 6 }}>Dashboard Overview</h1>
                  <p style={{ color: '#7b82a8', fontSize: 14 }}>Welcome back, Admin 👋</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 18, marginBottom: 36 }}>
                  <StatCard icon="🗂" value={projects.length} label="Total Projects" color="#4f6fff" />
                  <StatCard icon="✅" value={completed} label="Completed" color="#00e676" />
                  <StatCard icon="⏳" value={ongoing} label="Ongoing" color="#ffb74d" />
                  <StatCard icon="📬" value={leads.length} label="Total Leads" color="#a259ff" />
                  <StatCard icon="🔥" value={newLeads} label="New Leads" color="#ff5252" />
                  <StatCard icon="⚙️" value={services.length} label="Services" color="#00e5ff" />
                  <StatCard icon="🧾" value={bills.length} label="Bills/Invoices" color="#ff00e5" />
                </div>
                
                <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  {/* Recent Leads */}
                  <div className="glass" style={{ padding: 24, borderRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>Recent Leads</h3>
                      <button onClick={() => setTab('leads')} style={{ color: '#4f6fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans' }}>View all →</button>
                    </div>
                    {leads.slice(0, 5).map((l) => (
                      <div key={l._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(99,120,255,.07)', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 14 }}>{l.name}</div>
                          <div style={{ color: '#7b82a8', fontSize: 12 }}>{l.email}</div>
                        </div>
                        <span className={`tag ${l.status === 'new' ? '' : l.status === 'contacted' ? 'tag-orange' : 'tag-green'}`} style={{ fontSize: 11 }}>{l.status}</span>
                      </div>
                    ))}
                    {leads.length === 0 && <p style={{ color: '#7b82a8', fontSize: 14 }}>No leads yet.</p>}
                  </div>

                  {/* Recent Projects */}
                  <div className="glass" style={{ padding: 24, borderRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>Recent Projects</h3>
                      <button onClick={() => setTab('projects')} style={{ color: '#4f6fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans' }}>View all →</button>
                    </div>
                    {projects.slice(0, 5).map((p) => (
                      <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(99,120,255,.07)', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 14 }}>{p.title}</div>
                          <div style={{ color: '#7b82a8', fontSize: 12 }}>{p.category}</div>
                        </div>
                        <span className={`tag ${p.status === 'completed' ? 'tag-green' : 'tag-orange'}`} style={{ fontSize: 11 }}>{p.status}</span>
                      </div>
                    ))}
                    {projects.length === 0 && <p style={{ color: '#7b82a8', fontSize: 14 }}>No projects yet.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ── PROJECTS ── */}
            {tab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28 }}>Project Management</h2>
                    <p style={{ color: '#7b82a8', fontSize: 14, marginTop: 4 }}>{projects.length} projects total</p>
                  </div>
                  <button className="btn-primary" onClick={() => openAdd('project')}>+ Add Project</button>
                </div>

                <div style={{ display: 'grid', gap: 14 }}>
                  {projects.map((p) => (
                    <motion.div key={p._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass mobile-p-4" style={{ padding: 22, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                      <div className="mobile-stack" style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <span style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</span>
                            <span className="tag" style={{ fontSize: 11, background: `${catColors[p.category] || '#4f6fff'}18`, color: catColors[p.category] || '#4f6fff', borderColor: `${catColors[p.category] || '#4f6fff'}35` }}>{p.category}</span>
                          </div>
                          <div style={{ color: '#7b82a8', fontSize: 13 }}>{p.description?.slice(0, 80)}…</div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                          <span className={`tag ${p.status === 'completed' ? 'tag-green' : 'tag-orange'}`} style={{ fontSize: 11 }}>{p.status}</span>
                          <select value={p.status} onChange={(e) => updateProjectStatus(p._id, e.target.value)}
                            style={{ ...inp, width: 'auto', padding: '7px 12px', fontSize: 13 }}>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', borderTop: '0.5px solid rgba(99,120,255,0.08)', paddingTop: 12, width: '100%', justifyContent: 'flex-end', marginTop: 4 }} className="show-mobile">
                        <button className="btn-edit" onClick={() => openEdit('project', p)}>✏️</button>
                        <button className="btn-danger" onClick={() => deleteProject(p._id)}>🗑</button>
                      </div>
                      <div className="hide-mobile" style={{ display: 'flex', gap: 10 }}>
                        <button className="btn-edit" onClick={() => openEdit('project', p)}>✏️ Edit</button>
                        <button className="btn-danger" onClick={() => deleteProject(p._id)}>🗑 Delete</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {projects.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 80, color: '#7b82a8' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🗂</div>
                    <p>No projects yet. Add your first one!</p>
                  </div>
                )}
              </div>
            )}

            {/* ── LEADS ── */}
            {tab === 'leads' && (
              <div>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28 }}>Lead Management</h2>
                  <p style={{ color: '#7b82a8', fontSize: 14, marginTop: 4 }}>{leads.length} leads · {newLeads} new</p>
                </div>

                <div style={{ display: 'grid', gap: 14 }}>
                  {leads.map((l) => (
                    <motion.div key={l._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass" style={{ padding: 24, borderRadius: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 16 }}>{l.name}</div>
                          <div style={{ color: '#7b82a8', fontSize: 13, marginTop: 3 }}>
                            {l.email} · Budget: <span style={{ color: '#e8eaf6' }}>{l.budget || 'Not specified'}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                          <span className={`tag ${l.status === 'new' ? '' : l.status === 'contacted' ? 'tag-orange' : 'tag-green'}`} style={{ fontSize: 11 }}>{l.status}</span>
                          <select value={l.status} onChange={(e) => updateLeadStatus(l._id, e.target.value)}
                            style={{ ...inp, width: 'auto', padding: '7px 12px', fontSize: 13 }}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                          <a href={`mailto:${l.email}`} className="btn-edit" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>📧 Reply</a>
                          <button className="btn-danger" onClick={() => deleteLead(l._id)}>🗑</button>
                        </div>
                      </div>
                      <p style={{ color: '#b0b8d8', fontSize: 14, lineHeight: 1.65, marginBottom: 8 }}>{l.message}</p>
                      <div style={{ color: '#7b82a8', fontSize: 12 }}>Received: {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    </motion.div>
                  ))}
                </div>
                {leads.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 80, color: '#7b82a8' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
                    <p>No leads yet. They will appear here when someone fills the contact form.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── SERVICES ── */}
            {tab === 'services' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28 }}>Services Management</h2>
                    <p style={{ color: '#7b82a8', fontSize: 14, marginTop: 4 }}>{services.length} services</p>
                  </div>
                  <button className="btn-primary" onClick={() => openAdd('service')}>+ Add Service</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
                  {services.map((s) => (
                    <motion.div key={s._id} whileHover={{ y: -4 }} className="glass" style={{ padding: 26, borderRadius: 18, position: 'relative' }}>
                      {s.popular && <div style={{ position: 'absolute', top: 14, right: 14, background: 'linear-gradient(135deg,#4f6fff,#a259ff)', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>POPULAR</div>}
                      <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon || '🌐'}</div>
                      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                      <p style={{ color: '#7b82a8', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{s.description}</p>
                      {s.features?.length > 0 && (
                        <ul style={{ listStyle: 'none', marginBottom: 16 }}>
                          {s.features.slice(0, 3).map((f: string) => (
                            <li key={f} style={{ color: '#b0b8d8', fontSize: 13, marginBottom: 4, display: 'flex', gap: 8 }}>
                              <span style={{ color: '#00e676' }}>✓</span>{f}
                            </li>
                          ))}
                          {s.features.length > 3 && <li style={{ color: '#7b82a8', fontSize: 12 }}>+{s.features.length - 3} more</li>}
                        </ul>
                      )}
                      <div style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, color: '#4f6fff', marginBottom: 18, display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        ₹{Number(s.price).toLocaleString('en-IN')}
                        {s.originalPrice && s.originalPrice > s.price && (
                          <span style={{ fontSize: 13, fontWeight: 400, color: '#7b82a8', textDecoration: 'line-through' }}>₹{Number(s.originalPrice).toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button className="btn-edit" style={{ flex: 1, justifyContent: 'center' }} onClick={() => openEdit('service', s)}>✏️ Edit</button>
                        <button className="btn-danger" style={{ flex: 1, justifyContent: 'center' }} onClick={() => deleteService(s._id)}>🗑 Delete</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {services.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 80, color: '#7b82a8' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
                    <p>No services yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── INVOICES ── */}
            {tab === 'invoices' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <div>
                    <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28 }}>Billing & Invoices</h2>
                    <p style={{ color: '#7b82a8', fontSize: 14, marginTop: 4 }}>{bills.length} invoices generated</p>
                  </div>
                  <button className="btn-primary" onClick={() => openAdd('bill')}>+ Create Bill</button>
                </div>

                <div style={{ display: 'grid', gap: 14 }}>
                  {bills.map((b) => (
                    <motion.div key={b._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass mobile-p-4" style={{ padding: 22, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                      <div className="mobile-stack" style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <span style={{ fontWeight: 700, fontSize: 16, color: '#4f6fff' }}>#{b.invoiceNumber}</span>
                            <span style={{ fontWeight: 600, fontSize: 15 }}>{b.clientName}</span>
                          </div>
                          <div style={{ color: '#7b82a8', fontSize: 13 }}>
                            {new Date(b.createdAt).toLocaleDateString('en-IN')} · INR {b.totalAmount?.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                          <span className={`tag ${b.status === 'paid' ? 'tag-green' : b.status === 'sent' ? 'tag-orange' : ''}`} style={{ fontSize: 11 }}>{b.status}</span>
                          <select value={b.status} onChange={(e) => updateBillStatus(b._id, e.target.value)}
                            style={{ ...inp, width: 'auto', padding: '7px 12px', fontSize: 13 }}>
                            <option value="draft">Draft</option>
                            <option value="sent">Sent</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <button className="btn-edit" onClick={() => generatePDF(b)} title="Download PDF">📄</button>
                        <button className="btn-edit" onClick={() => sendBillEmail(b._id)} title="Send Email">📧</button>
                        <button className="btn-edit" onClick={() => shareWhatsApp(b)} title="Share WhatsApp">💬</button>
                        <button className="btn-danger" onClick={() => deleteBill(b._id)}>🗑</button>
                      </div>
                    </motion.div>
                  ))}
                  {bills.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 80, color: '#7b82a8' }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🧾</div>
                      <p>No invoices yet. Create your first bill!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
            style={{ position: 'fixed', inset: 0, background: 'rgba(3,5,10,.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(10px)' }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              className="glass-strong mobile-p-6"
              style={{ width: '100%', maxWidth: 540, padding: 40, borderRadius: 22, maxHeight: '90vh', overflowY: 'auto' }}
            >
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, marginBottom: 28 }}>
                {modal.mode === 'add' ? '+ Add' : '✏️ Edit'} {
                  modal.type === 'project' ? 'Project' : 
                  modal.type === 'service' ? 'Service' : 'Bill'
                }
              </h3>

              {/* PROJECT FORM */}
              {modal.type === 'project' && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Title *</label>
                    <input style={inp} value={form.title || ''} onChange={(e) => setF('title', e.target.value)} placeholder="Project title" />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Description</label>
                    <textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={form.description || ''} onChange={(e) => setF('description', e.target.value)} placeholder="Brief description…" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                    <div>
                      <label style={lbl}>Category *</label>
                      <select style={inp} value={form.category || ''} onChange={(e) => setF('category', e.target.value)}>
                        <option value="">Select…</option>
                        <option>Business</option><option>E-commerce</option>
                        <option>Job Portal</option><option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Status</label>
                      <select style={inp} value={form.status || 'ongoing'} onChange={(e) => setF('status', e.target.value)}>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Live Link</label>
                    <input style={inp} value={form.liveLink || ''} onChange={(e) => setF('liveLink', e.target.value)} placeholder="https://example.com" />
                  </div>
                  <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="featured" checked={form.featured || false} onChange={(e) => setF('featured', e.target.checked)} style={{ width: 'auto' }} />
                    <label htmlFor="featured" style={{ ...lbl, margin: 0, cursor: 'pointer' }}>Featured on homepage</label>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn-outline" style={{ flex: 1 }} onClick={closeModal}>Cancel</button>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={saveProject} disabled={saving}>
                      {saving ? <><div className="spinner" />Saving…</> : 'Save Project'}
                    </button>
                  </div>
                </>
              )}

              {/* SERVICE FORM */}
              {modal.type === 'service' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                    <div>
                      <label style={lbl}>Title *</label>
                      <input style={inp} value={form.title || ''} onChange={(e) => setF('title', e.target.value)} placeholder="e.g. Business Website" />
                    </div>
                    <div>
                      <label style={lbl}>Icon (emoji)</label>
                      <input style={inp} value={form.icon || ''} onChange={(e) => setF('icon', e.target.value)} placeholder="🌐" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Description</label>
                    <textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={form.description || ''} onChange={(e) => setF('description', e.target.value)} placeholder="Service description…" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                    <div>
                      <label style={lbl}>Offer Price (Display) (₹) *</label>
                      <input style={inp} type="number" value={form.price || ''} onChange={(e) => setF('price', e.target.value)} placeholder="8000" />
                    </div>
                    <div>
                      <label style={lbl}>Actual Price (Strikethrough) (₹)</label>
                      <input style={inp} type="number" value={form.originalPrice || ''} onChange={(e) => setF('originalPrice', e.target.value)} placeholder="12000" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Order (display sequence)</label>
                    <input style={inp} type="number" value={form.order || ''} onChange={(e) => setF('order', e.target.value)} placeholder="1" />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Features (one per line)</label>
                    <textarea style={{ ...inp, resize: 'vertical' }} rows={5}
                      value={Array.isArray(form.features) ? form.features.join('\n') : form.features || ''}
                      onChange={(e) => setF('features', e.target.value)}
                      placeholder={'5 Pages\nSEO Optimized\nMobile Responsive\n1 Month Support'} />
                  </div>
                  <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="popular" checked={form.popular || false} onChange={(e) => setF('popular', e.target.checked)} style={{ width: 'auto' }} />
                    <label htmlFor="popular" style={{ ...lbl, margin: 0, cursor: 'pointer' }}>Mark as Popular</label>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn-outline" style={{ flex: 1 }} onClick={closeModal}>Cancel</button>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={saveService} disabled={saving}>
                      {saving ? <><div className="spinner" />Saving…</> : 'Save Service'}
                    </button>
                  </div>
                </>
              )}

              {/* BILL FORM */}
              {modal.type === 'bill' && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={lbl}>Client Name *</label>
                    <input style={inp} value={form.clientName || ''} onChange={(e) => setF('clientName', e.target.value)} placeholder="Full Name" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                    <div>
                      <label style={lbl}>Client Email *</label>
                      <input style={inp} value={form.clientEmail || ''} onChange={(e) => setF('clientEmail', e.target.value)} placeholder="email@client.com" />
                    </div>
                    <div>
                      <label style={lbl}>Client Phone *</label>
                      <input style={inp} value={form.clientPhone || ''} onChange={(e) => setF('clientPhone', e.target.value)} placeholder="+91 XXXXXXXXXX" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={lbl}>Items *</label>
                      <button type="button" onClick={() => setF('items', [...(form.items || []), { description: '', quantity: 1, price: 0 }])} style={{ fontSize: 11, color: '#4f6fff', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Item</button>
                    </div>
                    
                    {/* Items Header */}
                    {form.items?.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 40px', gap: 10, marginBottom: 8, padding: '0 4px' }}>
                        <span style={{ fontSize: 10, color: '#7b82a8', fontWeight: 600, textTransform: 'uppercase' }}>Desc</span>
                        <span style={{ fontSize: 10, color: '#7b82a8', fontWeight: 600, textTransform: 'uppercase' }}>Qty</span>
                        <span style={{ fontSize: 10, color: '#7b82a8', fontWeight: 600, textTransform: 'uppercase' }}>Price</span>
                        <span></span>
                      </div>
                    )}

                    {form.items?.map((item: any, idx: number) => (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 40px', gap: 10, marginBottom: 10 }}>
                        <input style={inp} value={item.description} onChange={(e) => updateBillItem(idx, 'description', e.target.value)} placeholder="e.g. Website Design" />
                        <input style={inp} type="number" value={item.quantity} onChange={(e) => updateBillItem(idx, 'quantity', e.target.value)} placeholder="1" />
                        <input style={inp} type="number" value={item.price} onChange={(e) => updateBillItem(idx, 'price', e.target.value)} placeholder="5000" />
                        <button type="button" onClick={() => setF('items', form.items.filter((_:any, i:number) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ff5252', cursor: 'pointer' }}>✕</button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                    <div>
                      <label style={lbl}>Discount (%)</label>
                      <input style={inp} type="number" value={form.discountPercent === '' ? '' : (form.discountPercent || 0)} 
                        onChange={(e) => setF('discountPercent', e.target.value === '' ? '' : Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={lbl}>Authorized Signatory (Name)</label>
                      <input style={inp} value={form.generatedBy || ''} onChange={(e) => setF('generatedBy', e.target.value)} placeholder="e.g. Nitesh Kumar" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 18 }}>
                    <div>
                      <label style={lbl}>UTR No. (Optional)</label>
                      <input style={inp} value={form.utrNumber || ''} onChange={(e) => setF('utrNumber', e.target.value)} placeholder="Transaction ID / UTR" />
                    </div>
                    <div>
                      <label style={lbl}>Status</label>
                      <select style={inp} value={form.status || 'draft'} onChange={(e) => setF('status', e.target.value)}>
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={lbl}>Notes & Terms (optional)</label>
                    <textarea style={{ ...inp, resize: 'vertical' }} rows={2} value={form.notes || ''} onChange={(e) => setF('notes', e.target.value)} placeholder="Payment terms, bank details etc." />
                  </div>

                  <div style={{ background: 'rgba(79,111,255,0.08)', padding: 20, borderRadius: 14, marginBottom: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7b82a8', fontSize: 13, marginBottom: 8 }}>
                      <span>Subtotal:</span>
                      <span>INR {(form.items || []).reduce((acc: number, it: any) => acc + (Number(it.price || 0) * Number(it.quantity || 0)), 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffb74d', fontSize: 14, fontWeight: 700 }}>
                      <span>Final Total:</span>
                      <span style={{ color: '#e8eaf6' }}>
                        INR {((form.items || []).reduce((acc: number, it: any) => acc + (Number(it.price || 0) * Number(it.quantity || 0)), 0) * (1 - (Number(form.discountPercent || 0))/100)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn-outline" style={{ flex: 1 }} onClick={closeModal}>Cancel</button>
                    <button className="btn-outline" style={{ flex: 1, borderColor: '#4f6fff', color: '#4f6fff' }} 
                      onClick={() => {
                        const subtotal = (form.items || []).reduce((acc: number, it: any) => acc + (Number(it.price || 0) * Number(it.quantity || 0)), 0);
                        const discountAmount = (subtotal * (Number(form.discountPercent || 0))) / 100;
                        const totalAmount = subtotal - discountAmount;
                        generatePDF({
                          ...form,
                          subtotal,
                          discountAmount,
                          totalAmount,
                          createdAt: new Date(),
                          invoiceNumber: form.invoiceNumber || 'PREVIEW'
                        });
                      }}>
                      👁️ Preview PDF
                    </button>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={saveBill} disabled={saving}>
                      {saving ? <><div className="spinner" />Saving…</> : 'Save Bill'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
