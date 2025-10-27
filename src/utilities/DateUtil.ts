import formatDate from 'date-fns/format';


export namespace DateUtil {
    export function format (date: Date, format: string = 'MM.dd.yy HH:mm') {
        return formatDate(date, format);
    }

    export function getMonth (date: Date) {
        return date.toLocaleDateString('en-US', {
            month: 'long'
        });
    }

    export function isToday (date: Date | string) {
        if (typeof date ==='string') {
            date = new Date(date);
        }
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let start = today.valueOf();
        let end = start + (24 * 60 * 60 * 1000);
        return start <= date.valueOf() && date.valueOf() < end;
    }
}
