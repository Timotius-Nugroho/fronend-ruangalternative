import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../../styles/Login.module.css";
import Layout from "../../../components/Layout";
import { unauthPage } from "../../../middleware/authorizationPage";
import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

function Login(props) {
  const router = useRouter();
  const [form, setForm] = useState({ user_email: "", user_password: "" });

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(form);
    props
      .login(form)
      .then((res) => {
        console.log(res.value.data.data.token);
        Cookie.set("token", res.value.data.data.token, {
          expires: 1,
          secure: true,
        });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="Login">
      <form className={`card ${styles.containerCard}`} onSubmit={handleLogin}>
        <h1>Login</h1>
        <hr />
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => {
              setForm({ ...form, user_email: event.target.value });
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(event) => {
              setForm({ ...form, user_password: event.target.value });
            }}
          />
        </div>
        <button type="submit" className={`${styles.btnCustom} btn`}>
          Submit
        </button>
      </form>
    </Layout>
  );
}

const mapDispatchToProps = { login };
export default connect(null, mapDispatchToProps)(Login);
