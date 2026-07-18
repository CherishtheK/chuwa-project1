import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AppLayout from "./components/layout/AppLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VendorRoute from "./components/auth/VendorRoute.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductListPage from "./pages/ProductListPage";
import ErrorPage from "./pages/ErrorPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreSession, setLoadingDone } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(restoreSession());
    } else {
      dispatch(setLoadingDone());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route element={<VendorRoute />}>
            <Route path="products/create" element={<ProductEditPage />} />
            <Route path="products/:id/edit" element={<ProductEditPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
