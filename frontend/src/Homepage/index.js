import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import Navbar from "../Navbar";

const Homepage = () => {
  const [jwt, setJwt] = useState(() => {
    const localStorageValue = localStorage.getItem("jwt");
    return localStorageValue !== null ? JSON.parse(localStorageValue) : null;
  });
  const [products, setProducts] = useState(null);
  useEffect(() => {
    fetch("api/products", {
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
        setProducts(productsData);
      });
  }, []);

  function findCampaign(id) {
    ajax(`api/campaigns/${id}`, "get", jwt, { id: id }).then((response) => {
      if (response.status === 200) return response.json();
      else return null;
    });
  }
  function createCampaign() {
    // fetch('api/campaigns', {
    //     "headers": {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${jwt}`
    //     },
    //     "method": "post",
    //   })
    //   .then((response) => {
    //       if(response.status === 200) return response.json();
    //     })
    //     .then((campaign) => {
    //         window.location.href = `campaigns/${campaign.id}`;
    //     })
  }

  function viewProduct(id) {
    window.location.href = `products/${id}`;
  }
  return jwt ? (
    <div>
      <Navbar />
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                products.map((product, key) => (
                  <tr>
                    <th scope="row" key={key}>
                      {key + 1}
                    </th>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary mx-2"
                        onClick={() => viewProduct(product.id)}
                      >
                        View Product
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Homepage;
