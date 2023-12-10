import express, { Request, Response } from 'express';
import path from 'path';
import { handleUpload, handleDownload } from './handlers/fileHandler';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post('/upload', upload.array('file', 2), handleUpload);
app.get('/download', handleDownload);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
