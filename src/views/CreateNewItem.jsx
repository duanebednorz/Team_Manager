import React, { useState } from "react";
import Axios from "axios";
import { navigate, Link } from "@reach/router";

const CreateNewItem = () => {
  const [formInfo, setFormInfo] = useState({
    Title: "",
    Price: 0,
    Description: "",
  });
  const [errors, setErrors] = useState({});
  // ****************************************************************************
  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  // ****************************************************************************
  const submitHandle = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/create/item", formInfo)
      .then((res) => {
        console.log("This is the Form Submission post:", res);
        if (res.data.results) {
          navigate("/api/items");
        } else {
          console.log("Fix it**********************");
          setErrors(res.data.errors);
        }
      })
      .catch((err) =>
        console.log("These are the form submission post errors:", err)
      );
  };
  // *************************************************************************
  return (
    <div>
      <h1>Favorite Name</h1>
      <form onSubmit={submitHandle}>
        <Link className="btn btn-primary m-1" to="/api/items">Cancel</Link>
        <div>
            <label htmlFor="">Name:</label>
                <br />
            <input 
                type="text" 
                name="Name" 
                onChange={changeHandler} 
                id="" />
                <br />
            <span className="text-danger"> {errors.Name ? errors.Name.message : ""}</span>
            <label htmlFor="">Price:</label>
                <br/>
            <input 
                type="number" 
                name="Price" 
                onChange ={changeHandler} 
                id=""/>
                <br/>
            <span className = "text-danger"> {errors.Price? errors.Price.message : ""}</span>
            <label htmlFor="">Description:</label>
                <br/>
            <input 
                type="text" 
                name="Description" 
                onChange ={changeHandler} 
                id=""/>
                <br/>
            <span className = "text-danger"> {errors.Description? errors.Description.message : ""}</span>
        </div>
                <br />
            <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default CreateNewItem;
