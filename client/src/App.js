import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddProduct from './components/AddProduct';
import Products from './pages/Products';
import SideBar from './components/category/SideBar';

function App() {
  return (
    <div className="App container mx-auto mt-6">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SideBar />} />
          <Route path='/product' element={<Products />} />
          <Route path='/create-new-product' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
