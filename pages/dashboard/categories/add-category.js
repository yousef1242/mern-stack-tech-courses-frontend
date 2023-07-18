import Head from "next/head";
import classes from "../../../styles/addCourse.module.css";
import SidebarDashboard from "@/components/sidebarDashboard/SidebarDashboard";
import { useState } from "react";
import request from "@/ulits/request";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

const AddCourse = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  //   submit form handler
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    setLoading(true);

    try {
      const { data } = await request.post(
        `/api/categories/add`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      toast.success(data.message);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add-Category</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div>
        <div className="row m-0">
          <SidebarDashboard />
          <div className={`col-10 ${classes.rightDiv}`}>
            <div className="container">
              <h2
                className="mb-5 fw-bold"
                style={{ color: "var(--text-color)" }}
              >
                Add New Category
              </h2>
              <div className="w-100 d-flex justify-content-center">
                <div className={classes.formDiv}>
                  <form onSubmit={submitFormHandler}>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Title">Title</label>
                      <input
                        type="text"
                        id="Title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value.toLowerCase())}
                      />
                    </div>
                    <button disabled={loading} className={classes.addCourseBtn}>
                      {loading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Add"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
