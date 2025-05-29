import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function uploadFile(file, folder) {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    // Create directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true });
    
    const fileName = `${Date.now()}-${file.originalFilename}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Move the file to the upload directory
    await fs.rename(file.filepath, filePath);
    
    // Return the relative path for storage in database
    return `/uploads/${folder}/${fileName}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
} 