import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";

const CampaignsView = () => {
  const [jwt, setJwt] = useState(() => {
    const localStorageValue = localStorage.getItem("jwt");
    return localStorageValue !== null ? JSON.parse(localStorageValue) : null;
  });
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    fetch("/api/campaigns", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((campaignsData) => {
        setCampaigns(campaignsData);
      });
  }, []);

  function viewCampaign(id) {
    window.location.href = `campaigns/${id}`;
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
                <th scope="col">Campagn ID</th>
                <th scope="col">Name</th>
                <th scope="col">Bid</th>
                <th scope="col">Fund</th>
                <th scope="col">Status</th>
                <th scope="col">Radius</th>
                <th scope="col">Town</th>
                <th scope="col">User ID</th>
                <th scope="col">Product ID</th>
              </tr>
            </thead>
            <tbody>
              {campaigns ? (
                campaigns.map((campaign, key) => (
                  <tr>
                    <th scope="row" key={key}>
                      {key + 1}
                    </th>
                    <td>{campaign.id}</td>
                    <td>{campaign.name}</td>
                    <td>{campaign.bid}</td>
                    <td>{campaign.fund}</td>
                    <td>{String(campaign.status)}</td>
                    <td>{campaign.radius}</td>
                    <td>{campaign.town}</td>
                    <td>{campaign.user.id}</td>
                    <td>{campaign.product.id}</td>
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

export default CampaignsView;
