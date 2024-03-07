import next from "next";
import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export default function middleware(request: NextRequest) {
  // Pega token de autenticação pelo cookie
  const token = request.cookies.get("authjs.sessions.token");

  // Do proprio Next
  const pathname = request.nextUrl.pathname;

  console.log({
    token: token?.value,
    pathname,
  });

  //Redirect para '/app' se usuario estiver no '/path' 
  // e tiver um token
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL(getUrl("/app")));
  }

  //Redirect para '/auth' se usuario estiver em app
  // mas não tiver um token
  if (pathname.includes('app') && !token) {
       return NextResponse.redirect(new URL(getUrl('/auth')))
  }
}

export const config = {
       matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
