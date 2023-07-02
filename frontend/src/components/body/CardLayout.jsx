import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import nj_logo from "./NJ_logo.png";
import Image from "react-bootstrap/Image";
import "./CardLayout.css";
import cookingIcon from "./cookingicon.jpeg";
import noOfServing from "./noOfServing.png";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddCuisine from "../cuisine/AddCuisine";

const CardLayout = () => {
  var navigate = useNavigate();

  // console.log('cuisineStyle',cuisineStyle)
  // console.log("MY PROPS", props.myData.map(item => console.log(item)))
  const [openIndex, setOpenIndex] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  const [cardDetails, setCardDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [cusineTypeCard, setCusineTypeCard] = useState([]);
  const [update, setUpdate] = useState(false);
  const [singleValue, setSingleValue] = useState([]);

  const fetch = () => {
    try {
      setLoading(true);
      const response = axios
        .get("http://localhost:24000/recipe/readAllRecipes")
        .then((response) => {
          // console.log(response.data.data)

          setCardDetails(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleItemHover = (item) => {
    setActiveItem(item);
  };

  const handleItemClick = async (item,cuisine) => {
    // Perform your navigation or function here
    if (item === "Delete") {
      try {
        // Perform your delete Axios request here
        // console.log("recipeNAme",cuisine);
        const response = await axios.delete(
          `http://localhost:24000/recipe/removeRecipe/${cuisine}`
        )

          console.log(`Successfully deleted: ${item}`)
          // console.log(response.data); // Handle the response as needed

          window.location.reload()

        // Perform any navigation or state updates after successful deletion

       
      } catch (error) {
        console.error(error);
        // Handle any errors that occurred during the delete request
      }
    }
    if(item === "Update"){
      // console.log("update clicked" + cuisine.cuisineName);
      setUpdate(true);
      setSingleValue(cuisine);
    }
  };

  let finalJSX = (
    <div
      className="container"
      style={{ backgroundColor: "grey", maxWidth: "100%" }}
    >
      <div className="row">
        {cardDetails.map((card, index) => (
          <div className="col col-lg-3 g-1" sm={3} key={index}>
            <Card className="p-1 m-3">
              <div className="dropdown-wrapper">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
        
                      onMouseEnter={() => handleItemHover("Update")}
                      onMouseLeave={() => handleItemHover(null)}
                      onClick={() => handleItemClick("Update",card)}
                      className={activeItem === "Update" ? "active" : ""}
                    >
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item
                      onMouseEnter={() => handleItemHover("Delete")}
                      onMouseLeave={() => handleItemHover(null)}
                      onClick={() =>handleItemClick("Delete",card.cuisineName)}
                      className={activeItem === "Delete" ? "active" : ""}      
                    >
                      Delete { card.cuisineName }                    
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Image src={nj_logo} rounded />
              <Card.Body>
                <Card.Title>{card.cuisineName}</Card.Title>
                <div>
                  <Card.Text>
                    <img
                      style={{ width: "30px", marginBottom: "8px" }}
                      src={cookingIcon}
                      alt="cookingIcon"
                    />{" "}
                    {card.cookingDuration} minutes
                    <img
                      style={{
                        width: "30px",
                        marginBottom: "8px",
                        marginLeft: "24px",
                      }}
                      src={noOfServing}
                      alt="servingIcon"
                    />{" "}
                    {card.noOfServing}
                  </Card.Text>
                </div>

                <div>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-controls={`collapseExample-${index}`}
                    aria-expanded={openIndex === index}
                  >
                    Description
                  </Button>
                  <Collapse in={openIndex === index}>
                    <div>
                      <Card body style={{ border: "none" }}>
                        {card.description}
                      </Card>
                    </div>
                  </Collapse>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
  if (update) {
    // console.log(update);
    finalJSX = <AddCuisine data={singleValue} method="put" />;

  }
  return (
    <div>
      {loading ? (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      ) : finalJSX}
    </div>
  );
};

export default CardLayout;
