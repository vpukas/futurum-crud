import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
  const [jwt, setJwt] = useState(() => {
    const localStorageValue = localStorage.getItem("jwt");
    return localStorageValue !== null ? JSON.parse(localStorageValue) : null;
  });
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    fetch("/api/userdata/balance/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((balanceData) => {
        setBalance(balanceData);
      });
  }, []);
  return jwt ? (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Futurum Crud Application
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/campaigns">
                  Campaigns
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Sign Up(not available)
                </a>
              </li>
            </ul>
            <div className="nav-item">Balance :{balance}</div>
          </div>
        </div>
      </nav>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Navbar;
