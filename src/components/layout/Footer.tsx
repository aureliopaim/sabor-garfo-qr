
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, History, QrCode } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/login') return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <div className="container flex items-center justify-around py-2">
        <Button
          variant={location.pathname === '/home' ? "default" : "ghost"}
          className={
            location.pathname === '/home' 
              ? "bg-gastro-orange hover:bg-gastro-darkBrown" 
              : ""
          }
          onClick={() => navigate('/home')}
        >
          <Home className="w-5 h-5 mr-1" />
          <span className="text-xs">Início</span>
        </Button>
        
        <Button
          variant={location.pathname.includes('/rating') ? "default" : "ghost"}
          className={
            location.pathname.includes('/rating')
              ? "bg-gastro-orange hover:bg-gastro-darkBrown" 
              : ""
          }
          onClick={() => navigate('/home')}
        >
          <QrCode className="w-5 h-5 mr-1" />
          <span className="text-xs">Avaliar</span>
        </Button>
        
        <Button
          variant={location.pathname === '/history' ? "default" : "ghost"}
          className={
            location.pathname === '/history'
              ? "bg-gastro-orange hover:bg-gastro-darkBrown" 
              : ""
          }
          onClick={() => navigate('/history')}
        >
          <History className="w-5 h-5 mr-1" />
          <span className="text-xs">Histórico</span>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
