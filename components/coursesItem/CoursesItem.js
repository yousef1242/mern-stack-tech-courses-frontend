import classes from "../../styles/coursesItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faVideo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CoursesItem = ({ courses }) => {
  return (
    <>
      <div className="row w-100 m-0">
        {courses?.map((course) => (
          <div key={course?._id} className={`col-12 col-md-6 col-lg-4 ${classes.mainCard}`}>
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
                <span>{course?.lessons?.length}</span> <span>Lessons</span>
              </div>
              <div className={classes.toCourse}>
                <Link href={`/courses/${course?._id}`}>
                  {" "}
                  <FontAwesomeIcon icon={faArrowCircleRight} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CoursesItem;
