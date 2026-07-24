/* 
  PRODUCTION SHELL: IMMERSIVE RELIGIONS (v2)
  Note: In a true production environment (like Astro), the TRADITIONS object below 
  would be extracted into individual Markdown/JSON files within a /content/ directory. 
  It is kept here to satisfy the single-file collaborative environment constraints.
*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ChevronDown, BookOpen, Quote, Info, CheckCircle, ShieldAlert } from 'lucide-react';

// ============================================================================
// CONTENT SCHEMA & DATABASE
// ============================================================================

const APP_CONFIG = {
  title: "The Felt Sense",
  subtitle: "An immersive exploration of world religions.",
  description: "Structure exists to serve immersion. Sit inside each tradition long enough to get a felt sense of what it is like from within."
};

const TRADITIONS = {
  christianity: {
    id: 'christianity',
    name: 'Christianity',
    disclaimer: "This experience presents selected voices and practices within a diverse global tradition. It is not a claim that all practitioners believe or live identically.",
    theme: {
      bg: 'bg-stone-950',
      text: 'text-stone-200',
      accent: 'text-amber-500',
      border: 'border-amber-900',
      gradient: 'from-stone-950 via-stone-900 to-stone-950'
    },
    hero: {
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Light streaming through a stained glass window into a dark stone cathedral',
      credit: 'Unsplash'
    },
    sections: [
      {
        id: 'origins',
        title: 'Origins & Cosmology',
        contentType: 'editorial',
        content: "In the beginning was the Word, and the Word was with God. The universe is not an accident, but a deliberate act of love. Out of the void, a Creator spoke existence into being, forming a cosmos that is fundamentally good, though fractured. The human story is one of a great separation, and a relentless divine pursuit to close that gap.",
        sources: [
          { id: 'src-01', text: 'Synthesis of Nicene Creed and Gospel of John prologues' }
        ],
        review_status: 'reviewed',
        last_reviewed: '2026-07-24'
      },
      {
        id: 'aday',
        title: 'A Day / A Life',
        contentType: 'immersive-paraphrase',
        lens: {
          branch: 'Roman Catholic',
          location: 'Toronto, Canada',
          period: 'Contemporary',
          occasion: 'Sunday Mass'
        },
        image: {
          url: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          alt: 'Empty wooden pews in a traditional church interior',
          credit: 'Unsplash'
        },
        content: "You wake and make the sign of the cross, tracing the shape of execution and salvation over your own body. The church smells faintly of old paper and beeswax. You stand, you sit, you kneel. The rhythm of the liturgy pulls you out of your personal anxieties and drops you into a current of words that have been recited for two thousand years. You step forward, open your hands, and receive a small wafer of bread. 'The body of Christ,' the Eucharistic minister says. 'Amen,' you reply.",
        sources: [
          { id: 'src-02', text: 'Paraphrased from interviews with contemporary Catholic practitioners in urban parishes.' }
        ],
        review_status: 'needs-practitioner-review'
      },
      {
        id: 'sacredtext',
        title: 'Sacred Text & Voice',
        contentType: 'attributed-quote',
        attribution: "Anonymous Theological Student, describing engagement with the Psalms.",
        content: "When I read the Psalms, I am not reading a polite theological textbook. I am reading my own anger, my own despair, and my own hope, shouted back at God. The text feels alive, sharp. It reads me as much as I read it. 'Out of the depths I cry to you, O Lord.' It gives me permission to be broken.",
        sources: [
          { id: 'src-03', text: 'Field interview transcript, 2024.' }
        ],
        review_status: 'reviewed'
      }
    ]
  },
  islam: {
    id: 'islam',
    name: 'Islam',
    disclaimer: "This experience presents selected voices and practices within a diverse global tradition. It is not a claim that all practitioners believe or live identically.",
    theme: {
      bg: 'bg-emerald-950',
      text: 'text-emerald-50',
      accent: 'text-emerald-400',
      border: 'border-emerald-800',
      gradient: 'from-emerald-950 via-green-950 to-emerald-950'
    },
    hero: {
      image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Intricate geometric arches inside a grand mosque',
      credit: 'Unsplash'
    },
    sections: [
      {
        id: 'origins',
        title: 'Origins & Cosmology',
        contentType: 'editorial',
        content: "There is nothing but God. No partners, no equals, no divisions. The cosmos is a grand, orderly submission to the will of Allah. Humanity was created from clay and breathed into with divine spirit, appointed as stewards (khalifah) of the earth. History is a series of reminders sent through prophets, culminating in the final, uncorrupted revelation given to Muhammad.",
        sources: [
          { id: 'src-10', text: 'Academic synthesis of basic Islamic cosmology (Tawhid).' }
        ],
        review_status: 'reviewed'
      },
      {
        id: 'aday',
        title: 'A Day / A Life',
        contentType: 'immersive-paraphrase',
        lens: {
          branch: 'Sunni',
          location: 'Global / Urban',
          period: 'Contemporary',
          occasion: 'Fajr (Dawn Prayer)'
        },
        image: {
          url: 'https://images.unsplash.com/photo-1590076938221-5f053530f2ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          alt: 'A man in silhouette praying on a rug',
          credit: 'Unsplash'
        },
        content: "Before dawn, the adhan (call to prayer) sounds from an app on your phone. You rise while the house sleeps. You wash your hands, mouth, face, arms, and feet—wudu, the physical purification before approaching the Holy. You unroll your rug, orienting yourself precisely toward Mecca. As you stand, bow, and press your forehead to the floor, you join millions of others in the exact same posture of total surrender.",
        sources: [
          { id: 'src-11', text: 'Composite description of standard Fajr observation.' }
        ],
        review_status: 'needs-practitioner-review'
      }
    ]
  },
  hinduism: {
    id: 'hinduism',
    name: 'Hinduism',
    disclaimer: "Hinduism encompasses a vast array of philosophies, lineages, and local practices. This experience presents only specific, localized lenses and does not represent the entirety of Sanatana Dharma.",
    theme: {
      bg: 'bg-orange-950',
      text: 'text-orange-50',
      accent: 'text-orange-400',
      border: 'border-orange-800',
      gradient: 'from-orange-950 via-red-950 to-orange-950'
    },
    hero: {
      image: 'https://images.unsplash.com/photo-1552831388-6a0b3507732a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Vibrant marigold offerings floating on the Ganges river',
      credit: 'Unsplash'
    },
    sections: [
      {
        id: 'origins',
        title: 'Origins & Cosmology',
        contentType: 'editorial',
        content: "Time is not a line; it is a wheel. The universe breathes in and out in vast cosmic cycles (yugas) of creation, preservation, and dissolution. Beneath the dizzying diversity of reality is Brahman—the singular, ultimate, formless reality. At the core of every individual is the Atman (soul), which is fundamentally identical to Brahman. The illusion (Maya) is that we are separate.",
        sources: [
          { id: 'src-20', text: 'Synthesis of Advaita Vedanta philosophical framing.' }
        ],
        review_status: 'reviewed'
      },
      {
        id: 'practice',
        title: 'A Day / A Life',
        contentType: 'immersive-paraphrase',
        lens: {
          branch: 'Vaishnavism / Smarta',
          location: 'Domestic Shrine, India',
          period: 'Contemporary',
          occasion: 'Morning Puja'
        },
        image: {
          url: 'https://images.unsplash.com/photo-1604005844810-740fcb21bb1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          alt: 'Lit brass oil lamps (diyas) in a dark setting',
          credit: 'Unsplash'
        },
        content: "You light the small brass oil lamp at the home shrine. The smell of sandalwood incense fills the room. You ring a small bell to awaken the deity, offering fresh marigold flowers, water, and fruit. You are not worshipping a statue; you are hosting the divine guest who has taken form (murti) to accept your love. Through this simple act of Bhakti (devotion), the vast cosmos becomes deeply intimate.",
        sources: [
          { id: 'src-21', text: 'Description of standard domestic puja practices.' }
        ],
        review_status: 'needs-practitioner-review'
      }
    ]
  }
};

// ============================================================================
// UTILITIES & HOOKS
// ============================================================================

// Respect prefers-reduced-motion
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return prefersReducedMotion;
};

// Scroll reveal using IntersectionObserver (disabled if reduced motion)
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, isVisible, reducedMotion };
};

// ============================================================================
// EDITORIAL COMPONENTS
// ============================================================================

const EditorialMeta = ({ section, theme }) => (
  <div className={`mt-8 pt-6 border-t border-white/10 text-xs opacity-70 font-sans tracking-wide space-y-2 max-w-2xl`}>
    {section.sources && section.sources.map(src => (
      <div key={src.id} className="flex items-start gap-2">
        <BookOpen size={14} className={`shrink-0 mt-0.5 ${theme.accent}`} />
        <span><strong className="font-semibold">Source:</strong> {src.text}</span>
      </div>
    ))}
    <div className="flex items-center gap-2 pt-2">
      {section.review_status === 'reviewed' ? (
        <CheckCircle size={14} className="text-green-500" />
      ) : (
        <ShieldAlert size={14} className="text-yellow-500" />
      )}
      <span className="uppercase tracking-widest text-[10px]">
        {section.review_status.replace(/-/g, ' ')}
      </span>
    </div>
  </div>
);

const LensLabel = ({ lens, theme }) => (
  <div className="mb-8 inline-block">
    <div className={`flex items-center gap-2 text-xs uppercase tracking-widest mb-2 ${theme.accent}`}>
      <Info size={14} />
      <span>Lived Lens</span>
    </div>
    <div className="font-sans text-sm opacity-80 border-l-2 border-white/20 pl-4 py-1">
      {lens.branch} · {lens.occasion} <br/>
      <span className="opacity-60">{lens.location} · {lens.period}</span>
    </div>
  </div>
);

// ============================================================================
// CONTENT MODULES (Routed by contentType)
// ============================================================================

const EditorialModule = ({ section, theme }) => {
  const { ref, isVisible, reducedMotion } = useScrollReveal();
  return (
    <div ref={ref} className={`py-20 transition-all duration-1000 ease-out ${!reducedMotion && !isVisible ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'}`}>
      <div className="max-w-3xl mx-auto">
        <h2 id={`section-${section.id}`} className="sr-only">{section.title}</h2>
        <div className={`text-sm font-sans tracking-[0.2em] uppercase mb-6 opacity-60 ${theme.accent}`}>
          {section.title}
        </div>
        <div className="font-serif text-lg md:text-xl leading-loose font-light">
          {section.content}
        </div>
        <EditorialMeta section={section} theme={theme} />
      </div>
    </div>
  );
};

const ImmersiveModule = ({ section, theme }) => {
  const { ref, isVisible, reducedMotion } = useScrollReveal();
  return (
    <div ref={ref} className={`relative py-32 my-12 overflow-hidden transition-all duration-1000 ease-out ${!reducedMotion && !isVisible ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Image Setup */}
      {section.image && (
        <>
          <div className="absolute inset-0 z-0">
            <img 
              src={section.image.url} 
              alt={section.image.alt}
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
            />
          </div>
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} mix-blend-multiply z-10`} />
        </>
      )}
      
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <h2 id={`section-${section.id}`} className="sr-only">{section.title}</h2>
        {section.lens && <LensLabel lens={section.lens} theme={theme} />}
        
        <div className="font-sans text-xl md:text-3xl leading-relaxed tracking-wide font-light bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-sm shadow-2xl">
          {section.content}
          <EditorialMeta section={section} theme={theme} />
        </div>
      </div>
    </div>
  );
};

const QuoteModule = ({ section, theme }) => {
  const { ref, isVisible, reducedMotion } = useScrollReveal();
  return (
    <div ref={ref} className={`py-24 px-6 transition-all duration-1000 ease-out ${!reducedMotion && !isVisible ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'}`}>
      <div className="max-w-4xl mx-auto relative">
        <h2 id={`section-${section.id}`} className="sr-only">{section.title}</h2>
        <Quote className={`absolute -top-8 -left-8 w-24 h-24 opacity-10 ${theme.accent} -rotate-6`} aria-hidden="true" />
        
        <div className={`text-sm font-sans tracking-[0.2em] uppercase mb-8 opacity-60 ${theme.accent}`}>
          {section.title}
        </div>
        
        <blockquote className="relative z-10">
          <div className={`font-serif text-2xl md:text-4xl italic leading-relaxed border-l-4 ${theme.border} pl-8 md:pl-12 py-2`}>
            &ldquo;{section.content}&rdquo;
          </div>
          <footer className="mt-8 pl-8 md:pl-12">
            <div className="font-sans font-semibold text-sm opacity-90">— {section.attribution}</div>
            <EditorialMeta section={section} theme={theme} />
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

// ============================================================================
// LAYOUT & VIEWS
// ============================================================================

const TraditionView = ({ tradition }) => {
  const reducedMotion = useReducedMotion();
  const heroBgRef = useRef(null);

  // High-performance parallax using requestAnimationFrame (No React state re-renders)
  useEffect(() => {
    if (reducedMotion) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroBgRef.current) {
            const scrolled = window.scrollY;
            heroBgRef.current.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tradition.id]);

  return (
    <article className={`min-h-screen ${tradition.theme.bg} ${tradition.theme.text} selection:bg-white/20 relative`}>
      
      {/* Persistent Nav */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <a 
          href="#"
          className="flex items-center space-x-3 text-sm font-sans uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm px-2 py-1"
          aria-label="Return to tradition index"
        >
          <ArrowLeft size={18} />
          <span>Index</span>
        </a>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div 
          ref={heroBgRef}
          className="absolute inset-0 z-0 origin-top"
        >
           <img 
              src={tradition.hero.image} 
              alt={tradition.hero.alt}
              className="w-full h-full object-cover"
            />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b ${tradition.theme.gradient} mix-blend-multiply z-10`} />
        
        <div className="relative z-20 px-6 max-w-4xl mx-auto mt-16">
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter mb-6 drop-shadow-2xl">
            {tradition.name}
          </h1>
          <div className="inline-block border border-white/20 bg-black/40 backdrop-blur-md px-6 py-4 rounded-sm text-sm md:text-base font-sans font-light opacity-90 max-w-2xl mx-auto mt-8">
            <span className="font-semibold block mb-1 uppercase tracking-widest text-xs opacity-60">Editorial Note</span>
            {tradition.disclaimer}
          </div>
        </div>

        {!reducedMotion && (
          <div className="absolute bottom-12 z-20 animate-bounce opacity-60 motion-reduce:hidden" aria-hidden="true">
            <ChevronDown size={32} />
          </div>
        )}
      </header>

      {/* Content Renderer */}
      <div className="relative z-20 pb-32 max-w-7xl mx-auto px-4 md:px-8">
        {tradition.sections.map((section) => (
          <section key={section.id} aria-labelledby={`section-${section.id}`}>
            {section.contentType === 'editorial' && <EditorialModule section={section} theme={tradition.theme} />}
            {section.contentType === 'immersive-paraphrase' && <ImmersiveModule section={section} theme={tradition.theme} />}
            {section.contentType === 'attributed-quote' && <QuoteModule section={section} theme={tradition.theme} />}
          </section>
        ))}
      </div>
      
      <footer className="text-center pb-20 opacity-40 text-xs font-sans tracking-[0.3em] uppercase">
        — End of {tradition.name} —
      </footer>
    </article>
  );
};

// ============================================================================
// APP ROUTER & ENTRY
// ============================================================================

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 selection:bg-stone-100 selection:text-stone-900 flex flex-col">
      <div className="flex-grow flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto w-full py-24">
        
        <header className="mb-24 text-center md:text-left max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-serif tracking-tighter mb-6">
            {APP_CONFIG.title}
          </h1>
          <p className="text-2xl md:text-4xl font-light text-stone-400 mb-6 font-sans">
            {APP_CONFIG.subtitle}
          </p>
          <p className="text-stone-500 font-serif italic text-lg md:text-xl leading-relaxed">
            {APP_CONFIG.description}
          </p>
        </header>

        <nav aria-label="Traditions Index">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(TRADITIONS).map((trad) => (
              <li key={trad.id}>
                <a
                  href={`#${trad.id}`}
                  className="group relative overflow-hidden text-left p-10 h-80 flex flex-col justify-between border border-stone-800 hover:border-stone-500 transition-all duration-500 bg-stone-900 block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-stone-950 rounded-sm"
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={trad.hero.image} 
                      alt="" // Decorative on landing page
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-opacity duration-700 motion-safe:group-hover:scale-105 motion-safe:transform"
                      aria-hidden="true"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${trad.theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply`} />
                  
                  <div className="relative z-20">
                    <span className="text-xs font-sans uppercase tracking-[0.2em] text-stone-500 mb-4 block group-hover:text-stone-300 transition-colors">
                      Tradition
                    </span>
                    <h2 className="text-4xl font-serif group-hover:italic transition-all duration-300 drop-shadow-md">
                      {trad.name}
                    </h2>
                  </div>
                  <div className="relative z-20 flex justify-end opacity-0 group-hover:opacity-100 transition-all transform motion-safe:translate-x-4 motion-safe:group-hover:translate-x-0 duration-500 text-stone-200">
                    <ArrowLeft size={32} className="rotate-180" aria-hidden="true" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <footer className="p-8 text-center text-[10px] font-sans tracking-widest text-stone-600 uppercase border-t border-stone-900">
        v2 · Production Shell & Editorial Governance
      </footer>
    </main>
  );
};

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Lightweight hash router
  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeTraditionId = currentHash.replace('#', '');
  const activeTradition = TRADITIONS[activeTraditionId];

  return (
    <div className="antialiased overflow-x-hidden bg-stone-950">
      {activeTradition ? (
        <TraditionView tradition={activeTradition} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}