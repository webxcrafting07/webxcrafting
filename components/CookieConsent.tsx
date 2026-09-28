"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-slate-900/95 backdrop-blur-md border border-indigo-500/30 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
                🍪 Privacy & Cookie Notice
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies and acknowledge our updated 
                <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 ml-1 underline underline-offset-2">
                  Privacy Policy
                </Link>, 
                which includes provisions according to the Digital Personal Data Protection (DPDP) Act.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={declineCookies}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all text-sm font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
