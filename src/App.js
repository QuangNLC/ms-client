import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css';
import WebsiteLayout from "./layout/WebsiteLayout";
import WebHomePage from "./pages/website/WebHomePage";
import WebProductList from "./pages/website/WebProductList";
import WebContact from "./pages/website/WebContact";
import WebAboutUs from "./pages/website/WebAboutUs";
import Login from "./pages/website/Login";
import Register from "./pages/website/Register";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer/RootReducer";
import { createStore } from "redux";
import ProductDetail from "./components/Products/ProductDetail";
import ProductDetailPage from "./pages/website/WebProductDetail";
import Cart from "./components/Products/Cart";
import Webcart from "./pages/website/Webcart";
import AdminLayout from "./layout/AdminLayout";
import AdmDashboard from "./pages/admin/AdmDashboard";
import AdmUserList from "./pages/admin/AdmUserList";
import AdmNewUser from "./pages/admin/AdmNewUser";
import ProductList from "./components/Products/ProductList";
import AdmUserDetail from "./pages/admin/AdmUserDetail";
import WebLogin from "./pages/website/WebLogin";
import AdmMaterialList from "./pages/admin/AdmMaterialList";
import { data } from './data'
import WebMyOrders from "./pages/website/WebMyOrders";
import AdmOrderList from "./pages/admin/AdmOrderList";
import AdmNewProduct from "./pages/admin/AdmNewProduct";
import AdmCategoryList from "./pages/admin/AdmCategoryList";
import WebMessage from "./pages/website/WebMessage";
import AdmProductList from "./pages/admin/AdmProductList";
import WebRegister from "./pages/website/WebRegister";
import AdmEditProductDetails from "./pages/admin/AdmEditProductDetails";
import WebMyAccount from "./pages/website/WebMyAccount";
import WebChangePassword from "./pages/website/WebChangePassword";
import AdmMessage from "./pages/admin/AdmMessage";
import AdmBills from "./pages/admin/AdmBills";
import AdmOrderInfo from "./pages/admin/AdmOrderInfo";
import AdmWatingOrder from "./pages/admin/AdmWatingOrder";
import AdmPromotions from "./pages/admin/AdmPromotions";
import AdmNewPromotions from "./pages/admin/AdmNewPromotions";
import AdmUpdatePromotion from "./pages/admin/AdmUpdatePromotion";
import WebCartDetails from "./pages/website/WebCartDetails";
import WebTestProductList from "./pages/website/WebTestProductList";
import ProtectedAdminLayout from "./layout/ProtectedAdminLayout";
import WebAdmLogin from "./pages/website/WebAdmLogin";
import AdmMyAccount from "./pages/admin/AdmMyAccount";
import AdmChangePassword from "./pages/admin/AdmChangePassword";
import WebForgotPassword from "./pages/website/WebForgotPassword";
function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<WebHomePage />} />
            {/* <Route path="products" element={<ProductList data={data}/>} /> */}
            {/* <Route path="cart" element={<Cart />} /> */}
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="productdetail" element={<ProductDetail />} /> */}
            {/* <Route path="register" element={<Register />} /> */}

            <Route path="products" element={<WebProductList />} />
            <Route path="products/search=:searchText" element={<WebProductList />} />
            <Route path="cart" element={<Webcart />} />
            {/* <Route path="cart" element={<WebCartDetails />} /> */}
            <Route path="my-orders" element={<WebMyOrders />} />
            <Route path="my-account" element={<WebMyAccount />} />
            <Route path="change-password" element={<WebChangePassword />} />
            <Route path="about-us" element={<WebAboutUs />} />
            <Route path="contact" element={<WebContact />} />
            <Route path="/register" element={<WebRegister />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="login" element={<WebLogin />} />
            <Route path="forgot-password" element={<WebForgotPassword />} />
            <Route path="adm-login" element={<WebAdmLogin />} />
            <Route path="message" element={<WebMessage />} />
            <Route path="*" element={<div>Trang khong ton tai</div>} />
          </Route>
          <Route path="/admin" element={<ProtectedAdminLayout><AdminLayout /></ProtectedAdminLayout>}>
            <Route index element={<AdmDashboard />} />
            <Route path="user-list" element={<AdmUserList />} />
            <Route path="new-user" element={<AdmNewUser />} />
            <Route path="order-list" element={<AdmOrderList />} />
            <Route path="order/:id" element={<AdmOrderInfo />} />
            <Route path="category-list" element={<AdmCategoryList />} />
            <Route path="material-list" element={<AdmMaterialList />} />
            <Route path="product-list" element={<AdmProductList />} />
            <Route path="new-product" element={<AdmNewProduct />} />
            <Route path="edit-product/:productId" element={<AdmEditProductDetails />} />
            <Route path="user/:username" element={<AdmUserDetail />} />
            <Route path="message" element={<AdmMessage />} />
            <Route path="bills" element={<AdmBills />} />
            <Route path="promotions" element={<AdmPromotions />} />
            <Route path="promotion/new" element={<AdmNewPromotions />} />
            <Route path="promotion/detail/:id" element={<AdmUpdatePromotion />} />
            <Route path="my-account" element={<AdmMyAccount />} />
            <Route path="change-password" element={<AdmChangePassword />} />
            <Route path="*" element={<div>Trang khong ton tai</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
