import axios from "axios";

import "./Topbar.css";
import { MouseEvent } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutEndPoint = "http://localhost:3000/api/auth/logout";

  const logout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios
        .post(`${logoutEndPoint}`, {})
        .then((res) => {
          console.log(res);
          localStorage.removeItem("token");
          return navigate("/api/campground", {
            state: { flash: res.data.flash, type: "success" },
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

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
            <div className="navbar-nav ms-auto">
              {token ? (
                <Button onClick={logout} className="nav-link">
                  ログアウト
                </Button>
              ) : (
                // <a href="/api/auth/logout" className="nav-link">
                //   ログアウト
                // </a>
                <>
                  <a href="/api/auth/login" className="nav-link">
                    ログイン
                  </a>
                  <a href="/api/auth/register" className="nav-link">
                    ユーザー登録
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
