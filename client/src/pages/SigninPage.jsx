import AuthForm from "../components/auth/AuthForm";
import { Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice.js";

function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      message.success("Successfully logged in!");
      navigate("/");
    } else {
      message.error(result.payload || "Sign in failed");
    }
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      inputType: "email",
      rules: [
        { required: true, message: "Please input your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
    },
    {
      name: "password",
      label: "Password",
      inputType: "password",
      rules: [{ required: true, message: "Please input your password" }],
    },
    {
      name: "isVendor",
      label: "Sign in as vendor",
      inputType: "switch",
      rules: [],
    },
  ];

  return (
    <Card style={{ width: 500, margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Sign in to your account</h1>
      <AuthForm
        fields={fields}
        onFinish={onFinish}
        submitButtonText="Sign in"
      />
      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </Card>
  );
}

export default SigninPage;
