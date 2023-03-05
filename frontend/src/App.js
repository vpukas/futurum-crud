import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Homepage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CreateCampaigneView from "./CreateCampaignView";
import CampaignsView from "./CampaignsView";
import EditCampaigneView from "./EditCampaignView";
import ProductView from "./ProductView";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
              <Homepage />
          }
        />
        <Route
          path="/campaigns"
          element={
              <CampaignsView />
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="/products/:id"
          element={
              <ProductView />
          }
        />
        <Route
          path="/create/:id"
          element={
              <CreateCampaigneView />
          }
        />
         <Route
          path="/edit/:id"
          element={
              <EditCampaigneView />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
