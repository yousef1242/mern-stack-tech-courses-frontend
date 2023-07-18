import { Button, Modal, Spinner } from "react-bootstrap";
import classes from "../../styles/addLesson.module.css";
import { useState } from "react";
import request from "@/ulits/request";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const AddLesson = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { show, onHide, course, lessonsCourse } = props;
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  //   form signup submit handler
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (file === null) return toast.error("Video is required");
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    try {
      const { data } = await request.post(
        `/api/lessons/add/${course?._id}`,
        formData,
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      toast.success(data.message);
      lessonsCourse.push(data.saveLesson);
      onHide();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        className={classes.addLessonModel}
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitFormHandler}>
            <div className={classes.formGroup}>
              <label htmlFor="Title">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="Title"
                placeholder="Title"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="Video">Choose Video</label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="Video"
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
                "Add"
              )}
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLesson;
