import { NextResponse } from "next/server";
import { WIZARDS } from "@/lib/server/mockWizards";

export async function GET() {
  return NextResponse.json(WIZARDS);
}