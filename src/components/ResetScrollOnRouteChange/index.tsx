import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ResetScrollOnRouteChange: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    let page = /\/?(?<page>\w+)/.exec(location.pathname)?.groups.page;
    document.body.setAttribute('page', page);
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};
