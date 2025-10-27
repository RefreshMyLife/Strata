/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React, { Component } from 'react';

import { useStyles } from './styles';

export interface LayeredValuesProps {
  topValue: string | number;
  topValueBanner?: string | number;
  bottomValue: string | number;
  className?: string;
  tags?: { text, style }[]
}

export const LayeredValues: React.FC<LayeredValuesProps> = ({
  topValue,
  topValueBanner,
  bottomValue,
  className,
  tags,
}) => {
  const styles = useStyles();

  return (
    <div css={styles.container} className={className}>
      <Typography variant="small1" css={styles.topValue}>
        {topValue}
        { topValueBanner && <span css={styles.topValueBanner}>{topValueBanner}</span> }
        { tags && tags.map(tag => <span key={tag.text}><span css={styles.topValueBanner} style={tag.style}>{tag.text}</span><br/></span>) }
      </Typography>

      <Typography variant="small2">{bottomValue}</Typography>
    </div>
  );
};
export default LayeredValues;
