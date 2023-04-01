import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export default function Header({ active, setActive, user ,handleLogout}) {
  const userId = user?.uid;
  console.log({ userId });
  console.log("name", user?.displayName);
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <div className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="/navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                id="navbarSupportedContent"
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/create" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "create" ? "active" : ""
                    }`}
                    onClick={() => setActive("create")}
                  >
                    Create
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo">
                        <img
                          src="../src/assets/user.jpg"
                          alt="logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginTop: "1rem",
                          }}
                        />
                      </div>
                      <p style={{ marginTop: "1rem", marginLeft: ".4rem" }}>
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogout}>Log Out</li>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" style={{ textDecoration: "none" }}>
                        <li
                          className={`nav-item nav-link ${
                            active === "auth" ? "active" : ""
                          }`}
                          onClick={() => setActive("auth")}
                        >
                          Login
                        </li>
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
