import React, { useContext, useState, useEffect } from "react";
import { DefaultButton, TextField } from "@fluentui/react";
import CartContext from "./CartContext";
import CustomerTopBar from "./CustomerTopBar";
import "./CustomerNewOrder.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  Add16Regular,
  Alert12Filled,
  Subtract16Filled,
} from "@fluentui/react-icons";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CustomerNewOrder() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressError, setAddressError] = useState(false); // New state for address validation error
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let calculatedTotal = 0;
    if (cartItems) {
      Object.values(cartItems).forEach((item) => {
        calculatedTotal += item.product.price * item.quantity;
      });
    }
    setTotal(calculatedTotal + 120);
  }, [cartItems]);

  const handleCheckout = async () => {
    console.log("I OVDE SA PLATIO");
    if (!cartItems || Object.values(cartItems).length === 0) {
      return;
    }

    if (!address) {
      setAddressError(true); // Set address validation error to true
      return;
    }

    setAddressError(false); // Reset address validation error to false

    const productQuantities = Object.values(cartItems).map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const orderData = {
      productQuantities: productQuantities,
      comment: comment,
      address: address,
    };

    try {
      const response = await fetch("https://localhost:7146/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token, // Replace with your actual token
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage("Uspešno ste dodali porudžbinu!");
        setIsModalOpen(true); // Show success modal
        setTimeout(() => {
          setIsModalOpen(false); // Hide the modal after 3 seconds
          // Reset cart items to initial values
          setCartItems({});
          // Redirect to /customer-dashboard
          navigate("/customer-dashboard");
        }, 3000);
      } else {
        setMessage("Nema dovoljno jedinica artikla koje želite da naručite!");
        setIsModalOpen(true);
        // Show success modal
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleQuantityChange = (itemId, newValue) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].quantity = parseInt(newValue, 10);
    setCartItems(updatedCartItems);
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = { ...cartItems };
    if (updatedCartItems[itemId].quantity > 1) {
      updatedCartItems[itemId].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const handlePlatiPouzecem = () => {
    console.log("Plati Pouzecem clicked");
    // Add your logic for "Plati Pouzecem" button here
  };

  return (
    <div className="new-order-container">
      <CustomerTopBar />

      {cartItems && Object.values(cartItems).length > 0 ? (
        <div className="cart-items-container">
          {Object.values(cartItems).map((item) => (
            <div key={item.product.id} className="cart-item">
              <h3 className="cart-item-name">{item.product.name}</h3>
              <div className="cart-item-details">
                <p className="cart-item-quantity">Količina:</p>
                <div className="quantity-controls">
                  <Subtract16Filled
                    onClick={() => handleDecrement(item.product.id)}
                    className="quantity-decrement"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      handleQuantityChange(item.product.id, e.target.value)
                    }
                    className="cart-item-quantity-input"
                  />
                  <></>
                  <Add16Regular
                    onClick={() => handleIncrement(item.product.id)}
                    className="quantity-increment"
                  />
                </div>
              </div>
            </div>
          ))}
          <TextField
            label="Adresa"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required // Set the address field as required
            className="checkout-address"
            errorMessage={addressError ? "Adresa je obavezna!" : undefined} // Conditionally display the error message
            styles={{
              errorMessage: { color: "red" }, // Set the error message color to red
            }}
          />
          <TextField
            label="Komentar"
            multiline
            rows={3}
            value={comment}
            onChange={(_, newValue) => setComment(newValue)}
            className="checkout-comment"
          />
          <p className="total-amount">Vaš račun je: {total} dinara</p>
          <div className="checkout-buttons">
            <DefaultButton
              text="Poruči sa pouzećem"
              onClick={handleCheckout}
              className="checkout-button"
            />
            <PayPalScriptProvider
              options={{
                "client-id":
                  "ASKivSyljrEX6uH_G44ZhkU3UPkBauRXav3sW-8ufZDjcgE7WESD--KcFIfHJ4pXbppKX8H6w6Ac8A12",
              }}
            >
              <PayPalButtons
                forceReRender={[address]}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (total / 100).toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order
                    .capture()
                    .then((details) => {
                      console.log(details);
                      handleCheckout();
                    })
                    .catch((error) => {
                      setMessage(
                        "Nemate dovoljno sredstava da izvršite kupovinu!"
                      );
                      setIsModalOpen(true);
                    });
                }}
                onError={(err) => {
                  console.log(err);
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">Vaša korpa je prazna.</p>
      )}

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal">
          <h3>{message}</h3>
        </div>
      )}
    </div>
  );
}

export default CustomerNewOrder;
