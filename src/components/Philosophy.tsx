import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax image
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Split text reveal (simulated using word wrapping)
      const words1 = gsap.utils.toArray<HTMLElement>('.word-1');
      const words2 = gsap.utils.toArray<HTMLElement>('.word-2');

      gsap.from(words1, {
        y: 100,
        opacity: 0,
        rotateZ: 5,
        stagger: 0.1,
        ease: 'power4.out',
        duration: 1.5,
        scrollTrigger: {
          trigger: '.text-container',
          start: 'top 80%',
        }
      });

      gsap.from(words2, {
        y: 100,
        opacity: 0,
        rotateZ: -5,
        stagger: 0.1,
        ease: 'power4.out',
        duration: 1.5,
        delay: 0.4,
        scrollTrigger: {
          trigger: '.text-container',
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const text1 = "Let your wealth grow organically".split(' ');
  const text2 = "Drive growth meaningfully.".split(' ');

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120dvh] w-full bg-charcoal text-cream overflow-hidden py-32 flex items-center justify-center"
      id="philosophy"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2913" 
          alt="Organic Texture" 
          className="parallax-bg w-full h-[150%] object-cover object-center translate-y-[-15%]"
        />
        <div className="absolute inset-0 bg-charcoal/90 mix-blend-multiply" />
      </div>

      <div className="text-container relative z-10 w-full max-w-7xl px-8 flex flex-col gap-16 md:gap-32 text-center md:text-left">
        <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-outfit uppercase font-semibold leading-[0.9] tracking-tighter">
          {text1.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-4">
              <span className="word-1 inline-block">{w}</span>
            </span>
          ))}
        </h2>

        <h2 className="text-6xl md:text-9xl lg:text-[10rem] font-drama italic text-clay font-light leading-[0.8] tracking-tighter self-end text-right">
          {text2.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-6">
              <span className="word-2 inline-block">{w}</span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
