
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gastro-cream">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gastro-orange mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gastro-brown mb-4">Página não encontrada</h2>
        <p className="mb-6 text-muted-foreground">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="bg-gastro-orange hover:bg-gastro-darkBrown"
        >
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
