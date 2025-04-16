
import React from 'react';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { Separator } from "@/components/ui/separator";

interface ServiceRatingSectionProps {
  serviceRating: number;
  cleanlinessRating: number;
  onServiceRatingChange: (rating: number) => void;
  onCleanlinessRatingChange: (rating: number) => void;
}

const ServiceRatingSection: React.FC<ServiceRatingSectionProps> = ({
  serviceRating,
  cleanlinessRating,
  onServiceRatingChange,
  onCleanlinessRatingChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="serviceRating">Atendimento</Label>
        <StarRating value={serviceRating} onChange={onServiceRatingChange} />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Label htmlFor="cleanlinessRating">Limpeza</Label>
        <StarRating value={cleanlinessRating} onChange={onCleanlinessRatingChange} />
      </div>
    </div>
  );
};

export default ServiceRatingSection;
