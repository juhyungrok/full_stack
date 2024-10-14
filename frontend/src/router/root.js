// root.js
import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SuccessPage } from "../toss/SuccessPage.js";
import { FailPage } from "../toss/FailPage.js";
import AdminLayout from "../pages/admin/AdminLayout.js";

const Mainpage = lazy(() => import("../pages/MainPage"));
const Category = lazy(() => import("../pages/categories/CategoryPage.js"));
const ProductDetail = lazy(() => import("../pages/ProductDetailsPage.js"));
const Admin = lazy(() => import("../pages/admin/AdminPage.js"));
const Cart = lazy(() => import("../pages/cart/CartPage.js"));

const AdminDetail = lazy(() =>
  import("../pages/admin/AdminOrderDetailPage.js")
);
const Salescompare = lazy(() =>
  import("../pages/admin/sales/SalesComparison.js")
);
const Loading = <div>Loading....</div>;

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
    element: <SuccessPage />,
  },
  {
    path: "/fail",
    element: <FailPage />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loading}>
            <Admin />
          </Suspense>
        ),
      },
      {
        path: ":orderId",
        element: (
          <Suspense fallback={Loading}>
            <AdminDetail />
          </Suspense>
        ),
      },
      {
        path: "sales-comparison",
        element: (
          <Suspense fallback={Loading}>
            <Salescompare />
          </Suspense>
        ),
      },
    ],
  },
]);

export default root;
