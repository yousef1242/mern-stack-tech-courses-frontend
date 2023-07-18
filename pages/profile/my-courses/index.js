import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import Head from "next/head";
import classes from "../../../styles/myCourses.module.css";
import CoursesItem from "@/components/coursesItem/CoursesItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "@/ulits/request";
import { Spinner } from "react-bootstrap";

const MyCourses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [loadingPage, setLoaingPage] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const getUserCourses = async () => {
    if (user !== null) {
      const { data } = await request.get(`/api/users/${user?.id}`);
      setUserCourses(data.subscribeIn);
    } else {
      setFavCourses([]);
    }
  };

  useEffect(() => {
    getUserCourses();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setLoaingPage(false);
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>My-Courses</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div>
        <div className="row m-0 w-100">
          <SidebarProfile />
          <div className={`col-10 ${classes.divRight}`}>
            {loadingPage ? (
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div>
                {userCourses?.length > 0 ? (
                  <CoursesItem courses={userCourses} />
                ) : (
                  <h1 style={{ color: "var(--text-color)",padding:"10px" }}>
                    There is no courses for you
                  </h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
