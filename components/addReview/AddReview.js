import { useState } from "react";
import classes from "../../styles//addReview.module.css";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import request from "@/ulits/request";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

const AddReview = ({ setOpen, courseId, user, reviewsCourse }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [valueRating, setValueRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (e) => {
    if (valueRating === 0) return toast.error("Rating is required");
    if (reviewTitle === "") return toast.error("Review is required");
    setLoading(true);
    try {
      const { data } = await request.post(
        `/api/reviews/add/${courseId}`,
        {
          title: reviewTitle,
          rating: valueRating,
        },
        {
          headers: {
            Authorization: "bearer " + user.token,
          },
        }
      );
      reviewsCourse.push(data.review);
      toast.success(data.message);
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className={classes.addReview}>
      <div className="container d-flex align-items-center justify-content-center">
        <div className={classes.mainDiv}>
          <div>
            <span
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
              className="mb-4 d-block w-100 text-end"
            >
              <FontAwesomeIcon icon={faX} />
            </span>
            <form onSubmit={submitFormHandler}>
              <div className={classes.formGroup}>
                <Rating
                  value={valueRating}
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                  }}
                />
              </div>
              <div className={classes.formGroup}>
                <textarea
                  className="w-100 p-2"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  rows="10"
                  placeholder="Review here"
                ></textarea>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
