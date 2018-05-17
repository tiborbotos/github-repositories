import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateFormatterService {

    static readonly MINUTE = 60000;
    static readonly HOUR = DateFormatterService.MINUTE * 60;
    static readonly DAY = DateFormatterService.HOUR * 24;
    static readonly WEEK = DateFormatterService.DAY * 7;
    static readonly YEAR = DateFormatterService.DAY * 365;

    constructor() {
    }

    toReadableDate(dateStr: string) {
        const date = new Date(dateStr),
            diff = Date.now() - date.getTime();

        if (diff <= DateFormatterService.MINUTE) {
            return `just now`;
        } else if (diff <= DateFormatterService.HOUR) {
            const diffInMinutes = Math.floor(diff / DateFormatterService.MINUTE);
            return `${diffInMinutes} ${this.pluralIfNeeded(diffInMinutes, 'minutes', 'minute')} ago`;
        } else if (diff <= DateFormatterService.DAY) {
            const diffInHours = Math.floor(diff / DateFormatterService.HOUR);
            return `${diffInHours} ${this.pluralIfNeeded(diffInHours, 'hours', 'hour')} ago`;
        } else if (diff <= DateFormatterService.WEEK) {
            const diffInDays = Math.floor(diff / DateFormatterService.DAY);
            return `${diffInDays} ${this.pluralIfNeeded(diffInDays, 'days', 'day')} ago`;
        } else if (diff <= DateFormatterService.YEAR) {
            const diffInWeeks = Math.floor(diff / DateFormatterService.WEEK);
            return `${diffInWeeks} ${this.pluralIfNeeded(diffInWeeks, 'weeks', 'week')} ago`;
        } else {
            const diffInYears = Math.floor(diff / DateFormatterService.YEAR);
            return `${diffInYears} ${this.pluralIfNeeded(diffInYears, 'years', 'year')} ago`;
        }
    }

    private pluralIfNeeded(num: number,
                           plural: string,
                           singular: string) {
        return num > 1 ? plural : singular;
    }
}
