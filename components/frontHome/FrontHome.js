import classes from "../../styles/front.module.css";
import studyImage from "../../public/Kids Studying from Home-rafiki.png";
import Image from "next/image";
import Link from "next/link";
import waveImage from "../../public/layered-waves-haikei.png";

const FrontHome = () => {
  return (
    <>
      <div className={classes.frontHome}>
        <div className={classes.overlay}></div>
        <div
          className="container"
          style={{ position: "relative", zIndex: "99" }}
        >
          <div className="row align-items-center m-0 w-100">
            <div className="col-12 col-lg-6">
              <h1 className={classes.title}>
                The <span>beggest</span> education platform in the world
              </h1>
              <Link href={`/courses`} className={classes.tryNow}>
                Try now
              </Link>
            </div>
            <div className="d-flex d-lg-flex col-lg-6">
              <Image src={studyImage} className={classes.studyImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontHome;
