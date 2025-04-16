
import React from 'react';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from '@/types';

interface ServiceRatingSectionProps {
  restaurant: Restaurant;
  dishRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  onDishRatingChange: (rating: number) => void;
  onServiceRatingChange: (rating: number) => void;
  onCleanlinessRatingChange: (rating: number) => void;
}

const ServiceRatingSection: React.FC<ServiceRatingSectionProps> = ({
  restaurant,
  dishRating,
  serviceRating,
  cleanlinessRating,
  onDishRatingChange,
  onServiceRatingChange,
  onCleanlinessRatingChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-muted/20">
        <h3 className="text-lg font-medium mb-2">{restaurant.fixedDish.name}</h3>
        <img 
          src={restaurant.fixedDish.photoUrl} 
          alt={restaurant.fixedDish.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="space-y-2">
          <Label htmlFor="dishRating">Avaliação do Prato</Label>
          <StarRating value={dishRating} onChange={onDishRatingChange} />
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceRating">Atendimento</Label>
            <StarRating value={serviceRating} onChange={onServiceRatingChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cleanlinessRating">Limpeza</Label>
            <StarRating value={cleanlinessRating} onChange={onCleanlinessRatingChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRatingSection;
