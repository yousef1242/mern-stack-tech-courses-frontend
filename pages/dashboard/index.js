import SidebarDashboard from "@/components/sidebarDashboard/SidebarDashboard";
import Head from "next/head";
import classes from "../../styles/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faSquareShareNodes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "@/ulits/request";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [coursesData, setCoursesData] = useState(0);
  const [usersData, setUsersData] = useState(0);
  const [categoriesData, setCategoriessData] = useState(0);
  let data01 = [
    {
      name: "Courses",
      Number: coursesData,
    },
    {
      name: "Users",
      Number: usersData,
    },
    {
      name: "Categories",
      Number: categoriesData,
    },
  ];

  // get all courses data
  const getCoursesData = async () => {
    const { data } = await request.get(`/api/courses`);
    setCoursesData(data?.length);
  };

  // get all users data
  const getUsersData = async () => {
    const { data } = await request.get(`/api/users`, {
      headers: {
        Authorization: "bearer " + user?.token,
      },
    });
    setUsersData(data?.length);
  };

  // get all courses data
  const getCategoriessData = async () => {
    const { data } = await request.get(`/api/categories`);
    setCategoriessData(data?.length);
  };

  useEffect(() => {
    getCoursesData();
    getUsersData();
    getCategoriessData();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="The biggest courses platform in the world"
        />
      </Head>
      <div>
        <div className="row w-100 m-0">
          <SidebarDashboard />
          <div className={`col-10 ${classes.rightDiv}`}>
            <div className="container">
              <h2
                style={{
                  color: "var(--text-color)",
                  fontWeight: "bold",
                  marginBottom: "80px",
                }}
              >
                Overview
              </h2>
              <div className="row m-0">
                <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                  <div className="row m-0">
                    <div className="col-12 col-md-6 mb-4">
                      <div className={`card w-100 ${classes.cardDiv}`}>
                        <span className={classes.SpanIconCard}>
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span className={classes.spanNumberCard}>
                          {usersData}
                        </span>
                        <span className={classes.spanTotalCard}>
                          Total Users
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <div className={`card w-100 ${classes.cardDiv}`}>
                        <span className={classes.SpanIconCard}>
                          <FontAwesomeIcon icon={faCopyright} />
                        </span>
                        <span className={classes.spanNumberCard}>
                          {coursesData}
                        </span>
                        <span className={classes.spanTotalCard}>
                          Total Courses
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className={`card w-100 ${classes.cardDiv}`}>
                        <span className={classes.SpanIconCard}>
                          <FontAwesomeIcon icon={faSquareShareNodes} />
                        </span>
                        <span className={classes.spanNumberCard}>
                          {categoriesData}
                        </span>
                        <span className={classes.spanTotalCard}>
                          Total Categories
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className={`card h-100 ${classes.cardDiv}`}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={data01}
                        margin={{
                          top: 5,
                          right: 30,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Number" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
