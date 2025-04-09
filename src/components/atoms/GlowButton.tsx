import React from 'react';
import { cn } from '../../lib/utils';
// credits to https://codepen.io/kocsten/pen/rggjXp for the rainbow gradient

const TAILWIND_COLORS = {
  // Green tones
  'green-400': '#4ade80',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'lime-500': '#84cc16',
  'lime-700': '#65a30d',
  // Yellow tones
  'yellow-200': '#fef08a',
  'yellow-400': '#facc15',
  'yellow-500': '#eab308',
};



export function GlowButton({ 
  children, 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const greenYellowGradient = `linear-gradient(45deg, 
    ${TAILWIND_COLORS['green-500']}, 
    ${TAILWIND_COLORS['lime-500']}, 
    ${TAILWIND_COLORS['yellow-400']}, 
    ${TAILWIND_COLORS['lime-700']}, 
    ${TAILWIND_COLORS['yellow-200']}, 
    ${TAILWIND_COLORS['green-400']}, 
    ${TAILWIND_COLORS['yellow-500']}, 
    ${TAILWIND_COLORS['green-600']}, 
    ${TAILWIND_COLORS['green-500']}
  )`;

  const glowButtonStyles = `
    .glowing-button {
      border: none;
      outline: none;
      padding: .5rem;
      color: #fff;
      background: #111;
      cursor: pointer;
      position: relative;
      z-index: 0;
      border-radius: 10px;
    }    

    .glowing-button:before {
      content: '';
      background: ${greenYellowGradient};
      position: absolute;
      top: -2px;
      left: -2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 1;
      transition: opacity .3s ease-in-out;
      border-radius: 10px;
    }

    .glowing-button:active {
      color: #000
    }

    .glowing-button:active:after {
      background: transparent;
    }

    .glowing-button:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
    transition: background 0.3s ease-in-out; /* Add transition here */
    }
    
    .glowing-button:hover:after {
    background: ${greenYellowGradient};
    }

    @keyframes glowing {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
    }
  `;

  return (
    <>
      <style>{glowButtonStyles}</style>
      <button
        className={cn("glowing-button", className)}
        {...props}
      >
        {children}
      </button>
    </>
  );
}