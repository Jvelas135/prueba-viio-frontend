import React from 'react'
import { Navigate } from "react-router-dom";

const Products = (props) => {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  };

  const cardStyle = {
    width: "30rem",
    marginBottom: "20px",
  };

  const buttonStyle = {
    width: "100%", 
    textDecoration: "none",
  };

  let productsString = localStorage.getItem('product_carts');
  let productsJSON = JSON.parse(productsString);

  return props.isAuthenticated != null ? (
    <div className="container" style={containerStyle}>
    {productsJSON.map((element) => (
      <button key={element.id} className="card" style={cardStyle}>
        <div style={buttonStyle}>
          <img
            src={element.thumbnail}
            className="card-img-top"
            width="400"
            height="300"
          />
          <div className="card-body">
            <h5 className="card-title">{element.title}</h5>
          </div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Price:</strong> {element.price + " USD"}
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Discount:</strong> {element.discountPercentage + "%"}
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Quantities available:</strong>{" "}
              {element.quantity + " UND"}
            </li>
          </ul>
        </div>
      </button>
    ))}
  </div>
  ): (
    <Navigate to="/login" />
  );
}

export default Products