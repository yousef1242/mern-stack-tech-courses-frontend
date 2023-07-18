import Head from "next/head";
import FrontHome from "@/components/frontHome/FrontHome";
import CoursesSectionHome from "@/components/coursesCard/CoursesSectionHome";
import classes from "../styles/Home.module.css";
import Link from "next/link";
import request from "@/ulits/request";

export async function getServerSideProps() {
  const { data } = await request.get("/api/courses");
  return {
    props: {
      courses: data,
    },
  };
}

export default function Home({ courses }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <FrontHome />
      <CoursesSectionHome courses={courses} />
      <div className={classes.start}>
        <div className={classes.container}>
          <div className={classes.InfoDiv}>
            <h3>Tech-Courses</h3>
            <p>The beggest education platform in the world</p>
            <Link href={`/courses`}>Start now</Link>
          </div>
        </div>
      </div>
    </>
  );
}
