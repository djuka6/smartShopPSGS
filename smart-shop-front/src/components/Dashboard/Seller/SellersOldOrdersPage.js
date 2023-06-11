import React, { useEffect, useState, useContext } from "react";
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  PrimaryButton,
  Image,
  Dialog,
  DialogType,
  DialogFooter,
  Stack,
  Text,
} from "@fluentui/react";
import { AuthContext } from "../../AuthContext";
import SellerTopBar from "./SellerTopBar";
import "./SellersOldOrdersPage.css";

function SellersOldOrdersPage() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7146/SellersOldOrders",
          {
            headers: {
              Token: token,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.log("NESTONERADI");
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogVisible(true);
  };

  const formatDeliveryTime = (deliveryTime) => {
    const hours = Math.floor(deliveryTime);
    const minutes = Math.round((deliveryTime - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="orders-page">
      <SellerTopBar />
      <div className="card-container">
        {orders.map((order) => (
          <DocumentCard key={order.id} className="order-card delivered">
            <div className="order-info">
              <div className="order-details">
                <DocumentCardDetails>
                  <Text>
                    Address: <strong>{order.address}</strong>
                  </Text>
                  <Text>
                    Comment: <strong>{order.comment}</strong>
                  </Text>
                  <Text>
                    Total Price: <strong>{order.totalPrice}</strong>
                  </Text>
                  <Text>
                    Delivery Time: <strong>Delivered</strong>
                  </Text>
                </DocumentCardDetails>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <Image
                      src={item.product.imgSrc || "placeholder-image-url"}
                      alt="Product Image"
                      width={100}
                      height={100}
                    />
                    <div className="item-details">
                      <DocumentCardTitle title={item.product.name} />
                      <DocumentCardDetails>
                        <Text>
                          Quantity: <strong>{item.quantity}</strong>
                        </Text>
                        <Text>
                          Price: <strong>{item.price}</strong>
                        </Text>
                      </DocumentCardDetails>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <PrimaryButton
              text="View Details"
              onClick={() => handleViewDetails(order)}
              className="view-details-button"
            />
          </DocumentCard>
        ))}
      </div>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Order Details",
        }}
      >
        {selectedOrder && (
          <div className="dialog-content">
            <DocumentCardDetails>
              <Text>
                Address: <strong>{selectedOrder.address}</strong>
              </Text>
              <Text>
                Comment: <strong>{selectedOrder.comment}</strong>
              </Text>
              <Text>
                Total Price: <strong>{selectedOrder.totalPrice}</strong>
              </Text>
              <Text>
                Delivery Time:{" "}
                <strong>
                  {formatDeliveryTime(selectedOrder.deliveryTime)}
                </strong>
              </Text>
            </DocumentCardDetails>
            <div className="dialog-items">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="dialog-item">
                  <Image
                    src={item.product.imgSrc || "placeholder-image-url"}
                    alt="Product Image"
                    width={80}
                    height={80}
                  />
                  <div className="item-details">
                    <DocumentCardTitle title={item.product.name} />
                    <DocumentCardDetails>
                      <Text>
                        Quantity: <strong>{item.quantity}</strong>
                      </Text>
                      <Text>
                        Price: <strong>{item.price}</strong>
                      </Text>
                    </DocumentCardDetails>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <PrimaryButton
            text="Close"
            onClick={() => setIsDialogVisible(false)}
          />
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default SellersOldOrdersPage;
