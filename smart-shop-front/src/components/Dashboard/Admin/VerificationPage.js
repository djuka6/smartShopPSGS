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
import TopBar from "../Admin/AdminTopBar";
import "./VerificationPage.css";

function VerificationPage() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogAction, setDialogAction] = useState(""); // Stores the selected dialog action: "accept" or "decline"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:7146/Users/getSellers",
          {
            headers: {
              Token: token,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleVerify = (user) => {
    setSelectedUser(user);
    setIsDialogVisible(true);
  };

  const handleConfirm = (action, user) => {
    setSelectedUser(user);
    setDialogAction(action);
    setIsDialogVisible(true);
  };

  const handleAction = async () => {
    const status = dialogAction === "accept" ? 1 : -1;
    const headers = {
      "Content-Type": "application/json",
      Token: token,
    };

    try {
      const response = await fetch(
        `https://localhost:7146/Users/verify/${selectedUser.id}?status=${status}`,
        {
          method: "POST",
          headers: headers,
        }
      );

      if (response.ok) {
        console.log(
          `User ${dialogAction === "accept" ? "accepted" : "declined"}:`,
          selectedUser
        );
        window.location.reload(); // Reload the page
      } else {
        console.log(
          `Error ${
            dialogAction === "accept" ? "accepting" : "declining"
          } user:`,
          response.status
        );
      }
    } catch (error) {
      console.log(
        `Error ${dialogAction === "accept" ? "accepting" : "declining"} user:`,
        error
      );
    }

    setIsDialogVisible(false);
  };

  return (
    <div className="verification-page">
      <TopBar />
      <div className="card-container">
        {users.map((user) => (
          <DocumentCard key={user.id} className="user-card">
            <div className="user-info">
              <Image
                src={user.imgPath || "placeholder-image-url"}
                alt="User Image"
                width={100}
                height={100}
              />
              <div className="user-details">
                <DocumentCardTitle title={user.userName} />
                <DocumentCardDetails>
                  <Text>Email: {user.email}</Text>
                </DocumentCardDetails>
              </div>
            </div>
            <div className="button-container">
              <PrimaryButton
                text="Prihvati"
                onClick={() => handleConfirm("accept", user)}
                className="accept-button"
              />
              <PrimaryButton
                text="Odbij"
                onClick={() => handleConfirm("decline", user)}
                className="reject-button"
              />
            </div>
          </DocumentCard>
        ))}
      </div>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Verification",
          subText: `Are you sure you want to ${
            dialogAction === "accept" ? "accept" : "decline"
          } ${selectedUser?.userName}?`,
        }}
      >
        <DialogFooter>
          <PrimaryButton
            text={dialogAction === "accept" ? "Prihvati" : "Odbij"}
            onClick={handleAction}
            className={
              dialogAction === "accept" ? "accept-button" : "reject-button"
            }
          />
          <PrimaryButton
            text="Cancel"
            onClick={() => setIsDialogVisible(false)}
          />
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default VerificationPage;
