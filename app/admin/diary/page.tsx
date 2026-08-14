"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
type EntryType = 'income' | 'expense';

interface Entry {
  id: string;
  type: EntryType;
  amount: number;
  date: string;
  sourceOrPerson: string;
  description: string;
}

export default function AdminDiaryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<EntryType>('income');
  const [isLoaded, setIsLoaded] = useState(false);

  // Form state
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceOrPerson, setSourceOrPerson] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const downloadPDF = (data: Entry[], filename = 'diary-report.pdf') => {
    if (data.length === 0) {
      alert("No data to download.");
      return;
    }
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 30, 40);
    doc.text("Balance Diary Report", 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 14, 30);
    
    // Summary calculations
    const totalInc = data.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
    const totalExp = data.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
    const net = totalInc - totalExp;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(46, 204, 113); // Green
    doc.text(`Total Income: + INR ${totalInc.toLocaleString('en-IN')}`, 14, 42);
    
    doc.setTextColor(231, 76, 60); // Red
    doc.text(`Total Expense: - INR ${totalExp.toLocaleString('en-IN')}`, 14, 48);
    
    doc.setTextColor(52, 152, 219); // Blue
    doc.text(`Net Balance: INR ${net.toLocaleString('en-IN')}`, 14, 54);

    const tableData = data.map(e => [
      new Date(e.date).toLocaleDateString('en-IN'),
      e.type === 'income' ? 'Income' : 'Expense',
      e.sourceOrPerson,
      e.description || '-',
      `${e.type === 'income' ? '+' : '-'} INR ${e.amount.toLocaleString('en-IN')}`
    ]);

    autoTable(doc, {
      startY: 62,
      head: [['Date', 'Type', 'Source/Person', 'Description', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 45 },
        3: { cellWidth: 'auto' },
        4: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }
      },
      didParseCell: function(data: any) {
        if (data.section === 'body') {
          if (data.column.index === 1 || data.column.index === 4) {
            const isInc = data.row.raw[1] === 'Income';
            data.cell.styles.textColor = isInc ? [46, 204, 113] : [231, 76, 60];
          }
        }
      }
    });

    doc.save(filename);
  };

  useEffect(() => {
    const saved = localStorage.getItem('adminDiaryEntries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse diary entries", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('adminDiaryEntries', JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const openModal = (type: EntryType) => {
    setModalType(type);
    setIsModalOpen(true);
    // Reset form
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setSourceOrPerson('');
    setDescription('');
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !sourceOrPerson) return;

    const newEntry: Entry = {
      id: Date.now().toString(),
      type: modalType,
      amount: parseFloat(amount),
      date,
      sourceOrPerson,
      description
    };

    setEntries(prev => [newEntry, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setIsModalOpen(false);
  };

  const displayedEntries = entries.filter(e => {
    let show = true;
    if (fromDate && e.date < fromDate) show = false;
    if (toDate && e.date > toDate) show = false;
    return show;
  });

  // Calculations
  const totalIncome = displayedEntries.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = displayedEntries.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050a] via-[#0a0a14] to-[#05050a] text-white p-4 sm:p-8 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Balance Diary
            </h1>
            <p className="text-gray-400 text-lg">Track your income and expenses with clarity.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center w-full lg:w-auto">
            {/* Filter */}
            <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 shadow-xl w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">From</span>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-transparent text-sm text-gray-200 font-medium focus:outline-none [color-scheme:dark]"
                />
              </div>
              <div className="w-px h-5 bg-white/10 mx-1"></div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">To</span>
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-transparent text-sm text-gray-200 font-medium focus:outline-none [color-scheme:dark]"
                />
              </div>
              {(fromDate || toDate) && (
                <button onClick={() => { setFromDate(''); setToDate(''); }} className="ml-2 p-1 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={() => {
                  let fname = 'diary-report.pdf';
                  if (fromDate && toDate) fname = `diary-${fromDate}-to-${toDate}.pdf`;
                  else if (fromDate) fname = `diary-from-${fromDate}.pdf`;
                  else if (toDate) fname = `diary-upto-${toDate}.pdf`;
                  downloadPDF(displayedEntries, fname);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-3 rounded-2xl hover:bg-blue-500/20 transition-all font-semibold shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
              <button 
                onClick={() => openModal('income')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border border-emerald-400/30 px-5 py-3 rounded-2xl hover:from-emerald-400 hover:to-emerald-500 transition-all font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Income
              </button>
              <button 
                onClick={() => openModal('expense')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white border border-rose-400/30 px-5 py-3 rounded-2xl hover:from-rose-400 hover:to-rose-500 transition-all font-semibold shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Expense
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Balance Card */}
          <motion.div whileHover={{ y: -4 }} className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] transform group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-3">Total Balance</p>
              <h2 className={`text-5xl lg:text-6xl font-extrabold tracking-tighter ${balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
                ₹{balance.toLocaleString('en-IN')}
              </h2>
            </div>
          </motion.div>

          {/* Income Card */}
          <motion.div whileHover={{ y: -4 }} className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] transform group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-3">Total Income</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-emerald-400">
                +₹{totalIncome.toLocaleString('en-IN')}
              </h2>
            </div>
          </motion.div>

          {/* Expense Card */}
          <motion.div whileHover={{ y: -4 }} className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] transform group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-3">Total Expense</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-rose-400">
                -₹{totalExpense.toLocaleString('en-IN')}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Transactions List */}
        <div className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-white/90">Recent Transactions</h3>
            <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold tracking-wider text-gray-400">
              {displayedEntries.length} ENTRIES
            </div>
          </div>
          
          <div className="divide-y divide-white/5">
            {displayedEntries.length === 0 ? (
              <div className="p-16 text-center text-gray-500 flex flex-col items-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-400">No entries found for this view.</p>
                <p className="text-sm mt-2 opacity-60">Adjust your date filters or add a new transaction.</p>
              </div>
            ) : (
              <AnimatePresence>
                {displayedEntries.map((entry) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={entry.id} 
                    className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/[0.04] transition-all duration-300 group relative"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl flex-shrink-0 shadow-inner ${
                        entry.type === 'income' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/10' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-rose-500/10'
                      }`}>
                        {entry.type === 'income' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl tracking-tight text-gray-100">{entry.sourceOrPerson}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1.5 font-medium">
                          <span className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(entry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          {entry.description && (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                              <span className="truncate max-w-[250px] opacity-80">{entry.description}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className={`text-2xl font-bold tracking-tight ${
                        entry.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                      </div>
                      <button 
                        onClick={() => downloadPDF([entry], `diary-entry-${entry.id}.pdf`)}
                        className="p-3 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 transform group-hover:scale-110"
                        title="Download entry details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
              className="bg-[#0f0f16] border border-white/10 rounded-[2rem] w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              {/* Subtle top glow in modal */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${modalType === 'income' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-rose-400 to-pink-500'}`}></div>

              <div className="p-8 border-b border-white/5 relative">
                <div className="flex justify-between items-center">
                  <h3 className={`text-2xl font-extrabold tracking-tight flex items-center gap-3 ${
                    modalType === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {modalType === 'income' ? (
                      <div className="p-2.5 bg-emerald-500/10 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
                    ) : (
                      <div className="p-2.5 bg-rose-500/10 rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 12H6" /></svg></div>
                    )}
                    New {modalType === 'income' ? 'Income' : 'Expense'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full text-gray-500 hover:bg-white/5 hover:text-white transition-all transform hover:rotate-90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleAddEntry} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-medium">₹</span>
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`block w-full pl-10 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-xl font-semibold text-white placeholder-gray-600 focus:outline-none focus:ring-2 transition-all shadow-inner ${modalType === 'income' ? 'focus:ring-emerald-500/50 focus:border-emerald-500/50' : 'focus:ring-rose-500/50 focus:border-rose-500/50'}`}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`block w-full px-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 transition-all shadow-inner [color-scheme:dark] ${modalType === 'income' ? 'focus:ring-emerald-500/50' : 'focus:ring-rose-500/50'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {modalType === 'income' ? 'Source' : 'Given To'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sourceOrPerson}
                    onChange={(e) => setSourceOrPerson(e.target.value)}
                    className={`block w-full px-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white font-medium placeholder-gray-600 focus:outline-none focus:ring-2 transition-all shadow-inner ${modalType === 'income' ? 'focus:ring-emerald-500/50' : 'focus:ring-rose-500/50'}`}
                    placeholder={modalType === 'income' ? 'e.g. Client Payment' : 'e.g. Office Rent'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Description <span className="text-gray-600 font-normal normal-case tracking-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`block w-full px-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white font-medium placeholder-gray-600 focus:outline-none focus:ring-2 transition-all shadow-inner ${modalType === 'income' ? 'focus:ring-emerald-500/50' : 'focus:ring-rose-500/50'}`}
                    placeholder="Add a quick note..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white text-lg transition-all shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:-translate-y-1 ${
                      modalType === 'income' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/20' 
                        : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 shadow-rose-500/20'
                    }`}
                  >
                    Save {modalType === 'income' ? 'Income' : 'Expense'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
