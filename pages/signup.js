import classes from "../styles/signup.module.css";
import signupImage from "../public/signupImage.jpg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import request from "@/ulits/request";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  //   form signup submit handler
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (username === "") return toast.error("Username is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters long.");
    if (file === null) return toast.error("Image is required");
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", file);
    try {
      const { data } = await request.post(`/api/auth/register`, formData);
      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Signup</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div className={classes.signupPage}>
        <div className="container d-flex align-items-center justify-content-center">
          <div className={classes.mainDiv}>
            <div className="row h-100">
              <div className="col-5 d-none d-sm-flex">
                <Image
                  className={classes.imageLogin}
                  src={signupImage}
                  alt=""
                />
              </div>
              <div className="col-12 col-sm-7 p-4">
                <h3 className="mb-4 text-center">Signup</h3>
                <form onSubmit={submitFormHandler}>
                  <div className={classes.formGroup}>
                    <label htmlFor="Username">Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      id="Username"
                      placeholder="Username"
                    />
                  </div>
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
                    <label htmlFor="Passowrd">Passowrd</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="Passowrd"
                      placeholder="Passowrd"
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <label htmlFor="image">Choose image</label>
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      id="image"
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
                      "Join with us"
                    )}
                  </button>
                </form>
                <div className="mt-4">
                  Already have an account?{" "}
                  <Link
                    style={{ color: "var(--orange-color)", fontWeight: "700" }}
                    href={`/login`}
                  >
                    Login
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
