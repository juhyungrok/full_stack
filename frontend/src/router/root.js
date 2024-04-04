import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Mainpage = lazy(() => import("../pages/MainPage"));
const Loading = <div>Loading....</div>;
const Category = lazy(() => import("../pages/categories/CategoryPage.js"));
const ProductDetail = lazy(() => import("../pages/ProductDetailsPage.js"));
const Cart = lazy(() => import("../pages/cart/CartPage.js"));
const Order = lazy(() => import("../pages/order/OrderPage.js"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Mainpage />
      </Suspense>
    ),
  },
  {
    path: "/category/:id",
    element: (
      <Suspense fallback={Loading}>
        <Category />
      </Suspense>
    ),
  },
  {
    path: "/details/:productId",
    element: (
      <Suspense fallback={Loading}>
        <ProductDetail />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={Loading}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "/success",
    element: (
      <Suspense fallback={Loading}>
        <Order />
      </Suspense>
    ),
  },
]);
export default root;
