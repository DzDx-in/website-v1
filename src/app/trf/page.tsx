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
  const [showBanner, setShowBanner] = useState(false);

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
        setShowBanner(true);
        document.getElementById('landing')?.scrollIntoView({ behavior: 'smooth' });

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
      {showBanner && (
        <div className="banner-alert">
          <span>
            Successfully added to waitlist! We'll be in touch soon.
          </span>
          <button className="banner-close" onClick={() => setShowBanner(false)}>
            &times;
          </button>
        </div>
      )}
      {/* Landing Section */}
      <div id="landing" className="landing-section">
        <div className="landing-text-wrapper">
          <div className="landing-intro">Introducing</div>
          <div className="landing-title-container">
            <div className="beta-label">BETA</div>
            <h1 className="landing-title">THE REAL FEED</h1>
          </div>
          <div className="landing-motto">
            Facts <span className="dot">•</span> Perspective <span className="dot">•</span> Power
          </div>
        </div>
      </div>

      {isSticky && (
        <div className="sticky-title">The Real Feed</div>
      )}


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