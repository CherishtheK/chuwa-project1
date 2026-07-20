import { Component } from "react";
import ErrorPage from "../pages/ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          status="500"
          title={<h1>Oops, something went wrong!</h1>}
          subTitle="An unexpected error occurred. Please go back and try again."
          onGoHome={() => {
            window.location.href = "/";
          }}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
