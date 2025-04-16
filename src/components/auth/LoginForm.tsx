
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { isValidCPF, isValidBrazilianPhone } from '@/utils/validation';
import { User } from '@/types';
import InputMask from 'react-input-mask';
import { mockUsers } from '@/utils/mockData';

const LoginForm = () => {
  const [loginType, setLoginType] = useState<'cpf' | 'phone'>('cpf');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação do CPF ou telefone
    let isValid = false;
    if (loginType === 'cpf') {
      isValid = isValidCPF(identifier);
    } else {
      isValid = isValidBrazilianPhone(identifier);
    }

    if (!isValid) {
      toast({
        variant: "destructive",
        title: `${loginType === 'cpf' ? 'CPF' : 'Telefone'} inválido`,
        description: `Por favor, insira um ${loginType === 'cpf' ? 'CPF' : 'telefone'} válido.`
      });
      setIsLoading(false);
      return;
    }

    // Simulação de login
    setTimeout(() => {
      // Mock de autenticação
      const user: User = {
        id: '1', // normalmente gerado pelo backend
        loginType,
        identifier
      };
      
      // Armazenar usuário no localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Circuito Gastronômico."
      });
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gastro-brown">Circuito Gastronômico</h2>
      
      <Tabs defaultValue="cpf" onValueChange={(value) => setLoginType(value as 'cpf' | 'phone')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="cpf">CPF</TabsTrigger>
          <TabsTrigger value="phone">Telefone</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <TabsContent value="cpf">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <InputMask
                mask="999.999.999-99"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              >
                {/* @ts-ignore */}
                {(inputProps) => <Input id="cpf" placeholder="123.456.789-00" required {...inputProps} />}
              </InputMask>
              <p className="text-xs text-muted-foreground">Digite seu CPF com 11 dígitos</p>
            </div>
          </TabsContent>
          
          <TabsContent value="phone">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <InputMask
                mask="(99) 99999-9999"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              >
                {/* @ts-ignore */}
                {(inputProps) => <Input id="phone" placeholder="(11) 99999-9999" required {...inputProps} />}
              </InputMask>
              <p className="text-xs text-muted-foreground">Digite seu número de celular com DDD</p>
            </div>
          </TabsContent>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gastro-orange hover:bg-gastro-darkBrown" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
          
          <p className="text-sm text-center mt-4 text-muted-foreground">
            Ainda não tem conta? <a href="#" className="text-gastro-green hover:text-gastro-darkBrown">Cadastre-se</a>
          </p>
        </form>
      </Tabs>
    </div>
  );
};

export default LoginForm;
