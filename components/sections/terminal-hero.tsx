'use client';

import { useEffect, useState } from 'react';
import { intro } from '@/data/site';

const COMMAND = 'whoami';
const ROLE_COLORS = ['text-violet-300', 'text-emerald-300', 'text-amber-300'];

export function TerminalHero() {
  const [typed, setTyped] = useState('');
  const [stage, setStage] = useState(0);
  const [highlightName, setHighlightName] = useState(false);

  useEffect(() => {
    let i = 0;
    const type = setInterval(() => {
      if (i >= COMMAND.length) {
        clearInterval(type);
        setTimeout(() => setStage(1), 350);
        setTimeout(() => setStage(2), 750);
        setTimeout(() => setStage(3), 1150);
        setTimeout(() => setStage(4), 1550);
        return;
      }
      setTyped(COMMAND.slice(0, i + 1));
      i++;
    }, 90);
    return () => clearInterval(type);
  }, []);

  useEffect(() => {
    const handler = () => setHighlightName(true);
    window.addEventListener('splash:complete', handler);
    if ((window as unknown as { __splashComplete?: boolean }).__splashComplete) {
      setHighlightName(true);
    }
    return () => window.removeEventListener('splash:complete', handler);
  }, []);

  return (
    <div className="overflow-hidden rounded-[10px] border border-white/10 bg-[#0a0a0a] dark:bg-[#050505]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="ml-3 font-mono text-[11px] text-subtle">
          jagadeesh@portfolio — zsh
        </span>
      </div>
      <div className="min-h-[160px] px-5 pb-5 pt-4 font-mono text-[13px] leading-[1.8]">
        <div>
          <span className="text-emerald-500">➜</span>{' '}
          <span className="text-blue-400">~</span>{' '}
          <span className="text-text">{typed}</span>
          <span className="animate-blink text-emerald-500">▌</span>
        </div>

        {stage >= 1 && (
          <div className="mt-2.5 animate-fade-up text-muted">
            {intro.lines[0].split('Jagadeesh Jetti').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span
                    data-splash-target
                    className={`transition-colors duration-500 ease-out ${
                      highlightName ? 'font-medium text-text-bright' : ''
                    }`}
                  >
                    Jagadeesh Jetti
                  </span>
                )}
              </span>
            ))}
          </div>
        )}

        {stage >= 2 && (
          <div className="mt-1.5 animate-fade-up text-muted">{intro.lines[1]}</div>
        )}

        {stage >= 3 && (
          <div className="mt-2.5 flex animate-fade-up flex-wrap gap-x-4 gap-y-1">
            {intro.roles.map((role, i) => (
              <span key={role} className={ROLE_COLORS[i]}>
                [ {role} ]
                {role === 'product' && <span className="text-subtle">?</span>}
              </span>
            ))}
          </div>
        )}

        {stage >= 4 && (
          <div className="mt-2.5 animate-fade-up text-[12px] text-subtle">
            {intro.tagline}
          </div>
        )}
      </div>
    </div>
  );
}
