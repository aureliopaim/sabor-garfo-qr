
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingForm from '@/components/rating/RatingForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Restaurant } from '@/types';

const RatingPage = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está logado
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Carregar dados do restaurante atual
    const currentRestaurantStr = localStorage.getItem('currentRestaurant');
    if (!currentRestaurantStr) {
      console.error('No restaurant data found in localStorage');
      navigate('/home');
      return;
    }

    try {
      const currentRestaurant = JSON.parse(currentRestaurantStr);
      console.log('Loaded restaurant data:', currentRestaurant);
      
      // Ensure the restaurant has all required properties
      if (!currentRestaurant || !currentRestaurant.id || !currentRestaurant.fixedDish) {
        console.error('Invalid restaurant data format:', currentRestaurant);
        navigate('/home');
        return;
      }
      
      setRestaurant(currentRestaurant);
      setLoading(false);
    } catch (e) {
      console.error('Erro ao carregar dados do restaurante', e);
      navigate('/home');
    }
  }, [navigate]);

  if (loading || !restaurant) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-gastro-brown" 
              onClick={() => navigate('/home')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
            </Button>
          </div>
          
          <RatingForm restaurant={restaurant} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RatingPage;
