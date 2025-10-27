/** @jsxImportSource @emotion/react */
import React, { ReactElement, useState } from 'react';

import { ButtonGroup } from '../ButtonGroup';
import useStyles from './styles';
import Paper from '@mui/material/Paper';

export type TabContent = {
  key?: string;
  title: string | any;
  content: ReactElement;
  gear?: ReactElement;
};

export interface TabsProps {
  tabsContent: TabContent[];
  initialActiveTabIndex?: number;
  onTabChange?: (newIndex: number) => void;
  className?: string;
  fullWidth?: boolean;
}

export const Tabs = ({
  tabsContent,
  initialActiveTabIndex = 0,
  onTabChange,
  className,
  fullWidth = false,
}: TabsProps) => {
  const styles = useStyles();
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);

  const handleChange = (index: number) => {
    setActiveTabIndex(index);
    // Only call onTabChange callback if tab clicked isn't currently active
    if (index !== activeTabIndex && onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className={className}>
      <Paper css={styles.tabsContainer} className={className}>
        <ButtonGroup
          buttonLabels={tabsContent}
          css={styles.buttonsContainer}
          activeButtonIndex={activeTabIndex}
          onButtonClick={handleChange}
          fullWidth={fullWidth}
        />
        {tabsContent[activeTabIndex].gear}
      </Paper>

      {tabsContent[activeTabIndex].content}
    </div>
  );
};
