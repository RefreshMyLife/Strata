/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavLink, matchPath } from 'react-router';

import { MenuItem } from '../../types';

export interface LinkProps {
    href: MenuItem['href'];
    onClick?: () => void;
    isMobile?: boolean;
    children;
}

export const Link: React.FC<LinkProps> = ({ children, onClick, href, isMobile = false }) => {
    if (href[0] === '/') {
        const activeClassName = isMobile ? 'active-mobile-menu-item' : 'active-menu-item';
        //const isActive =

        return (
            <NavLink
                to={href}
                className={({ isActive }) => (isActive ? activeClassName : '')}
                onClick={onClick}
            >
                {children}
            </NavLink>
        );
    }

    return (
        <a href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
};

export default Link;
