import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProtocolCardProps {
  index: number;
  title: string;
  subtitle: string;
  artifact: React.ReactNode;
  color: string;
  textColor: string;
}

const ProtocolCard = ({ index, title, subtitle, artifact, color, textColor }: ProtocolCardProps) => {
  return (
    <div 
      className={`protocol-card sticky top-0 h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center p-8 md:p-32 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]`}
      style={{
        backgroundColor: color,
        color: textColor,
        zIndex: index + 1,
        marginTop: index === 0 ? 0 : '100px',
      }}
      data-index={index}
    >
      <div className="w-full md:w-1/2 flex flex-col gap-6 font-jakarta max-w-lg mb-12 md:mb-0">
        <div className="font-mono text-sm uppercase opacity-60 tracking-widest">
          Protocol {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="font-outfit text-6xl md:text-8xl font-bold tracking-tighter leading-none">
          {title}
        </h3>
        <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed font-drama italic">
          {subtitle}
        </p>
      </div>
      <div className="w-full md:w-1/2 flex shrink-0 items-center justify-center h-64 md:h-full relative overflow-visible">
        {artifact}
      </div>
    </div>
  );
};

export function Protocol() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              gsap.to(card, {
                scale: 1 - 0.1 * self.progress,
                filter: `blur(${20 * self.progress}px)`,
                opacity: 1 - 0.5 * self.progress,
                duration: 0,
              });
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const Artifact1 = () => (
    <div className="relative w-64 h-64 border rounded-full border-charcoal/20 flex items-center justify-center">
      <div className="absolute w-full h-full border-[10px] border-charcoal rounded-full border-t-transparent animate-[spin_4s_linear_infinite]" />
      <div className="absolute w-3/4 h-3/4 border-8 border-clay rounded-full border-b-transparent animate-[spin_3s_linear_infinite_reverse]" />
      <div className="w-1/2 h-1/2 bg-moss rounded-full animate-pulse" />
    </div>
  );

  const Artifact2 = () => (
    <div className="relative w-80 h-80 grid grid-cols-5 grid-rows-5 gap-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-clay/50 to-transparent w-full h-1/5 animate-[bounce_2s_ease-in-out_infinite] blur-md mix-blend-color-burn" />
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="bg-white rounded-[2px] opacity-20 hover:opacity-100 transition-opacity duration-300" />
      ))}
    </div>
  );

  const Artifact3 = () => (
    <div className="relative w-full max-w-md h-32 flex items-center justify-center">
      <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible">
        <path
          d="M0,25 L50,25 L60,10 L70,40 L80,25 L200,25"
          fill="none"
          stroke="#F2F0E9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-[dash_2s_linear_infinite]"
          style={{ strokeDasharray: '200', strokeDashoffset: '200' }}
        />
        <style>{`
          @keyframes dash {
            0% { stroke-dashoffset: 200; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -200; }
          }
        `}</style>
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-cream/20 shadow-[0_0_20px_#F2F0E9]" />
    </div>
  );

  return (
    <section ref={containerRef} className="relative w-full bg-cream font-jakarta" id="protocol">
      <ProtocolCard
        index={0}
        title="Synthesize"
        subtitle="Extracting core value from deep market telemetry."
        color="#F2F0E9"
        textColor="#1A1A1A"
        artifact={<Artifact1 />}
      />
      <ProtocolCard
        index={1}
        title="Isolate"
        subtitle="Scanning boutique grids for non-apparent yield."
        color="#2E4036"
        textColor="#F2F0E9"
        artifact={<Artifact2 />}
      />
      <ProtocolCard
        index={2}
        title="Revitalize"
        subtitle="Injecting organic liquidity to drive robust wealth."
        color="#CC5833"
        textColor="#F2F0E9"
        artifact={<Artifact3 />}
      />
    </section>
  );
}
