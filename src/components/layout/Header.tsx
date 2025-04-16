
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from '@/types';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        console.error('Erro ao carregar dados do usuário', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (location.pathname === '/login') return null;

  const getTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Circuito Gastronômico';
      case '/rating':
        return 'Avaliação';
      case '/history':
        return 'Histórico';
      default:
        return 'Circuito Gastronômico';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gastro-brown">{getTitle()}</h1>
        
        {currentUser && (
          <div className="flex items-center gap-2">
            <span className="text-sm hidden md:inline text-muted-foreground">
              {currentUser.loginType === 'cpf' ? 'CPF' : 'Tel'}: 
              <span className="font-medium ml-1">
                {currentUser.identifier.substring(0, 6)}...
              </span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
