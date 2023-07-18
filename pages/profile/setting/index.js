import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import classes from "../../../styles/setting.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "@/ulits/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const Setting = () => {
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editImageLoading, setEditImageLoading] = useState(false);
  const [editUsernameLoading, setEditUsernameLoading] = useState(false);
  const [editEmailLoading, setEditEmailLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const getUserInfo = async () => {
    if (user !== null) {
      const { data } = await request.get(`/api/users/${user?.id}`);
      setUserInfo(data);
    } else {
      setUserInfo({});
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  }, [pageLoading]);
  // edit image function
  const editImageProfile = async () => {
    if (!file) return toast.error("No file provided");
    const formData = new FormData();
    formData.append("file", file);
    setEditImageLoading(true);
    try {
      const { data } = await request.put(
        `/api/users/update-image/${user?.id}`,
        formData,
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      userInfo.profileImage = data.profileImage;
      toast.success("Image has been uploaded");
      setEditImageLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setEditImageLoading(false);
    }
  };

  // edit username function
  const editUsernameProfile = async (e) => {
    e.preventDefault();
    if (username === "") return toast.error("Username is reuired");
    setEditUsernameLoading(true);
    try {
      const { data } = await request.put(
        `/api/users/update-info/${user?.id}`,
        {
          username: username,
        },
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      userInfo.username = data.username;
      toast.success("Username has been edited");
      setEditUsername(false);
      setEditUsernameLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setEditUsernameLoading(false);
    }
  };

  // edit email function
  const editEmailProfile = async (e) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is reuired");
    setEditEmailLoading(true);
    try {
      const { data } = await request.put(
        `/api/users/update-info/${user?.id}`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      userInfo.email = data.email;
      toast.success("Email has been edited");
      setEditEmail(false);
      setEditEmailLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setEditEmailLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Setting</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div>
        <div className="row w-100 m-0">
          <SidebarProfile />
          <div className={`col-10 ${classes.rightDiv}`}>
            <div className="container d-flex justify-content-center">
              {!pageLoading ? (
                <div className={classes.mainDiv}>
                  <div className="d-flex justify-content-center mb-5">
                    <div className={classes.imageDiv}>
                      <img
                        className={classes.userImage}
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : userInfo?.profileImage?.url
                        }
                        alt=""
                      />
                      <label className={classes.labelFile} htmlFor="file">
                        <FontAwesomeIcon icon={faCamera} />
                      </label>
                      <input
                        onChange={(e) => setFile(e.target.files[0])}
                        className="d-none"
                        type="file"
                        id="file"
                      />
                      <button
                        disabled={editImageLoading}
                        onClick={editImageProfile}
                        className={classes.uploadBtn}
                      >
                        {editImageLoading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Upload"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    {editUsername ? (
                      <form>
                        <input
                          className={classes.editInput}
                          type="text"
                          placeholder="New name"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                        <button
                          onClick={editUsernameProfile}
                          className={classes.editBtn}
                        >
                          {" "}
                          {editUsernameLoading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "update"
                          )}
                        </button>
                        <button
                          onClick={() => setEditUsername(false)}
                          className={`ms-2 ${classes.editBtn}`}
                        >
                          Close
                        </button>
                      </form>
                    ) : (
                      <>
                        {" "}
                        <span className="d-block mb-3 w-100 fw-bold">Name</span>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="d-block w-100">
                            {userInfo?.username}
                          </span>
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => setEditUsername(true)}
                            icon={faEdit}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mb-3">
                    {editEmail ? (
                      <form>
                        <input
                          className={classes.editInput}
                          type="email"
                          placeholder="New email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          onClick={editEmailProfile}
                          className={classes.editBtn}
                        >
                          {" "}
                          {editEmailLoading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "update"
                          )}
                        </button>
                        <button
                          onClick={() => setEditEmail(false)}
                          className={`ms-2 ${classes.editBtn}`}
                        >
                          Close
                        </button>
                      </form>
                    ) : (
                      <>
                        {" "}
                        <span className="d-block mb-3 w-100 fw-bold">
                          Email
                        </span>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="d-block w-100">
                            {userInfo?.email}
                          </span>
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => setEditEmail(true)}
                            icon={faEdit}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
