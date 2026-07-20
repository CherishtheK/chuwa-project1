import AuthForm from "../components/auth/AuthForm";
import { Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/auth/authSlice.js";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const result = await dispatch(signupUser(values));
    if (signupUser.fulfilled.match(result)) {
      message.success("Account created!");
      navigate("/");
    } else {
      message.error(result.payload || "Sign up failed");
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
      rules: [
        { required: true, message: "Please input your password" },
        { min: 6, message: "Password must be at least 6 characters" },
      ],
    },
    {
      name: "isVendor",
      label: "Register as vendor",
      inputType: "switch",
      rules: [],
    },
  ];

  return (
    <div className="flex-1 flex justify-center items-center">
      <Card style={{ width: "100%", maxWidth: "500px", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
          Sign up an account
        </h1>
        <AuthForm
          fields={fields}
          onFinish={onFinish}
          submitButtonText="Create account"
        />
        <p style={{ textAlign: "center" }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}

export default SignupPage;
