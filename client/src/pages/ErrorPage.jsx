import { Result, Button } from "antd";

import { useNavigate } from "react-router-dom";

function ErrorPage({
  status = "404",
  title = <h1>Oops, something went wrong!</h1>,
  subTitle = "The page you're looking for doesn't exist.",
}) {
  const navigate = useNavigate();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
}

export default ErrorPage;
