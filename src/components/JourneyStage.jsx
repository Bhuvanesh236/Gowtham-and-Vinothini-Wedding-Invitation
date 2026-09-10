import React, { useEffect, useRef, useState } from 'react';
import { weddingData } from '../data/weddingData';
import { FramePlayer } from '../frame-player';

const starts = [0, 7, 15.5, 26.5, 37, 44];
const duration = 50.416667;
const FRAME = 1 / 24;

export const JourneyStage = ({ onOpenCelebrations, onOpenRSVP }) => {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const journeyRef = useRef(null);
  const statusRef = useRef(null);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);

  const [activeChapter, setActiveChapter] = useState(0);
  const [presentedTime, setPresentedTime] = useState(0);
  const [progressFill, setProgressFill] = useState(0);
  const playerRef = useRef(null);
  const skylineRef = useRef(null);

  // Fetch skyline coordinate mask for the hero temple depth
  useEffect(() => {
    fetch('https://demos.riwaaz.in/rameswaram/public/assets/hero-skyline.json')
      .then((res) => {
        if (!res.ok) throw new Error('Skyline mask unavailable');
        return res.json();
      })
      .then((data) => {
        skylineRef.current = data;
      })
      .catch(() => {
        // Fallback gracefully without mask
      });
  }, []);

  const updateHeroDepth = (time, stageWidth, stageHeight) => {
    const skyline = skylineRef.current;
    const hero = heroRef.current;
    const heroContent = heroContentRef.current;
    if (!hero || !heroContent || !skyline || time >= starts[1] || !stageWidth) return;

    const frameIdx = Math.min(
      skyline.frames.length - 1,
      Math.floor(time * skyline.fps + 0.01)
    );
    const boundary = skyline.frames[frameIdx];
    if (!boundary) return;

    const scale = Math.max(stageWidth / skyline.width, stageHeight / skyline.height);
    const offsetX = (stageWidth - skyline.width * scale) / 2;
    const offsetY = (stageHeight - skyline.height * scale) / 2;
    const right = offsetX + skyline.width * scale;
    const points = [`${offsetX}px ${offsetY}px`, `${right}px ${offsetY}px`];

    for (let x = boundary.length - 1; x >= 0; x--) {
      points.push(
        `${(offsetX + (x + 0.5) * scale).toFixed(2)}px ${(offsetY + boundary[x] * scale).toFixed(2)}px`
      );
    }

    hero.style.clipPath = `polygon(${points.join(',')})`;
    const depth = Math.min(Math.max(time / 5, 0), 1);
    heroContent.style.transform = `translateY(${-depth * 18}px) scale(${1 - depth * 0.06})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const status = statusRef.current;
    const stage = stageRef.current;
    const journey = journeyRef.current;
    if (!canvas || !stage || !journey) return;

    let expectedScrollY = window.scrollY;
    let heldKeys = new Set();
    let keyTimer;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900;
    const GESTURE_GRACE = isTouch ? 1100 : 700;
    const SCROLL_SLACK = isTouch ? 72 : 36;

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const player = new FramePlayer({
      canvas,
      status,
      framesBase: 'https://demos.riwaaz.in/rameswaram/public/assets/frames',
      poster: 'https://demos.riwaaz.in/rameswaram/public/assets/poster/rameswaram-poster.jpg',
      onFrame(time) {
        setPresentedTime(time);

        // Find active chapter
        let idx = 0;
        for (let i = starts.length - 1; i >= 0; i--) {
          if (time >= starts[i]) {
            idx = i;
            break;
          }
        }
        setActiveChapter(idx);

        // Progress bar fill
        const prog = clamp(time / (duration - FRAME), 0, 1);
        setProgressFill(prog);

        // Update hero clip path
        if (stage) {
          updateHeroDepth(time, stage.clientWidth, stage.clientHeight);
        }

        // Sync natural scroll position
        const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);
        expectedScrollY = Math.round(journey.offsetTop + (time / (duration - FRAME)) * scrollDistance);
        const drift = window.scrollY - expectedScrollY;
        if (Math.abs(drift) > SCROLL_SLACK) {
          window.scrollTo({ top: expectedScrollY, behavior: 'instant' });
        }
      },
      onReady(film) {
        // Ready
      },
      onError() {
        if (status) status.textContent = "The film couldn’t load. Open the celebrations for details.";
      },
    });

    playerRef.current = player;
    player.load();

    const inputAllowed = (e) => {
      return (
        !document.hidden &&
        !document.querySelector('dialog[open], .editorial-dialog-backdrop') &&
        !(e?.target instanceof Element && e.target.closest('input, select, textarea, [contenteditable]'))
      );
    };

    const receiveIntent = (direction) => {
      if (!direction) return;
      player.intent(direction, GESTURE_GRACE);
    };

    // Wheel listener
    const onWheel = (e) => {
      if (!inputAllowed(e) || e.ctrlKey || !e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      receiveIntent(Math.sign(e.deltaY));
      if (Math.abs(e.deltaY) > 80) receiveIntent(Math.sign(e.deltaY));
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    // Touch listener
    let touchData = null;
    let pinch = false;
    let currentGestureDir = 0;

    const touchSample = (touches) => {
      const points = [...touches];
      const x = points.reduce((sum, p) => sum + p.clientX, 0) / points.length;
      const y = points.reduce((sum, p) => sum + p.clientY, 0) / points.length;
      const span = points.length === 2 ? Math.hypot(points[0].clientX - points[1].clientX, points[0].clientY - points[1].clientY) : 0;
      return { x, y, span, count: points.length };
    };

    const onTouchStart = (e) => {
      if (!inputAllowed(e) || e.touches.length > 2) return;
      touchData = touchSample(e.touches);
      pinch = false;
      currentGestureDir = 0;
    };

    const onTouchMove = (e) => {
      if (!touchData || !inputAllowed(e) || !e.touches.length || e.touches.length > 2) return;
      const next = touchSample(e.touches);
      if (next.count !== touchData.count) { touchData = next; return; }
      if (next.count === 2 && Math.abs(next.span - touchData.span) > 5) {
        pinch = true;
        player.stop();
      }
      if (pinch) { touchData = next; return; }
      const dy = touchData.y - next.y;
      const dx = touchData.x - next.x;
      if (Math.abs(dy) >= Math.abs(dx) && Math.abs(dy) >= 1) {
        if (e.cancelable) e.preventDefault();
        currentGestureDir = Math.sign(dy);
        receiveIntent(currentGestureDir);
        if (Math.abs(dy) > 12) receiveIntent(currentGestureDir);
      }
      touchData = next;
    };

    const onTouchEnd = (e) => {
      if (e.touches.length) { touchData = touchSample(e.touches); return; }
      if (!pinch && currentGestureDir) receiveIntent(currentGestureDir);
      touchData = null;
      pinch = false;
      currentGestureDir = 0;
    };

    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: false });
    stage.addEventListener('touchend', onTouchEnd, { passive: true });
    stage.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // Key listener
    const onKeyDown = (e) => {
      if (!inputAllowed(e) || e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.('button, a, summary')) return;
      let dir = ['ArrowDown', 'PageDown', 'End'].includes(e.key) ? 1 : ['ArrowUp', 'PageUp', 'Home'].includes(e.key) ? -1 : 0;
      if (e.code === 'Space') dir = e.shiftKey ? -1 : 1;
      if (!dir) return;
      e.preventDefault();
      heldKeys.add(e.code);
      receiveIntent(dir);
      clearInterval(keyTimer);
      keyTimer = setInterval(() => receiveIntent(dir), 150);
    };

    const onKeyUp = (e) => {
      heldKeys.delete(e.code);
      if (!heldKeys.size) player.stop();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Resize
    const onResize = () => {
      player.resize();
      if (stage) updateHeroDepth(presentedTime, stage.clientWidth, stage.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('wheel', onWheel);
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
      stage.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      clearInterval(keyTimer);
      player.dispose();
    };
  }, []);

  const goToChapter = (index) => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    const target = index >= starts.length || index === 0 ? 0 : starts[index] + 0.9;
    playerRef.current.seek(target);
  };

  const handleNextOrTop = () => {
    if (activeChapter === starts.length - 1) {
      goToChapter(0);
    } else {
      goToChapter(activeChapter + 1);
    }
  };

  // Calculate chapter opacity based on decoded frame time
  const getChapterAlpha = (index) => {
    const fadeIn = index === 0 ? 1 : Math.min(Math.max((presentedTime - starts[index]) / 0.65, 0), 1);
    const fadeOut = index === starts.length - 1 ? 1 : Math.min(Math.max((starts[index + 1] - presentedTime) / 0.65, 0), 1);
    const alpha = Math.min(fadeIn, fadeOut);
    return alpha * alpha * (3 - 2 * alpha);
  };

  return (
    <section ref={journeyRef} className="journey" id="journey" aria-label="A journey to our beginning">
      <div ref={stageRef} className="journey-stage">
        {/* Site Header */}
        <header className="site-header">
          <span className="header-place">{weddingData.headerPlace}</span>
          <button
            type="button"
            className="header-link"
            onClick={onOpenCelebrations}
          >
            The celebrations <span aria-hidden="true">↗</span>
          </button>
        </header>

        {/* Film Canvas Region */}
        <div className="film-region">
          <div className="film-border">
            <canvas id="journey-video" ref={canvasRef} role="img" aria-label="Journey from the temple entrance through carved corridors to an arch overlooking the sea" />
          </div>
          <span className="film-side-note" aria-hidden="true">Stone. Sea. Something eternal.</span>
        </div>

        {/* Copy Region — Exact 6 Chapters */}
        <div className="copy-region" id="copy-region">
          {/* Chapter 01: The beginning */}
          <article
            ref={heroRef}
            className={`chapter-copy hero-depth ${activeChapter === 0 ? 'is-active' : ''}`}
            data-chapter="0"
            data-name="The beginning"
            style={{ opacity: activeChapter === 0 ? getChapterAlpha(0) : 0 }}
          >
            <div ref={heroContentRef} className="hero-content">
              <p className="eyebrow">With full hearts &amp; our families’ blessings</p>
              <h1>
                <span>{weddingData.groom}</span> <em>&amp;</em> <span>{weddingData.bride}</span>
              </h1>
              <p className="copy-note">
                A love to come home to.<br />
                A beginning to share with you.
              </p>
              <p className="hero-date">
                {weddingData.datesFormatted} <span>{weddingData.locationFormatted}</span>
              </p>
            </div>
          </article>

          {/* Chapter 02: The blessing */}
          <article
            className={`chapter-copy ${activeChapter === 1 ? 'is-active' : ''}`}
            data-chapter="1"
            data-name="The blessing"
            style={{ opacity: activeChapter === 1 ? getChapterAlpha(1) : 0 }}
          >
            <p className="eyebrow">In the quiet, we found our answer</p>
            <h2>
              Some journeys<br />
              <em>feel like prayer.</em>
            </h2>
            <p className="copy-note">
              With grateful hearts and our elders’ blessings,<br />
              we take our first steps towards forever.
            </p>
          </article>

          {/* Chapter 03: The light */}
          <article
            className={`chapter-copy ${activeChapter === 2 ? 'is-active' : ''}`}
            data-chapter="2"
            data-name="The light"
            style={{ opacity: activeChapter === 2 ? getChapterAlpha(2) : 0 }}
          >
            <p className="eyebrow">A little light. A lifetime of love.</p>
            <h2>
              Every ordinary day.<br />
              <em>With you.</em>
            </h2>
            <p className="copy-note">
              The morning chai. The long way home.<br />
              Small things that became our everything.
            </p>
          </article>

          {/* Chapter 04: The gathering */}
          <article
            className={`chapter-copy ${activeChapter === 3 ? 'is-active' : ''}`}
            data-chapter="3"
            data-name="The gathering"
            style={{ opacity: activeChapter === 3 ? getChapterAlpha(3) : 0 }}
          >
            <p className="eyebrow">Two days, a thousand memories</p>
            <h2>
              A celebration<br />
              <em>to come home to.</em>
            </h2>
            <div className="film-events">
              <p><span>14 Nov · Morning</span> Haldi &amp; family gathering</p>
              <p><span>14 Nov · Evening</span> Sangeet under the stars</p>
              <p><span>15 Nov · Wedding Day</span> Our wedding vows</p>
            </div>
          </article>

          {/* Chapter 05: The horizon */}
          <article
            className={`chapter-copy ${activeChapter === 4 ? 'is-active' : ''}`}
            data-chapter="4"
            data-name="The horizon"
            style={{ opacity: activeChapter === 4 ? getChapterAlpha(4) : 0 }}
          >
            <p className="eyebrow">Where the sea meets our story</p>
            <h2>
              A little salt air.<br />
              <em>A new beginning.</em>
            </h2>
            <p className="copy-note">
              The horizon before us. Our loved ones beside us.<br />
              Nowhere else we’d rather be.
            </p>
          </article>

          {/* Chapter 06: The promise */}
          <article
            className={`chapter-copy ${activeChapter === 5 ? 'is-active' : ''}`}
            data-chapter="5"
            data-name="The promise"
            style={{ opacity: activeChapter === 5 ? getChapterAlpha(5) : 0 }}
          >
            <p className="eyebrow">And a place for you in it all</p>
            <h2>
              Our forever.<br />
              <em>Your presence.</em>
            </h2>
            <p className="copy-note">
              Meet us where the waves arrive like blessings.<br />
              It wouldn’t be the same without you.
            </p>
            <button
              type="button"
              className="rsvp-button film-rsvp"
              onClick={onOpenRSVP}
            >
              Join our celebration <span aria-hidden="true">↗</span>
            </button>
            <button
              type="button"
              onClick={onOpenCelebrations}
              className="text-link"
            >
              The wedding details <span aria-hidden="true">↓</span>
            </button>
          </article>
        </div>

        {/* Chapter Navigation (Right vertical) */}
        <nav className="chapter-nav" aria-label="Film chapters">
          {weddingData.chapters.map((ch, idx) => (
            <button
              key={ch.number}
              type="button"
              data-chapter={idx}
              aria-label={ch.name}
              aria-current={activeChapter === idx ? 'step' : undefined}
              onClick={() => goToChapter(idx)}
            >
              <span>{ch.number}</span>
              <i></i>
            </button>
          ))}
        </nav>

        {/* Journey Footer */}
        <footer className="journey-footer">
          <span className="chapter-caption">
            <b id="chapter-number">{weddingData.chapters[activeChapter].number}</b>
            <span id="chapter-name">{weddingData.chapters[activeChapter].name}</span>
          </span>

          <span ref={statusRef} className="media-status" role="status">
            Preparing your journey…
          </span>

          <button
            className="scroll-cue"
            id="next-chapter"
            type="button"
            onClick={handleNextOrTop}
          >
            {activeChapter === 5 ? 'Back to the beginning ' : 'Scroll to unfold '}
            <span aria-hidden="true">
              {activeChapter === 5 ? '↑' : '↓'}
            </span>
          </button>
        </footer>

        {/* Progress Bar */}
        <div className="progress" aria-hidden="true">
          <span
            id="progress-fill"
            style={{ transform: `scaleX(${progressFill})` }}
          />
        </div>
      </div>
    </section>
  );
};
