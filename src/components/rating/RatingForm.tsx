
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Restaurant, Rating, BeerRating } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from "@/components/ui/separator";
import ServiceRatingSection from './ServiceRatingSection';
import BeerRatingSection from './BeerRatingSection';
import { CRAFT_BEERS } from '@/utils/constants';

interface RatingFormProps {
  restaurant: Restaurant;
}

const RatingForm: React.FC<RatingFormProps> = ({ restaurant }) => {
  const [serviceRating, setServiceRating] = useState(3);
  const [cleanlinessRating, setCleanlinessRating] = useState(3);
  const [beerRating, setBeerRating] = useState(3);
  const [beerName, setBeerName] = useState<(typeof CRAFT_BEERS)[number]>(CRAFT_BEERS[0]);
  const [activeTab, setActiveTab] = useState<'food' | 'beer'>('food');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
        dishRating: 5,
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
    setIsSubmitting(true);

    setTimeout(() => {
      const beerRatingObj: BeerRating = {
        id: Date.now().toString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id || '1',
        restaurantId: restaurant.id,
        beerName,
        rating: beerRating,
        date: new Date().toISOString().split('T')[0]
      };

      const beerRatings = JSON.parse(localStorage.getItem('beerRatings') || '[]');
      localStorage.setItem('beerRatings', JSON.stringify([...beerRatings, beerRatingObj]));

      setIsSubmitting(false);
      toast({
        title: 'Avaliação de cerveja enviada!',
        description: `Obrigado por avaliar a cerveja ${beerName}!`,
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
        <div className="border rounded-lg p-4 bg-muted/20 mb-6">
          <h3 className="text-lg font-medium mb-2">{restaurant.fixedDish.name}</h3>
          <img 
            src={restaurant.fixedDish.photoUrl} 
            alt={restaurant.fixedDish.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'food' | 'beer')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="food">Comida & Serviço</TabsTrigger>
            <TabsTrigger value="beer">Cerveja Artesanal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="food">
            <form onSubmit={handleFoodSubmit} className="space-y-6">
              <ServiceRatingSection
                serviceRating={serviceRating}
                cleanlinessRating={cleanlinessRating}
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
                beerName={beerName}
                beerRating={beerRating}
                onBeerNameChange={setBeerName}
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
