import xml2js from 'xml2js';

interface XMLRecord {
  $: { reference: string };
  accountNumber: string;
  description: string;
  startBalance: string;
  mutation: string;
  endBalance: string;
}

export function parseXML(xmlData: string): Promise<XMLRecord[]> {
  const parser = new xml2js.Parser({ explicitArray: false });

  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const records = Array.isArray(result.records.record)
          ? result.records.record
          : [result.records.record];
        resolve(records);
      }
    });
  });
}
