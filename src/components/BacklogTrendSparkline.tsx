// @ts-nocheck
import React from 'react';

interface BacklogTrendSparklineProps {
  values: number[];
  /** Accessible description of the series */
  'aria-label'?: string;
}

/** Minimal SVG line chart for backlog % (0–100) over recent weeks. */
export function BacklogTrendSparkline({ values, 'aria-label': ariaLabel }: BacklogTrendSparklineProps) {
  if (!values.length) return null;
  const w = 128;
  const h = 44;
  const pad = 4;
  const min = 0;
  const max = 100;
  const n = values.length;
  const innerW = w - 2 * pad;
  const innerH = h - 2 * pad;
  const pointsStr = values
    .map((v, i) => {
      const x = pad + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
      const clamped = Math.max(min, Math.min(max, v));
      const y = pad + (1 - (clamped - min) / (max - min)) * innerH;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg width={w} height={h} className="text-blue-600 shrink-0" role="img" aria-label={ariaLabel}>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pointsStr}
      />
    </svg>
  );
}
