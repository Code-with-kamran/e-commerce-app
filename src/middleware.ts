import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Empty matcher — runs on nothing until Auth is wired in Module 2+
export const config = {
  matcher: [],
};
