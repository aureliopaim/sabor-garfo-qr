
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '@/components/scanner/QRScanner';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';
import { mockRestaurants } from '@/utils/mockData';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [navigate]);

  const handleScanSuccess = (restaurantCode: string) => {
    const restaurant = mockRestaurants.find(r => r.code === restaurantCode);
    
    if (restaurant) {
      localStorage.setItem('currentRestaurant', JSON.stringify(restaurant));
      
      toast({
        title: "Restaurante encontrado!",
        description: `Você está avaliando: ${restaurant.name}`
      });
      
      navigate('/rating');
    } else {
      toast({
        variant: "destructive",
        title: "Restaurante não encontrado",
        description: "O código informado não corresponde a nenhum restaurante registrado."
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container p-4">
        <div className="max-w-md mx-auto space-y-6">
          <section className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gastro-brown mb-2">Bem-vindo ao Circuito Gastronômico</h2>
          </section>
          
          <section>
            <QRScanner onScanSuccess={handleScanSuccess} mode="combined" />
          </section>
          
          <section className="bg-muted/40 p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gastro-brown">Como avaliar:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Escaneie o QR Code disponível no restaurante</li>
              <li>Ou digite o código de 6 dígitos informado pelo estabelecimento</li>
              <li>Avalie o prato, atendimento e limpeza</li>
              <li>Se experimentou uma cerveja artesanal, avalie também!</li>
            </ol>
          </section>
          
          <Button 
            className="w-full bg-gastro-green hover:bg-gastro-darkBrown"
            onClick={() => navigate('/history')}
          >
            Ver Meu Histórico de Avaliações
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
