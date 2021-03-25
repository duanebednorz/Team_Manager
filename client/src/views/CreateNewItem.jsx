import React, { useState } from "react";
import Axios from "axios";
import FormInput from "../components/FormInput";
import { navigate, Link } from "@reach/router";

const CreateNewItem = (props) => {
  const { logged, setLogged } = props;

  const initialFormInfo = {
    Name: "",
    // Price: 0,
    Position: "",
  };
  const [formInfo, setFormInfo] = useState(initialFormInfo);
  const [errors, setErrors] = useState(initialFormInfo);
  // **************************************************
  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  //   ************************************************
  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/create/item", formInfo)
      .then((response) => {
        console.log("This is the New Item Form Submission post:", response);
        if (response.data.results) {
          navigate("/api/items");
        } else {
          console.log("Create New Item******Fix it**********************");
          setErrors(response.data.errors);
        }
      })
      .catch((error) =>
        console.log("These are the form submission post errors:", error)
      );
  };
  return (
    <div>
        <h1>Welcome, {logged.firstName} {logged.lastName}</h1>
      <form className="col-5 mx-auto" onSubmit={submitHandler}>
        <h2>Add Player:</h2>
        <Link className="btn btn-primary m-1" to="/api/items">Cancel</Link>
        <FormInput
          name="Name"
          value={formInfo.Name}
          error={errors.Name}
          handleChange={changeHandler}
          label="Name:"
          type="text"
        />
        {/* <FormInput
          name="Price"
          value={formInfo.Price}
          error={errors.Price}
          handleChange={changeHandler}
          label="Price:"
          type="Number"
        /> */}
        <FormInput
          name="Position"
          value={formInfo.Position}
          error={errors.Position}
          handleChange={changeHandler}
          label="Position:"
          type="text"
        />
        <FormInput submitValue="Add Name" type="submit" />
        <br />
        {/* <Link to="/login">Already have an account?</Link> */}
      </form>
    </div>
  );

};
export default CreateNewItem;

