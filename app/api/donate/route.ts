import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user-from-server";
import { uploadFileToS3 } from "@/lib/upload-image";

export async function POST(req: Request) {
  const formData = await req.formData();

  const image = formData.get("image");
  const name = formData.get("name");
  const age = formData.get("age");
  const breed = formData.get("breed");
  const gender = formData.get("gender");
  const reason = formData.get("reason");
  const healthCondition = formData.get("healthCondition");
  const isVaccinated = formData.get("isVaccinated");
  const address = formData.get("address");
  const phone = formData.get("phone");

  console.log(formData);

  if (!(image instanceof File)) {
    return NextResponse.json({ error: "File not found" });
  }

  const img = await uploadFileToS3(image);

  if (!img) {
    return NextResponse.json({ error: "Failed to upload image to S3" });
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  const userId = user.id;

  if (!userId) {
    return NextResponse.json({ error: "User id not found" });
  }

  try {
    await db.donate.create({
      data: {
        userId: userId as string,
        name: name as string,
        age: age as string,
        breed: breed as string,
        gender: gender as string,
        reason: reason as string,
        healthCondition: healthCondition as string,
        isVaccinated: isVaccinated === "true",
        address: address as string,
        phone: phone as string,
        image: img as string,
      },
    });
    return NextResponse.json({ success: "Form submitted!" });
  } catch (error) {
    console.error("Error storing data :", error);
    return NextResponse.json({ error: "Failed to register" });
  }
}
