import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CardLayout from "../body/CardLayout";



const AddCuisine = (props) => {

  var navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [formData, setFormData] = useState(props.data);

  console.log("FORMMMMMMM", formData)
  useEffect(() => {
    if(data){
      setFormData(data)
    }
  }, [data]);
  console.log('**************',formData)
  const [cuisineType, setCuisineType] = useState("");
  const [cuisineName, setCuisineName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingDuration, setCookingDuration] = useState(0);
  const [noOfServing, setNoOfServing] = useState(0);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleForm = ()=> {
    // const formValues = {
    //   cuisineType: cuisineType,
    //   cuisineName: cuisineName,
    //   description: description,
    //   cookingDuration: cookingDuration,
    //   noOfServing: noOfServing,
    //   images: images
    // }
    // setFormData(formValues)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.method)
    if(props.method === "post"){
    console.log("FORMDATA",formData)
    try {
      const response = axios.post('http://localhost:24000/recipe/addRecipe', formData).then((response) => {
          // console.log(response.data.data)
      
          if(response.data.statusCode === 200){
            navigate('/')
            window.location.reload();
          }
        
        })
        .catch((error) => {
          console.error("Error:", error);
        })

      
      
    } catch (error) {
      console.error(error); // Handle any error that occurs during the request
    }
  }
    // Handle form submission logic here
  };

  // ------------------------------------
  if(props.method === "put"){
    console.log("Inside PUT")
    try {
      console.log(formData._id)
      let response = axios.put(`http://localhost:24000/recipe/updateRecipe/${formData._id}`, formData).then((response) => {
        console.log(response.data.data)
    
        if(response.data.statusCode === 200){
          // navigate('/home')
          // window.location.reload();
          console.log("SUCCESS")
        }
      
      })
      .catch((error) => {
        console.error("Error:", error);
      })
    } catch (error) {
      console.error(error); // Handle any error that occurs during the request
    }
  }


  return (
    <Form onSubmit={handleSubmit} className="container p-4 mt-5">
      <div className="row">
        <Form.Group controlId="cuisineType" className="col-6 mb-4">
          <Form.Label>Cuisine Type</Form.Label>
          <Form.Control
            as="select"
            value={formData.cuisineType}
            name="cuisineType"
            onChange={handleChange}
          >
            <option value="">Select cuisine type</option>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="american">American</option>
            <option value="chinese">Chinese</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="cuisineName" className="col-6 mb-4">
          <Form.Label>Cuisine Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cuisine name"
            value={formData.cuisineName}
            name="cuisineName"
            onChange={handleChange}
            contentEditable='true'
          />
        </Form.Group>
      </div>
      <div className="row">
        <Form.Group controlId="noOfServing" className="col-6 mb-5">
          <Form.Label>Number of Servings</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of servings"
            value={formData.noOfServing}
            name="noOfServing"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="cookingDuration" className="col-6 mb-5">
          <Form.Label>Cooking Duration (in minutes)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={1440}
            placeholder="Enter cooking duration"
            value={formData.cookingDuration}
            name="cookingDuration"
            onChange={handleChange}
          />
        </Form.Group>
      </div>
      <Form.Group controlId="images" className="col-12 mb-5">
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URLs (comma-separated)"
          value={formData.images}
            name="images"
            onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="description" className="col-12 mb-5">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={formData.description}
            name="description"
            onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-5" onClick={handleForm}>
        Submit
      </Button>
    </Form>
  );
};

export default AddCuisine;
