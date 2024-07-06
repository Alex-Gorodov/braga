import { HistoryRouter } from "../history-route/history-route";
import { ProductPage } from "../../pages/product/product-page";
import { PageNotFound } from "../../pages/page-not-found/page-not-found";
import PrivateRoute from "../private-route/private-route";
import { AdminPage } from "../../pages/admin/admin-page";
import { HomePage } from "../../pages/home/home-page";
import { BlogPage } from "../../pages/blog/blog-page";
import { ShopPage } from "../../pages/shop/shop-page";
import { CartPage } from "../../pages/cart/cart-page";
import { UserPage } from "../../pages/user/user-page";
import { HelmetProvider } from "react-helmet-async";
import browserHistory from "../../browser-history";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "../../const";
import { Provider } from "react-redux";
import { store } from "../../store";
import { PostPage } from "../../pages/post/post-page";

export function App() {

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory} basename="/">
        <Provider store={store}>
          <Routes>
            <Route path={AppRoute.Root} element={<HomePage/>}/>
            <Route path={AppRoute.Shop} element={<ShopPage/>}/>
            <Route path={AppRoute.Cart} element={<CartPage/>}/>
            <Route path={AppRoute.Blog} element={<BlogPage/>}/>
            <Route path={AppRoute.ProductPage} element={<ProductPage/>}/>
            <Route path={AppRoute.PostPage} element={<PostPage/>}/>
            <Route path={AppRoute.UserPage} element={<PrivateRoute element={<UserPage />} />}/>
            <Route path={AppRoute.AdminPage} element={<PrivateRoute element={<AdminPage />} isAdminRoute />} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
