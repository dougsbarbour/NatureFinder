import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CSVService {

  constructor() {
  }

  public exportAsCSVFile(data, csvFileName: string, options = {}) {
    let csvBuffer = this.convertArrayOfObjectsToCSV(data, options);
    this.saveAsCSVFile(csvBuffer, csvFileName);
  }

  private convertArrayOfObjectsToCSV(data, options) {
    let result, ctr, columnDelimiter, lineDelimiter, alwaysQuoteFields,
      columnsToInclude, generateHeadings;

    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = options.columnDelimiter || ',';
    lineDelimiter = options.lineDelimiter || '\n';
    alwaysQuoteFields = options.alwaysQuoteFields || false;
    columnsToInclude = options.columnsToInclude || Object.keys(data[0]);
    generateHeadings = options.generateHeadings || true;

    result = '';

    if (generateHeadings) {
      result += columnsToInclude.join(columnDelimiter);
      result += lineDelimiter;
    }

    data.forEach((item) => {
      columnsToInclude.forEach((key) => {
        if (key != columnsToInclude[0]) result += columnDelimiter;
        if (alwaysQuoteFields) result += '"';
        if (typeof item[key] === 'string')
          result += item[key];
        else
          result += JSON.stringify(item[key]);
        if (alwaysQuoteFields) result += '"';
      });
      result += lineDelimiter;
    });

    return result;
  }

  private saveAsCSVFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'data:text/csv;charset=utf-8'});

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.csv');
  }
}

