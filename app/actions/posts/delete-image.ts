"use server";
import { auth } from "@clerk/nextjs/server";
import { Storage } from "@google-cloud/storage";

export async function deleteImageFromStorage(imageUrl: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  if (!imageUrl) {
    return { error: true, message: "Image URL not provided for deletion." };
  }

  try {
    const urlParts = imageUrl.split('/');
    const bucketNameFromUrl = urlParts[3];
    const filePathInBucket = urlParts.slice(4).join('/');

    if (bucketNameFromUrl !== process.env.GCS_BUCKET_NAME) {
      return { error: true, message: 'Image bucket name does not correspond to expectations.' };
    }

    if (!process.env.GCS_BUCKET_NAME) {
      return { error: true, message: 'Configuration error: GCS bucket name not defined.' };
    }

    let storage: Storage;
    try {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        storage = new Storage({
          keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        });
      } else if (process.env.GCS_SERVICE_ACCOUNT_KEY) {
        const credentials = JSON.parse(process.env.GCS_SERVICE_ACCOUNT_KEY);
        storage = new Storage({
          projectId: credentials.project_id,
          credentials: {
            client_email: credentials.client_email,
            private_key: credentials.private_key.replace(/\\n/g, '\n'),
          },
        });
      } else {
        throw new Error("Google cloud credentials is not defined.");
      }
    } catch (authError: unknown) {
      let errorMessage = 'Unknow error.';
      if (authError instanceof Error) {
        errorMessage = authError.message;
      } else if (typeof authError === 'string') {
        errorMessage = authError;
      }
      return { error: true, message: `Error in credentials of google cloud: ${errorMessage}` };
    }

    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    const file = bucket.file(filePathInBucket);

    await file.delete();

    return {
      success: true,
      message: "Image deleted from storage and post updated."
    };

  } catch (error: unknown) {
    let errorMessage = 'Error to delete image';
    if (error instanceof Error) {
      errorMessage = error.message;
      if ('code' in error && error.code === 404) {
        errorMessage = 'The image was not found in google cloud.';
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      error: true,
      message: `Server error during image deletion: ${errorMessage}`
    };
  }
}
