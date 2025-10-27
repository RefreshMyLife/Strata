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
import alot from 'alot';
import { $chartData } from '../utils/$chartData';

export interface DashboardPriceChartItem {
  date: string;
  value: number;
  month: string;
}

export interface DashboardPriceChartProps {
  data: DashboardPriceChartItem[];
  timeframe: string;
  symbol: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, frame }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    const date = payload[0]?.payload.date;
    let formattedDate = $timeframe.formatTimeframe(date, frame);

    return (
      <div css={{
        width: '160px',
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
          marginBottom: '4px'
        }}>
          Price
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
          <span>${value?.toFixed(5)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardPriceChart: React.FC<DashboardPriceChartProps> = ({
  className,
  data,
  timeframe,
  symbol
}) => {
  const styles = useStyles();
  const baseId = useUID();
  const gradientId = `price-gradient-${baseId}`;

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
  let values: any[] = data ? data[frame] : [];


  values = values.map(x => {
    return {
      ...x,
      value: x.value
    }
  })

  let min = alot(values).min(x => x.value);
  let max = alot(values).max(x => x.value);
  let yAxisTicks = $chartData.getTicksPrice(min, max);

  min = yAxisTicks[0]
  max = yAxisTicks[yAxisTicks.length - 1];
  yAxisTicks = alot(yAxisTicks).distinct().toArray();


  return (
    <div css={styles.container} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={values} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
            width={50}
            domain={[min, max]}
            ticks={yAxisTicks}
            type="number"
            tickCount={6}
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
              fill: 'rgba(144, 160, 172, 0.5)',
              fontFamily: 'Chakra Petch',
              fontWeight: 500,
              dx: -40,
              textAnchor: 'start',
            }}
            tickFormatter={(value) => `$${value?.toFixed(4)}`}
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
            content={<CustomTooltip  frame={frame} />}
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
