import React from 'react';

import { BREAKPOINTS } from 'theme/MuiThemeProvider/muiTheme';

export interface TableColumn<R> {
  key: string;
  label: React.ReactNode | string;
  selectOptionLabel: string;
  renderCell: (row: R, rowIndex: number, params?: any) => React.ReactNode | string;
  sortRows?: (rowA: R, rowB: R, direction: 'asc' | 'desc') => number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<R> {
  data: R[];
  rowKeyExtractor: (row: R) => string;
  rowWrapperMobile?;
  rowTitleMobile?;
  breakpoint: keyof (typeof BREAKPOINTS)['values'];
  columns: TableColumn<R>[];
  value?: string;
  cardColumns?: TableColumn<R>[];
  minWidth?: string;
  initialOrder?: {
    orderBy: TableColumn<R>;
    orderDirection: 'asc' | 'desc';
  };
  className?: string;
  isFetching?: boolean;
  rowOnClick?: (e: React.MouseEvent<HTMLDivElement>, row: R) => void;
  getRowHref?: (row: R) => string;
  title?: string;
  hover?: boolean;
  withPadding?: boolean;
}

export interface Order<R> {
  orderBy: TableColumn<R>;
  orderDirection: 'asc' | 'desc';
}
