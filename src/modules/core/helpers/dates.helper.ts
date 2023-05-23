import { DateTime } from 'luxon';

export class DatesHelper {

  // Returns the difference (in days) between 2 dates.
  static dateDiff(startDate: string, endDate: string): number {

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    return Math.floor((eDate.getTime() - sDate.getTime()) / 1000 / 60 / 60 / 24);

  }

  static addDaysToDate(startDate: string, days: number): string {
    let sDate = new Date(startDate);

    sDate.setDate(sDate.getDate() + days);

    return sDate.toString();
  }

  static parseIntoValidFormat(dateInput: null | string, format = 'yyyy/MM/dd'): null | string {

    if (!dateInput) { return null; }

    const validDateFormats = [
      'dd/MM/yyyy',
      'yyyy/MM/dd',
      'MM/dd/yyyy',
      'd/M/yyyy',
      'd/M',
      'M/d',
      'yyyy'
    ];

    for (const dateFormat of validDateFormats) {

      const parsedDate = DateTime.fromFormat(dateInput, dateFormat);

      if (parsedDate.isValid && parsedDate.year > 1900) {
        return parsedDate.toFormat(format);
      }

    }

    return null;
  }

}
