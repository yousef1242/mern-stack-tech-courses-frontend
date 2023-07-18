import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("userInfoDataWhenLoginUser");
  const userInfo =
    req.cookies.get("userInfoDataWhenLoginUser") && JSON.parse(verify.value);
  let url = req.url;

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/profile/setting")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/profile/my-courses")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/profile/favourite")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/dashboard")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/dashboard/users")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/users")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/dashboard/courses")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/courses")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (!verify && url.includes("https://tech-courses-frontend.vercel.app/dashboard/categories")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/categories")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    !verify &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/courses/add-course")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/courses/add-course")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    !verify &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/categories/add-category")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("https://tech-courses-frontend.vercel.app/dashboard/categories/add-category")
  ) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (verify && url.includes("https://tech-courses-frontend.vercel.app/login")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }

  if (verify && url.includes("https://tech-courses-frontend.vercel.app/signup")) {
    return NextResponse.redirect("https://tech-courses-frontend.vercel.app");
  }
}
