/** @jsxImportSource @emotion/react */
import React from 'react';
import { useUID } from 'react-uid';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from 'recharts';

import { useStyles } from './styles';
import { $timeframe } from '../utils/$timeframe';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { $chartData } from '../utils/$chartData';

export interface DashboardMarketCapChartItem {
  date: string;
  value: number;
  month: string;
}

export interface DashboardMarketCapChartProps {
  data: DashboardMarketCapChartItem[];
  timeframe: string;
  symbol: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, timeframe }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    const date = payload[0]?.payload.date;
    const formattedDate = $timeframe.formatTimeframe(date, timeframe);
    return (
      <div css={{
        width: '180px',
        height: '60px',
        gap: '6px',
        padding: '8px',
        borderRadius: '10px',
        background: 'rgba(26, 34, 41, 1)',
        boxShadow: '0px 10px 40px 0px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Chakra Petch',
      }}>
        <div css={{
          fontFamily: 'Chakra Petch',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '140%',
          color: 'rgba(73, 86, 94, 1)',
          marginBottom: '2px'
        }}>
          Market Cap
        </div>
        <div css={{
          fontFamily: 'Chakra Petch',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '125%',
          color: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{formattedDate}</span>
          <span>${NumberUtil.abbr(value)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardMarketCapChart: React.FC<DashboardMarketCapChartProps> = ({
  className,
  data,
  timeframe,
  symbol
}) => {
  const styles = useStyles();
  const baseId = useUID();
  const gradientId = `marketcap-gradient-${baseId}`;

  // Color scheme based on symbol
  const colors = symbol === 'srUSDe'
    ? {
      stroke: 'rgba(33, 154, 253, 1)',
      stopColor1: 'rgba(33, 154, 253, 0.25)',
      stopColor2: 'rgba(33, 154, 253, 0.08)'
    }
    : {
      stroke: 'rgba(52, 211, 153, 1)',
      stopColor1: 'rgba(52, 211, 153, 0.25)',
      stopColor2: 'rgba(52, 211, 153, 0.08)'
    };

  const frame = $timeframe.toKey(timeframe);
  const values = data ? data[frame] : [];

  const min = Math.min(...values.map((item) => item.value));
  const max = Math.max(...values.map((item) => item.value));

  // let domainMin = Math.floor(min * 0.9 / 10) * 10;
  // let domainMax = Math.ceil(max / 10) * 10;
  let domainMin = 0; //Math.floor(min * 0.9 / 10) * 10;
  let domainMax = $chartData.roundStepMax(max);


  let step = Math.floor((domainMax - domainMin) / 4);
  let step3 = domainMin + 3 * step;
  let step2 = domainMin + 2 * step;
  let step1 = domainMin + 1 * step;

  const yAxisTicks = [domainMin, step1, step2, step3, domainMax];


  return (
    <div css={styles.container} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={values} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.stopColor1} />
              <stop offset="100%" stopColor={colors.stopColor2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="x"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
              fill: 'rgba(144, 160, 172, 0.5)',
              fontFamily: 'Chakra Petch',
              fontWeight: 500
            }}
            interval="preserveStartEnd"
          />
          <YAxis
            width={35}
            domain={[domainMin, domainMax]}
            ticks={yAxisTicks}
            interval={0}
            tickCount={5}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
              fill: 'rgba(144, 160, 172, 0.5)',
              fontFamily: 'Chakra Petch',
              fontWeight: 500
            }}
            tickFormatter={(value) => `$${NumberUtil.abbr(value)}`}
          />
          {yAxisTicks.map((tick, index) => (
            <ReferenceLine
              key={tick}
              y={tick}
              stroke="rgba(144, 160, 172, 0.2)"
              strokeDasharray={index === 0 ? "0" : "2 2"}
            />
          ))}
          <Tooltip
            content={<CustomTooltip timeframe={frame}/>}
            cursor={false}
            position={{ y: -30 }}
            allowEscapeViewBox={{ x: false, y: true }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={colors.stroke}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
