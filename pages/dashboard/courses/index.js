import Head from "next/head";
import classes from "../../../styles/coursesDashboard.module.css";
import SidebarDashboard from "@/components/sidebarDashboard/SidebarDashboard";
import request from "@/ulits/request";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export async function getServerSideProps() {
  const { data } = await request.get("/api/courses");
  return {
    props: {
      courses: data,
    },
  };
}

const CoursesDashboard = ({ courses }) => {
  const [courseList, setCourseList] = useState(courses);
  const { user } = useSelector((state) => state.auth);

  //   handle search
  const handleSearch = (event) => {
    const filteredCourses = courses?.filter(
      (course) =>
        course.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        course.category.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setCourseList(filteredCourses);
  };

  //   delete course function
  const deleteCourse = async (courseId) => {
    try {
      const { data } = await request.delete(`/api/courses/delete/${courseId}`, {
        headers: {
          Authorization: "bearer " + user?.token,
        },
      });
      const updatedCourseList = courseList?.filter(
        (course) => course._id !== courseId
      );
      setCourseList(updatedCourseList);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>Dashboard-Courses</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div>
        <div className="row m-0">
          <SidebarDashboard />
          <div className={`col-10 ${classes.rightDiv}`}>
            <div className="container">
              <div
                className="d-flex align-items-center justify-content-between px-3"
                style={{
                  marginBottom: "80px",
                }}
              >
                <h2
                  style={{
                    color: "var(--text-color)",
                    fontWeight: "bold",
                  }}
                >
                  Courses
                </h2>
                <Link
                  href={`/dashboard/courses/add-course`}
                  className={classes.addCourseLink}
                >
                  Add Course
                </Link>
              </div>
              <div className={`card ${classes.cardDiv}`}>
                <div className="mb-4 d-flex justify-content-between align-items-center fw-bold flex-wrap">
                  <h4 className="fw-bold">All Courses</h4>
                  <input
                    type="search"
                    className={classes.searchInput}
                    placeholder="Search for course..."
                    onChange={handleSearch}
                  />
                </div>
                <Table responsive="md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>TITLE</th>
                      <th>PRICE</th>
                      <th>DISCOUNT</th>
                      <th>LESSONS</th>
                      <th>STUDENTS</th>
                      <th>CATEGORY</th>
                      <th>UPDATE</th>
                      <th>DELETE</th>
                      <th>VIEW</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList?.map((course, index) => (
                      <tr key={course?._id}>
                        <td>{index + 1}</td>
                        <td>{course?.title}</td>
                        <td>${course?.price}</td>
                        <td>{course?.discount}%</td>
                        <td>{course?.lessons?.length}</td>
                        <td>{course?.userSubscribeIn?.length}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {course?.category}
                        </td>
                        <td>
                          <Link
                            className={classes.actionCourse}
                            href={`/dashboard/courses/update/${course?._id}`}
                          >
                            Update
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteCourse(course?._id)}
                            className={classes.actionCourse}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link
                            className={classes.actionCourse}
                            href={`/courses/${course?._id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesDashboard;
