import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-[100dvh] w-full flex items-end pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=2940" 
          alt="Calm Forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-moss/40 to-transparent mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      <div className="relative z-10 w-full pl-8 md:pl-24 lg:pl-32 pr-8">
        <div className="flex flex-col gap-2 max-w-4xl">
          <div className="hero-line overflow-hidden mb-4 rounded-full border border-cream/20 bg-moss/60 backdrop-blur-md w-max px-6 py-2 text-cream font-mono text-sm uppercase tracking-widest">
            A New Paradigm in Lending
          </div>
          <h1 className="hero-line font-outfit font-bold text-6xl md:text-8xl lg:text-[10rem] text-cream leading-[0.85] tracking-tighter">
            Your Future
          </h1>
          <h1 className="hero-line font-drama italic text-7xl md:text-9xl lg:text-[11rem] text-clay leading-[0.85] ml-0 md:ml-32 mt-4 md:mt-[-0.2em] transform-gpu">
            Wealth.
          </h1>
          <p className="hero-line font-jakarta text-cream/80 text-lg md:text-xl max-w-lg mt-12 md:ml-8 font-light">
            We architect boutique financial portfolios with precision telemetry and organic foresight. Redefining high-end mortgage structures as a biological science.
          </p>
        </div>
      </div>
    </section>
  );
}
