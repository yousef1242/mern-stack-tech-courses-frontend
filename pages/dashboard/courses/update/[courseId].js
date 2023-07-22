import Head from "next/head";
import classes from "../../../../styles/updateCourse.module.css";
import SidebarDashboard from "@/components/sidebarDashboard/SidebarDashboard";
import { useEffect, useState } from "react";
import request from "@/ulits/request";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateCourse = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [categoriesData, setCategoriesData] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [requirementsValue, setRequirementsValue] = useState("");
  const [whatYouWillLearnsValue, setWhatYouWillLearnsValue] = useState("");

  //   submit form handler
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (instructor === "") return toast.error("Instructor is required");
    if (title === "") return toast.error("Title is required");
    if (category === "") return toast.error("Category is required");
    if (price <= 0) return toast.error("Price must be greater than 0");
    if (discount < 0 || discount >= 100)
      return toast.error("Discount must be between 0 and 100");
    if (descriptionValue === "") return toast.error("Discription is required");
    if (requirementsValue === "")
      return toast.error("Requirements is required");
    if (whatYouWillLearnsValue === "")
      return toast.error("What you will learn is required");

    setLoading(true);

    try {
      const { data } = await request.put(
        `/api/courses/update/${router.query.courseId}`,
        {
          instructor: instructor,
          title: title,
          price: price,
          discount: discount,
          category: category,
          description: descriptionValue,
          requirements: requirementsValue,
          whatYouWillLearn: whatYouWillLearnsValue,
        },
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
      // router.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await request.get("/api/categories");
      setCategoriesData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSingleCourseData() {
      const { data } = await request.get(
        `/api/courses/${router.query.courseId}`
      );
      setCourseData(data);
    }
    fetchSingleCourseData();
  }, []);

  useEffect(() => {
    if (courseData) {
      setInstructor(courseData?.instructor);
      setTitle(courseData?.title);
      setCategory(courseData?.category);
      setPrice(courseData?.price);
      setDiscount(courseData?.discount);
      setDescriptionValue(courseData?.description);
      setRequirementsValue(courseData?.requirements);
      setWhatYouWillLearnsValue(courseData?.whatYouWillLearn);
    }
  }, [courseData]);
  return (
    <>
      <Head>
        <title>Update-Course</title>
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
                Update Course
              </h2>
              <div className="w-100 d-flex justify-content-center">
                <div className={classes.formDiv}>
                  <form onSubmit={submitFormHandler}>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Instructor">Instructor</label>
                      <input
                        value={instructor}
                        type="text"
                        id="Instructor"
                        placeholder="Instructor"
                        onChange={(e) => setInstructor(e.target.value)}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Title">Title</label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="Title"
                        placeholder="Title"
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Category">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={classes.selectCategory}
                        id="category"
                      >
                        <option value="" selected disabled>
                          Select Category
                        </option>
                        {categoriesData?.map((cat) => (
                          <option key={cat?._id} value={cat?.title}>
                            {cat?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Price">Price</label>
                      <input
                        value={price}
                        type="number"
                        id="Price"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Discount">Discount</label>
                      <input
                        value={discount}
                        type="number"
                        id="Discount"
                        placeholder="Discount"
                        onChange={(e) => setDiscount(e.target.value)}
                        defaultValue={0}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Description">Description</label>
                      <ReactQuill
                        theme="snow"
                        value={descriptionValue}
                        onChange={setDescriptionValue}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Requirements">Requirements</label>
                      <ReactQuill
                        theme="snow"
                        value={requirementsValue}
                        onChange={setRequirementsValue}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="whatYouWillLearn">
                        What You Will Learn
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={whatYouWillLearnsValue}
                        onChange={setWhatYouWillLearnsValue}
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
                        "Update"
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

export default UpdateCourse;
