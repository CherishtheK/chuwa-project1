import { Form, Input, Button, Switch } from "antd";

const AuthForm = ({ fields, onFinish, submitButtonText }) => {
  return (
    <Form name="auth-form" onFinish={onFinish} layout="vertical">
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          valuePropName={field.inputType === "switch" ? "checked" : "value"}
        >
          {field.inputType === "switch" ? (
            <Switch />
          ) : field.inputType === "password" ? (
            <Input.Password placeholder={field.label} />
          ) : (
            <Input type={field.inputType} placeholder={field.label} />
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
