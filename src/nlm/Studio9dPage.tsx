import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LiabilityReleaseContent } from './LiabilityReleaseContent';
import { StudioCheckoutButton } from './StudioCheckoutButton';
import { STUDIO_EVENT } from './studioEvent';

export function Studio9dPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Next Level 9D Breathwork Studio Event';
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'smooth';
    return () => {
      document.title = previousTitle;
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  useEffect(() => {
    if (sessionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [sessionId]);

  const locationLine = `${STUDIO_EVENT.address} · ${STUDIO_EVENT.hostCity}`;

  return (
    <div className="nlm-coaching-site" lang="en">
      <header className="topbar">
        <div className="nlm-container nav">
          <Link className="brand" to="/nlm-coaching#top" aria-label="Next Level Mindset Coaching home">
            <div className="brand-mark">
              <img
                src="/nlm-heart-logo.png"
                alt=""
                width={1024}
                height={1024}
                className="brand-mark-img"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <span className="brand-text">
              Next Level
              <br />
              Mindset Coaching
            </span>
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            <Link to="/nlm-coaching#coaching">Coaching</Link>
            <Link to="/nlm-coaching#offers">Programs</Link>
            <Link to="/nlm-coaching#nlm-bw9-heading">9D Breathwork</Link>
            <Link to="/nlm-coaching#testimonials">Testimonials</Link>
            <Link to="/nlm-coaching#about">About Jeff</Link>
          </nav>
          <Link
            className="btn btn-primary"
            to="/nlm-coaching#open-discovery"
            title="Book a free discovery call — same scheduling flow as Schedule Now under Coaching Options"
          >
            Book Free Call
          </Link>
        </div>
      </header>

      <div className="jb-studio-page" lang="en">
        {sessionId ? (
          <div className="jb-studio-pay-success" role="status">
            <strong>Thanks — your payment session finished.</strong> Stripe emailed a receipt if the
            charge succeeded. Reference: <code>{sessionId}</code>
          </div>
        ) : null}

        <header className="jb-hero">
          <div className="jb-wrap">
            <div className="jb-grid">
              <div>
                <div className="jb-eyebrow">Next Level 9D Breathwork Studio Event</div>
                <h1 className="jb-h1">Release. Reset. Reconnect.</h1>
                <h2 className="jb-headline">An immersive 9D Breathwork Experience</h2>
                <p className="jb-sub">
                  Choose your day and time, review the liability release, pay securely, and arrive
                  ready for a powerful breath + sound journey.
                </p>
              </div>
              <aside className="jb-card jb-eventInfo">
                <div className="jb-infoLine">
                  <div className="jb-ico" aria-hidden={true}>
                    ⌂
                  </div>
                  <div>
                    <b>{STUDIO_EVENT.studioName}</b>
                    <br />
                    <span>{locationLine}</span>
                  </div>
                </div>
                <div className="jb-infoLine">
                  <div className="jb-ico" aria-hidden={true}>
                    ●
                  </div>
                  <div>
                    <b>Investment</b>
                    <br />
                    <span>{STUDIO_EVENT.price} per person</span>
                  </div>
                </div>
                <div className="jb-infoLine">
                  <div className="jb-ico" aria-hidden={true}>
                    ◌
                  </div>
                  <div>
                    <b>Available spots</b>
                    <br />
                    <span>{STUDIO_EVENT.capacity}</span>
                  </div>
                </div>
                <div className="jb-infoLine">
                  <div className="jb-ico" aria-hidden={true}>
                    ✓
                  </div>
                  <div>
                    <b>Required before attending</b>
                    <br />
                    <span>Release acknowledgment + payment confirmation</span>
                  </div>
                </div>
                <div className="jb-eventInfo-rule" aria-hidden={true} />
                <div className="jb-eventInfo-foot">
                  <a className="jb-pill" href="#reserve">
                    Reserve Your Spot
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </header>

        <section className="jb-section" id="details">
          <div className="jb-container jb-split">
            <div>
              <h2>The Studio Experience</h2>
              <p>
                Experience the full power of 9D Breathwork as it was meant to be felt: live, loud,
                and in person. In our dedicated studio space, the multi-dimensional soundscapes and
                expert guidance converge to create a safe, profound container for deep release.
              </p>
            </div>
            <div className="jb-card jb-card--vcenter">
              <h3>The Experience</h3>
              <p>
                Step into a multi-dimensional journey designed to bridge the gap between where you
                are and who you&apos;re meant to be.
              </p>
              <p>
                <strong>Your Essentials:</strong> Bring a yoga mat, blanket, eye mask, and water. (9D
                Headphones will be provided).
              </p>
            </div>
          </div>
        </section>

        <section className="jb-section" id="reserve">
          <div className="jb-container jb-split">
            <div>
              <h2>Reserve your spot</h2>
              <p>
                Complete the details below, sign the safety acknowledgment, then choose your time to
                finalize your reservation.
              </p>
            </div>
            <form
              id="studio-reserve-form"
              className="jb-card jb-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="jb-field">
                <label htmlFor="studio-email">Email</label>
                <input
                  id="studio-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="jb-field">
                <label htmlFor="studio-phone">Phone</label>
                <input id="studio-phone" name="phone" required placeholder="Mobile number" />
              </div>
              <div className="jb-releaseBox">
                <LiabilityReleaseContent />
              </div>
              <label className="jb-check">
                <input required type="checkbox" name="releaseAck" />{' '}
                <span>
                  I have read, understood, and acknowledge the liability release and participant
                  responsibilities.
                </span>
              </label>
              <div className="jb-field">
                <label htmlFor="studio-sig">Electronic signature</label>
                <input
                  id="studio-sig"
                  name="signature"
                  required
                  placeholder="Type your full name"
                />
              </div>
              <StudioCheckoutButton
                formId="studio-reserve-form"
                calendlyUrl={STUDIO_EVENT.studioCalendlyUrl}
              />
            </form>
          </div>
        </section>

        <footer className="jb-footer">
          © 2026 Next Level Mindset Coaching | 9D Breathwork | Mindset • Breathwork • Lasting Change
        </footer>
      </div>
    </div>
  );
}
