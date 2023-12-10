import { parseCSV } from '../parsers/csvParser';
import { parseXML } from '../parsers/xmlParser';

export async function parseAndNormalize(data: string, type: 'csv' | 'xml') {
  const parser = type === 'csv' ? parseCSV : parseXML;
  const records = await parser(data);
  return records.map(normalizeRecord);
}

function normalizeRecord(record: any) {
  return {
    reference: record.Reference || (record['$'] && record['$'].reference),
    accountNumber: record['Account Number'] || record.accountNumber,
    description: record.Description || record.description,
    startBalance: record['Start Balance'] || record.startBalance,
    mutation: record.Mutation || record.mutation,
    endBalance: record['End Balance'] || record.endBalance,
  };
}

export function generateCSVString(records: any[]) {
  return records.map(record => `${record.Reference},${record.Description}`).join('\n');
}
