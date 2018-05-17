import { TestBed, inject } from '@angular/core/testing';

import { FormattingUtilsService } from './formatting-utils.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('FormattingUtilsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormattingUtilsService]
        });
    });

    it('should be created', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        expect(service).toBeTruthy();
    }));

    it('should convert current date', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const now = new Date().toISOString();

        const result = service.toReadableDate(now);

        expect(result).toEqual('just now');
    }));

    it('should convert a minute ago', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const minute1 = new Date(Date.now() - FormattingUtilsService.MINUTE - 1).toISOString(),
            minute2 = new Date(Date.now() - (FormattingUtilsService.MINUTE * 2) - 1).toISOString();

        const result1 = service.toReadableDate(minute1),
            result2 = service.toReadableDate(minute2);

        expect(result1).toEqual('1 minute ago');
        expect(result2).toEqual('2 minutes ago');
    }));

    it('should convert an hour ago', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const hour1 = new Date(Date.now() - FormattingUtilsService.HOUR - 1).toISOString(),
            hour2 = new Date(Date.now() - (FormattingUtilsService.HOUR * 2) - 1).toISOString();

        const result1 = service.toReadableDate(hour1),
            result2 = service.toReadableDate(hour2);

        expect(result1).toEqual('1 hour ago');
        expect(result2).toEqual('2 hours ago');
    }));

    it('should convert a day ago', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const day1 = new Date(Date.now() - FormattingUtilsService.DAY - 1).toISOString(),
            day2 = new Date(Date.now() - (FormattingUtilsService.DAY * 2) - 1).toISOString();

        const result1 = service.toReadableDate(day1),
            result2 = service.toReadableDate(day2);

        expect(result1).toEqual('1 day ago');
        expect(result2).toEqual('2 days ago');
    }));

    it('should convert a week ago', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const day1 = new Date(Date.now() - (FormattingUtilsService.DAY * 7) - 1).toISOString(),
            day2 = new Date(Date.now() - (FormattingUtilsService.DAY * 15) - 1).toISOString();

        const result1 = service.toReadableDate(day1),
            result2 = service.toReadableDate(day2);

        expect(result1).toEqual('1 week ago');
        expect(result2).toEqual('2 weeks ago');
    }));

    it('should convert a year ago', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const year1 = new Date(Date.now() - (FormattingUtilsService.DAY * 365) - 1).toISOString(),
            year2 = new Date(Date.now() - (FormattingUtilsService.DAY * 730) - 1).toISOString();

        const result1 = service.toReadableDate(year1),
            result2 = service.toReadableDate(year2);

        expect(result1).toEqual('1 year ago');
        expect(result2).toEqual('2 years ago');
    }));

    it('should decide if a number is plurar', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        expect(service.pluralIfNeeded(1, 'plural', 'singular')).toBe('singular');
        expect(service.pluralIfNeeded(2, 'plural', 'singular')).toBe('plural');
    }));

    it('should make large number readable', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const numSmall = 314,
            numMedium = 5315,
            numLarge = 24240,
            numGoogol = 124944222;

        expect(service.largeIntegerToReadable(numSmall)).toBe('314');
        expect(service.largeIntegerToReadable(numMedium)).toBe('5k');
        expect(service.largeIntegerToReadable(numLarge)).toBe('24k');
        expect(service.largeIntegerToReadable(numGoogol)).toBe('124m');
    }));

    it('should properly format http errors', inject([FormattingUtilsService], (service: FormattingUtilsService) => {
        const error0 = {
                status: 0
            } as HttpErrorResponse,
            error1 = {
                status: 500
            } as HttpErrorResponse,
            error2 = {
                status: 404,
                statusText: 'Url not found'
            } as HttpErrorResponse,
            error3 = {
                status: 300,
                statusText: 'Redirect issue'
            } as HttpErrorResponse,
            error4 = {
                status: 600,
                statusText: 'Unknown',
                message: 'Strange error'
            } as HttpErrorResponse;

        expect(service.formatHttpError(error0)).toBe('Request timed out, try again later');
        expect(service.formatHttpError(error1)).toBe('Github cannot handle your request at the moment, try again later');
        expect(service.formatHttpError(error2)).toBe('Error (404): Url not found');
        expect(service.formatHttpError(error3)).toBe('Error (300): Redirect issue');
        expect(service.formatHttpError(error4)).toBe('Unknown error happened: Strange error');
    }));
});
