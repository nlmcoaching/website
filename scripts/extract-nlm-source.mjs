import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const deob = fs.readFileSync(path.join(root, 'recovered-src/deobfuscated.js'), 'utf8');
const lines = deob.split('\n');

const slice = lines.slice(88482, 88861).join('\n');

let code = slice
  .replace(/\bfunction Vz\b/g, 'export function BreathworkSection')
  .replace(/\bfunction \$h\b/g, 'export function CalendlyInline')
  .replace(/\bfunction T6\b/g, 'export function LiabilityReleaseContent')
  .replace(/\bfunction Kz\b/g, 'export function StudioCheckoutButton')
  .replace(/\bfunction Zz\b/g, 'export function Studio9dPage')
  .replace(/\bfunction Jz\b/g, 'export function Virtual9dPage')
  .replace(/\bfunction Xz\b/g, 'export function NlmCoachingPage')
  .replace(/\bfunction Qz\b/g, 'export function AppRoutes')
  .replace(/\bfunction tV\b/g, 'export function initViewportWidth')
  .replace(/\bfunction eV\b/g, 'function readViewportWidth')
  .replace(/\bconst Wz\b/g, 'export const CALENDLY_DISCOVERY')
  .replace(/\bconst Gz\b/g, 'export const CALENDLY_ONE_ON_ONE')
  .replace(/\bconst Yz\b/g, 'export const CALENDLY_DEEP_DIVE')
  .replace(/\bconst \$z\b/g, 'const OPEN_DISCOVERY_HASH')
  .replace(/\bconst M3\b/g, 'export const CALENDLY_VIRTUAL_9D')
  .replace(/\bconst l0\b/g, 'const STUDIO_EVENT')
  .replace(/\bke\.useState\b/g, 'useState')
  .replace(/\bke\.useEffect\b/g, 'useEffect')
  .replace(/\bke\.useRef\b/g, 'useRef')
  .replace(/\bke\.useCallback\b/g, 'useCallback')
  .replace(/\bkc\(\)/g, 'useLocation()')
  .replace(/\bx8\(\)/g, 'useSearchParams()')
  .replace(/<_Component12\b/g, '<Link')
  .replace(/<\/_Component12>/g, '</Link>')
  .replace(/<\$h\b/g, '<CalendlyInline')
  .replace(/<Vz\s*\/>/g, '<BreathworkSection />')
  .replace(/\bWz\b/g, 'CALENDLY_DISCOVERY')
  .replace(/\bGz\b/g, 'CALENDLY_ONE_ON_ONE')
  .replace(/\bYz\b/g, 'CALENDLY_DEEP_DIVE')
  .replace(/\b\$z\b/g, 'OPEN_DISCOVERY_HASH')
  .replace(/\bM3\b/g, 'CALENDLY_VIRTUAL_9D')
  .replace(/\bl0\b/g, 'STUDIO_EVENT')
  .replace(/<T6\s*\/>/g, '<LiabilityReleaseContent />')
  .replace(/<Kz\b/g, '<StudioCheckoutButton')
  .replace(/<Xz\s*\/>/g, '<NlmCoachingPage />')
  .replace(/<Zz\s*\/>/g, '<Studio9dPage />')
  .replace(/<Jz\s*\/>/g, '<Virtual9dPage />')
  .replace(/<J3>/g, '<Routes>')
  .replace(/<\/J3>/g, '</Routes>')
  .replace(/<Qo\b/g, '<Route')
  .replace(/<\/Qo>/g, '</Route>')
  .replace(/<_Component16>/g, '<BrowserRouter>')
  .replace(/<\/_Component16>/g, '</BrowserRouter>')
  .replace(/<p\.Fragment>/g, '<>')
  .replace(/<\/p\.Fragment>/g, '</>')
  .replace(/Wk\.createRoot\(document\.getElementById\("root"\)\)\.render\(<ke\.StrictMode><Qz \/><\/ke\.StrictMode>\);/g, '');

const header = `import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

`;

const outDir = path.join(root, 'src', 'nlm');
fs.mkdirSync(outDir, { recursive: true });

