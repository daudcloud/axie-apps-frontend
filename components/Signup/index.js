import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";
import Link from "next/link";

const Login = () => {
  const [dataPost, setDataPost] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roninAddress: "",
  });
  const [errors, setErrors] = useState({ message: "" });
  const [success, setSuccess] = useState({ message: "" });
  const [user, setUser] = useUser();
  const handleChange = (e) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      dataPost.email === "" ||
      dataPost.password === "" ||
      dataPost.firstName === "" ||
      dataPost.lastName === ""
    ) {
      return setErrors({
        ...errors,
        message: "Fields must be filled",
      });
    }
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    const { success, message } = await res.json();
    if (!success) {
      setSuccess({ ...success, message: "" });
      return setErrors({ ...errors, message });
    }
    setErrors({ ...success, message: "" });
    setSuccess({ ...success, message: message });
  };

  console.log(user);
  return (
    <div className={styles.formContainer}>
      {errors.message !== "" && (
        <div className={styles.errors}>{errors.message}</div>
      )}
      {success.message !== "" && (
        <div className={styles.success}>{success.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={dataPost.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={dataPost.lastName}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={dataPost.email}
        />
        <input
          type="text"
          name="roninAddress"
          placeholder="Ronin Address (Can be added later)"
          onChange={handleChange}
          value={dataPost.roninAddress}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={dataPost.password}
        />
        <button type="submit">Sign up</button>
        <Link href="/login">
          <a>
            <button className={styles.btnSecondary}>Log in</button>
          </a>
        </Link>
      </form>
    </div>
  );
};

export default Login;
