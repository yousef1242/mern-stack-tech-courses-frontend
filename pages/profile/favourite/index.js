import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import classes from "../../../styles/favourite.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import request from "@/ulits/request";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faRemove,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";

const Favourite = () => {
  const [favCourses, setFavCourses] = useState([]);
  const [loadingPage, setLoaingPage] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const getFavouriteCoursesUser = async () => {
    if (user !== null) {
      const { data } = await request.get(`/api/users/${user?.id}`);
      setFavCourses(data.wishlist);
    } else {
      setFavCourses([]);
    }
  };

  useEffect(() => {
    getFavouriteCoursesUser();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setLoaingPage(false);
    }, 2000);
  }, []);

  //   delete course from favourite
  const deleteCourseFromFavourite = async (courseId) => {
    const { data } = await request.put(
      `/api/users/wishlist/${courseId}`,
      {},
      {
        headers: {
          Authorization: "bearer " + user?.token,
        },
      }
    );
    const newFavCourses = favCourses?.filter(
      (course) => course?._id !== courseId
    );
    setFavCourses(newFavCourses);
    toast.success(data.message);
  };
  return (
    <>
      <Head>
        <title>Favourite</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div>
        <div className="row w-100 m-0">
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
              <div className="row w-100 m-0">
                {favCourses.length > 0 ? (
                  favCourses?.map((course) => (
                    <div
                      key={course?._id}
                      className={`col-12 col-sm-6 col-lg-4 ${classes.mainCard}`}
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
                          <span
                            onClick={() =>
                              deleteCourseFromFavourite(course?._id)
                            }
                          >
                            <FontAwesomeIcon icon={faRemove} />
                          </span>
                          <Link href={`/courses/${course?._id}`}>
                            {" "}
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 style={{ color: "var(--text-color)" }}>
                    No wishlist for you
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

export default Favourite;
