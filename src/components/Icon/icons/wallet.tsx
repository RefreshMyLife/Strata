import * as React from 'react';
import { SVGProps } from 'react';

const SvgWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x={1} y={4} width={20} height={17} rx={5} stroke="currentColor" strokeWidth={2} />
    <path
      d="M17.5 9h3.564c.517 0 .936.419.936.935v5.13a.935.935 0 0 1-.936.935H17.5a3.5 3.5 0 1 1 0-7Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
);



export const SvgWallet2 = (props: SVGProps<SVGSVGElement>) => (
  <svg style={{height: '1.4em'}} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M1 4.24973C1.62675 3.77896 2.4058 3.5 3.25 3.5L16.75 3.5C17.5942 3.5 18.3733 3.77896 19 4.24973C18.9999 3.00721 17.9926 2 16.75 2L3.25 2C2.00745 2 1.00015 3.00721 1 4.24973Z" fill="#90A0AC" fill-opacity="0.8"/>
  <path d="M1 7.24973C1.62675 6.77896 2.4058 6.5 3.25 6.5L16.75 6.5C17.5942 6.5 18.3733 6.77896 19 7.24973C18.9999 6.00721 17.9926 5 16.75 5L3.25 5C2.00745 5 1.00015 6.00721 1 7.24973Z" fill="#90A0AC" fill-opacity="0.8"/>
  <path d="M7 8C7.55228 8 8 8.44772 8 9C8 10.1046 8.89543 11 10 11C11.1046 11 12 10.1046 12 9C12 8.44772 12.4477 8 13 8H16.75C17.9926 8 19 9.00736 19 10.25V15.75C19 16.9926 17.9926 18 16.75 18H3.25C2.00736 18 1 16.9926 1 15.75L1 10.25C1 9.00736 2.00736 8 3.25 8H7Z" fill="#90A0AC" fill-opacity="0.8"/>
  </svg>

);




export default SvgWallet;
