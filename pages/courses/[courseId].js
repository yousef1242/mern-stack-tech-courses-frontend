import request from "@/ulits/request";
import classes from "../../styles/singleCourse.module.css";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faVideo,
  faHeart as faSolidHeart,
  faX,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import { Rating } from "@mui/material";
import Moment from "react-moment";
import AddReview from "@/components/addReview/AddReview";
import PaypalButton from "@/components/paypalButton/PaypalButton";
import AddLesson from "@/components/addLesson/AddLesson";

function MyVerticallyCenteredModal({ show, video, setModalShow }) {
  return (
    <>
      {show && (
        <div className={classes.modalSection}>
          <div className="container d-flex justify-content-center">
            <div className={classes.mainSquare}>
              <div className={classes.videoHeader}>
                <FontAwesomeIcon
                  onClick={() => setModalShow(false)}
                  icon={faX}
                  style={{ cursor: "pointer", fontSize: "18px" }}
                />
              </div>
              <div className={classes.videoDiv}>
                <video
                  onContextMenu={(e) => e.preventDefault()}
                  controls
                  controlsList="nodownload"
                >
                  <source src={video} />
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const SingleCourse = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const [modalShowPaypalButton, setModalShowPaypalButton] = useState(false);
  const [modalShowAddLesson, setModalShowAddLesson] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoaing] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState("");
  const [reviewsCourse, setReviewsCourse] = useState(course?.reviews);
  const [lessonsCourse, setLessonsCourse] = useState(course?.lessons);

  useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=AbI0WA6b5h9AhRpSTkx7zqWE_KARaam4WvsU-3UxixJphwlylXyuVedMKRAEtkI9mC1pMKaOr-LNlYCC`;
      script.async = true;

      document.body.appendChild(script);
    };
    addPaypalScript();
  }, []);
  const getUserInfo = async () => {
    if (user !== null) {
      const { data } = await request.get(`/api/users/${user?.id}`);
      setUserInfo(data);
    } else {
      setUserInfo({});
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [user]);
  function formatDuration(durationInSeconds) {
    if (durationInSeconds < 60) {
      return `${durationInSeconds} seconds`;
    } else {
      const durationInMinutes = durationInSeconds / 60;
      if (durationInMinutes < 60) {
        return `${Math.floor(durationInMinutes)} minutes`;
      } else {
        const durationInHours = durationInMinutes / 60;
        return `${Math.floor(durationInHours)} hours`;
      }
    }
  }

  const courseDurationInSeconds = Math.floor(
    course?.lessons?.reduce((totalDuration, lesson) => {
      return totalDuration + lesson.duration;
    }, 0)
  );

  const deleteReview = async (reviewId) => {
    const newReviews = reviewsCourse.filter(
      (review) => review._id !== reviewId
    );
    setReviewsCourse(newReviews);
    try {
      await request.delete(`/api/reviews/delete/${reviewId}`, {
        headers: {
          Authorization: "bearer " + user?.token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLesson = async (lessonId) => {
    const newLessons = lessonsCourse.filter(
      (lesson) => lesson._id !== lessonId
    );
    setLessonsCourse(newLessons);
    try {
      const { data } = await request.delete(`/api/lessons/delete/${lessonId}`, {
        headers: {
          Authorization: "bearer " + user?.token,
        },
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const courseDuration = formatDuration(courseDurationInSeconds);
  return (
    <>
      <Head>
        <title>{course?.title}</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div key={course?._id} className={classes.singleCoursePage}>
        {user && user.isAdmin && (
          <button
            onClick={() => setModalShowAddLesson(true)}
            className={classes.addLessonButton}
          >
            Add Lesson
          </button>
        )}
        <div className={`${classes.header} p-sm-5 p-3`}>
          <Link
            className={classes.headerCategoryLink}
            href={`/courses/category/${course?.category}`}
          >
            {course?.category}
          </Link>
          <h3 className={classes.headerTitle}>{course?.title}</h3>
          <Link
            href={`/courses/${course?._id}#reviews`}
            className={classes.headerReviewLink}
          >
            ({course?.reviews?.length} ratings)
          </Link>
          <span style={{ marginRight: "15px" }}>
            {course?.userSubscribeIn?.length} students
          </span>
          <span style={{ marginRight: "15px" }}>
            {course?.lessons?.length} lessons
          </span>
          <span>
            {" "}
            <FontAwesomeIcon icon={faVideo} /> {courseDuration}
          </span>
          <span className={classes.headerInstructor}>
            Created by : <span>{course?.instructor}</span>
          </span>
          {course?.discount > 0 && (
            <span className={classes.headerInstructor}>
              Discount : {course?.discount}%
            </span>
          )}
          <div className={classes.headerPayment}>
            {course?.userSubscribeIn?.includes(userInfo?._id) ? (
              ""
            ) : (
              <button
                onClick={() => setModalShowPaypalButton(true)}
                className={classes.headerBuy}
              >
                ${course?.price - (course?.discount / 100) * course?.price} Buy
                Now
              </button>
            )}
            <button
              onClick={async () => {
                if (user === null) {
                  toast.error("Please login");
                } else {
                  setLoaing(true);
                  const { data } = await request.put(
                    `/api/users/wishlist/${course?._id}`,
                    {},
                    {
                      headers: {
                        Authorization: "bearer " + user?.token,
                      },
                    }
                  );
                  setUserInfo(data.newUserWishlist);
                  toast.success(data.message);
                  setLoaing(false);
                }
              }}
              className={classes.headerHeart}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <FontAwesomeIcon
                  icon={
                    userInfo?.wishlist?.some((wish) => wish._id === course?._id)
                      ? faSolidHeart
                      : faHeart
                  }
                />
              )}
            </button>
          </div>
        </div>
        <div className="container mt-5 col-12 col-lg-8">
          <div className={"mb-5"}>
            <h4 style={{ color: "var(--text-color)" }} className="mb-4">
              What you'll learn
            </h4>
            <div
              dangerouslySetInnerHTML={{ __html: course?.whatYouWillLearn }}
            />
          </div>
          <div className={`mb-5 ${classes.lessonsContent}`}>
            <h4 style={{ color: "var(--text-color)" }} className="mb-4">
              Course content
            </h4>
            {lessonsCourse.length > 0 ? (
              lessonsCourse?.map((lesson) => (
                <div
                  key={lesson?._id}
                  className="w-100 d-flex align-items-center mb-3 justify-content-between p-3"
                  style={{
                    borderRadius: "3px",
                    border: "1px solid #efefef",
                  }}
                >
                  <span>{lesson?.title}</span>
                  <div>
                    {userInfo && userInfo.isAdmin && (
                      <span
                        onClick={() => deleteLesson(lesson?._id)}
                        style={{
                          color: "var(--text-color)",
                          textDecoration: "underline",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      >
                        Delete Lesson
                      </span>
                    )}
                    {userInfo &&
                      course?.userSubscribeIn?.includes(userInfo?._id) && (
                        <span
                          onClick={() => {
                            setModalShow(true);
                            setVideo(lesson?.video?.src);
                          }}
                          style={{
                            color: "var(--orange-color)",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Preview
                        </span>
                      )}
                  </div>
                </div>
              ))
            ) : (
              <h5 style={{ color: "var(--text-color)" }}>
                No lessons for this course
              </h5>
            )}
          </div>
          <div className={"mb-5"}>
            <h4 style={{ color: "var(--text-color)" }} className="mb-4">
              Requirements
            </h4>
            <div dangerouslySetInnerHTML={{ __html: course?.requirements }} />
          </div>
          <div className={"mb-5"}>
            <h4 style={{ color: "var(--text-color)" }} className="mb-4">
              Description
            </h4>
            <div dangerouslySetInnerHTML={{ __html: course?.description }} />
          </div>
          <div id="reviews" className={"mb-5"}>
            <h4 style={{ color: "var(--text-color)" }} className="mb-4">
              <FontAwesomeIcon
                style={{ color: "var(--orange-color)" }}
                icon={faStar}
              />{" "}
              {reviewsCourse?.length} reviews
            </h4>
            <div className="row">
              {reviewsCourse?.length > 0 ? (
                reviewsCourse?.slice(0, 6).map((review) => (
                  <>
                    <div
                      id="singlereview"
                      className="col-12 col-md-6 p-3 mb-3"
                      key={review?._id}
                    >
                      <div className="d-flex mb-4">
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "50px",
                            objectFit: "contain",
                          }}
                          src={review?.userId?.profileImage?.url}
                          alt=""
                        />
                        <div className="w-100 ms-3">
                          <span
                            style={{ color: "var(--text-color)" }}
                            className="d-block mb-2"
                          >
                            {review?.userId?.username}
                          </span>
                          <span
                            className="d-flex align-items-center"
                            style={{
                              fontSize: "15px",
                              color: "#777",
                            }}
                          >
                            <Rating
                              style={{ fontSize: "18px" }}
                              name="read-only"
                              value={review?.rating}
                              readOnly
                            />
                            <Moment className="ms-2 me-1" fromNow ago>
                              {review?.createdAt}
                            </Moment>{" "}
                            ago
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p>{review?.title}</p>
                      </div>
                      <div>
                        {userInfo?._id === review?.userId?._id && (
                          <span
                            onClick={() => deleteReview(review?._id)}
                            style={{
                              textDecoration: "underline",
                              color: "var(--low-orange-color)",
                              cursor: "pointer",
                            }}
                          >
                            Delete review
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <h5>No reviews for this course</h5>
              )}
            </div>
            {userInfo && course?.userSubscribeIn?.includes(userInfo?._id) && (
              <button
                onClick={() => setOpen(true)}
                className={`mt-4 ${classes.addReviewBtn}`}
              >
                Add review
              </button>
            )}
            {open && (
              <AddReview
                setOpen={setOpen}
                reviewsCourse={reviewsCourse}
                courseId={course?._id}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        setModalShow={setModalShow}
        video={video}
        show={modalShow}
      />
      <PaypalButton
        value={course?.price - (course?.discount / 100) * course?.price}
        show={modalShowPaypalButton}
        onHide={() => setModalShowPaypalButton(false)}
        course={course}
        userInfo={userInfo}
      />
      <AddLesson
        show={modalShowAddLesson}
        onHide={() => setModalShowAddLesson(false)}
        course={course}
        lessonsCourse={lessonsCourse}
      />
    </>
  );
};

export default SingleCourse;

export async function getStaticPaths() {
  const { data } = await request.get("/api/courses");
  const paths = data.map((d) => {
    return {
      params: { courseId: `${d._id}` },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { courseId } = context.params;
  const { data } = await request.get(`/api/courses/${courseId}`);
  return { props: { course: data } };
}
