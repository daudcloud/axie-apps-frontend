import { useState } from "react";
import Layout from "../../components/Layout";

const AddPage = () => {
  const [postData, setPostData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/card/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  console.log(postData);
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardType">
          Card Type (Melee/Ranged)
          <input
            onChange={handleChange}
            value={postData.cardType}
            type="text"
            name="cardType"
            id="cardType"
            required
          />
        </label>
        <br />
        <label htmlFor="classType">
          Class Type
          <input
            onChange={handleChange}
            value={postData.classType}
            type="text"
            name="classType"
            id="classType"
            required
          />
        </label>
        <br />
        <label htmlFor="part">
          Part Name
          <input
            onChange={handleChange}
            value={postData.part}
            type="text"
            name="part"
            id="part"
            required
          />
        </label>
        <br />
        <label htmlFor="partType">
          Part Type
          <input
            onChange={handleChange}
            value={postData.partType}
            type="text"
            name="partType"
            id="partType"
            required
          />
        </label>
        <br />
        <label htmlFor="energy">
          Energy
          <input
            onChange={handleChange}
            value={postData.energy}
            type="number"
            name="energy"
            id="energy"
            required
          />
        </label>
        <br />
        <label htmlFor="name">
          Card Name
          <input
            onChange={handleChange}
            value={postData.name}
            type="text"
            name="name"
            id="name"
            required
          />
        </label>
        <br />
        <label htmlFor="damage">
          Card Damage
          <input
            onChange={handleChange}
            value={postData.damage}
            type="number"
            name="damage"
            id="damage"
            required
          />
        </label>
        <br />
        <label htmlFor="defense">
          Card Defense
          <input
            onChange={handleChange}
            value={postData.defense}
            type="number"
            name="defense"
            id="defense"
            required
          />
        </label>
        <br />
        <label htmlFor="backgroundCard">
          Card Background
          <input
            onChange={handleChange}
            value={postData.backgroundCard}
            type="text"
            name="backgroundCard"
            id="backgroundCard"
            required
          />
        </label>
        <br />
        <label htmlFor="effectIcon">
          Effect Icon
          <input
            onChange={handleChange}
            value={postData.effectIcon}
            type="text"
            name="effectIcon"
            id="effectIcon"
            required
          />
        </label>
        <br />
        <label htmlFor="description">
          Description
          <input
            onChange={handleChange}
            value={postData.description}
            type="text"
            name="description"
            id="description"
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default AddPage;
