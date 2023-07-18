import { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Layout = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 89.11124420166016) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      {props.children}
      <button
        onClick={() => {
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          });
        }}
        style={{
          position: "fixed",
          width: "60px",
          height: "60px",
          zIndex: 9999,
          border: "0px",
          outline: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          right: show ? "10px" : "-60px",
          bottom: "10px",
          borderRadius: "50%",
          background: "var(--orange-color)",
          color: "#fff",
          transition: ".3s",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <Footer />
    </>
  );
};

export default Layout;
