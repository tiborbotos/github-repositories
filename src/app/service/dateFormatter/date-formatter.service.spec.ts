import { TestBed, inject } from '@angular/core/testing';

import { DateFormatterService } from './date-formatter.service';

describe('DateFormatterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateFormatterService]
        });
    });

    it('should be created', inject([DateFormatterService], (service: DateFormatterService) => {
        expect(service).toBeTruthy();
    }));

    it('should convert current date', inject([DateFormatterService], (service: DateFormatterService) => {
        const now = new Date().toISOString();

        const result = service.toReadableDate(now);

        expect(result).toEqual('just now');
    }));

    it('should convert a minute ago', inject([DateFormatterService], (service: DateFormatterService) => {
        const minute1 = new Date(Date.now() - DateFormatterService.MINUTE - 1).toISOString(),
            minute2 = new Date(Date.now() - (DateFormatterService.MINUTE * 2) - 1).toISOString();

        const result1 = service.toReadableDate(minute1),
            result2 = service.toReadableDate(minute2);

        expect(result1).toEqual('1 minute ago');
        expect(result2).toEqual('2 minutes ago');
    }));

    it('should convert an hour ago', inject([DateFormatterService], (service: DateFormatterService) => {
        const hour1 = new Date(Date.now() - DateFormatterService.HOUR - 1).toISOString(),
            hour2 = new Date(Date.now() - (DateFormatterService.HOUR * 2) - 1).toISOString();

        const result1 = service.toReadableDate(hour1),
            result2 = service.toReadableDate(hour2);

        expect(result1).toEqual('1 hour ago');
        expect(result2).toEqual('2 hours ago');
    }));

    it('should convert a day ago', inject([DateFormatterService], (service: DateFormatterService) => {
        const day1 = new Date(Date.now() - DateFormatterService.DAY - 1).toISOString(),
            day2 = new Date(Date.now() - (DateFormatterService.DAY * 2) - 1).toISOString();

        const result1 = service.toReadableDate(day1),
            result2 = service.toReadableDate(day2);

        expect(result1).toEqual('1 day ago');
        expect(result2).toEqual('2 days ago');
    }));

    it('should convert a week ago', inject([DateFormatterService], (service: DateFormatterService) => {
        const day1 = new Date(Date.now() - (DateFormatterService.DAY * 7) - 1).toISOString(),
            day2 = new Date(Date.now() - (DateFormatterService.DAY * 15) - 1).toISOString();

        const result1 = service.toReadableDate(day1),
            result2 = service.toReadableDate(day2);

        expect(result1).toEqual('1 week ago');
        expect(result2).toEqual('2 weeks ago');
    }));

    it('should convert a year ago', inject([DateFormatterService], (service: DateFormatterService) => {
        const year1 = new Date(Date.now() - (DateFormatterService.DAY * 365) - 1).toISOString(),
            year2 = new Date(Date.now() - (DateFormatterService.DAY * 730) - 1).toISOString();

        const result1 = service.toReadableDate(year1),
            result2 = service.toReadableDate(year2);

        expect(result1).toEqual('1 year ago');
        expect(result2).toEqual('2 years ago');
    }));
});
