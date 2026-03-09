import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.direction === 1 || self.progress > 0.05) {
            gsap.to(navRef.current, {
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              color: '#2E4036',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              borderColor: 'rgba(46, 64, 54, 0.1)',
              duration: 0.5,
              ease: 'power2.out',
            });
          } else {
            gsap.to(navRef.current, {
              backgroundColor: 'transparent',
              backdropFilter: 'blur(0px)',
              color: '#F2F0E9',
              boxShadow: 'none',
              borderColor: 'transparent',
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <nav
        ref={navRef}
        className="flex items-center justify-between px-8 py-4 rounded-full border border-transparent transition-colors text-cream mix-blend-difference"
      >
        <div className="font-outfit font-semibold tracking-tight text-xl">Lu Financial.</div>
        <div className="flex gap-8 font-jakarta text-sm font-medium">
          <a href="#features" className="hover:opacity-60 transition-opacity">Protocol</a>
          <a href="#philosophy" className="hover:opacity-60 transition-opacity">Philosophy</a>
          <a href="#dossier" className="hover:opacity-60 transition-opacity">Dossier</a>
        </div>
        <button className="magnetic-btn px-6 py-2 rounded-full border border-current text-sm font-semibold overflow-hidden z-[1]">
          <span className="relative z-10 transition-colors duration-300 hover:text-white">Engage</span>
        </button>
      </nav>
    </div>
  );
}
