
import React from 'react';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { Card, CardContent } from "@/components/ui/card";
import { CRAFT_BEERS } from '@/utils/constants';

interface BeerRatingSectionProps {
  selectedBeer: (typeof CRAFT_BEERS)[number] | null;
  beerRating: number;
  onBeerSelect: (beer: (typeof CRAFT_BEERS)[number]) => void;
  onBeerRatingChange: (rating: number) => void;
}

const BeerRatingSection: React.FC<BeerRatingSectionProps> = ({
  selectedBeer,
  beerRating,
  onBeerSelect,
  onBeerRatingChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {CRAFT_BEERS.map((beer) => (
          <Card 
            key={beer}
            className={`cursor-pointer transition-colors ${
              selectedBeer === beer ? 'border-gastro-orange' : ''
            }`}
            onClick={() => onBeerSelect(beer)}
          >
            <CardContent className="p-4">
              <h3 className="font-medium text-center">{beer}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBeer && (
        <div className="space-y-2 mt-6">
          <Label htmlFor="beerRating">Avaliação para {selectedBeer}</Label>
          <StarRating value={beerRating} onChange={onBeerRatingChange} />
        </div>
      )}
    </div>
  );
};

export default BeerRatingSection;
