import request from "@/ulits/request";
import classes from "../../../styles/courses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faVideo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

const Category = ({ courses }) => {
  const { category } = useRouter().query;
  const [search, setSearch] = useState("");

  let newCourses = courses?.filter((course) =>
    search === ""
      ? courses
      : course.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Head>
        <title>Category-{category}</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div className={classes.coursesPage}>
        <div className="container">
          <h1 className="mb-5 text-capitalize text-center fw-bold">
            {category}
          </h1>
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
              <button
                className={`mb-lg-0 mb-3 ${classes.reset}`}
                onClick={() => {
                  setSearch("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className={classes.courseSection}>
            <div className="row m-0">
              {newCourses?.length > 0 ? (
                newCourses?.map((course) => (
                  <div
                    key={course._id}
                    className={`col-12 col-md-6 col-lg-4 ${classes.mainCard}`}
                  >
                    <div className={`card ${classes.cardDiv}`}>
                      <div className={classes.imageDiv}>
                        <img src={course.image.src} alt="" />
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
                        <Link href={`/courses/${course._id}`}>
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

export default Category;

export async function getServerSideProps(context) {
  const { category } = context.query;
  const { data } = await request.get(`/api/courses/category/${category}`);
  return { props: { courses: data } };
}
