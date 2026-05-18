import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BreathworkSection } from './BreathworkSection';
import { CalendlyInline } from './CalendlyInline';
import { assetUrl } from '../assetUrl';
import {
  CALENDLY_DEEP_DIVE,
  CALENDLY_DISCOVERY,
  CALENDLY_ONE_ON_ONE,
  OPEN_DISCOVERY_HASH,
} from './calendlyUrls';

export function NlmCoachingPage() {
  const e = useLocation();
  const [t, r] = useState(false);
  const [n, a] = useState(false);
  const [i, o] = useState(false);
  const l = useRef<HTMLDivElement>(null);
  const u = useRef<HTMLDivElement>(null);
  const f = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const x = document.title;
    document.title = "Next Level Mindset Coaching | Shift Your Mindset. Create Lasting Change.";
    const _ = document.documentElement;
    const w = _.style.scrollBehavior;
    _.style.scrollBehavior = "smooth";
    return () => {
      document.title = x;
      _.style.scrollBehavior = w;
    };
  }, []);
  useEffect(() => {
    if (t) {
      requestAnimationFrame(() => {
        l.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, [t]);
  useEffect(() => {
    if (n) {
      requestAnimationFrame(() => {
        u.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, [n]);
  useEffect(() => {
    if (i) {
      requestAnimationFrame(() => {
        f.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, [i]);
  useEffect(() => {
    if (e.pathname === "/nlm-coaching" && e.hash === OPEN_DISCOVERY_HASH) {
      a(false);
      o(false);
      r(true);
    }
  }, [e.pathname, e.hash]);
  useEffect(() => {
    if (e.pathname !== "/nlm-coaching") {
      return;
    }
    const x = e.hash.replace(/^#/, "");
    if (!!x && x !== "open-discovery") {
      requestAnimationFrame(() => {
        document.getElementById(x)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, [e.pathname, e.hash]);
  const d = () => {
    if (t) {
      l.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    a(false);
    o(false);
    r(true);
  };
  const g = () => {
    if (n) {
      u.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    r(false);
    o(false);
    a(true);
  };
  const v = () => {
    if (i) {
      f.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    r(false);
    a(false);
    o(true);
  };
  return <div className="nlm-coaching-site" lang="en"><header className="topbar"><div className="nlm-container nav"><Link className="brand" to="/nlm-coaching#top" aria-label="Next Level Mindset Coaching home"><div className="brand-mark"><img src="/nlm-heart-logo.png" alt="" width={1024} height={1024} className="brand-mark-img" loading="eager" decoding="async" fetchPriority="high" /></div><span className="brand-text">Next Level<br />Mindset Coaching</span></Link><nav className="nav-links" aria-label="Primary navigation"><Link to="/nlm-coaching#coaching">Coaching</Link><Link to="/nlm-coaching#offers">Programs</Link><Link to="/nlm-coaching#nlm-bw9-heading">9D Breathwork</Link><Link to="/nlm-coaching#testimonials">Testimonials</Link><Link to="/nlm-coaching#about">About Jeff</Link></nav><button type="button" className="btn btn-primary" onClick={d} aria-expanded={t} aria-controls={t ? "discovery-calendly-widget" : undefined} title={t ? "Scroll to the scheduling calendar" : "Open the free discovery scheduling calendar"}>Book Free Call</button></div></header><main id="top"><section className="hero"><div className="nlm-container hero-grid"><div><div className="eyebrow">Mindset • Breathwork • Lasting Change</div><h1>Shift Your Mindset. <span className="script">Create Lasting Change.</span></h1><p className="hero-copy">For high-performing individuals and Corporate Leadership teams who feel stuck or overwhelmed, Next Level Mindset Coaching provides the edge you need. By combining elite mindset mastery with the physiological power of 9D Breathwork, we help you break old patterns, regulate your system for peak performance, and step into the next level of your life and leadership with total clarity.</p><div className="trust-row"><div className="trust-chip">Break old limiting patterns</div><div className="trust-chip">Build clarity + confidence</div><div className="trust-chip">9D Breathwork Experiences</div></div></div><div className="hero-card" role="img" aria-label="Premium coaching environment with modern transformation theme"><div className="floating-panel"><h3>Right here, Right now.</h3><p>Break free from what no longer serves you to make room for what truly matters. Transition from feeling stuck to moving forward with a clear mind and a free spirit, fully commanding your own path through purposeful action.</p><div className="meter"><div className="meter-item"><span>Clarity</span><div className="bar"><span style={{
                      width: "92%"
                    }} /></div></div><div className="meter-item"><span>Confidence</span><div className="bar"><span style={{
                      width: "86%"
                    }} /></div></div><div className="meter-item"><span>Action</span><div className="bar"><span style={{
                      width: "95%"
                    }} /></div></div></div></div></div></div></section><section id="coaching"><div className="nlm-container"><div className="shift-box glass"><div className="shift-image"><img src={assetUrl('jeff-mason-coaching.png')} alt="Jeff Mason, professional coaching portrait" /></div><div><div className="eyebrow">You are not broken</div><h2>You are ready to shift.</h2><p className="lead">External success shouldn't come at the cost of internal alignment. Bridge the gap between where you are and who you're meant to be.</p><div className="check-list"><div className="check-item"><div className="check-icon" aria-hidden={true}>✓</div><div>Get clear on the patterns, beliefs, and habits that keep repeating.</div></div><div className="check-item"><div className="check-icon" aria-hidden={true}>✓</div><div>Forge an unbreakable mindset for stress and decisive action.</div></div><div className="check-item"><div className="check-icon" aria-hidden={true}>✓</div><div>Breathe your way into the absolute best version of yourself.</div></div></div></div></div></div></section><section><div className="nlm-container"><div className="section-header"><div className="eyebrow">The Next Level Method</div><h2>Three pillars of real transformation.</h2><p>Forget temporary motivation. We build the internal clarity and external systems that turn peak performance into your permanent default state.</p></div><div className="pillars"><article className="pillar-card"><div className="icon-circle" aria-hidden={true}>◈</div><h3>Mindset</h3><p>Reframe beliefs and self talk so you meet pressure and setbacks with clarity and confidence instead of old conditioning.</p></article><article className="pillar-card"><div className="icon-circle" aria-hidden={true}>↺</div><h3>9D Breathwork</h3><p>Guided multi-dimensional breathing to regulate your nervous system, release tension, and reconnect body and mind.</p></article><article className="pillar-card"><div className="icon-circle" aria-hidden={true}>➜</div><h3>Lasting Change</h3><p>Integrate what you learn into daily life so your new habits become your identity and create real transformation that lasts.</p></article></div></div></section><section id="offers"><div className="nlm-container"><div className="section-header"><div className="eyebrow">Coaching Options</div><h2>Choose the level of support that fits where you are.</h2><p>Start with a free discovery session or move into a deeper coaching container designed to help you create meaningful momentum.</p></div><div className="offers-grid"><article className="offer-card"><div className="offer-badge">Start Here</div><h3>Free Discovery Session</h3><div className="price">60 Min</div><p>A no pressure conversation to understand where you are, what you want to change, and whether coaching is the right fit.</p><div className="nlm-offer-card-actions"><button type="button" className="btn btn-primary" onClick={d} aria-expanded={t} aria-controls={t ? "discovery-calendly-widget" : undefined} title={t ? "Scroll to the scheduling calendar" : "Open the scheduling calendar"}>Schedule Now</button></div></article><article className="offer-card"><div className="offer-badge">Focused Breakthrough</div><h3>1:1 Coaching Session</h3><div className="price">60 Min</div><p>A focused coaching session designed to address a specific issue, decision, or pattern that has been holding you back and create a plan to move forward.</p><div className="nlm-offer-card-actions"><button type="button" className="btn btn-secondary" onClick={g} aria-expanded={n} aria-controls={n ? "one-on-one-calendly-widget" : undefined} title={n ? "Scroll to the 1:1 session calendar" : "Open the 1:1 session calendar"}>Book Session</button></div></article><article className="offer-card"><div className="offer-badge">Deep Change</div><h3>Transformation Package</h3><div className="price">6 Weeks</div><p>A deeper coaching container to clarify your goals, break limiting beliefs, create new patterns, and move with accountability.</p><div className="nlm-offer-card-actions"><button type="button" className="btn btn-primary" onClick={v} aria-expanded={i} aria-controls={i ? "deep-dive-calendly-widget" : undefined} title={i ? "Scroll to the transformation package calendar" : "Open the transformation package calendar"}>Apply Now</button></div></article></div></div></section><BreathworkSection /><section id="testimonials"><div className="nlm-container"><div className="section-header"><div className="eyebrow">Client Results</div><h2>Real people. Real shifts. Lasting change.</h2><p className="nlm-testimonials-lede">Transformation starts when you are willing to look honestly at what is no longer working and take one aligned step forward.</p></div><div className="testimonials"><article className="testimonial-card"><div className="quote" aria-hidden={true}>“</div><p>Jeff helped me see the pattern I kept repeating and gave me the tools to move through it with more clarity and confidence.</p><strong>Fidel S.</strong></article><article className="testimonial-card"><div className="quote" aria-hidden={true}>“</div><p>I came in feeling stuck and overwhelmed.<br />I left with a clear plan, a new perspective, and a stronger belief in myself.</p><strong>Tia H.</strong></article><article className="testimonial-card"><div className="quote" aria-hidden={true}>“</div><p>The biggest shift was realizing I had more control than I thought. The coaching helped me take action instead of staying in my head.</p><strong>Ricky T.</strong></article></div></div></section><section id="about" aria-labelledby="about-heading"><div className="nlm-container about-grid"><div className="about-photo" role="img" aria-label="Jeff Mason, professional coaching portrait" /><div className="about-copy glass"><div className="eyebrow" id="about-heading">Meet Your Coach</div><p className="lead">Jeff helps you identify the hidden habits keeping you stuck and replaces them with a deeper connection to your core purpose. His unique methodology blends the science of mindset with the power of 9D Breathwork, creating a safe yet powerful container for you to release the old and step into a version of yourself that is grounded, energized, and ready for what's next.</p><div className="check-list"><div className="check-item"><div className="check-icon" aria-hidden={true}>✓</div><div>20+ years building and leading high-performing teams.</div></div><div className="check-item"><div className="check-icon" aria-hidden={true}>✓</div><div>Certified 9D Breathwork Facilitator</div></div><div className="check-item"><div className="check-icon" aria-hidden={true}>✓</div><div>Focused on clarity, confidence, and lasting transformation.</div></div></div><div className="signature">Jeff Mason</div></div></div></section><section id="book"><div className="nlm-container"><div className="final-cta"><div className="eyebrow">Your Next Level Starts Now</div><h2>Right here, Right now.</h2><p>You do not need to have everything figured out. You just need to be ready to look honestly at what is no longer working and take the next step toward who you know you are capable of becoming.</p><button type="button" className="btn btn-primary" aria-expanded={t} aria-controls={t ? "discovery-calendly-widget" : undefined} onClick={d} title={t ? "Scroll to the scheduling calendar" : "Open the scheduling calendar below"}>Schedule Your Session</button>{t ? <div id="discovery-calendly-widget" ref={l} className="nlm-discovery-widget-wrap"><div className="nlmc-calendly-host nlmc-calendly-host--flush"><CalendlyInline scheduleUrl={CALENDLY_DISCOVERY} className="nlmc-calendly-inline" minHeight={700} iframeTitle="Schedule your free discovery consultation" /></div></div> : null}{n ? <div id="one-on-one-calendly-widget" ref={u} className="nlm-one-on-one-widget-wrap"><div className="nlmc-calendly-host nlmc-calendly-host--flush"><CalendlyInline scheduleUrl={CALENDLY_ONE_ON_ONE} className="nlmc-calendly-inline" minHeight={700} iframeTitle="Book a 1:1 coaching session" /></div></div> : null}{i ? <div id="deep-dive-calendly-widget" ref={f} className="nlm-deep-dive-widget-wrap"><div className="nlmc-calendly-host nlmc-calendly-host--flush"><CalendlyInline scheduleUrl={CALENDLY_DEEP_DIVE} className="nlmc-calendly-inline" minHeight={700} iframeTitle="Apply for the 6-session transformation package" /></div></div> : null}</div></div></section></main><footer className="nlm-footer"><div className="nlm-container">© 2026 Next Level Mindset Coaching | 9D Breathwork | Mindset • Breathwork • Lasting Change</div></footer></div>;
}
