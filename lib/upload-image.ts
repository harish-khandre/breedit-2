import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials are not provided in environment variables.");
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToS3(file: File) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const maxFileSize = 5 * 1024 * 1024; // 10 MB

  if (fileBuffer.length > maxFileSize) {
    throw new Error("File is too large");
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${file.name}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
    Body: fileBuffer,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return signedUrl.split("?")[0];
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return null;
  }
}
