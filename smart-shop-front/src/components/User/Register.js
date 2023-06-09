import React, { useState } from "react";
import { TextField, PrimaryButton, Dropdown } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { ArrowUpload16Filled } from "@fluentui/react-icons";
import "./Register.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [imgPath, setImgPath] = useState("");

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform file upload logic
  };

  const handleSubmit = async () => {
    const formData = {
      email,
      firstName,
      lastName,
      userName,
      password,
      confirmPassword,
      date: new Date(date).toISOString(),
      role,
      address,
      imgPath,
      status: 0,
    };

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
        navigate("/dashboard");
      } else {
        // Handle error case
        console.log("Error:", data.statusCode);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Registracija</h2>
      <div className="form-fields">
        <TextField
          label="Email"
          value={email}
          onChange={(event, newValue) => setEmail(newValue)}
          required
        />
        <TextField
          label="Ime"
          value={firstName}
          onChange={(event, newValue) => setFirstName(newValue)}
          required
        />
        <TextField
          label="Prezime"
          value={lastName}
          onChange={(event, newValue) => setLastName(newValue)}
          required
        />
        <TextField
          label="Korisničko ime"
          value={userName}
          onChange={(event, newValue) => setUserName(newValue)}
          required
        />
      </div>
      <div className="form-fields">
        <TextField
          label="Lozinka"
          type="password"
          value={password}
          onChange={(event, newValue) => setPassword(newValue)}
          required
        />
        <TextField
          label="Potvrda lozinke"
          type="password"
          value={confirmPassword}
          onChange={(event, newValue) => setConfirmPassword(newValue)}
          required
        />
        <TextField
          label="Datum"
          type="date"
          value={date}
          onChange={(event, newValue) => setDate(newValue)}
          required
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
        />
        <TextField
          label="Putanja do slike"
          value={imgPath}
          onChange={(event, newValue) => setImgPath(newValue)}
          required
        />
      </div>
      <label htmlFor="profileImageInput">
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
