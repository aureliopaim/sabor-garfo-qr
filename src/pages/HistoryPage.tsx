
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingHistory from '@/components/history/RatingHistory';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está logado
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container p-4">
        <div className="max-w-md mx-auto">
          <RatingHistory />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HistoryPage;
