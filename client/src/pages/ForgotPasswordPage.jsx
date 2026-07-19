import AuthForm from "../components/auth/AuthForm";
import { Card, message } from "antd";
import { forgotPassword } from "../api/auth";
import { useState } from "react";

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const onFinish = async (values) => {
    try {
      const data = await forgotPassword(values);
      setSent(true);
      message.success(data.message);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed");
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
  ];

  if (sent) {
    return (
      <Card style={{ width: 400, margin: "40px auto", textAlign: "center" }}>
        <p>
          We have sent the update password link to your email, please check
          that!
        </p>
      </Card>
    );
  }

  return (
    <Card style={{ width: 500, margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Update your password</h1>
      <p style={{ textAlign: "center" }}>
        Enter your email, we will send you the recovery link
      </p>
      <AuthForm
        fields={fields}
        onFinish={onFinish}
        submitButtonText="Update password"
      />
    </Card>
  );
}
export default ForgotPasswordPage;
