import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest
) {
  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const itemId = pathSegments[pathSegments.length - 1];
    const values = await req.json();

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const element = await db.element.update({
      where: {
        id: itemId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(element);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
