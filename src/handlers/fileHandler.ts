import { Request, Response } from 'express';
import { parseAndNormalize, generateCSVString } from '../processors/dataProcessor';
import { validateDownload, validateRecords, validateUploadedFiles } from '../validation/validator';

let invalidRecords: any[];

export async function handleUpload(req: Request, res: Response) {
  try {   
    validateUploadedFiles(req.files as Express.Multer.File[]);

    const [csvFile, xmlFile] = req.files as Express.Multer.File[];
    const csvData = csvFile.buffer.toString('utf-8');
    const xmlData = xmlFile.buffer.toString('utf-8');

    const normalizedCSVRecords = await parseAndNormalize(csvData, 'csv');
    const normalizedXMLRecords = await parseAndNormalize(xmlData, 'xml');

    const allRecords = [...normalizedCSVRecords, ...normalizedXMLRecords];
    invalidRecords = validateRecords(allRecords);

    res.json({ invalidRecords });
  } catch (error) {
    handleUploadError(error as Error, res);
  }
}

export function handleDownload(req: Request, res: Response) {
  try {    
    validateDownload(invalidRecords);
    const csvString = generateCSVString(invalidRecords);
    setDownloadHeaders(res);
    res.status(200).send(csvString);
  } catch (error) {
    handleDownloadError(error as Error, res);
  }
}

function handleUploadError(error: Error, res: Response) {
  console.error(error);
  res.status(400).send(error.message);
}

function handleDownloadError(error: Error, res: Response) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}

function setDownloadHeaders(res: Response) {
  res.setHeader('Content-disposition', 'attachment; filename=report.csv');
  res.set('Content-Type', 'text/csv');
}
