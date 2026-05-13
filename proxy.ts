import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-pathname", request.nextUrl.pathname);
  return res;
}
export const config = { matcher: ["/((?!_next|favicon.ico).*)"] };
