
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Restaurant, Rating, BeerRating } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceRatingSection from './ServiceRatingSection';
import BeerRatingSection from './BeerRatingSection';
import { CRAFT_BEERS } from '@/utils/constants';

interface RatingFormProps {
  restaurant: Restaurant;
}

const RatingForm: React.FC<RatingFormProps> = ({ restaurant }) => {
  const [dishRating, setDishRating] = useState(3);
  const [serviceRating, setServiceRating] = useState(3);
  const [cleanlinessRating, setCleanlinessRating] = useState(3);
  const [selectedBeer, setSelectedBeer] = useState<(typeof CRAFT_BEERS)[number] | null>(null);
  const [beerRating, setBeerRating] = useState(3);
  const [activeTab, setActiveTab] = useState<'food' | 'beer'>('food');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Make sure restaurant and restaurant.fixedDish are defined before accessing their properties
  if (!restaurant || !restaurant.fixedDish) {
    console.error("Restaurant or fixedDish data is missing", restaurant);
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl text-gastro-brown">
            Dados do restaurante não disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full bg-gastro-orange hover:bg-gastro-darkBrown"
            onClick={() => navigate('/home')}
          >
            Voltar para Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const rating: Rating = {
        id: Date.now().toString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id || '1',
        restaurantId: restaurant.id,
        dishName: restaurant.fixedDish.name,
        dishPhoto: restaurant.fixedDish.photoUrl,
        dishRating,
        serviceRating,
        cleanlinessRating,
        date: new Date().toISOString().split('T')[0]
      };

      const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
      localStorage.setItem('ratings', JSON.stringify([...ratings, rating]));

      setIsSubmitting(false);
      toast({
        title: 'Avaliação enviada!',
        description: `Obrigado por avaliar ${restaurant.name}!`,
      });
      navigate('/history');
    }, 1000);
  };

  const handleBeerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBeer) {
      toast({
        variant: "destructive",
        title: "Selecione uma cerveja",
        description: "Por favor, selecione uma cerveja para avaliar.",
      });
      return;
    }
    
    setIsSubmitting(true);

    setTimeout(() => {
      const beerRatingObj: BeerRating = {
        id: Date.now().toString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id || '1',
        restaurantId: restaurant.id,
        beerName: selectedBeer,
        rating: beerRating,
        date: new Date().toISOString().split('T')[0]
      };

      const beerRatings = JSON.parse(localStorage.getItem('beerRatings') || '[]');
      localStorage.setItem('beerRatings', JSON.stringify([...beerRatings, beerRatingObj]));

      setIsSubmitting(false);
      toast({
        title: 'Avaliação de cerveja enviada!',
        description: `Obrigado por avaliar a cerveja ${selectedBeer}!`,
      });
      navigate('/history');
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl text-gastro-brown">
          Avaliar {restaurant.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'food' | 'beer')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="food">Comida & Serviço</TabsTrigger>
            <TabsTrigger value="beer">Cerveja Artesanal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="food">
            <form onSubmit={handleFoodSubmit} className="space-y-6">
              <ServiceRatingSection
                restaurant={restaurant}
                dishRating={dishRating}
                serviceRating={serviceRating}
                cleanlinessRating={cleanlinessRating}
                onDishRatingChange={setDishRating}
                onServiceRatingChange={setServiceRating}
                onCleanlinessRatingChange={setCleanlinessRating}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gastro-orange hover:bg-gastro-darkBrown"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="beer">
            <form onSubmit={handleBeerSubmit} className="space-y-6">
              <BeerRatingSection
                selectedBeer={selectedBeer}
                beerRating={beerRating}
                onBeerSelect={setSelectedBeer}
                onBeerRatingChange={setBeerRating}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gastro-orange hover:bg-gastro-darkBrown"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Avaliar Cerveja"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RatingForm;
