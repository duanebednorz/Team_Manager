import React, { useEffect, useState } from "react";
import Axios from "axios";
import FormInput from "../components/FormInput";
import { navigate, Link } from "@reach/router";


const UpdateItem = (props) =>{
    const { logged, setLogged } = props;

    const initialItemDetail = {
        Name: '',
        // Price: '',
        Position: '',
    }
// ********************************************
    const [itemDetail, setItemDetail] = useState(initialItemDetail);
    const [errors, setErrors] = useState(initialItemDetail);
    useEffect(() => {
            Axios.get(`http://localhost:8000/api/oneItem/${props.id}`)
              .then((response) => {
                console.log("Here's the response call for this item", response);
                setItemDetail(response.data.results);
              })
              .catch((error) => {
                console.log("Here's the error", error);
              });
          }, [errors]);
    
// *****************************************
    const changeHandler = (e) =>{
        setItemDetail({
            ...itemDetail,
            [e.target.name] : e.target.value,
        });
    };
// *****************************************
    const submitHandler = (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:8000/api/update/${props.id}`, itemDetail)
              .then((response) => {
                console.log("This is the Update Form Submission", response);
                if (response.data.results) {
                  navigate("/api/items");
                } else {
                  console.log("***Update Item Post****Fix it**********************");
                  console.log(response);
                  setErrors(response.data.errors);
                }
              })
              .catch((error) => console.log("These are the posting errors", error));
    };

    return (
        <div>
            <h1>Welcome, {logged.firstName} {logged.lastName}</h1>
          <form className="col-5 mx-auto" onSubmit={submitHandler}>
            <h2>Udpate this item:</h2>
            <Link className="btn btn-primary m-1" to="/api/items">Cancel</Link>
            <FormInput
              name="Name"
              value={itemDetail.Name}
              error={errors.Name}
              handleChange={changeHandler}
              label="Name:"
              type="text"
            />
            {/* <FormInput
              name="Price"
              value={itemDetail.Price}
              error={errors.Price}
              handleChange={changeHandler}
              label="Price:"
              type="Number"
            /> */}
            <FormInput
              name="Position"
              value={itemDetail.Description}
              error={errors.Description}
              handleChange={changeHandler}
              label="Description:"
              type="text"
            />
            <FormInput submitValue="Update" type="submit" />
            <br />
          
          </form>
        </div>
      );
    
    };
    export default UpdateItem;