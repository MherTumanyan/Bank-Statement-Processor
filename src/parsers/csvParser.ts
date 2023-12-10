import csvParser from 'csv-parser';
import { Readable } from 'stream';

interface CSVRecord {
  Reference: string;
  'Start Balance': string;
  Mutation: string;
  'End Balance': string;
  Description: string;
}

export function parseCSV(csvData: string): Promise<CSVRecord[]> {
  const records: CSVRecord[] = [];

  return new Promise((resolve, reject) => {
    const parser = csvParser({ mapHeaders: ({ header }) => header.trim() });

    parser
      .on('data', (data: CSVRecord) => {
        records.push(data);
      })
      .on('end', () => {
        resolve(records);
      })
      .on('error', (error) => {
        reject(error);
      });

    const stringStream = createStringStream(csvData);
    stringStream.pipe(parser);
  });
}

function createStringStream(data: string) {
  return Readable.from(data);
}