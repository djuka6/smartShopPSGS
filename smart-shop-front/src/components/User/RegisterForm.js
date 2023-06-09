import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function RegisterForm() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Nevažeća email adresa")
      .required("Email je obavezan"),
    firstName: Yup.string().required("Ime je obavezno"),
    lastName: Yup.string().required("Prezime je obavezno"),
    userName: Yup.string().required("Korisničko ime je obavezno"),
    password: Yup.string()
      .required("Lozinka je obavezna")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Lozinka mora sadržati barem jedno malo slovo, jedno veliko slovo, jedan specijalni karakter i jedan broj"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Lozinke se ne poklapaju")
      .required("Potvrda lozinke je obavezna"),
    dateOfBirth: Yup.date().required("Datum rođenja je obavezan"),
    role: Yup.string().required("Tip korisnika je obavezan"),
    address: Yup.string().required("Adresa je obavezna"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      role: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Implementirajte logiku za slanje podataka na server
      console.log(values);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      {/* Polja forme */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>

      {/* Ostala polja forme */}

      <button type="submit">Registruj se</button>
    </form>
  );
}

export default RegisterForm;
