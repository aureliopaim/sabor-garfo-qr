
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rating, BeerRating } from '@/types';
import { mockRatings, mockBeerRatings, mockRestaurants } from '@/utils/mockData';

const RatingHistory = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [beerRatings, setBeerRatings] = useState<BeerRating[]>([]);
  const [activeTab, setActiveTab] = useState<'food' | 'beer'>('food');

  useEffect(() => {
    // Carregar dados do localStorage ou usar mock se não existirem
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

  // Renderizar ícones de avaliação baseados na nota
  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-gastro-orange' : 'text-gray-300'}`}>
          ★
        </span>
      ));
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
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gastro-brown">
                          {getRestaurantName(rating.restaurantId)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(rating.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Prato</p>
                        <div className="flex">{renderRatingStars(rating.dishRating)}</div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Atendimento</p>
                        <div className="flex">{renderRatingStars(rating.serviceRating)}</div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Limpeza</p>
                        <div className="flex">{renderRatingStars(rating.cleanlinessRating)}</div>
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
                    <div className="flex justify-between">
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
                      <div className="flex">
                        {renderRatingStars(beerRating.rating)}
                      </div>
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
