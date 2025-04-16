
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const StarRating = ({ value, onChange, className }: StarRatingProps) => {
  return (
    <div className={cn("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="hover:scale-110 transition-transform"
        >
          <Star
            className={cn(
              "w-8 h-8 transition-colors",
              star <= value
                ? "fill-gastro-orange stroke-gastro-orange"
                : "stroke-gastro-orange fill-transparent"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
