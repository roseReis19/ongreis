import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"

export const config = {
  matcher: [ 
    '/panel', '/platform/:path*'
  ],
};

/*export default async function middleware(req) {
 const url = req.nextUrl;
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
 
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  /*if(path !== '/dardo' ) {
    console.log('here')
    //return NextResponse.rewrite(new URL(`/home`, req.url))
  }*/
/*
  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const session = await getToken({ req });
    if (!session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && path == "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }


  // special case for `vercel.pub` domain
  if (hostname === "vercel.pub") {
    return NextResponse.redirect(
      "https://vercel.com/blog/platforms-starter-kit",
    );
  };*/
  
  // rewrite root application to `/home` folder

  // rewrite everything else to `/[domain]/[path] dynamic route
  //return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
//}
