import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  Stack,
  PrimaryButton,
  IconButton,
  TextField,
  CommandBarButton,
  AnimationStyles,
  loadTheme,
  Dropdown,
  Dialog,
  DialogType,
} from "@fluentui/react";
import { Edit16Filled } from "@fluentui/react-icons";
import { AuthContext } from "../../AuthContext";
import SellerTopBar from "./SellerTopBar";
import "./SellerProfile.css";
import { Button } from "@fluentui/web-components";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpload16Filled,
  Clock16Filled,
  CheckboxChecked16Filled,
  BugFilled,
} from "@fluentui/react-icons";

function Profile() {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:4000/api/Users", {
          headers: {
            Token: token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data.user);
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setUserName(data.user.userName);
          setEmail(data.user.email);
          setDate(data.user.date.split("T")[0]);
          setAddress(data.user.address);
          setImgPath(data.user.imgPath);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const { id, role, status, ...userProfile } = userData || {};

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform file upload logic
  };

  const handleSubmit = async () => {
    console.log(address);
    const formData = {
      id,
      firstName,
      lastName,
      userName,
      date: new Date(date).toISOString(), // Convert the date to ISO format for sending to the backend
      role,
      address,
      imgPath,
      email,
      password: "",
      confirmPassword: "",
      status,
    };

    try {
      const response = await fetch("https://localhost:7146/Users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully:", data);
        setUserData(formData); // update local userData state with the new data
        setIsEditMode(false); // exit edit mode
      } else if (response.status === 400) {
        setIsDialogVisible(true); // show the dialog
      } else {
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="profile-container" style={AnimationStyles.slideRightIn20}>
      <SellerTopBar />
      <div className="card documentcardtitle">
        {userProfile ? (
          <DocumentCard>
            <div className="card-header">
              <DocumentCardTitle
                className="card-title"
                title="Korisnički profil"
              />
              <div className="edit-button">
                <Edit16Filled
                  onClick={handleEditClick}
                  className={`edit-icon ${isEditMode ? "active" : ""}`}
                />
              </div>
            </div>
            <DocumentCardDetails className="card-content">
              {isEditMode ? (
                <Stack tokens={{ childrenGap: 10 }}>
                  <div>
                    <Text className="blue-text">Ime:</Text>
                    <TextField
                      defaultValue={firstName}
                      underlined
                      onChange={(event, newValue) => setFirstName(newValue)}
                    />
                  </div>
                  <div>
                    <Text className="blue-text">Prezime:</Text>
                    <TextField
                      defaultValue={lastName}
                      underlined
                      onChange={(event, newValue) => setLastName(newValue)}
                    />
                  </div>
                  <div>
                    <Text className="blue-text">Korisničko ime:</Text>
                    <TextField
                      defaultValue={userName}
                      underlined
                      onChange={(event, newValue) => setUserName(newValue)}
                    />
                  </div>
                  <div>
                    <Text className="blue-text">Email:</Text>
                    <TextField
                      defaultValue={email}
                      underlined
                      onChange={(event, newValue) => setEmail(newValue)}
                    />
                  </div>
                  <div>
                    <Text className="blue-text">Datum rođenja:</Text>
                    <input
                      type="date"
                      className="date-input"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </div>
                  <div>
                    <Text className="blue-text">Adresa:</Text>
                    <TextField
                      defaultValue={address}
                      underlined
                      onChange={(event, newValue) => setAddress(newValue)}
                    />
                  </div>
                  <div>
                    <Text className="blue-text">Putanja do slike:</Text>
                    <TextField
                      defaultValue={imgPath}
                      underlined
                      onChange={(event, newValue) => setImgPath(newValue)}
                    />
                  </div>
                </Stack>
              ) : (
                <Stack tokens={{ childrenGap: 10 }}>
                  <Text className="blue-text">Ime: {firstName}</Text>
                  <Text className="blue-text">Prezime: {lastName}</Text>
                  <Text className="blue-text">Korisničko ime: {userName}</Text>
                  <Text className="blue-text">Email: {email}</Text>
                  <Text className="blue-text">Datum rođenja: {date}</Text>
                  <Text className="blue-text">Adresa: {address}</Text>
                  <Text className="blue-text">
                    <span className="blue-text">
                      {role === 2
                        ? "Role : admin"
                        : role === 1
                        ? "Role : prodavac"
                        : "Role : kupac"}
                    </span>
                  </Text>
                  <Text className="blue-text">
                    Status:
                    {status == 0 ? (
                      <Clock16Filled className="pending-icon" />
                    ) : status == 1 ? (
                      <CheckboxChecked16Filled className="accepted-icon" />
                    ) : status == -1 ? (
                      <BugFilled className="rejected-icon" />
                    ) : null}
                  </Text>
                </Stack>
              )}
            </DocumentCardDetails>
            {isEditMode && (
              <div className="submit-button-container">
                <PrimaryButton
                  text="Sačuvaj"
                  onClick={handleSubmit}
                  styles={{ root: { marginBottom: "20px" } }} // Apply margin-bottom directly to the button
                />
              </div>
            )}
          </DocumentCard>
        ) : (
          <Text className="loading-text">Učitavanje...</Text>
        )}
      </div>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Error",
          subText: "Username or email is already taken.",
        }}
      />
    </div>
  );
}

export default Profile;
