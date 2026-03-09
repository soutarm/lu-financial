import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-elem',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-8 md:px-24 bg-charcoal text-cream relative overflow-hidden" id="dossier">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="contact-elem text-center space-y-4">
          <div className="font-mono text-clay text-sm uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse"></span>
            Endpoint: Active
          </div>
          <h2 className="font-outfit text-5xl md:text-7xl font-bold tracking-tighter">
            Initiate <span className="font-drama italic font-light text-moss">Protocol</span>
          </h2>
          <p className="font-jakarta text-cream/70 max-w-lg mx-auto text-lg pt-4 font-light">
            Secure a confidential consultation with our lead structural architects to coordinate your next lending apparatus.
          </p>
        </div>

        <form 
          action="https://formsubmit.co/luf@mrated.dev" 
          method="POST" 
          className="contact-elem space-y-8 bg-cream/5 p-8 md:p-12 rounded-[3rem] border border-cream/10 backdrop-blur-md shadow-2xl relative overflow-hidden group"
        >
          {/* subtle moving light background */}
          <div className="absolute top-0 left-1/2 w-full h-full bg-gradient-to-b from-moss/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-1/2 rounded-[3rem] pointer-events-none" />

          {/* Formsubmit Configuration */}
          <input type="hidden" name="_subject" value="New Protocol Request via Lu Financial" />
          <input type="text" name="_honey" style={{ display: 'none' }} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://luf.mrated.dev/" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider opacity-60">Entity / Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                required 
                className="w-full bg-transparent border-b border-cream/20 py-4 font-jakarta text-xl focus:outline-none focus:border-clay transition-colors rounded-none placeholder:text-cream/20"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider opacity-60">Return Vector (Email)</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                required 
                className="w-full bg-transparent border-b border-cream/20 py-4 font-jakarta text-xl focus:outline-none focus:border-clay transition-colors rounded-none placeholder:text-cream/20"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          <div className="relative z-10 space-y-2">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider opacity-60">Proposal Parameters</label>
            <textarea 
              id="message"
              name="message" 
              required 
              rows={4}
              className="w-full bg-transparent border-b border-cream/20 py-4 font-jakarta text-xl focus:outline-none focus:border-clay transition-colors resize-none rounded-none placeholder:text-cream/20"
              placeholder="Outline your structural objectives..."
            ></textarea>
          </div>
          
          <div className="relative z-10 pt-8 flex justify-center md:justify-start">
            <button type="submit" className="magnetic-btn z-[1] border-none w-full md:w-auto px-10 py-4 rounded-full bg-cream text-charcoal font-bold uppercase tracking-widest text-sm group/btn shadow-lg">
              <span className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-3 group-hover/btn:text-cream">
                Transmit Dossier 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}