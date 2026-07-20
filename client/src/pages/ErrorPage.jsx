import { Result, Button } from "antd";

import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      subTitle={<h1>Oops, something went wrong!</h1>}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
}

export default ErrorPage;
