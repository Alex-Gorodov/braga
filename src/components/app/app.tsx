import browserHistory from "../../browser-history";
import { HistoryRouter } from "../history-route/history-route";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { store } from "../../store";
import { AppRoute } from "../../const";
import { HomePage } from "../../pages/home/home-page";
import { NotFound } from "../../pages/not-found/not-found";
import { Provider } from "react-redux";
import { BlogPage } from "../../pages/blog/blog-page";
import { ShopPage } from "../../pages/shop/shop-page";
import { ProductPage } from "../../pages/product/product-page";
import { CartPage } from "../../pages/cart/cart-page";

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
            <Route path={AppRoute.Blog} element={<BlogPage/>}/>
            <Route path={AppRoute.ProductPage} element={<ProductPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
