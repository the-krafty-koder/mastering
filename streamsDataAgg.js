import { Transform } from "stream";
import { parse } from "csv-parse";
import { createReadStream } from "fs";

const csvParser = parse({ columns: true });

export class FilterByCountry extends Transform {
  constructor(country, options = {}) {
    options.objectMode = true;
    super(options);
    this.country = country;
  }

  _transform(record, encoding, cb) {
    if (record.country === this.country) {
      this.push(record);
    }
    cb();
  }
}

export class SumProfit extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.total = 0;
  }

  _transform(record, encoding, cb) {
    const profit = record.profit.slice(1, record.profit.length - 1);
    this.total += Number.parseInt(profit);
    cb();
  }

  _flush(cb) {
    this.push(this.total.toString());
    cb();
  }
}

createReadStream("MOCK_DATA.csv")
  .pipe(csvParser)
  .pipe(new FilterByCountry("Brazil"))
  .pipe(new SumProfit())
  .pipe(process.stdout);
