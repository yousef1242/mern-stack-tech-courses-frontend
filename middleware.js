import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("userInfoDataWhenLoginUser");
  const userInfo =
    req.cookies.get("userInfoDataWhenLoginUser") && JSON.parse(verify.value);
    const url = req.nextUrl.clone()

  if (!verify && url.pathname.startsWith("/profile/setting")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (!verify && url.pathname.startsWith("/profile/my-courses")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (!verify && url.pathname.startsWith("/profile/favourite")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (!verify && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    userInfo?.isAdmin === false &&
    url.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (!verify && url.pathname.startsWith("/dashboard/users")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    userInfo?.isAdmin === false &&
    url.pathname.startsWith("/dashboard/users")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (!verify && url.pathname.startsWith("/dashboard/courses")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    userInfo?.isAdmin === false &&
    url.pathname.startsWith("/dashboard/courses")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (!verify && url.pathname.startsWith("/dashboard/categories")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    userInfo?.isAdmin === false &&
    url.pathname.startsWith("/dashboard/categories")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    !verify &&
    url.pathname.startsWith("/dashboard/courses/add-course")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    userInfo?.isAdmin === false &&
    url.pathname.startsWith("/dashboard/courses/add-course")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    !verify &&
    url.pathname.startsWith("/dashboard/categories/add-category")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (
    userInfo?.isAdmin === false &&
    url.pathname.startsWith("/dashboard/categories/add-category")
  ) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (verify && url.pathname.startsWith("/login")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }

  if (verify && url.pathname.startsWith("/signup")) {
    return NextResponse.redirect("https://mern-stack-tech-courses-frontend.vercel.app/");
  }
}
