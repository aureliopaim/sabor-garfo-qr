import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gastro-cream">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gastro-brown">Circuito Gastronômico</h1>
        <p className="text-xl text-gastro-brown">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
