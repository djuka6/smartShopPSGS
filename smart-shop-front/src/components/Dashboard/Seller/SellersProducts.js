import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  PrimaryButton,
  Image,
  Modal,
} from "@fluentui/react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "./SellersProducts.css";
import SellerTopBar from "./SellerTopBar";

function SellersProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token, fetchProducts]);

  const handleEditProduct = (product) => {
    navigate(`/seller-dashboard/update-product/${product.id}`, {
      state: { product },
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://localhost:7146/Product/Delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Token: token,
          },
        }
      );

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          fetchProducts();
        }, 3000);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/seller-dashboard/new-product");
  };

  return (
    <div className="all-products-container">
      <div className="add-product-container">
        <PrimaryButton
          text="Dodaj novi proizvod"
          onClick={handleAddProduct}
          className="add-product-button"
        />
      </div>
      <SellerTopBar />
      <div className="product-grid">
        {products.map((product) => (
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
                  <p>Količina u magacinu: {product.quantity}</p>
                  <p>Opis: {product.description}</p>
                </DocumentCardDetails>
              </div>
            </div>
            <div className="product-actions">
              <PrimaryButton
                text="Ažuriraj"
                onClick={() => handleEditProduct(product)}
                className="edit-button"
              />
              <PrimaryButton
                text="Obriši"
                onClick={() => handleDeleteProduct(product.id)}
                className="delete-button"
              />
            </div>
          </DocumentCard>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        isBlocking={false}
      >
        <div className="modal-content">
          <h3 className="modal-text">Proizvod uspešno obrisan!</h3>
        </div>
      </Modal>
    </div>
  );
}

export default SellersProducts;
