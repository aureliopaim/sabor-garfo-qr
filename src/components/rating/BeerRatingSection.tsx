
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StarRating from './StarRating';
import { CRAFT_BEERS } from '@/utils/constants';

interface BeerRatingSectionProps {
  beerName: (typeof CRAFT_BEERS)[number];
  beerRating: number;
  onBeerNameChange: (value: (typeof CRAFT_BEERS)[number]) => void;
  onBeerRatingChange: (rating: number) => void;
}

const BeerRatingSection: React.FC<BeerRatingSectionProps> = ({
  beerName,
  beerRating,
  onBeerNameChange,
  onBeerRatingChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="beerName">Cerveja Artesanal</Label>
        <Select value={beerName} onValueChange={onBeerNameChange}>
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
        <StarRating value={beerRating} onChange={onBeerRatingChange} />
      </div>
    </div>
  );
};

export default BeerRatingSection;
