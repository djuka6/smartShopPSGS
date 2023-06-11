import React, { useState, useContext, useEffect, useRef } from "react";
import { TextField, PrimaryButton, Modal } from "@fluentui/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SellerTopBar from "./SellerTopBar";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./UpdateProduct.css";
import { AuthContext } from "../../AuthContext";

function UpdateProduct() {
  const { token } = useContext(AuthContext);
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [quantityInStock, setQuantityInStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://localhost:7146/Product/${productId}`,
          {
            headers: {
              Token: token,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          const { name, price, description, imgSrc, quantityInStock } = data;
          setName(name);
          setPrice(price.toString());
          setDescription(description);
          setQuantityInStock(quantityInStock.toString());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchProduct();
    }
  }, [token, productId]);

  const handleImageUpload = () => {
    const file = fileInputRef.current.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      quantityInStock.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(quantityInStock))) {
      setError("Price and Quantity in Stock must be numbers");
      return;
    }

    const productData = {
      id: productId,
      name: name,
      price: Number(price),
      description: description,
      quantityInStock: Number(quantityInStock),
      imgSrc: imageSrc, // Include the base64 string of the image
    };

    try {
      const response = await fetch(`https://localhost:7146/Product/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product updated:", data);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/seller-dashboard/products");
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
      <div className="update-product-container">
        <h2>Update Product</h2>
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
                <span>{selectedFile ? selectedFile.name : "Choose Image"}</span>
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
            text="Update Product"
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
          <h3 className="modal-text">Product successfully updated!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateProduct;
