import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star } from 'lucide-react';
import { Rating, BeerRating } from '@/types';
import { mockRatings, mockBeerRatings, mockRestaurants } from '@/utils/mockData';

const RatingHistory = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [beerRatings, setBeerRatings] = useState<BeerRating[]>([]);
  const [activeTab, setActiveTab] = useState<'food' | 'beer'>('food');

  useEffect(() => {
    const storedRatings = localStorage.getItem('ratings');
    const storedBeerRatings = localStorage.getItem('beerRatings');
    
    setRatings(storedRatings ? JSON.parse(storedRatings) : mockRatings);
    setBeerRatings(storedBeerRatings ? JSON.parse(storedBeerRatings) : mockBeerRatings);
  }, []);

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = mockRestaurants.find(r => r.id === restaurantId);
    return restaurant ? restaurant.name : 'Restaurante';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array(5).fill(0).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-gastro-orange stroke-gastro-orange" : "stroke-gastro-orange fill-transparent"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl text-gastro-brown">
          Histórico de Avaliações
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'food' | 'beer')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="food">Comida & Serviço</TabsTrigger>
            <TabsTrigger value="beer">Cervejas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="food">
            {ratings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Você ainda não fez nenhuma avaliação.
              </p>
            ) : (
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div 
                    key={rating.id} 
                    className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      {rating.dishPhoto && (
                        <img
                          src={rating.dishPhoto}
                          alt={rating.dishName}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gastro-brown">
                          {rating.dishName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getRestaurantName(rating.restaurantId)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(rating.date)}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Prato</p>
                            {renderRatingStars(rating.dishRating)}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Atendimento</p>
                            {renderRatingStars(rating.serviceRating)}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Limpeza</p>
                            {renderRatingStars(rating.cleanlinessRating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="beer">
            {beerRatings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Você ainda não avaliou nenhuma cerveja artesanal.
              </p>
            ) : (
              <div className="space-y-4">
                {beerRatings.map((beerRating) => (
                  <div 
                    key={beerRating.id} 
                    className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gastro-brown">
                          {beerRating.beerName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getRestaurantName(beerRating.restaurantId)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(beerRating.date)}
                        </p>
                      </div>
                      {renderRatingStars(beerRating.rating)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RatingHistory;
