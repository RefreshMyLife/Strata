/** @jsxImportSource @emotion/react */
import React from 'react';
import useStyles from './styles';

interface BorderedContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CornerSvg = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" fill="#5F93F0"/>
  </svg>
);

export const BorderedContainer: React.FC<BorderedContainerProps> = ({
  children,
  className,
  style,
}) => {
  const styles = useStyles();

  return (
    <div css={styles.container} className={className} style={style}>
      <div css={styles.cornerTopLeft}>
        <CornerSvg />
      </div>
      <div css={styles.cornerTopRight}>
        <CornerSvg />
      </div>
      <div css={styles.cornerBottomLeft}>
        <CornerSvg />
      </div>
      <div css={styles.cornerBottomRight}>
        <CornerSvg />
      </div>
      <div css={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default BorderedContainer;