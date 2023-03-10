import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const EditCampaigneView = () => {
  const campaignId = window.location.href.split("/edit/")[1];
  const [selected, setSelected] = useState([]);
  const [validated, setValidated] = useState(false);
  const [jwt, setJwt] = useState(() => {
    const localStorageValue = localStorage.getItem("jwt");
    return localStorageValue !== null ? JSON.parse(localStorageValue) : null;
  });
  const [campaign, setCampaign] = useState({
    id: campaignId,
    name: "",
    fund: null,
    bid: null,
    status: false,
    radius: null,
    productId: null,
    keyword: [],
    town: null,
  });

  var myKeywords = [
    { id: 1, name: "Good" },
    { id: 2, name: "Cheap" },
    { id: 3, name: "Excelent" },
    { id: 4, name: "Product" },
  ];
  var cities = [
    { id: 1, name: "Krakow" },
    { id: 2, name: "Warszawa" },
    { id: 3, name: "Lodz" },
    { id: 4, name: "Poznan" },
  ];
  function handleSelect(s) {
    updateCampaign("keyword", s);
    setSelected(s);
  }
  const handleSubmit = (event) => {
    alert("checked finished");
  };

  const PublicMethodsExample = () => {
    const ref = useRef();

    return (
      <>
        <Typeahead
          id="public-methods-example"
          labelKey="name"
          multiple
          options={myKeywords}
          placeholder="Choose..."
          ref={ref}
          selected={selected}
          onChange={handleSelect}
        />
      </>
    );
  };

  function editCampaign(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      fetch("/api/campaigns/edit", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        method: "post",
        body: JSON.stringify(campaign),
      })
        .then((response) => {
          if (response.status === 200) return response.json();
        })
        .then((window.location.href = `/campaigns`));
    }
  }

  useEffect(() => {
    fetch(`/api/campaigns/${campaignId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "get",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((campaignData) => {
        setCampaign(campaignData);
      });
  }, []);

  function updateCampaign(prop, value) {
    const newCampaign = { ...campaign };
    newCampaign[prop] = value;
    setCampaign(newCampaign);
  }
  return jwt ? (
    <div>
      <Navbar />
      <Container>
        <Form noValidate validated={validated} onSubmit={editCampaign}>
          <Row className="justify-content-center mt-5">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="fs-4">Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  placeholder="name"
                  value={campaign.name}
                  onChange={(e) => updateCampaign("name", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="fund">
                <Form.Label className="fs-4">Fund</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  placeholder="0.00"
                  value={campaign.fund}
                  onChange={(e) => updateCampaign("fund", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="bid">
                <Form.Label className="fs-4">Bid</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  placeholder="0.00"
                  value={campaign.bid}
                  onChange={(e) => updateCampaign("bid", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="status">
                <Form.Label className="fs-4">Status</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={campaign.status}
                  onChange={(e) => updateCampaign("status", e.target.checked)}
                  as="input"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="radius">
                <Form.Label className="fs-4">Radius</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  placeholder="0.00"
                  value={campaign.radius}
                  onChange={(e) => updateCampaign("radius", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Form.Group className="mb-3" controlId="keyword">
                <Form.Label className="fs-4">Keywords</Form.Label>
                <PublicMethodsExample />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={campaign.town ? `${campaign.town}` : "Select town"}
                onSelect={(selectedElement) => {
                  updateCampaign("town", selectedElement);
                }}
              >
                {cities.map((townEnum) => (
                  <Dropdown.Item key={townEnum.id} eventKey={townEnum.name}>
                    {townEnum.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col
              md="8"
              lg="6"
              className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
            >
              <Button id="submit" type="submit" size="lg">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default EditCampaigneView;
