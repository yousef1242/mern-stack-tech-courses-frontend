import classes from "../../styles/footer.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import request from "@/ulits/request";

const Footer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await request.get("/api/categories");
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.footer}>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <Link href={"/"} className={classes.brandSmall}>
                T
              </Link>
              <Navbar.Brand className={classes.brand} href="/">
                Tech-Courses
              </Navbar.Brand>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
            <h3 className={classes.title}>Browser</h3>
            <Link className={classes.link} href="/">
              Home
            </Link>
            <Link className={classes.link} href="/courses">
              Courses
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
            <h3 className={classes.title}>Categories</h3>
            {data?.map((cat) => (
              <Link
                key={cat._id}
                style={{ textTransform: "capitalize" }}
                className={classes.link}
                href={`/courses/category/${cat.title}`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
