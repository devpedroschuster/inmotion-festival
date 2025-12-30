import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import AdminPanel from './components/AdminPanel';
import styled from 'styled-components';
import ChoreographySection from './components/ChoreographySection'; 

const MainContent = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const AdminButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  border: 1px solid #ff4081;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  z-index: 9999;
  font-weight: bold;

  &:hover {
    background-color: #ff4081;
  }
`;

function App() {
  const [telaAtual, setTelaAtual] = useState('home');

  const toggleTela = () => {
    setTelaAtual(telaAtual === 'home' ? 'admin' : 'home');
  };

  return (
    <MainContent>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      
      <AdminButton onClick={toggleTela}>
        {telaAtual === 'home' ? 'Ver Admin 🔒' : 'Ver Site 🏠'}
      </AdminButton>

      {telaAtual === 'home' ? (
        <>
          <Header />
          <Hero />
          <Schedule />
          <ChoreographySection />
        </>
      ) : (
        <AdminPanel />
      )}

    </MainContent>
  );
}

export default App;