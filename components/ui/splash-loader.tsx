'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { site } from '@/data/site';

const ROLES = ['Developer?', 'Full stack Developer?', 'Product Builder.'];
const DWELL_MS = 950;
const LAST_DWELL_MS = 1300;
const MORPH_MS = 1400;
const BG_FADE_MS = 300;

export function SplashLoader() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [morphTransform, setMorphTransform] = useState<string>('none');

  useEffect(() => {
    const signalDone = () => {
      (window as unknown as { __splashComplete?: boolean }).__splashComplete =
        true;
      window.dispatchEvent(new Event('splash:complete'));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      signalDone();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < ROLES.length; i++) {
      timers.push(setTimeout(() => setIndex(i), i * DWELL_MS));
    }
    const exitAt = (ROLES.length - 1) * DWELL_MS + LAST_DWELL_MS;
    timers.push(
      setTimeout(() => {
        setExiting(true);
        signalDone();
      }, exitAt)
    );
    timers.push(setTimeout(() => setGone(true), exitAt + MORPH_MS));
    return () => timers.forEach(clearTimeout);
  }, []);

  useLayoutEffect(() => {
    if (!exiting || !nameRef.current) return;
    const target =
      document.querySelector<HTMLElement>('[data-splash-target]') ||
      document.querySelector<HTMLElement>('[data-nav-brand]');
    if (!target) return;
    const from = nameRef.current.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const fromFS = parseFloat(
      window.getComputedStyle(nameRef.current).fontSize
    );
    const toFS = parseFloat(window.getComputedStyle(target).fontSize);
    const scale = Math.max(0.05, toFS / fromFS);
    setMorphTransform(`translate(${dx}px, ${dy}px) scale(${scale})`);
  }, [exiting]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg ${
        exiting ? 'pointer-events-none' : ''
      }`}
      style={{
        opacity: exiting ? 0 : 1,
        transition: `opacity ${BG_FADE_MS}ms ease-out ${
          MORPH_MS - BG_FADE_MS
        }ms`,
      }}
      aria-hidden={exiting}
    >
      <div className="text-center">
        <h1
          ref={nameRef}
          style={{
            transform: exiting ? morphTransform : 'none',
            transition: `transform ${MORPH_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            transformOrigin: 'center',
            willChange: 'transform',
          }}
          className="animate-fade-up font-mono text-[24px] font-medium leading-[1.8] text-text-bright sm:text-[36px]"
        >
          {site.name}
        </h1>
        <div
          className="mt-6 font-mono text-[15px] text-text transition-opacity duration-300 ease-out sm:text-[18px]"
          style={{ opacity: exiting ? 0 : 1 }}
        >
          <span className="text-emerald-700 dark:text-emerald-500">{'> '}</span>
          <span key={index} className="inline-block animate-fade-up">
            {ROLES[index]}
          </span>
          <span className="ml-1 animate-blink text-emerald-700 dark:text-emerald-500">_</span>
        </div>
      </div>
    </div>
  );
}
