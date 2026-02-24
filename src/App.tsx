/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Stars, 
  Gift, 
  ChevronRight, 
  ChevronLeft, 
  Music, 
  Volume2, 
  VolumeX,
  Cake,
  PartyPopper,
  Calendar
} from 'lucide-react';

// --- Components ---

const FloatingStars = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%', 
            opacity: Math.random() * 0.5 + 0.2 
          }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const ChapterWrapper = ({ children, isActive }: { children: React.ReactNode, isActive: boolean }) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const [step, setStep] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [name, setName] = useState("Special Someone"); // Default name

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const chapters = [
    // 0: Intro
    {
      content: (
        <div className="text-center space-y-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse" />
            <Calendar className="w-20 h-20 text-white/80 mx-auto relative z-10" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">A Moment in Time</h2>
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-glow">
              Something special <br /> is waiting for you.
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="px-8 py-4 rounded-full glass hover:bg-white/10 transition-all group flex items-center gap-3 mx-auto"
          >
            <span className="font-medium tracking-wide">Begin the Journey</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      )
    },
    // 1: The Spark
    {
      content: (
        <div className="max-w-2xl w-full space-y-12">
          <div className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">Chapter I: The Spark</h2>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight italic">
              "In a world of billions, <br /> you are the one who <br /> makes everything brighter."
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl glass space-y-4"
            >
              <Sparkles className="text-emerald-400 w-6 h-6" />
              <p className="text-white/70 leading-relaxed">
                Every laugh we've shared, every conversation that lasted until dawn, and every quiet moment in between...
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-3xl glass space-y-4"
            >
              <Heart className="text-rose-400 w-6 h-6" />
              <p className="text-white/70 leading-relaxed">
                They all lead to this very day. A day that the world became a little more beautiful because you arrived.
              </p>
            </motion.div>
          </div>

          <div className="flex justify-between items-center pt-8">
            <button onClick={prevStep} className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={nextStep} className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-emerald-400 transition-colors">
              Continue
            </button>
          </div>
        </div>
      )
    },
    // 2: The Journey (Interactive)
    {
      content: (
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400">Chapter II: The Journey</h2>
            <h1 className="font-serif text-4xl md:text-5xl">Your Impact</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Stars />, title: "Inspiration", desc: "You push me to be better every single day." },
              { icon: <Music />, title: "Harmony", desc: "Your presence brings a sense of peace I never knew." },
              { icon: <Gift />, title: "Presence", desc: "The greatest gift isn't what's in a box, it's you." }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2rem] glass text-center space-y-4 group cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto group-hover:bg-violet-500/20 transition-colors">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 text-violet-400" })}
                </div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
             <button onClick={prevStep} className="px-6 py-3 rounded-full glass hover:bg-white/5 transition-colors">
              Previous
            </button>
            <button onClick={nextStep} className="px-10 py-3 rounded-full bg-violet-600 hover:bg-violet-500 font-semibold transition-all shadow-lg shadow-violet-500/20">
              Open Memory Book
            </button>
          </div>
        </div>
      )
    },
    // 3: Memory Book (New Chapter)
    {
      content: (
        <div className="max-w-5xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400">Chapter III: Memory Book</h2>
            <h1 className="font-serif text-4xl md:text-5xl">Moments Captured</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {[
              { id: 10, span: "col-span-2 row-span-2", label: "Adventure" },
              { id: 11, span: "col-span-1 row-span-1", label: "Laughter" },
              { id: 12, span: "col-span-1 row-span-2", label: "Quiet Moments" },
              { id: 13, span: "col-span-1 row-span-1", label: "Joy" },
              { id: 14, span: "col-span-2 row-span-1", label: "Together" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`${img.span} relative group overflow-hidden rounded-3xl glass`}
              >
                <img 
                  src={`https://picsum.photos/seed/bday-${img.id}/800/800`} 
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-mono text-xs uppercase tracking-widest">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={prevStep} className="px-6 py-3 rounded-full glass hover:bg-white/5 transition-colors">
              Back
            </button>
            <button onClick={nextStep} className="px-10 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all shadow-lg shadow-amber-500/20">
              The Final Reveal
            </button>
          </div>
        </div>
      )
    },
    // 4: The Big Reveal
    {
      content: (
        <div className="text-center space-y-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-12 bg-rose-500 rounded-full blur-[100px] opacity-30 animate-pulse" />
            <Cake className="w-32 h-32 text-rose-400 mx-auto relative z-10 animate-float" />
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-6xl md:text-8xl font-bold tracking-tighter"
            >
              Happy Birthday, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-violet-400 to-emerald-400">
                {name}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl mx-auto text-white/60 text-lg leading-relaxed font-light"
            >
              Today is about celebrating the incredible person you are. May your year be filled with as much joy, love, and magic as you bring into my life.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex gap-4">
              <div className="p-4 rounded-2xl glass flex items-center gap-3">
                <PartyPopper className="text-yellow-400 w-5 h-5" />
                <span className="text-sm font-mono uppercase tracking-widest">Let's Celebrate</span>
              </div>
            </div>
            
            <button 
              onClick={() => setStep(0)} 
              className="text-white/30 hover:text-white transition-colors text-sm underline underline-offset-8"
            >
              Relive the Journey
            </button>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-emerald-500/30">
      <FloatingStars />
      
      {/* Audio Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-white/50" /> : <Volume2 className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-emerald-500 via-violet-500 to-rose-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((step + 1) / chapters.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <ChapterWrapper isActive={true}>
        {chapters[step].content}
      </ChapterWrapper>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </main>
  );
}
