import Link from "next/link";
import classes from "../../styles/header.module.css";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Dropdown } from "react-bootstrap";
import { setLogout } from "@/slices/authSlice";
import { deleteCookie } from "cookies-next";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar expand="lg" className={classes.header}>
        <Container>
          <div className="d-flex align-items-center">
            <Link href={"/"} className={classes.brandSmall}>
              T
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className={classes.brand}
              href={"/"}
            >
              Tech-Courses
            </Link>
          </div>
          <Navbar.Toggle
            className={classes.navbarToggler}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className={classes.links} href="/">
                Home
              </Link>
              <Link className={classes.links} href="/courses">
                Courses
              </Link>
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      background: "none",
                      padding: "0px",
                      color: "var(--text-color)",
                      border: 0,
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                    id="dropdown-basic"
                  >
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ border: 0, minWidth: "86px", padding: "15px" }}
                  >
                    <Link
                      className={classes.profileLink}
                      href={`/profile/setting`}
                    >
                      Profile
                    </Link>
                    {user?.isAdmin && (
                      <Link className={classes.profileLink} href={`/dashboard`}>
                        Dashboard
                      </Link>
                    )}
                    <span
                      onClick={() => {
                        router.push("/");
                        deleteCookie("userInfoDataWhenLoginUser");
                        dispatch(setLogout());
                      }}
                      className={classes.logoutBtn}
                    >
                      Logout
                    </span>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  {" "}
                  <Link
                    className={classes.login}
                    style={{ marginRight: "10px" }}
                    href="/login"
                  >
                    Login
                  </Link>
                  <Link className={classes.signup} href="/signup">
                    Signup
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
