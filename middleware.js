import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("userInfoDataWhenLoginUser");
  const userInfo =
    req.cookies.get("userInfoDataWhenLoginUser") && JSON.parse(verify.value);
  let url = req.url;

  if (!verify && url.includes("http://localhost:3000/profile/setting")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("http://localhost:3000/profile/my-courses")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("http://localhost:3000/profile/favourite")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("http://localhost:3000/dashboard")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("http://localhost:3000/dashboard")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("http://localhost:3000/dashboard/users")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("http://localhost:3000/dashboard/users")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("http://localhost:3000/dashboard/courses")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("http://localhost:3000/dashboard/courses")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (!verify && url.includes("http://localhost:3000/dashboard/categories")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("http://localhost:3000/dashboard/categories")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    !verify &&
    url.includes("http://localhost:3000/dashboard/courses/add-course")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("http://localhost:3000/dashboard/courses/add-course")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    !verify &&
    url.includes("http://localhost:3000/dashboard/categories/add-category")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (
    userInfo?.isAdmin === false &&
    url.includes("http://localhost:3000/dashboard/categories/add-category")
  ) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (verify && url.includes("http://localhost:3000/login")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (verify && url.includes("http://localhost:3000/signup")) {
    return NextResponse.redirect("http://localhost:3000");
  }
}
