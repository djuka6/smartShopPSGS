import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  Image,
  TextField,
} from "@fluentui/react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "./CustomerProducts.css";
import CustomerTopBar from "./CustomerTopBar";
import { Add20Regular } from "@fluentui/react-icons";
import CartContext from "./CartContext";

function CustomerDashboard() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState([]); // Changed to an array of quantities

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://localhost:7146/Products", {
        headers: {
          Token: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
        setQuantities(new Array(data.length).fill(1)); // Initialize quantities array with default value 1
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setQuantities([]); // Initialize quantities as an empty array before fetching products
      fetchProducts();
    }
  }, [token, fetchProducts]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: {
        product,
        quantity: Number(quantity),
      },
    }));
  };

  const handleQuantityChange = (index, newValue) => {
    if (/^\d*$/.test(newValue) && Number(newValue) > 0) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = newValue;
        return newQuantities;
      });
    }
  };

  return (
    <div className="all-products-container">
      <CustomerTopBar />
      <div className="product-grid">
        {products.map((product, index) => (
          <DocumentCard key={product.id} className="product-card">
            <div className="product-info">
              <div className="product-image">
                <Image
                  src={product.imgSrc || "placeholder-image-url"}
                  alt="Product Image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="product-details">
                <DocumentCardTitle title={product.name} />
                <DocumentCardDetails>
                  <p>Cena: {product.price}</p>
                  <p>Opis: {product.description}</p>
                  <div className="product-quantity">
                    <span className="product-quantity-label">Količina:</span>
                    <TextField
                      className="product-quantity-field"
                      type="number"
                      value={quantities[index]?.toString() || ""} // Use optional chaining to handle undefined values
                      min={1}
                      onChange={(_, newValue) =>
                        handleQuantityChange(index, newValue)
                      } // Pass the index to handleQuantityChange
                    />
                    <Add20Regular
                      className="product-quantity-button"
                      onClick={() =>
                        handleAddToCart(product, quantities[index])
                      } // Use the corresponding quantity from the array
                    />
                  </div>
                </DocumentCardDetails>
              </div>
            </div>
          </DocumentCard>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
