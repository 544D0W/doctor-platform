import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { patient_id } = req.query;

  if (!patient_id) {
    return res.status(400).json({ error: 'Patient ID is required' });
  }

  try {
    const dataDir = path.join(process.cwd(), 'data');
    const files = readdirSync(dataDir).filter(file => file.startsWith('emergency_') && file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const fileData = JSON.parse(readFileSync(filePath, 'utf8'));

      // Check if the patient_id matches
      if (fileData.patient_id === parseInt(patient_id as string, 10)) {
        return res.status(200).json(fileData);
      }
    }

    return res.status(404).json({ error: 'Patient not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 