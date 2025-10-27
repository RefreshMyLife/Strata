import * as React from 'react';
import { SVGProps } from 'react';

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 65 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={4}
    {...props}
  >
    <circle cx={32.5} cy={32} r={24} fill="currentColor" />
    <path
      d="m41.5 26-12 12-6-6"
      stroke="#fff"
      strokeWidth="inherit"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SvgCheck2 = (props: SVGProps<SVGSVGElement>) => (

  <svg viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.5 26C0.5 11.6406 12.1406 0 26.5 0C40.8594 0 52.5 11.6406 52.5 26C52.5 40.3594 40.8594 52 26.5 52C12.1406 52 0.5 40.3594 0.5 26ZM36.1275 21.1625C36.7695 20.2637 36.5613 19.0146 35.6625 18.3725C34.7636 17.7305 33.5145 17.9387 32.8725 18.8375L24.2448 30.9164L19.9142 26.5858C19.1332 25.8047 17.8668 25.8047 17.0858 26.5858C16.3047 27.3668 16.3047 28.6332 17.0858 29.4142L23.0858 35.4142C23.5015 35.8299 24.0791 36.0417 24.665 35.9932C25.2509 35.9447 25.7858 35.6409 26.1275 35.1625L36.1275 21.1625Z"
     fill="#3BEF80"
  />
  </svg>

);

export default SvgCheck;
