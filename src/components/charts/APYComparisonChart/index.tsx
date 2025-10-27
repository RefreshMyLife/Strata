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
import alot from 'alot';

export interface APYComparisonChartItem {
  date: string;
  collateralPoolAPY: number;
  benchmarkAPY: number;
  month: string;
}

export interface APYComparisonChartProps {
  data: APYComparisonChartItem[];
  timeframe: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label, timeframe }: any) => {
  if (active && payload && payload.length) {
    const collateralAPY = payload.find((p: any) => p.dataKey === 'collateralPoolAPY')?.value;
    const benchmarkAPY = payload.find((p: any) => p.dataKey === 'benchmarkAPY')?.value;
    const date = payload[0].payload.date;
    const formattedDate = $timeframe.formatTimeframe(date, timeframe);

    return (
      <div css={{
        width: '205px',
        height: '80px',
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
          {formattedDate}
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
          marginBottom: '2px'
        }}>
          <span>Collateral Pool APY</span>
          <span>{collateralAPY?.toFixed(2)}%</span>
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
          <span>Benchmark APY</span>
          <span>{benchmarkAPY?.toFixed(2)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export const APYComparisonChart: React.FC<APYComparisonChartProps> = ({
  className,
  data,
  timeframe
}) => {
  const styles = useStyles();
  const baseId = useUID();
  const collateralGradientId = `apy-collateral-gradient-${baseId}`;
  const benchmarkGradientId = `apy-benchmark-gradient-${baseId}`;
  const [activePoint, setActivePoint] = useState<any>(null);

  const collateralColors = {
    stroke: 'rgba(255, 255, 255, 1)',
    stopColor1: 'rgba(255, 255, 255, 0.25)',
    stopColor2: 'rgba(255, 255, 255, 0.08)'
  };

  const benchmarkColors = {
    stroke: 'rgba(141, 103, 255, 1)',
    stopColor1: 'rgba(141, 103, 255, 0.25)',
    stopColor2: 'rgba(141, 103, 255, 0.08)'
  };

  const frame = $timeframe.toKey(timeframe);
  const values = data ? data[frame] : [];

  const min = 0;
  const max = alot(values as any[]).mapMany(x => [x.collateralPoolAPY, x.benchmarkAPY]).max(x => x);

  let domainMin = 0;
  let domainMax = Math.ceil(max) + 1;

  let step = ((domainMax - domainMin) / 4);
  let step3 = domainMin + 3 * step;
  let step2 = domainMin + 2 * step;
  let step1 = domainMin + 1 * step;

  //const yAxisTicks = [0.00, 2.00, 4.00, 6.00, 8.00];
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
            <linearGradient id={collateralGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={collateralColors.stopColor1} />
              <stop offset="100%" stopColor={collateralColors.stopColor2} />
            </linearGradient>
            <linearGradient id={benchmarkGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={benchmarkColors.stopColor1} />
              <stop offset="100%" stopColor={benchmarkColors.stopColor2} />
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
            width={30}
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
            tickFormatter={(value) => `${value.toFixed(2)}%`}
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
            dataKey="benchmarkAPY"
            stroke={benchmarkColors.stroke}
            strokeWidth={2}
            fill={`url(#${benchmarkGradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              fill: 'transparent',
              stroke: benchmarkColors.stroke,
              strokeWidth: 2
            }}
          />
          <Area
            type="monotone"
            dataKey="collateralPoolAPY"
            stroke={collateralColors.stroke}
            strokeWidth={2}
            fill={`url(#${collateralGradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              fill: 'transparent',
              stroke: collateralColors.stroke,
              strokeWidth: 2
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
