import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AppLayout from "./components/layout/AppLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductListPage from "./pages/ProductListPage";
import ErrorPage from "./pages/ErrorPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(
      setUser({
        token: "token",
        currentUser: {
          id: 1,
          email: "test@gmail.com",
          role: "vender",
        },
      }),
    );
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ProductListPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route
            element={
              <div>
                under vendor auth {user?.currentUser?.role}
                <Outlet />
              </div>
            }
          >
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
