// admin/routes/AdminRoutes.jsx
import { Routes, Route} from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AdminLogin from "../pages/Login";
import EditProduct from "../pages/EditProduct";
import CreateProduct from "../pages/CreateProduct";
import Orders from "../pages/Orders";
import UpdateOrder from "../pages/UpdateOrder";
import CancelOrder from "../pages/CancelOrder";
import CancellationReason from "../pages/CancellationReason";
import OrderDetail from "../pages/OrderDetail";
import Users from "../pages/Users";
import UpdateUser from "../pages/UpdateUser";
import CreateUser from "../pages/CreateUser";
import BulkOrders from "../pages/BulkOrder";
import EditBulkOrder from "../pages/EditBulkOrder";
import BulkOrderDetail from "../pages/BulkOrderDetail";
import Invoice from "../pages/OrderInvoice";
import CreateCategory from "../pages/CreateCategory";
import EditCategory from "../pages/EditCategory";
import CategoryList from "../pages/Categorylist";
//import Signup from "../pages/Register";


const AdminRoutes = () => {
 

  return (
    <Routes>
         <Route path="/" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
<Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
         <Route path="orders/:id/update" element={<UpdateOrder />} />
         <Route path="/admin/orders/:id/cancel" element={<CancelOrder />} />
<Route path="/admin/orders/:id/cancel-reason" element={<CancellationReason />} />
<Route path="/admin/orders/:id" element={<OrderDetail />} />
<Route path="/admin/orders/:id/update" element={<UpdateOrder />} />
<Route path="/admin/orders/bulk" element={<BulkOrders />} />
<Route path="/admin/bulk-orders/:id" element={<BulkOrderDetail />} />
<Route path="/admin/bulk-orders/:id/edit" element={<EditBulkOrder />} />


{/* <Route path="/admin/orders/:id/cancel" element={<CancelOrder />} /> */}
<Route path="/admin/users" element={<Users />} />
<Route path="/admin/users/create" element={<CreateUser />} />
<Route path="/admin/users/:id/update" element={<UpdateUser />} />
<Route path="/admin/invoice/:id" element={<Invoice />} />
<Route path="/admin/categories" element={<CategoryList />} />
<Route path="/admin/categories/create" element={<CreateCategory />} />
<Route path="/admin/categories/:id/edit" element={<EditCategory />} />
   




      </Route>


      

    </Routes>
  );
};

export default AdminRoutes;
