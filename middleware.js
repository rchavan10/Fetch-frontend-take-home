import { parse } from "cookie";
import { NextResponse } from "next/server";

const protectedRoutes = ["/home", "/favorites", "/"];

// check if element is in array
const isProtected = (element) => protectedRoutes.includes(element);

const nextUrl = process.env.NEXT_BASE_PATH;

export const middleware = (req) => {
  const { pathname } = req.nextUrl;

  const fetchAccessTokenCookie = req.cookies.get("fetch-frontend-user");
  // console.log("fetch cookie: ", fetchAccessTokenCookie);

  if (isProtected(pathname)) {
    if (!fetchAccessTokenCookie) {
      // Redirect if trying to access a protected route without a token
      return NextResponse.redirect(`${nextUrl}/login`);
    } else {
      const expirationTime = new Date(fetchAccessTokenCookie.expires);

      if (expirationTime < new Date()) {
        // Token has expired
        // Clear the expired token and redirect to login
        // req.cookies.set('fetch-access-token', '', { expires: new Date(0) }); // Clear the cookie

        return NextResponse.redirect(`${nextUrl}/login`);
      } else if (pathname === "/") {
        return NextResponse.redirect(`${nextUrl}/home`);
      }
    }
  } else if (pathname === "/login" && fetchAccessTokenCookie) {
    // If trying to access the login page with a valid token, redirect to home
    return NextResponse.redirect(`${nextUrl}/home`);
  }

  return NextResponse.next();
};
