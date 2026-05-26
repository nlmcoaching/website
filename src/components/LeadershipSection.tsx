import React from 'react';

interface LeadershipSectionProps {
  /** Section heading shown in the slate header bar */
  title: string;
  /** Optional short description under the title */
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Styled section shell for the Leadership tab: executive-style header + content area.
 */
export function LeadershipSection({ title, subtitle, children }: LeadershipSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden scroll-mt-6">
      <header className="bg-slate-900 text-white px-5 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
        {subtitle ? <p className="text-xs text-slate-300 mt-1 font-normal">{subtitle}</p> : null}
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}
