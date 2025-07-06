import React from "react";

export default (): React.ReactElement => {
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;
    switch (target.id) {
      case "sparkie-animals":
        window.open("https://app.sparkie.io/app/animals");
        break;
      case "ama-homepage":
        window.open("https://amaanimalrescue.org/");
        break;
      case "wordpress-admin":
        window.open("https://amaanimalrescue.org/wp-login.php");
        break;
      default:
        break;
    }
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div
        className="container d-flex flex-row-reverse"
        style={{ backgroundColor: "#f49332" }}
      >
        <div className="dropdown">
          <button
            className="btn btn-link "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                type="button"
                id="sparkie-animals"
                onClick={clickHandler}
              >
                Sparkie Animals Page
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                id="wordpress-admin"
                onClick={clickHandler}
              >
                Edit Website
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                id="ama-homepage"
                onClick={clickHandler}
              >
                AMA Homepage
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* <img src="./img/ama-logo-long-2018.png" /> */}
    </nav>
  );
};
