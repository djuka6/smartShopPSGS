import React, { useEffect, useState } from "react";
import { TextField, PrimaryButton, Dropdown } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./Register.css";
import jwt_decode from "jwt-decode";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [imgPathError, setImgPathError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setEmail(userObject.email);
    setAddress("/");
    setUserName(userObject.email);
    setLastName(userObject.family_name);
    setFirstName(userObject.given_name);
    setShowPass(true);
    setImgPath(userObject.picture);
    setPassword("somedummy98/A");
    setConfirmPassword("somedummy98/A");
    handleSubmit();
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "390806400171-nhgvb4rgdke5d8gplln3pmrfr3mbph9t.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgPath(reader.result);
      setImgPathError("");
    };

    reader.onerror = () => {
      console.error("An error occurred while reading the file");
      setImgPath("");
      setImgPathError("Failed to read the file");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImgPath("");
    }
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!firstName) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!userName) {
      setUserNameError("Username is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!date) {
      setDateError("Date is required");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!imgPath) {
      setImgPathError("Image path is required");
      isValid = false;
    } else {
      setImgPathError("");
    }

    if (isValid) {
      const formData = {
        email,
        firstName,
        lastName,
        userName,
        password,
        confirmPassword,
        date,
        role,
        address,
        imgPath,
        status: 0,
      };
      console.log("uso sam odje" + formData);
      try {
        const response = await fetch("https://localhost:7146/Users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Handle success case
          console.log("Registration successful:", data);
          // Redirect to the desired page
          navigate("/login");
        } else {
          // Handle error case
          console.log("Error:", data.statusCode);

          if (
            data.statusCode === 400 &&
            data.message === "Email is already taken!"
          ) {
            setEmailError("Email is already taken");
          } else if (
            data.statusCode === 400 &&
            data.message === "Username is already taken!"
          ) {
            setUserNameError("Username is already taken");
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className="register-form">
      <h2>Registracija</h2>
      <div className="form-fields">
        <div hidden={showPass}>
          <TextField
            label="Email"
            value={email}
            onChange={(event, newValue) => setEmail(newValue)}
            required
            errorMessage={emailError}
          />
          <TextField
            label="Ime"
            value={firstName}
            onChange={(event, newValue) => setFirstName(newValue)}
            required
            errorMessage={firstNameError}
          />
          <TextField
            label="Prezime"
            value={lastName}
            onChange={(event, newValue) => setLastName(newValue)}
            required
            errorMessage={lastNameError}
          />
          <TextField
            label="Korisničko ime"
            value={userName}
            onChange={(event, newValue) => setUserName(newValue)}
            required
            errorMessage={userNameError}
          />
        </div>
      </div>
      <div className="form-fields">
        <div hidden={showPass}>
          <TextField
            label="Lozinka"
            type="password"
            value={password}
            onChange={(event, newValue) => setPassword(newValue)}
            required
            errorMessage={passwordError}
          />
          <TextField
            label="Potvrda lozinke"
            type="password"
            value={confirmPassword}
            onChange={(event, newValue) => setConfirmPassword(newValue)}
            required
            errorMessage={confirmPasswordError}
            hidden={showPass}
          />
        </div>
        <TextField
          label="Datum"
          type="date"
          value={date}
          onChange={(event, newValue) => setDate(newValue)}
          required
          errorMessage={dateError}
        />
        <Dropdown
          label="Uloga"
          options={[
            { key: "0", text: "Kupac" },
            { key: "1", text: "Prodavac" },
          ]}
          selectedKey={role}
          onChange={(event, option) => setRole(option.key)}
          required
          styles={{ root: { width: "100%" } }}
        />
      </div>
      <div className="form-fields">
        <TextField
          label="Adresa"
          value={address}
          onChange={(event, newValue) => setAddress(newValue)}
          required
          errorMessage={addressError}
        />
      </div>
      <label htmlFor="profileImageInput" hidden={showPass}>
        <div className="upload-label">
          <div className="upload-icon">
            <ArrowUpload16Filled />
          </div>
          <span>Odaberi sliku</span>
        </div>
        <input
          id="profileImageInput"
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </label>
      <div className="submit-button">
        <PrimaryButton
          text="Registruj se"
          onClick={handleSubmit}
          styles={{ width: "100%" }}
        />
      </div>
      <div id="signInDiv"></div>
    </div>
  );
}

function Register() {
  return (
    <div className="register-container">
      <RegisterForm />
    </div>
  );
}

export default Register;
