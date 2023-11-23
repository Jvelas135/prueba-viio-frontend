import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../apis/index.js";
import Swal from "sweetalert2";

const Home = (props) => {
  useEffect(() => {
    getCarts();
  }, []);

  const [carts, setCarts] = useState([]);
  const storedInformacionArray =
    JSON.parse(localStorage.getItem("product_carts")) || [];
  const [informationArray, setInformacionArray] = useState(
    storedInformacionArray
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    localStorage.setItem("product_carts", JSON.stringify(informationArray));
  }, [informationArray]);

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

  async function getCarts() {
    try {
      const response = await axios.get("/api/carts");
      setCarts(response.data.data);
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.status);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Request configuration error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = (elemento) => {
    const newInformation = {
      id: elemento.id,
      title: elemento.title,
      price: `${elemento.price} USD`,
      discountPercentage: `${elemento.discountPercentage}%`,
      quantity: `${elemento.quantity} UND`,
      thumbnail: elemento.thumbnail,
    };

    confirmAddToCart(newInformation);
  };

  const confirmAddToCart = (newInformation) => {
    const indexRepeated = informationArray.findIndex(
      (item) => item.id === newInformation.id
    );

    Swal.fire({
      title: "¿Do you want to add to shopping cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (indexRepeated !== -1) {
          Swal.fire(
            "Existing Product",
            "This product is already in your cart.",
            "warning"
          );
        } else {
          setInformacionArray((prevInformationArray) => [
            ...prevInformationArray,
            informationArray,
          ]);

          localStorage.setItem(
            "product_carts",
            JSON.stringify([...informationArray, informationArray])
          );

          Swal.fire(
            "Aggregate!",
            "The item has been added to the shopping cart.",
            "success"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancel", "The action has been cancelled.", "error");
      }
    });
  };

  return props.isAuthenticated != null ? (
    <div>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container" style={containerStyle}>
          {carts.map((element) => (
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
                    <strong>Discount:</strong>{" "}
                    {element.discountPercentage + "%"}
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <strong>Quantities available:</strong>{" "}
                    {element.quantity + " UND"}
                  </li>
                  <a
                    className="btn btn-dark mt-3"
                    type="button"
                    onClick={() => handleAdd(element)}
                  >
                    {" "}
                    Add Cart{" "}
                  </a>
                </ul>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
