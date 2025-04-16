
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Restaurant, Rating, BeerRating } from '@/types';

interface RatingFormProps {
  restaurant: Restaurant;
}

const RatingForm: React.FC<RatingFormProps> = ({ restaurant }) => {
  // Estados para as avaliações
  const [dishRating, setDishRating] = useState(3);
  const [serviceRating, setServiceRating] = useState(3);
  const [cleanlinessRating, setCleanlinessRating] = useState(3);
  const [beerRating, setBeerRating] = useState(3);
  const [beerName, setBeerName] = useState('');
  const [activeTab, setActiveTab] = useState<'food' | 'beer'>('food');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio da avaliação
    setTimeout(() => {
      // Em uma aplicação real, isso seria enviado ao backend
      const rating: Rating = {
        id: Date.now().toString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id || '1',
        restaurantId: restaurant.id,
        dishRating,
        serviceRating,
        cleanlinessRating,
        date: new Date().toISOString().split('T')[0]
      };

      // Armazenar avaliação no localStorage (mock de persistência)
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

    // Validação do nome da cerveja
    if (!beerName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome da cerveja obrigatório",
        description: "Por favor, informe o nome da cerveja avaliada."
      });
      setIsSubmitting(false);
      return;
    }

    // Simular envio da avaliação de cerveja
    setTimeout(() => {
      // Em uma aplicação real, isso seria enviado ao backend
      const beerRatingObj: BeerRating = {
        id: Date.now().toString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id || '1',
        restaurantId: restaurant.id,
        beerName,
        rating: beerRating,
        date: new Date().toISOString().split('T')[0]
      };

      // Armazenar avaliação no localStorage (mock de persistência)
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
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'food' | 'beer')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="food">Comida & Serviço</TabsTrigger>
            <TabsTrigger value="beer">Cerveja Artesanal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="food">
            <form onSubmit={handleFoodSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="dishRating">Prato {dishRating}/5</Label>
                    <span className="text-xl">{['😕', '🙂', '😀', '😋', '🤩'][dishRating-1]}</span>
                  </div>
                  <Slider
                    id="dishRating"
                    min={1}
                    max={5}
                    step={1}
                    value={[dishRating]}
                    onValueChange={(value) => setDishRating(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="serviceRating">Atendimento {serviceRating}/5</Label>
                    <span className="text-xl">{['😕', '🙂', '😀', '😋', '🤩'][serviceRating-1]}</span>
                  </div>
                  <Slider
                    id="serviceRating"
                    min={1}
                    max={5}
                    step={1}
                    value={[serviceRating]}
                    onValueChange={(value) => setServiceRating(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="cleanlinessRating">Limpeza {cleanlinessRating}/5</Label>
                    <span className="text-xl">{['😕', '🙂', '😀', '😋', '🤩'][cleanlinessRating-1]}</span>
                  </div>
                  <Slider
                    id="cleanlinessRating"
                    min={1}
                    max={5}
                    step={1}
                    value={[cleanlinessRating]}
                    onValueChange={(value) => setCleanlinessRating(value[0])}
                  />
                </div>
              </div>
              
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="beerName">Nome da Cerveja Artesanal</Label>
                  <Input
                    id="beerName"
                    placeholder="Ex: IPA Dourada, Stout Chocolate"
                    value={beerName}
                    onChange={(e) => setBeerName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="beerRating">Avaliação {beerRating}/5</Label>
                    <span className="text-xl">{['😕', '🙂', '😀', '😋', '🤩'][beerRating-1]}</span>
                  </div>
                  <Slider
                    id="beerRating"
                    min={1}
                    max={5}
                    step={1}
                    value={[beerRating]}
                    onValueChange={(value) => setBeerRating(value[0])}
                  />
                </div>
              </div>
              
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
