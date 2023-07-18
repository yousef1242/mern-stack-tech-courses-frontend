import Head from "next/head";
import classes from "../../../styles/coursesDashboard.module.css";
import SidebarDashboard from "@/components/sidebarDashboard/SidebarDashboard";
import request from "@/ulits/request";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as cookie from "cookie";
import Link from "next/link";

export async function getServerSideProps() {
  const { data } = await request.get("/api/categories");

  return {
    props: {
      categories: data,
    },
  };
}

const CategoryDashboard = ({ categories }) => {
  const [categoriesList, setCategoriesList] = useState(categories);
  const { user } = useSelector((state) => state.auth);

  //   handle search
  const handleSearch = (event) => {
    if (event.target.value === "") {
      setCategoriesList(categories);
    } else {
      const filteredUsers = categoriesList?.filter((category) =>
        category.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setCategoriesList(filteredUsers);
    }
  };

  //   delete course function
  const deleteCategory = async (categoryId) => {
    try {
      const { data } = await request.delete(
        `/api/categories/delete/${categoryId}`,
        {
          headers: {
            Authorization: "bearer " + user?.token,
          },
        }
      );
      const updatedCategoryList = categoriesList?.filter(
        (category) => category._id !== categoryId
      );
      setCategoriesList(updatedCategoryList);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>Dashboard-Categories</title>
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
                  Categories
                </h2>
                <Link
                  href={`/dashboard/categories/add-category`}
                  className={classes.addCourseLink}
                >
                  Add Category
                </Link>
              </div>
              <div className={`card ${classes.cardDiv}`}>
                <div className="mb-4 d-flex justify-content-between align-items-center fw-bold flex-wrap">
                  <h4 className="fw-bold">All Categories</h4>
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
                      <th>TITLE</th>
                      <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList?.map((category, index) => (
                      <tr key={category?._id}>
                        <td>{index + 1}</td>
                        <td>{category?.title}</td>
                        <td>
                          <button
                            onClick={() => deleteCategory(category?._id)}
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

export default CategoryDashboard;
