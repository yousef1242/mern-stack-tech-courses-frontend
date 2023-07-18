import { useEffect, useState } from "react";
import classes from "../../styles/coursesSectionHome.module.css";
import CoursesItem from "../coursesItem/CoursesItem";
import axios from "axios";
import Link from "next/link";

const CoursesSectionHome = ({ courses }) => {
  return (
    <div className={classes.coursesSectionHome}>
      <div className={classes.overlay}></div>
      <div className="container position-relative">
        <h1 style={{ marginBottom: "100px" }}>Newest Courses</h1>
        <CoursesItem courses={courses.slice(0, 6)} />
        <div className={classes.showMore}>
          <Link href={`/courses`}>Show more</Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesSectionHome;
