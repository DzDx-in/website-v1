'use client';
import { useEffect, useState } from 'react';

import './trf.css';
import { cardsData } from './card_details';
import Link from 'next/link';
import Image from 'next/image';

export default function TRFPage() {
  const [isSticky, setIsSticky] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const LAUNCH_DATE = new Date('2025-08-15T00:00:00');
      const launch = LAUNCH_DATE.getTime();
      const distance = launch - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // call once immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWaitlistStats = async () => {
      try {
        const response = await fetch('/api/waitlist');
        const result = await response.json();

        if (result.success && result.data?.totalCount !== undefined) {
          const realCount = result.data.totalCount;
          const boostedCount = realCount + 1410;
          setWaitlistCount(boostedCount);
        }
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };

    fetchWaitlistStats();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.scrollY > window.innerHeight * 0.9;
      setIsSticky(trigger);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to your API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim()
        })
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setEmail('');
        setPhone('');

        // Show success message
        alert(`Successfully added to waitlist! We'll be in touch soon.`);
      } else {
        // Show error message
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      {/* Landing Section */}
      <div className="landing-section">
        <div className="landing-text-wrapper">
          <div className="landing-intro">Introducing</div>
          <h1 className="landing-title">The Real Feed</h1>
          <div className="landing-motto">
            Facts <span className="dot">•</span> Perspective <span className="dot">•</span> Power
          </div>
        </div>
      </div>


      {isSticky && (
        <div className="sticky-title">The Real Feed</div>
      )}

      {/* Cards Container */}
      <div className="container" style={{ height: `${cardsData.length * 100}vh` }}>
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`card card-${card.id}`}
            style={{ zIndex: index + 2 }}
          >
            {/* Vertical labels outside the card */}
            <div className="vertical-label left-label">Our Solution</div>
            <div className="vertical-label right-label">Current Problem</div>

            <div className="card-content">
              {/* USP Section - Left */}
              <div className="section usp-section">
                <h2 className="section-title">{card.usp.title}</h2>
                <p className="section-description">{card.usp.description}</p>
                <ul className="bullet-points">
                  {card.usp.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Issue Section - Right */}
              <div className="section issue-section">
                <h2 className="section-title">{card.issue.title}</h2>
                <p className="section-description">{card.issue.description}</p>
                <ul className="bullet-points">
                  {card.issue.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <div className="timeline-content">
          <h2 className="timeline-title">How News Analysis Evolved</h2>
          <p className="timeline-subtitle">From basic reporting to AI-powered truth detection</p>

          <div className="timeline-container">
            <div className="timeline-item timeline-left">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-year">1990s</div>
                <h3>Traditional Media Era</h3>
                <p>Newspapers and TV dominated. Editorial bias existed but was often transparent. Fact-checking was internal and basic.</p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-year">2000s</div>
                <h3>Digital Revolution</h3>
                <p>Online news exploded. Speed became priority over accuracy. First fact-checking websites emerged like Snopes and PolitiFact.</p>
              </div>
            </div>

            <div className="timeline-item timeline-left">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-year">2010s</div>
                <h3>Social Media Chaos</h3>
                <p>Facebook and Twitter became news sources. Clickbait headlines optimized for engagement. Echo chambers and filter bubbles formed.</p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-year">2016</div>
                <h3>Fake News Crisis</h3>
                <p>Election misinformation peak. &quot;Fake news&quot; entered mainstream vocabulary. Manual fact-checking couldn&apos;t keep up with viral false content.</p>
              </div>
            </div>

            <div className="timeline-item timeline-left">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-year">2020</div>
                <h3>AI Detection Begins</h3>
                <p>First AI tools for detecting bias and misinformation. COVID-19 &quot;infodemic&quot; showed need for real-time analysis. Basic sentiment analysis tools emerged.</p>
              </div>
            </div>

            <div className="timeline-item timeline-right">
              <div className="timeline-dot timeline-current"></div>
              <div className="timeline-card timeline-current-card">
                <div className="timeline-year">2025</div>
                <h3>The Real Feed Era</h3>
                <p>Comprehensive AI analysis of every article. Real-time bias detection, emotional manipulation flagging, and factual verification at scale.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div className="waitlist-section">
        <div className="waitlist-content">
          <div className="waitlist-badge">Early Access</div>
          <h2 className="waitlist-title">Join the Revolution</h2>
          <p className="waitlist-subtitle">
            Be among the first to experience truly unbiased news. Get early access to The Real Feed
            and help shape the future of information consumption.
          </p>

          <form onSubmit={handleSubmit} className="waitlist-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          <div className="waitlist-stats">
            <div className="stat-item">
              <span className="stat-number">
                {waitlistCount !== null ? waitlistCount.toLocaleString() : '...'}
              </span>

              <span className="stat-label">People Waiting</span>
            </div>

            <div className="stat-item">
              <span className="stat-number">
                {timeLeft.days}D : {timeLeft.hours}H : {timeLeft.minutes}M : {timeLeft.seconds}S
              </span>
              <span className="stat-label">Until Launch</span>
            </div>

            {/* <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Bias-Free</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <Image
              src="/dzdx_nobg.png"
              alt="DZDX Logo"
              width={150}
              height={40}
              className="h-auto"
            />
            <br />
            <p>
              Revolutionizing news consumption through AI-powered analysis.
              We&apos;re committed to delivering unbiased, factual information
              that empowers informed decision-making.
            </p>
            <p className="company-name">DZDX Solutions Pvt. Ltd.</p>
          </div>

          <div className="footer-section">
            <h3>Contact & Office</h3>
            <p>
              <strong>Headquarters:</strong><br />
              Off No. 19, First Floor, SGM Plaza, 8/226(1),<br />
              Arya Nagar, Kanpur, Uttar Pradesh,<br />
              India
            </p>
            <p>
              <strong>Email:</strong> support@dzdx.in<br />
              <strong>Phone:</strong> +91 89489 83888
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 DZDX Solutions Pvt. Ltd. All rights reserved. | <Link href="https://dzdx.in/privacy-policy">Privacy Policy</Link> | <Link href="https://dzdx.in/terms-of-service">Terms of Service</Link> | <Link href="https://dzdx.in/support">Support</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}