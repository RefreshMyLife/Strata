/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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

export interface ReservesTotalAssetsChartItem {
  date: string;
  value: number;
  month: string;
}

export interface ReservesTotalAssetsChartProps {
  data: ReservesTotalAssetsChartItem[];
  timeframe: string;
  symbol: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label, timeframe }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const formattedValue = `$${NumberUtil.abbr(value)}`;
    const date = payload[0].payload.date;
    const formattedDate = $timeframe.formatTimeframe(date, timeframe);

    return (
      <div css={{
        width: '205px',
        height: '62px',
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
          Total Assets
        </div>
        <div css={{
          fontFamily: 'Chakra Petch',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '125%',
          color: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{formattedDate}</span>
          <span>{formattedValue}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const ReservesTotalAssetsChart: React.FC<ReservesTotalAssetsChartProps> = ({
  className,
  data,
  timeframe,
  symbol
}) => {
  const styles = useStyles();
  const baseId = useUID();
  const gradientId = `reserves-total-assets-gradient-${baseId}`;
  const [activePoint, setActivePoint] = useState<any>(null);

  const colors = {
    stroke: 'rgba(255, 255, 255, 1)',
    stopColor1: 'rgba(255, 255, 255, 0.25)',
    stopColor2: 'rgba(255, 255, 255, 0.08)'
  };

  const frame = $timeframe.toKey(timeframe);
  const values = data ? data[frame] : [];


  const min = Math.min(...values.map((item) => item.value));
  const max = Math.max(...values.map((item) => item.value));

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
        <AreaChart
          data={values}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          onMouseMove={(state: any) => {
            if (state && state.activePayload && state.activePayload.length > 0) {
              setActivePoint(state.activePayload[0].payload);
            }
          }}
          onMouseLeave={() => setActivePoint(null)}
        >
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
            width={20}
            domain={[domainMin, domainMax]}
            ticks={yAxisTicks}
            type="number"
            tickCount={5}
            interval={0}
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
            activeDot={{
              r: 4,
              fill: 'transparent',
              stroke: colors.stroke,
              strokeWidth: 2
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
