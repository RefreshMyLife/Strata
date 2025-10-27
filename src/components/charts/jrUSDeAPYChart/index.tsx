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

import { useStyles as useSharedStyles } from '../styles';
import { useStyles as useLocalStyles } from './styles';
import { $chartData } from '../utils/$chartData';

export interface jrUSDeAPYChartItem {
  date: string;
  value: number;
}

export interface jrUSDeAPYChartProps {
  data: jrUSDeAPYChartItem[];
  color?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    const date = payload[0]?.payload.dateOrig ?? payload[0]?.payload.date;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });

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
          fontSize: '12px',
          lineHeight: '125%',
          color: 'rgba(73, 86, 94, 1)',
          marginBottom: '4px'
        }}>
          jrUSDe APY
        </div>
        <div css={{
          fontFamily: 'Chakra Petch',
          fontWeight: 500,
          fontSize: '14px',
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

export const JrUSDeAPYChart: React.FC<jrUSDeAPYChartProps> = ({
  className,
  data,
  color
}) => {
  const sharedStyles = useSharedStyles();
  const localStyles = useLocalStyles();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Green color scheme for jrUSDeAPY
  const chartColor = color || 'rgba(64, 186, 161, 1)';
  const baseId = useUID();
  const gradientId = `gradient-${baseId}`;

  let min = Math.min(...data.map((item) => item.value));
  let max = Math.max(...data.map((item) => item.value));

  const steps = $chartData.getNiceTicksIncludingZero(min, max);
  const yAxisTicks = steps.ticks;


  return (
    <div css={localStyles.container} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          margin={{ ...localStyles.chartMargin, top: 15 }}
          data={data}
          barCategoryGap="30%"
          onMouseMove={(state: any) => {
            if (state && state.activeTooltipIndex !== undefined) {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.8} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0.3} />
            </linearGradient>
          </defs>

          {/* <ReferenceLine y={domainMax} stroke="rgba(144, 160, 172, 0.2)" strokeDasharray="2 2" />
          <ReferenceLine y={step3} stroke="rgba(144, 160, 172, 0.2)" strokeDasharray="2 2" />
          <ReferenceLine y={step2} stroke="rgba(144, 160, 172, 0.2)" strokeDasharray="2 2" />
          <ReferenceLine y={step1} stroke="rgba(144, 160, 172, 0.2)" strokeDasharray="2 2" />
          <ReferenceLine y={domainMin} stroke="rgba(144, 160, 172, 0.2)" strokeWidth={1} /> */}

          {yAxisTicks.map((tick, index) => (
                <ReferenceLine
                  key={tick}
                  y={tick}
                  stroke="rgba(144, 160, 172, 0.2)"
                  strokeDasharray={tick === 0 ? "0" : "2 2"}
                />
              ))}

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            stroke={sharedStyles.accessoryColor}
            tickMargin={localStyles.tickMargin}
            style={localStyles.axis}
            fontSize={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value.toFixed(2)}%`}
            fontSize={10}
            style={localStyles.axis}
            domain={[min, max]}
            ticks={yAxisTicks}
            width={40}
            tickCount={5}
            interval={0}
            tickMargin={localStyles.tickMargin}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            position={{ y: -30 }}
            allowEscapeViewBox={{ x: false, y: true }}
          />

          <Bar
            dataKey="value"
            fill="rgba(64, 186, 161, 0.1)"
            radius={[2, 2, 0, 0]}
            maxBarSize={20}
            shape={(props: any) => {
              const { x, y, width, height, index } = props;
              const isActive = activeIndex === index;
              const rectHeight = Math.abs(height);
              const rectY = height < 0 ? y + height : y;

              return (
                <g>
                  <rect x={x} y={rectY} width={width} height={rectHeight} fill="rgba(64, 186, 161, 0.1)" rx={2} />
                  <line x1={x} y1={y} x2={x + width} y2={y} stroke="rgba(64, 186, 161, 1)" strokeWidth={1} />
                  {isActive && (
                    <circle
                      cx={x + width / 2}
                      cy={y}
                      r={3}
                      fill="transparent"
                      stroke="rgba(64, 186, 161, 1)"
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
