import React, { useState, useEffect, useRef } from 'react';
import { INVITATION_DATA } from './invitationData';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
  };

  const audioRef = useRef(null);

  // Countdown timer calculation
  useEffect(() => {
    function calcTime() {
      const target = new Date(INVITATION_DATA.schedule.targetDateTime).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    }

    calcTime();
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle music toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play prevented', err);
      });
    }
  };

  // Open the invitation and start the background music.
  const handleOpenEnvelope = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.warn(err));
    }

    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="royal-app" dir="rtl">
      {/* Background Audio */}
      <audio ref={audioRef} src={INVITATION_DATA.audioTrack} loop preload="auto" />

      {/* Floating Music Button (Matching screenshot) */}
      <button 
        className={`floating-music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        <div className="music-bars">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* ====================================================== */}
      {/* SCREEN 1: NEW ENVELOPE (MATCHING USER REFERENCE IMAGE) */}
      {/* ====================================================== */}
      <section className={`envelope-stage ${isOpened ? 'opened' : ''}`}>
        <div className="envelope-wrapper">
          <p className="envelope-top-subtitle">{INVITATION_DATA.envelopeHeader}</p>
          
          {/* Cursive Italic English Script Names */}
          <h1 className="envelope-names-script">
            {INVITATION_DATA.scriptNames}
          </h1>

          <div className="envelope-image-box" onClick={handleOpenEnvelope}>
            <img src="/envelope.png" alt="Engagement invitation envelope" className="envelope-img" />
          </div>

          <button type="button" className="click-to-open-text" onClick={handleOpenEnvelope}>
            Click <span className="underlined">here</span> to open
          </button>
        </div>
      </section>

      {/* ====================================================== */}
      {/* SCREEN 2: THE ROYAL INVITATION CARD (FULLSCREEN)       */}
      {/* ====================================================== */}
      <main className="invitation-fullscreen-container">
        <article className="invitation-sheet">

          <div className="side-lace-border side-lace-left" aria-hidden="true"></div>
          <div className="side-lace-border side-lace-right" aria-hidden="true"></div>

          <div className="header-drape-left" aria-hidden="true">
            <img src="/curtain.png" alt="" />
          </div>

          <div className="header-bouquet-right" aria-hidden="true">
            <img src="/bouquet.png" alt="" />
          </div>

          <div className="sheet-inner">


            {/* 2. INVITATION WELCOME MESSAGE */}
            <p className="invitation-intro-msg invitation-english-intro">{INVITATION_DATA.welcomeMessage}</p>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 3. GROOM & BRIDE NAMES (BURGUNDY SCRIPT TYPOGRAPHY) */}
            <section className="names-container">
              <div className="person-block">
                <h2 className="person-title-script">{INVITATION_DATA.groom.name}</h2>
                <span className="person-role-tag">{INVITATION_DATA.groom.subtitle}</span>
              </div>

              <div className="ampersand-sign">&amp;</div>

              <div className="person-block">
                <h2 className="person-title-script">{INVITATION_DATA.bride.name}</h2>
                <span className="person-role-tag">{INVITATION_DATA.bride.subtitle}</span>
              </div>
            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 5. EVENT TIMING & DATE (MATCHING SCREENSHOT RHYTHM) */}
            <section className="event-timing-section">
              <p className="timing-intro-label">{INVITATION_DATA.schedule.headingEn}</p>
              <h3 className="timing-big-hour" dir="ltr" style={{ direction: 'ltr', display: 'inline-block' }}>
                {INVITATION_DATA.schedule.timeDisplay}
              </h3>

              <div className="timing-date-row" dir="ltr">
                <span>{INVITATION_DATA.schedule.dateDayName}</span>
                <span>|</span>
                <span className="date-day-num">{INVITATION_DATA.schedule.dateDayNumber}</span>
                <span>|</span>
                <span>{INVITATION_DATA.schedule.dateMonthYear}</span>
              </div>

            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 6. COUNTDOWN TIMER (FROM LEFT TO RIGHT: DAYS, HOURS, MINUTES, SECONDS) */}
            <section className="countdown-container-elegant" dir="ltr">
              <h4 className="countdown-title-tag">— COUNTDOWN —</h4>
              <div className="countdown-grid-four" dir="ltr">
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.days}</span>
                  <span className="unit-label-caps">DAYS</span>
                </div>
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.hours}</span>
                  <span className="unit-label-caps">HOURS</span>
                </div>
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.minutes}</span>
                  <span className="unit-label-caps">MINUTES</span>
                </div>
                <div className="countdown-unit-col">
                  <span className="unit-number-serif">{countdown.seconds}</span>
                  <span className="unit-label-caps">SECONDS</span>
                </div>
              </div>
            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 7. LOCATION & GOOGLE MAPS */}
            <section className="location-elegant-section">
              <h4 className="location-title-tag">{INVITATION_DATA.location.title}</h4>
              <h3 className="venue-name-bold">{INVITATION_DATA.location.venueName}</h3>

              <a 
                href={INVITATION_DATA.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-map-link-btn"
              >
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </section>

            {/* CHIC DIVIDER */}
            <div className="chic-divider">
              <span className="divider-line"></span>
              <span className="divider-diamond"></span>
              <span className="divider-line"></span>
            </div>

            {/* 9. RSVP SECTION (NAME INPUT & MESSAGE/WISHES) */}
            <section className="rsvp-section">
              <h4 className="rsvp-title">{INVITATION_DATA.rsvp?.title || "RSVP"}</h4>
              <p className="rsvp-subtitle">{INVITATION_DATA.rsvp?.subtitle || "PLEASE CONFIRM YOUR ATTENDANCE"}</p>

              <div className="rsvp-card-box">
                {rsvpSubmitted ? (
                  <div className="rsvp-success-card">
                    <span className="rsvp-success-icon">💌</span>
                    <h5 className="rsvp-success-heading">
                      {INVITATION_DATA.rsvp?.successHeading || "THANK YOU!"}
                    </h5>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit}>
                    {/* Name Input without top label */}
                    <div className="rsvp-form-group">
                      <input 
                        id="rsvp-name"
                        type="text" 
                        className="rsvp-input"
                        placeholder={INVITATION_DATA.rsvp?.namePlaceholder || "Name"}
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        required
                        dir="auto"
                      />
                    </div>

                    {/* Message for Couple without top label */}
                    <div className="rsvp-form-group">
                      <textarea 
                        id="rsvp-message"
                        className="rsvp-textarea"
                        placeholder={INVITATION_DATA.rsvp?.messagePlaceholder || "Leave a message for Seif & Habiba..."}
                        value={rsvpMessage}
                        onChange={(e) => setRsvpMessage(e.target.value)}
                        rows="3"
                        dir="auto"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="rsvp-submit-btn">
                      {INVITATION_DATA.rsvp?.submitText || "SEND RSVP"}
                    </button>
                  </form>
                )}
              </div>
            </section>



            {/* RE-OPEN ENVELOPE BUTTON (IN ENGLISH AS REQUESTED) */}
            <button 
              className="reopen-envelope-chip" 
              onClick={() => {
                setIsOpened(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>↩ RE-OPEN ENVELOPE</span>
            </button>

          </div>
        </article>
      </main>
    </div>
  );
}
