import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Inicio } from './Inicio';
import { Login } from './Login';
import { MenuAdmin } from './MenuAdmin';
import { ErrorPage } from './ErrorPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/menu' element={<MenuAdmin  />} />
        <Route path='/error-403' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App