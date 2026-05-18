import { Link } from 'react-router-dom';

export function BreathworkSection() {
  const e = [{
    glyph: "◇",
    title: "Breath architecture",
    description: "Structured breathing patterns create rhythm, safety, and depth so your body can lead when the mind quiets."
  }, {
    glyph: "♪",
    title: "Immersive sound",
    description: "Spatial audio and music design widen the journey: emotion, memory, and meaning move together."
  }, {
    glyph: "◎",
    title: "Somatic guidance",
    description: "Gentle cues help you notice tension, sensation, and release without forcing or performing."
  }, {
    glyph: "✦",
    title: "Visualization & intention",
    description: "Imagery and narrative anchor your purpose so shifts land as insight you can carry forward."
  }, {
    glyph: "☉",
    title: "Voice & affirming language",
    description: "Facilitation meets you where you are supportive, clear, and paced for nervous-system-friendly exploration."
  }, {
    glyph: "⌁",
    title: "Arc of the journey",
    description: "Opening, build, peak integration, and grounding so you never leave the session feeling unfinished."
  }, {
    glyph: "◉",
    title: "Presence & container",
    description: "A held environment (virtual or studio event) makes it easier to trust the process and go deeper."
  }, {
    glyph: "⚡",
    title: "State shift",
    description: "Designed to help you move from stuck or overloaded into clarity, softness, or renewed energy."
  }, {
    glyph: "⟲",
    title: "Integration",
    description: "Closing practices reconnect you to the present, embodied, oriented, and ready for what is next."
  }];
  return <section id="breathwork" className="nlm-bw9-section" aria-labelledby="nlm-bw9-heading"><div className="nlm-container"><div className="section-header center"><div className="eyebrow">Next Level 9D Breathwork</div><h2 id="nlm-bw9-heading">9D Breathwork<span className="nlm-bw9-headline-sub">Immersive journeys for real nervous-system shifts</span></h2></div><div className="nlm-bw9-block-head section-header center"><div className="nlm-bw9-final-actions"><Link className="btn btn-primary" to="/book/virtual-9d#virtual-9d">Begin Your Virtual Journey</Link></div><h3 className="nlm-bw9-h3">Why clients describe 9D as “more than breathwork”</h3><p>9D is breathwork reimagined as a cinematic masterpiece for your subconscious. By stacking nine distinct layers of sensory data from spatial audio to vibrational frequency we create an immersive, emotionally coherent landscape that feels more like a lived experience than a session. Why settle for a single technique on repeat when you can journey through a multi-dimensional breakthrough?</p></div><div className="nlm-bw9-dimensions">{e.map(t => <article className="nlm-bw9-dimension-card" key={t.title}><div className="nlm-bw9-dimension-glyph" aria-hidden={true}>{t.glyph}</div><h4>{t.title}</h4><p>{t.description}</p></article>)}</div><div className="nlm-bw9-expect glass"><div className="nlm-bw9-expect-head"><div className="eyebrow">Before you arrive</div><h3 className="nlm-bw9-h3">What to expect from start to finish</h3></div><ol className="nlm-bw9-steps"><li><strong>Reserve your seat</strong> — complete scheduling and payment when you are ready to commit.</li><li><strong>Prepare your space</strong> — hydrate, dress comfortably, carve uninterrupted time, test tech (virtual).</li><li><strong>Opening & consent</strong> — agreements, intentions, and nervous system safety framing from facilitation.</li><li><strong>The journey</strong> — layered breath, sound, language, and integration arcs designed to carry you without overwhelm.</li><li><strong>Grounding & aftercare</strong> — gentle closure, optional journaling, and guidance for integrating insights over the next few days.</li></ol><div className="nlm-bw9-final-cta nlm-bw9-final-cta--in-expect"><p className="nlm-bw9-final-copy">Stop analyzing your growth and start experiencing it. Whether you join us in the studio or from the comfort of home, your next breakthrough is only a breath away.</p><div className="nlm-bw9-final-actions"><Link className="btn btn-primary" to="/book/virtual-9d#virtual-9d">Begin Your Virtual Journey</Link></div></div></div></div></section>;
}
