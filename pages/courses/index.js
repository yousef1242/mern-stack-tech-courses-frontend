import request from "@/ulits/request";
import classes from "../../styles/courses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faVideo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

export async function getServerSideProps() {
  const { data } = await request.get("/api/courses");
  const res = await request.get("/api/categories");
  return {
    props: {
      courses: data,
      categories: res.data,
    },
  };
}

const Courses = ({ courses, categories }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  let newCourses = courses.filter((course) =>
    category === "all" ? courses : course.category === category
  );

  newCourses = newCourses.filter((course) =>
    search === ""
      ? courses
      : course.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div className={classes.coursesPage}>
        <h1 className="mb-5 text-capitalize text-center fw-bold">
          All Courses
        </h1>
        <div className="container z-3">
          <div className={`row ${classes.header}`}>
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <h1 className={classes.headerTitle}>
                {newCourses?.length} courses
              </h1>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-end flex-wrap-reverse">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mb-lg-0 mb-3"
              >
                <input
                  className={classes.input}
                  type="search"
                  placeholder="course..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </form>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className={`mb-lg-0 mb-3 ${classes.select}`}
              >
                <option selected={category === "all"} disabled>
                  sort by category
                </option>
                {categories?.map((cat) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={cat?._id}
                    value={cat?.title}
                  >
                    {cat?.title}
                  </option>
                ))}
              </select>
              <button
                className={`mb-lg-0 mb-3 ${classes.reset}`}
                onClick={() => {
                  setCategory("all");
                  setSearch("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className={classes.courseSection}>
            <div className="row m-0">
              {newCourses.length > 0 ? (
                newCourses.map((course) => (
                  <div
                    key={course?._id}
                    className={`col-12 col-md-6 col-lg-4 ${classes.mainCard}`}
                  >
                    <div className={`card ${classes.cardDiv}`}>
                      <div className={classes.imageDiv}>
                        <img src={course?.image?.src} alt="" />
                      </div>
                      <h3 className={classes.title}>{course.title}</h3>
                      <div className={classes.lesson}>
                        <span>
                          <FontAwesomeIcon
                            className={classes.iconVideo}
                            icon={faVideo}
                          />
                        </span>{" "}
                        <span>{course?.lessons?.length}</span>{" "}
                        <span>Lessons</span>
                      </div>
                      <div className={classes.toCourse}>
                        <Link href={`/courses/${course?._id}`}>
                          {" "}
                          <FontAwesomeIcon icon={faArrowCircleRight} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className={classes.noCourses}>No courses</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
