import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState(['Security', 'Peace of Mind', 'Wealth'].reverse());

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] bg-charcoal rounded-3xl p-8 overflow-hidden shadow-2xl flex flex-col justify-end">
      <div className="absolute top-8 left-8 text-cream/30 font-mono text-sm uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-clay animate-pulse"></span> Audit Intel
      </div>
      <div className="relative h-64 w-full flex flex-col justify-end">
        {cards.map((label, idx) => (
          <div
            key={label}
            className="absolute bottom-0 w-full p-6 bg-white rounded-2xl border border-cream/50 shadow-lg text-moss text-lg font-outfit font-bold uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] backdrop-blur-md"
            style={{
              transform: `translateY(-${idx * 24}px) scale(${1 - idx * 0.05})`,
              opacity: 1 - idx * 0.25,
              zIndex: 4 - idx
            }}
          >
            {label} 
          </div>
        ))}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [streamText, setStreamText] = useState('');
  const messages = [
    "Maximising growth patterns...",
    "Analyzing boutique mortgage yields...",
    "Rebalancing portfolio allocation...",
    "Organic wealth synthesis confirmed."
  ];

  useEffect(() => {
    let currentMsg = 0;
    let currentChar = 0;
    let intervalId: any;

    const typeWriter = () => {
      if (currentChar <= messages[currentMsg].length) {
        setStreamText(messages[currentMsg].substring(0, currentChar));
        currentChar++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          currentChar = 0;
          currentMsg = (currentMsg + 1) % messages.length;
          intervalId = setInterval(typeWriter, 100);
        }, 2000);
      }
    };
    intervalId = setInterval(typeWriter, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-[400px] bg-moss rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden group">
      <div className="text-cream/80 font-mono text-sm uppercase flex justify-between w-full">
        Neural Stream
        <span className="flex items-center gap-2 text-clay animate-pulse">
          <span className="w-2 h-2 rounded-full bg-clay"></span> Live Feed
        </span>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-mono text-cream leading-tight">
          {streamText}
          <span className="inline-block w-3 h-8 bg-clay ml-1 animate-pulse align-middle"></span>
        </div>
      </div>
      <div className="text-cream/30 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-8 left-8">
        SYS.REQ.0x0045 // TELEMETRY
      </div>
    </div>
  );
};

const AdaptiveRegimen = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(3);
  const cursorRef = useRef(null);
  const saveBtnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    tl.to(cursorRef.current, { x: 120, y: 150, duration: 1, ease: 'power2.inOut' })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => setActiveDay(3) })
      .to(cursorRef.current, { x: 220, y: 280, duration: 1, ease: 'power2.inOut', delay: 0.5 })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => {
        gsap.to(saveBtnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, backgroundColor: '#CC5833', color: '#FFF' });
      }})
      .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.2 })
      .set(cursorRef.current, { x: 0, y: 0, opacity: 1, delay: 0.5 });

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative h-[400px] bg-cream rounded-3xl p-8 shadow-2xl overflow-hidden border border-charcoal/10">
      <div className="text-charcoal/40 font-mono text-sm uppercase mb-8">Adaptive Regimen</div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-mono text-sm font-bold transition-colors ${
              i === activeDay ? 'bg-moss text-cream' : 'bg-charcoal/5 text-charcoal'
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-8 right-8">
        <button ref={saveBtnRef} className="px-6 py-2 bg-charcoal text-white rounded-full font-mono text-sm">
          Save Protocol
        </button>
      </div>

      <svg 
        ref={cursorRef} 
        className="absolute top-0 left-0 w-8 h-8 pointer-events-none drop-shadow-xl z-10" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="#FFF" stroke="#1A1A1A"/>
      </svg>
    </div>
  );
};

export function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.artifact-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-8 md:px-24 bg-cream">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <h2 className="font-outfit text-5xl md:text-7xl lg:text-[6rem] text-charcoal font-semibold leading-none tracking-tight">
          Strategic <br/>
          <span className="font-drama italic text-moss font-light">Guidance</span>
        </h2>
        <p className="font-jakarta text-charcoal/70 max-w-sm text-lg font-light leading-relaxed mb-4">
          Replace uncertainty with complete financial clarity. We transform complex mortgage scenarios into straightforward, actionable insights tailored specifically to your goals.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <div className="artifact-card">
          <DiagnosticShuffler />
        </div>
        <div className="artifact-card">
          <TelemetryTypewriter />
        </div>
        <div className="artifact-card">
          <AdaptiveRegimen />
        </div>
      </div>
    </section>
  );
}
