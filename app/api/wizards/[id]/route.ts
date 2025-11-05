import { NextResponse } from "next/server";
import { WIZARDS } from "@/lib/server/mockWizards";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const found = WIZARDS.find((w) => w.id === id);

  if (!found) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(found);
}
