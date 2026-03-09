import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<SVGPathElement>(null);
  const stemRef = useRef<SVGPathElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    const scrollObj = { y: window.scrollY };
    gsap.to(scrollObj, {
      y: 0,
      duration: 1.2,
      ease: "power3.inOut", /* Power3 inOut translates to a smooth cubic-bezier curve */
      onUpdate: () => window.scrollTo(0, scrollObj.y)
    });
    setIsOpen(false);
  };

  const handleLogoHover = () => {
    // Replay the stick-to-leaf animation on hover
    const tl = gsap.timeline();
    tl.to(leafRef.current, { scale: 0, duration: 0.2, ease: "power2.in" })
      .to(stemRef.current, { strokeDashoffset: 15, duration: 0.2, ease: "power2.in" }, "<")
      .to(stemRef.current, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" })
      .to(leafRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.1");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation for the logo icon
      const stemLength = 15; // approximate length of M2,22 to M12,12
      gsap.set(stemRef.current, { strokeDasharray: stemLength, strokeDashoffset: stemLength });
      gsap.set(leafRef.current, { scale: 0, transformOrigin: '12px 12px' });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(stemRef.current, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' })
        .to(leafRef.current, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.2');

      // Scroll background transition color
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
        className="flex items-center justify-between px-6 md:px-8 py-4 rounded-full border border-transparent transition-colors text-cream mix-blend-difference relative w-full"
      >
        {/* Mobile Left: Burger Menu */}
        <div className="md:hidden flex items-center w-1/3">
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -ml-1 focus:outline-none" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Title: Centered on mobile, Left on desktop */}
        <button 
          onClick={scrollToTop}
          onMouseEnter={handleLogoHover}
          className="font-outfit font-semibold tracking-tight text-xl absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 w-max hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2 group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-moss -mt-1 transition-colors group-hover:text-clay">
            <path ref={stemRef} d="M2 22 L 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path ref={leafRef} d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.7 8-10 10Z" fill="currentColor" stroke="none" />
          </svg>
          Lu Financial.
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-jakarta text-sm font-medium">
          <a href="#protocol" className="hover:opacity-60 transition-opacity">Protocol</a>
          <a href="#philosophy" className="hover:opacity-60 transition-opacity">Philosophy</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>

        {/* Desktop Right Button & Mobile Right Placeholder */}
        <div className="w-1/3 flex justify-end md:w-auto">
          <a href="#contact" className="hidden md:block magnetic-btn px-6 py-2 rounded-full border border-current text-sm font-semibold overflow-hidden z-[1]">
            <span className="relative z-10 transition-colors duration-300 hover:text-white">Engage</span>
          </a>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full mt-4 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="p-6 rounded-[2rem] bg-charcoal/95 backdrop-blur-xl border border-cream/10 shadow-2xl flex flex-col gap-6 font-jakarta text-lg text-cream">
          <a href="#protocol" onClick={() => setIsOpen(false)} className="hover:text-clay transition-colors text-center">Protocol</a>
          <a href="#philosophy" onClick={() => setIsOpen(false)} className="hover:text-clay transition-colors text-center">Philosophy</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-clay transition-colors text-center">Contact</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 text-center py-4 rounded-full bg-clay text-white font-semibold">
            Engage
          </a>
        </div>
      </div>
    </div>
  );
}
