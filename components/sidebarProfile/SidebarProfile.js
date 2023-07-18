import Link from "next/link";
import classes from "../../styles/sidebarProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopyright,
  faGear,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const SidebarProfile = () => {
  return (
    <>
      <div className={`col-2 ${classes.SidebarProfile}`}>
        <ul>
          <li>
            <Link href={`/profile/setting`}>
              <FontAwesomeIcon icon={faGear} />
            </Link>
            <Link className="d-none d-md-inline" href={`/profile/setting`}>
              Setting
            </Link>
          </li>
          <li>
            <Link href={`/profile/my-courses`}>
              <FontAwesomeIcon icon={faCopyright} />
            </Link>
            <Link className="d-none d-md-inline" href={`/profile/my-courses`}>
              My courses
            </Link>
          </li>
          <li>
            <Link href={`/profile/favourite`}>
            <FontAwesomeIcon icon={faHeart} />
            </Link>
            <Link className="d-none d-md-inline" href={`/profile/favourite`}>
              My favourite
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarProfile;
