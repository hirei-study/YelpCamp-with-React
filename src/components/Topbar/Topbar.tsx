// import { Chat, Notifications } from "@mui/icons-material";

// import DemoIcon from "../../../assets/react.svg";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbarContainer">
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Yelp-Camp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/">
                ホーム
              </a>
              <a className="nav-link" href="/api/campground">
                キャンプ場
              </a>
              <a className="nav-link" href="/api/campground/new">
                新規作成
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
