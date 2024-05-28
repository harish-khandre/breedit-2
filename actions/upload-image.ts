"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

interface Image {
  file: File;
}

export async function uploadFileToS3({ file }: Image) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileBuffer = buffer;

  const size = 1024 * 1024 * 10;

  if (fileBuffer.length > size) {
    return NextResponse.json({ error: "File is too large" }, { status: 400 });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log(signedUrl);
    return signedUrl.split("?")[0];
  } catch (error) {
    console.log(error);
  }
}
