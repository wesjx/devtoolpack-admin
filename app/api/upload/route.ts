import { Storage } from '@google-cloud/storage'; 
import { NextRequest } from 'next/server'; 

export async function POST(req: NextRequest) {
  console.log('1. Requisition POST reciept in /api/upload');

  if (!req.body) {
    console.log('Error: requisition body empty');
    return new Response(JSON.stringify({ error: 'Error: requisition body empty' }), { status: 400 });
  }

  try {
    const formData = await req.formData();

    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'Any image was found.' }), { status: 400 });
    }

    if (!process.env.GCS_BUCKET_NAME) {
      return new Response(JSON.stringify({ error: 'Configuration error. Name of the bucket was not found.' }), { status: 500 });
    }
    let storage: Storage;
    try {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        storage = new Storage({
          keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        });
      }
      else if (process.env.GCS_SERVICE_ACCOUNT_KEY) {
        const credentials = JSON.parse(process.env.GCS_SERVICE_ACCOUNT_KEY);
        storage = new Storage({
          projectId: credentials.project_id,
          credentials: {
            client_email: credentials.client_email,
            private_key: credentials.private_key.replace(/\\n/g, '\n'),
          },
        });
      } else {
        throw new Error("Google Cloud credentials not configured in environment variables.");
      }
    } catch (authError: unknown) {
      const errorMessage = (authError && typeof authError === 'object' && 'message' in authError) ? (authError as { message: string }).message : String(authError);
      return new Response(JSON.stringify({ error: `Credentials error in Google Cloud: ${errorMessage}` }), { status: 500 });
    }
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    const fileBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(fileBuffer); 

    const originalFileName = imageFile.name || 'unnamed-file';
    const fileName = `${Date.now()}-${originalFileName}`; 
    const destinationPath = `links-images/${fileName}`; 

    const blob = bucket.file(destinationPath);
    const blobStream = blob.createWriteStream({
      resumable: false, 
      contentType: imageFile.type || '', 
    });

    await new Promise<void>((resolve, reject) => {
      blobStream.on('error', (err) => {
          reject(err); 
      });
      blobStream.on('finish', () => {
          resolve(); 
      });
      blobStream.end(buffer); 
    });

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`;

    return new Response(JSON.stringify({ imageUrl }), { status: 200 });

  } catch (error: unknown) {
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : String(error);
    return new Response(JSON.stringify({ error: `Erro interno do servidor: ${errorMessage}` }), { status: 500 });
  }
}