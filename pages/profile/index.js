import { useState } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";

const inputStyle = {
  width: "30px",
};

const inputContainer = {
  width: "25%",
  margin: "auto",
};

export default function Profile() {
  const [pin, setPin] = useState({});

  const changeText = (event) => {
    if (event.target.value) {
      const nextSibling = document.querySelector(
        `input[name='${parseInt(event.target.name, 10) + 1}']`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleSubmit = () => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    console.log(allPin);
  };

  return (
    <Layout title="Profile">
      <Navbar />
      <h1>Profile Page !</h1>
      <div className="container">
        <div style={inputContainer}>
          <div className="row">
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => changeText(event)}
                name="1"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => changeText(event)}
                name="2"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => changeText(event)}
                name="3"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => changeText(event)}
                name="4"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => changeText(event)}
                name="5"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => changeText(event)}
                name="6"
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </Layout>
  );
}
