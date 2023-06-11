import React, { useState, useContext, useRef } from "react";
import { TextField, PrimaryButton, Modal } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import SellerTopBar from "./SellerTopBar";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./SellerNewProduct.css";
import { AuthContext } from "../../AuthContext";

function NewProduct() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState(""); // Declare imgSrc state variable here
  const [quantityInStock, setQuantityInStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgSrc(reader.result);
    };

    reader.onerror = () => {
      console.error("An error occurred while reading the file");
      setImgSrc("");
      setError("Failed to read the file");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgSrc("");
    }
  };

  const handleSubmit = async () => {
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      quantityInStock.trim() === ""
    ) {
      setError("Sva polja su obavezna!");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(quantityInStock))) {
      setError("Cena i količina moraju biti brojevi!");
      return;
    }

    const formData = {
      name,
      price: Number(price),
      description,
      imgSrc,
      quantityInStock: Number(quantityInStock),
    };

    try {
      const response = await fetch("https://localhost:7146/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product created:", data);
        setShowModal(true); // Show the success modal
        setTimeout(() => {
          setShowModal(false); // Hide the success modal after 3 seconds
          navigate("/seller-dashboard"); // Redirect to the desired page
        }, 3000);
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <SellerTopBar />
      <div className="new-product-container">
        <h2>New Product</h2>
        <div className="form-fields">
          <TextField
            label="Name"
            value={name}
            onChange={(event, newValue) => setName(newValue)}
            required
            errorMessage={
              error && !name.trim() ? "Name is required" : undefined
            }
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(event, newValue) => setPrice(newValue)}
            required
            errorMessage={
              error && (isNaN(Number(price)) || price.trim() === "")
                ? "Price must be a number"
                : undefined
            }
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event, newValue) => setDescription(newValue)}
            required
          />
          <div className="upload-image">
            <label htmlFor="productImageInput">
              <div className="upload-label">
                <div className="upload-icon">
                  <ArrowUpload16Filled />
                </div>
                <span>{imgSrc ? imgSrc.name : "Choose Image"}</span>
              </div>
            </label>
            <input
              id="productImageInput"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <TextField
            label="Quantity in Stock"
            type="number"
            value={quantityInStock}
            onChange={(event, newValue) => setQuantityInStock(newValue)}
            required
            errorMessage={
              error &&
              (isNaN(Number(quantityInStock)) || quantityInStock.trim() === "")
                ? "Quantity in Stock must be a number"
                : undefined
            }
          />
        </div>
        <div className="submit-button">
          <PrimaryButton
            text="Create Product"
            onClick={handleSubmit}
            styles={{ width: "100%" }}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Product successfully created!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default NewProduct;
