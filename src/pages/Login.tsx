
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário já está logado
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gastro-cream p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gastro-darkBrown mb-2">Circuito Gastronômico</h1>
          <p className="text-gastro-brown">Avalie os melhores restaurantes e cervejas artesanais</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
