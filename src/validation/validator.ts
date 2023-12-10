import { isEmpty } from 'lodash';

interface ValidationReport {
  Reference: string;
  Description: string;
}

const getDecimalPlaces = (num: number): number => {
  const match = num.toString().match(/\.(\d+)$/);
  return match ? match[1].length : 0;
}

const addWithPrecision = (num1: number, num2: number): number => {
  const precision = Math.max(getDecimalPlaces(num1), getDecimalPlaces(num2));
  const result = num1 + num2;
  return parseFloat(result.toFixed(precision));
}

export function validateRecords(records: any[]): ValidationReport[] {
  const referenceSet = new Set<string>();
  const invalidRecords: ValidationReport[] = [];

  for (const record of records) {
    const reference = record.reference || record['$']?.reference;
    const description = record.description || 'No description';
    const startBalance = Number(record.startBalance);
    const mutation = Number(record.mutation);
    const endBalance = Number(record.endBalance);

    
    const isValidReference = reference && !referenceSet.has(reference) && referenceSet.add(reference);
    const isValidSum = addWithPrecision(startBalance, mutation) === endBalance;

    if (!(isValidReference && isValidSum)) {
      invalidRecords.push({ Reference: reference, Description: description });
    }
    
  }

  return invalidRecords;
}

export function validateUploadedFiles(files: Express.Multer.File[]) {
  if (!files || files.length !== 2) {
    throw new Error('Please upload both CSV and XML files.');
  }
}

export function validateDownload(records: any[]) {
  if (isEmpty(records)) {
    throw new Error('Please upload CSV and XML files first.');
  }
}