// Split into logical files
const breathwork = code.match(/export function BreathworkSection[\s\S]*?^}/m)?.[0] ?? '';
const calendlyFn = code.match(/function qz[\s\S]*?^export function CalendlyInline[\s\S]*?^}/m)?.[0] ?? '';
const calendly = calendlyFn.replace(/^function qz/, 'function parseCalendlyHeight');
const liability = code.match(/export function LiabilityReleaseContent[\s\S]*?^}/m)?.[0] ?? '';
const studioBtn = code.match(/export function StudioCheckoutButton[\s\S]*?^}/m)?.[0] ?? '';
const urls = code.match(/export const CALENDLY_DISCOVERY[\s\S]*?^const OPEN_DISCOVERY_HASH/m)?.[0] ?? '';
const nlmPage = code.match(/export function NlmCoachingPage[\s\S]*?^}/m)?.[0] ?? '';
const studioPage = code.match(/export const STUDIO_EVENT[\s\S]*?^export function Studio9dPage[\s\S]*?^}/m)?.[0] ?? '';
const virtualBlock = code.match(/export const CALENDLY_VIRTUAL_9D[\s\S]*?^export function Virtual9dPage[\s\S]*?^}/m)?.[0] ?? '';
const appRoutes = code.match(/export function AppRoutes[\s\S]*?^}/m)?.[0] ?? '';
const viewport = code.match(/export function initViewportWidth[\s\S]*?^}/m)?.[0] ?? '';

fs.writeFileSync(path.join(outDir, 'calendlyUrls.ts'), urls.replace('const OPEN_DISCOVERY_HASH', 'export const OPEN_DISCOVERY_HASH') + ';\n');
fs.writeFileSync(path.join(outDir, 'CalendlyInline.tsx'), header + calendly + '\n');
fs.writeFileSync(path.join(outDir, 'BreathworkSection.tsx'), `import { Link } from 'react-router-dom';\n\n` + breathwork + '\n');
fs.writeFileSync(path.join(outDir, 'LiabilityReleaseContent.tsx'), liability + '\n');
fs.writeFileSync(
  path.join(outDir, 'StudioCheckoutButton.tsx'),
  `import { useCallback, useState } from 'react';\nimport { CalendlyInline } from './CalendlyInline';\n\n` + studioBtn + '\n'
);
fs.writeFileSync(
  path.join(outDir, 'NlmCoachingPage.tsx'),
  `import { useEffect, useRef, useState } from 'react';\nimport { Link, useLocation } from 'react-router-dom';\nimport { BreathworkSection } from './BreathworkSection';\nimport { CalendlyInline } from './CalendlyInline';\nimport {\n  CALENDLY_DEEP_DIVE,\n  CALENDLY_DISCOVERY,\n  CALENDLY_ONE_ON_ONE,\n  OPEN_DISCOVERY_HASH,\n} from './calendlyUrls';\n\n` + nlmPage + '\n'
);
fs.writeFileSync(
  path.join(outDir, 'Studio9dPage.tsx'),
  `import { useEffect, useState } from 'react';\nimport { Link, useSearchParams } from 'react-router-dom';\nimport { LiabilityReleaseContent } from './LiabilityReleaseContent';\nimport { StudioCheckoutButton } from './StudioCheckoutButton';\n\n` + studioPage + '\n'
);
fs.writeFileSync(
  path.join(outDir, 'Virtual9dPage.tsx'),
  `import { useEffect, useState } from 'react';\nimport { Link } from 'react-router-dom';\nimport { CalendlyInline } from './CalendlyInline';\nimport { LiabilityReleaseContent } from './LiabilityReleaseContent';\nimport { CALENDLY_VIRTUAL_9D } from './calendlyUrls';\n\n` + virtualBlock + '\n'
);
fs.writeFileSync(
  path.join(outDir, 'AppRoutes.tsx'),
  `import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';\nimport { NlmCoachingPage } from './NlmCoachingPage';\nimport { Studio9dPage } from './Studio9dPage';\nimport { Virtual9dPage } from './Virtual9dPage';\n\n` +
    appRoutes.replace(
      /<Route path="\*" element=\{[^}]+\}/,
      '<Route path="*" element={<Navigate to="/nlm-coaching" replace />} />'
    ) + '\n'
);
fs.writeFileSync(path.join(outDir, 'viewport.ts'), viewport + '\n');

console.log('Extracted NLM source into src/nlm/');
