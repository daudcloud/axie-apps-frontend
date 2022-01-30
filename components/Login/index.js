import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Router from "next/router";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [dataPost, setDataPost] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useUser();
  const handleChange = (e) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    const { success, token, message } = await res.json();
    if (!success) return console.log(message);
    localStorage.setItem("token", token);
    Router.reload();
  };

  useEffect(() => {
    if (user) Router.push("/");
  }, [user]);
  console.log(user);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={dataPost.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={dataPost.password}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
