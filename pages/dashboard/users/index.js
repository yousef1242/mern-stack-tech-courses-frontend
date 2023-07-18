import Head from "next/head";
import classes from "../../../styles/coursesDashboard.module.css";
import SidebarDashboard from "@/components/sidebarDashboard/SidebarDashboard";
import request from "@/ulits/request";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as cookie from "cookie";

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const jsonCookie = JSON.parse(parsedCookies.userInfoDataWhenLoginUser);

  const { data } = await request.get("/api/users", {
    headers: {
      Authorization: "bearer " + jsonCookie?.token,
    },
  });

  return {
    props: {
      users: data,
    },
  };
}

const UsersDashboard = ({ users }) => {
  const [usersList, setUsersList] = useState(users);
  const { user } = useSelector((state) => state.auth);

  //   handle search
  const handleSearch = (event) => {
    if (event.target.value === "") {
      setUsersList(users);
    } else {
      const filteredUsers = usersList?.filter((user) =>
        user.username.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setUsersList(filteredUsers);
    }
  };

  //   delete course function
  const deleteUser = async (userId) => {
    try {
      const { data } = await request.delete(`/api/users/delete/${userId}`, {
        headers: {
          Authorization: "bearer " + user?.token,
        },
      });
      const updatedCourseList = usersList?.filter(
        (user) => user._id !== userId
      );
      setUsersList(updatedCourseList);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>Dashboard-Users</title>
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
              <div
                className="d-flex align-items-center justify-content-between px-3"
                style={{
                  marginBottom: "80px",
                }}
              >
                <h2
                  style={{
                    color: "var(--text-color)",
                    fontWeight: "bold",
                  }}
                >
                  Users
                </h2>
              </div>
              <div className={`card ${classes.cardDiv}`}>
                <div className="mb-4 d-flex justify-content-between align-items-center fw-bold flex-wrap">
                  <h4 className="fw-bold">All Users</h4>
                  <input
                    type="search"
                    className={classes.searchInput}
                    placeholder="Search for course..."
                    onChange={handleSearch}
                  />
                </div>
                <Table responsive="md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList?.map((user, index) => (
                      <tr key={user?._id}>
                        <td>{index + 1}</td>
                        <td>{user?.username}</td>
                        <td>{user?.email}</td>
                        <td>
                          <button
                            onClick={() => deleteUser(user?._id)}
                            className={classes.actionCourse}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersDashboard;
