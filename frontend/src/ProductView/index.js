import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";

const ProductView = () => {
  const [jwt, setJwt] = useState(() => {
    const localStorageValue = localStorage.getItem("jwt");
    return localStorageValue !== null ? JSON.parse(localStorageValue) : null;
  });
  const productId = window.location.href.split("/products/")[1];
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    fetch(`/api/campaigns/byproduct/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((productsData) => {
        setCampaigns(productsData);
      });
  }, []);

  function deleteCampaign(id) {
    fetch(`/api/campaigns/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "delete",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((window.location.href = "/"));
  }

  function navigateToCreate(id, productId) {
    if (id == null) window.location.href = `/create/${productId}`;
    else
      alert(
        "We already have campaign for this product! Try delete or edit options instead :)"
      );
  }

  function navigateToEdit(id, productId) {
    if (id != null) window.location.href = `/edit/${id}`;
    else window.location.href = `/create/${productId}`;
  }

  return jwt ? (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">Campagn Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button
                    className="btn btn-outline-success mx-2"
                    onClick={() => navigateToCreate(campaigns.id, productId)}
                  >
                    Create
                  </button>
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={() => navigateToEdit(campaigns.id, productId)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCampaign(campaigns.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                {/* TODO create all columns in backend and add them here as well */}
                <th scope="col">Campaign ID</th>
                <th scope="col">Campaign Name</th>
                <th scope="col">Campaign Fund</th>
                <th scope="col">Campaign Status</th>
                <th scope="col">Campaign Radius</th>
                <th scope="col">Campaign Bid</th>
                <th scope="col">Campaign Town</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{campaigns.id}</td>
                <td>{campaigns.name}</td>
                <td>{campaigns.fund}</td>
                <td>
                  {campaigns.status !== undefined ? (
                    String(campaigns.status)
                  ) : (
                    <></>
                  )}
                </td>
                <td>{campaigns.radius}</td>
                <td>{campaigns.bid}</td>
                <td>{campaigns.town}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <PublicMethodsExample /> */}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProductView;
