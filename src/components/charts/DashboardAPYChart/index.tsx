/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useUID } from 'react-uid';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from 'recharts';

import { useStyles } from './styles';
import { $timeframe } from '../utils/$timeframe';
import { $chartData } from '../utils/$chartData';

export interface DashboardAPYChartItem {
  date: string;
  value: number;
  month: string;
}

export interface DashboardAPYChartProps {
  data: DashboardAPYChartItem[];
  timeframe: string;
  symbol: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, timeframe, timeframeTitle }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    const date = payload[0]?.payload.date;
    let formattedDate = $timeframe.formatTimeframe(date, timeframe);

    return (
      <div css={{
        width: '160px',
        height: '60px',
        gap: '6px',
        padding: '12px',
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
          APY
        </div>
        <div css={{
          fontFamily: 'Chakra Petch',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '140%',
          color: 'rgba(255, 255, 255, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{formattedDate}</span>
          <span css={{ fontWeight: 600 }}>{value?.toFixed(2)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardAPYChart: React.FC<DashboardAPYChartProps> = ({
  className,
  data,
  timeframe,
  symbol
}) => {
  const styles = useStyles();
  const baseId = useUID();
  const gradientId = `apy-gradient-${baseId}`;
  const gradientIdInverse = `apy-gradient-${baseId}-inverse`;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Color scheme based on symbol
  const colors = symbol === 'srUSDe'
    ? {
      stopColor1: 'rgba(33, 154, 253, 0.15)',
      stopColor2: 'rgba(33, 154, 253, 0.02)',
      stroke: 'rgba(33, 154, 253, 1)'
    }
    : {
      stopColor1: 'rgba(52, 211, 153, 0.15)',
      stopColor2: 'rgba(52, 211, 153, 0.02)',
      stroke: 'rgba(52, 211, 153, 1)'
    };

  const frame = $timeframe.toKey(timeframe);
  const values = data ? data[frame] : [];

  let min = Math.min(...values.map((item) => item.value));
  let max = Math.max(...values.map((item) => item.value));

  const steps = $chartData.getNiceTicksIncludingZero(min, max);
  const yAxisTicks = steps.ticks;

  return (
    <div css={styles.container} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={values}
          margin={{ top: 15, right: 5, left: 5, bottom: 5 }}
          barCategoryGap="20%"
          onMouseMove={(state: any) => {
            if (state && state.activeTooltipIndex !== undefined) {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.stopColor1} />
              <stop offset="100%" stopColor={colors.stopColor2} />
            </linearGradient>
            <linearGradient id={gradientIdInverse} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.stopColor2} />
              <stop offset="100%" stopColor={colors.stopColor1} />
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
            width={16}
            domain={[min, max]}
            ticks={yAxisTicks}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
              fill: 'rgba(144, 160, 172, 0.5)',
              fontFamily: 'Chakra Petch',
              fontWeight: 500
            }}
            tickFormatter={(value) => `${value}%`}
            interval={0}
            tickCount={5}
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
            content={<CustomTooltip timeframe={frame} timeframeTitle={timeframe}/>}
            cursor={false}
            position={{ y: -30 }}
            allowEscapeViewBox={{ x: false, y: true }}
          />
          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            radius={[2, 2, 0, 0]}
            shape={(props: any) => {
              let { x, y, width, height, index } = props;
              let rectX = x;
              let rectY = y;
              let rectW = width;
              let rectH = height;
              let gradient = height < 0 ? gradientIdInverse : gradientId;

              const isActive = activeIndex === index;
              if (rectH < 0) {
                rectH = Math.abs(rectH);
                rectY = rectY - rectH;
              }

              return (
                <g>
                  <rect
                    x={rectX}
                    y={rectY}
                    width={rectW}
                    height={rectH}
                    fill={`url(#${gradient})`}
                    rx={2}
                    ry={2}
                  />
                  <line
                    x1={x}
                    y1={y}
                    x2={x + width}
                    y2={y}
                    stroke={colors.stroke}
                    strokeWidth={2}
                  />
                  {isActive && (
                    <circle
                      cx={x + width / 2}
                      cy={y}
                      r={3}
                      fill="transparent"
                      stroke={colors.stroke}
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
