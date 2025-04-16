
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Restaurant, Rating, BeerRating } from '@/types';
import StarRating from './StarRating';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CRAFT_BEERS } from '@/utils/constants';
import { Image, Upload } from 'lucide-react';

interface RatingFormProps {
  restaurant: Restaurant;
}

const RatingForm: React.FC<RatingFormProps> = ({ restaurant }) => {
  const [dishRating, setDishRating] = useState(3);
  const [serviceRating, setServiceRating] = useState(3);
  const [cleanlinessRating, setCleanlinessRating] = useState(3);
  const [beerRating, setBeerRating] = useState(3);
  const [beerName, setBeerName] = useState<(typeof CRAFT_BEERS)[number]>(CRAFT_BEERS[0]);
  const [dishName, setDishName] = useState('');
  const [dishPhoto, setDishPhoto] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'food' | 'beer'>('food');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDishPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!dishName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome do prato obrigatório",
        description: "Por favor, informe o nome do prato avaliado."
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const rating: Rating = {
        id: Date.now().toString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id || '1',
        restaurantId: restaurant.id,
        dishName,
        dishPhoto,
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
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'food' | 'beer')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="food">Comida & Serviço</TabsTrigger>
            <TabsTrigger value="beer">Cerveja Artesanal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="food">
            <form onSubmit={handleFoodSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dishName">Nome do Prato</Label>
                  <Input
                    id="dishName"
                    placeholder="Ex: Feijoada, Risoto de Camarão"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto do Prato</Label>
                  <div className="flex items-center gap-4">
                    {dishPhoto ? (
                      <div className="relative w-24 h-24">
                        <img
                          src={dishPhoto}
                          alt={dishName}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute -top-2 -right-2"
                          onClick={() => setDishPhoto(undefined)}
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-24 w-24"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Upload className="h-6 w-6" />
                          <span className="text-xs">Upload</span>
                        </div>
                      </Button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dishRating">Avaliação do Prato</Label>
                  <StarRating value={dishRating} onChange={setDishRating} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceRating">Atendimento</Label>
                  <StarRating value={serviceRating} onChange={setServiceRating} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cleanlinessRating">Limpeza</Label>
                  <StarRating value={cleanlinessRating} onChange={setCleanlinessRating} />
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
                  <Label htmlFor="beerName">Cerveja Artesanal</Label>
                  <Select value={beerName} onValueChange={(value: (typeof CRAFT_BEERS)[number]) => setBeerName(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cerveja" />
                    </SelectTrigger>
                    <SelectContent>
                      {CRAFT_BEERS.map((beer) => (
                        <SelectItem key={beer} value={beer}>
                          {beer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="beerRating">Avaliação</Label>
                  <StarRating value={beerRating} onChange={setBeerRating} />
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
