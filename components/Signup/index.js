import { useEffect, useState } from "react";
import Router from "next/router";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";
import Link from "next/link";

const Signup = () => {
  const [dataPost, setDataPost] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roninAddress: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ error: false, message: "" });
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
      return setStatus({
        ...status,
        error: true,
        message: "Fields must be filled",
      });
    }
    if (dataPost.password !== dataPost.confirmPassword) {
      return setStatus({
        ...status,
        error: true,
        message: "Password and Confirm Password doesnt match",
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
      return setStatus({ ...status, error: true, message });
    }
    setStatus({ ...status, error: false, message });
    Router.push("/login");
  };

  useEffect(() => {
    if (user) Router.push("/dashboard");
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {status.message !== "" && status.error && (
          <div className={styles.errors}>{status.message}</div>
        )}
        {status.message !== "" && !status.error && (
          <div className={styles.success}>{status.message}</div>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={dataPost.confirmPassword}
          />
          <button type="submit">Sign up</button>
          <Link href="/login">
            <a>
              <button className={styles.btnSecondary}>Log in</button>
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
