import alot from 'alot';
import { NumberUtil } from 'src/utilities/NumberUtilt';

export namespace $timeframe {
  export function toKey(timeframeName: string) {
    const frame = {
      'All': 'all',
      '1y': 'y1',
      //'1 Day': 'hourly',
      '7d': 'd7',
      '1 Week': 'd7',
      '1 Month': 'd30',
      '30d': 'd30',

      // ['All', '1y', '30d', '7d']
    }[timeframeName];
    return frame;
  }
  export function avg (values: number[]) {
    if (values == null || values.length === 0) {
      return 0;
    }
    return NumberUtil.round(alot(values).sum(x => x) / values.length, 2);
  }
  export function formatTimeframe(date, frame: 'all' | 'y1' | 'd30' | 'd7'): string {
    if (date == null || date === '') {
      return '';
    }
    date = new Date(date);
    if (isNaN(date.valueOf())) {
      console.error(`Invalid date`, date);
    }

    if (frame === 'all' || frame === 'y1') {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'long'
      });
    };

    if (frame === 'd7' || frame === 'd30') {
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}/${month}`;
    }
    return '-';
  }

}
