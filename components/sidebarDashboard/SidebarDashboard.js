import Link from "next/link";
import classes from "../../styles/sidebarProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopyright,
  faL,
  faList,
  faSquareShareNodes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SidebarDashboard = () => {
  return (
    <>
      <div className={`col-2 ${classes.SidebarProfile}`}>
        <ul>
          <li>
            <Link href={`/dashboard`}>
              <FontAwesomeIcon icon={faList} />
            </Link>
            <Link className="d-none d-md-inline" href={`/dashboard`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={`/dashboard/courses`}>
              <FontAwesomeIcon icon={faCopyright} />
            </Link>
            <Link className="d-none d-md-inline" href={`/dashboard/courses`}>
              Courses
            </Link>
          </li>
          <li>
            <Link href={`/dashboard/users`}>
            <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link className="d-none d-md-inline" href={`/dashboard/users`}>
              Users
            </Link>
          </li>
          <li>
            <Link href={`/dashboard/categories`}>
            <FontAwesomeIcon icon={faSquareShareNodes} />
            </Link>
            <Link className="d-none d-md-inline" href={`/dashboard/categories`}>
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarDashboard;
