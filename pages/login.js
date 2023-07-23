import classes from "../styles/login.module.css";
import loginImage from "../public/loginImage.jpg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import request from "@/ulits/request";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/authSlice";


const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters long.");
    setLoading(true);
    try {
      const { data } = await request.post(`/api/auth/login`, {
        email: email,
        password: password,
      });
      toast.success("Welcome back!");
      router.push("/");
      dispatch(setUser(data));
      setCookie("userInfoDataWhenLoginUser", JSON.stringify(data));
    } catch (error) {
      // toast.error(error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div className={classes.loginPage}>
        <div className="container d-flex align-items-center justify-content-center">
          <div className={classes.mainDiv}>
            <div className="row h-100">
              <div className="col-5 d-none d-sm-flex">
                <Image className={classes.imageLogin} src={loginImage} alt="" />
              </div>
              <div className="col-12 col-sm-7 p-4">
                <h3 className="mb-4 text-center">Login</h3>
                <form onSubmit={submitFormHandler}>
                  <div className={classes.formGroup}>
                    <label htmlFor="Email">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="Email"
                      placeholder="Email"
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <label htmlFor="password">password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      placeholder="password"
                    />
                  </div>
                  <button disabled={loading} className={classes.formSubmitBtn}>
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Welcome back!"
                    )}
                  </button>
                </form>
                <div className="mt-4">
                  Don't have an account?{" "}
                  <Link
                    style={{ color: "var(--orange-color)", fontWeight: "700" }}
                    href={`/signup`}
                  >
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
