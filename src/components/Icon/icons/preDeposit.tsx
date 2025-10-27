import * as React from 'react';
import { SVGProps } from 'react';

const SvgDashboard = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M9.58824 10H3.41176C3.16471 10 3 9.83529 3 9.58824V3.41176C3 3.16471 3.16471 3 3.41176 3H9.58824C9.83529 3 10 3.16471 10 3.41176V9.58824C10 9.83529 9.83529 10 9.58824 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20.5882 10H14.4118C14.1647 10 14 9.83529 14 9.58824V3.41176C14 3.16471 14.1647 3 14.4118 3H20.5882C20.8353 3 21 3.16471 21 3.41176V9.58824C21 9.83529 20.8353 10 20.5882 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20.5882 21H14.4118C14.1647 21 14 20.8353 14 20.5882V14.4118C14 14.1647 14.1647 14 14.4118 14H20.5882C20.8353 14 21 14.1647 21 14.4118V20.5882C21 20.8353 20.8353 21 20.5882 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 6H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 14V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default SvgDashboard;
