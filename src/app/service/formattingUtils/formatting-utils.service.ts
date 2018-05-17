import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormattingUtilsService {

    static readonly MINUTE = 60000;
    static readonly HOUR = FormattingUtilsService.MINUTE * 60;
    static readonly DAY = FormattingUtilsService.HOUR * 24;
    static readonly WEEK = FormattingUtilsService.DAY * 7;
    static readonly YEAR = FormattingUtilsService.DAY * 365;

    constructor() {
    }

    toReadableDate(dateStr: string) {
        const date = new Date(dateStr),
            diff = Date.now() - date.getTime();

        if (diff <= FormattingUtilsService.MINUTE) {
            return `just now`;
        } else if (diff <= FormattingUtilsService.HOUR) {
            const diffInMinutes = Math.floor(diff / FormattingUtilsService.MINUTE);
            return `${diffInMinutes} ${this.pluralIfNeeded(diffInMinutes, 'minutes', 'minute')} ago`;
        } else if (diff <= FormattingUtilsService.DAY) {
            const diffInHours = Math.floor(diff / FormattingUtilsService.HOUR);
            return `${diffInHours} ${this.pluralIfNeeded(diffInHours, 'hours', 'hour')} ago`;
        } else if (diff <= FormattingUtilsService.WEEK) {
            const diffInDays = Math.floor(diff / FormattingUtilsService.DAY);
            return `${diffInDays} ${this.pluralIfNeeded(diffInDays, 'days', 'day')} ago`;
        } else if (diff <= FormattingUtilsService.YEAR) {
            const diffInWeeks = Math.floor(diff / FormattingUtilsService.WEEK);
            return `${diffInWeeks} ${this.pluralIfNeeded(diffInWeeks, 'weeks', 'week')} ago`;
        } else {
            const diffInYears = Math.floor(diff / FormattingUtilsService.YEAR);
            return `${diffInYears} ${this.pluralIfNeeded(diffInYears, 'years', 'year')} ago`;
        }
    }

    pluralIfNeeded(num: number,
                   plural: string,
                   singular: string): string {
        return num > 1 ? plural : singular;
    }

    largeIntegerToReadable(num: number): string {
        if (num < 1000) {
            return num.toString();
        } else if (num < 1000000) {
            return Math.floor(num / 1000) + 'k';
        } else {
            return Math.floor(num / 1000000) + 'm';
        }
    }
}
