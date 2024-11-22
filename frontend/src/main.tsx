import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
<<<<<<< HEAD
import DetailProduct from './pages/detailProduct'

=======
import './styles/global.css'
import LoginPage from './pages/login'
import Header from './components/layout/header'
import RegisterPage from './pages/register'
import ForgotPassWordPage from './pages/forgotpassword'
import HomePage from './pages/home'
import ProductDetailPage from './pages/detailProduct'
>>>>>>> 6e2ba8266659779c1180d89f1cad8c3648326116
const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Header
        isLogin={true}
      />
      <HomePage />
    </>
  },
  {
<<<<<<< HEAD
    path: "/product/:id",
    element: <>
      
      <DetailProduct />
    </>
  },
=======
    path: "/login",
    element:
      <>
        <Header
          isLogin={false}
        />
        <LoginPage />
      </>
  },
  {
    path: "/register",
    element: <>
      <Header
        isLogin={false}
      />
      <RegisterPage />
    </>

  },
  {
    path: "/forgot-password",
    element: <>
      <Header
        isLogin={false}
      />
      <ForgotPassWordPage />
    </>
  },
  {
    path: "/product/:id",
    element: <>
      <Header
        isLogin={true}
      />
      <ProductDetailPage />
    </>
  }
>>>>>>> 6e2ba8266659779c1180d89f1cad8c3648326116
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
