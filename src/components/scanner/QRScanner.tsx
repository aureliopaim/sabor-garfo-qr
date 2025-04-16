
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { isValidRestaurantCode } from '@/utils/validation';
import { mockRestaurants } from '@/utils/mockData';

interface QRScannerProps {
  onScanSuccess: (restaurantCode: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleScan = (data: { text: string } | null) => {
    if (data) {
      setScanning(false);
      
      // Verificar se o código QR é válido (para o nosso caso, um código de 6 dígitos)
      const scannedCode = data.text;
      if (isValidRestaurantCode(scannedCode)) {
        onScanSuccess(scannedCode);
      } else {
        toast({
          variant: "destructive",
          title: "Código QR inválido",
          description: "O código QR escaneado não é válido. Tente novamente."
        });
      }
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    toast({
      variant: "destructive",
      title: "Erro no scanner",
      description: "Houve um problema ao acessar a câmera. Verifique as permissões."
    });
    setScanning(false);
  };

  const handleManualSubmit = () => {
    if (isValidRestaurantCode(manualCode)) {
      // Verificar se o código existe em nossa "base de dados"
      const restaurant = mockRestaurants.find(r => r.code === manualCode);
      
      if (restaurant) {
        onScanSuccess(manualCode);
      } else {
        toast({
          variant: "destructive",
          title: "Código não encontrado",
          description: "O código informado não corresponde a nenhum restaurante."
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Código inválido",
        description: "Por favor, digite um código válido de 6 dígitos."
      });
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-center text-gastro-brown">
        Escanear Restaurante
      </h3>
      
      <Tabs defaultValue="qr">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="manual">Código Manual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="qr" className="space-y-4">
          {scanning ? (
            <div className="relative">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%', borderRadius: '0.5rem', overflow: 'hidden' }}
                constraints={{
                  audio: false,
                  video: { facingMode: "environment" }
                }}
              />
              <Button 
                variant="outline" 
                onClick={() => setScanning(false)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-64 h-64 bg-muted flex items-center justify-center rounded-lg border border-dashed border-muted-foreground">
                <p className="text-muted-foreground text-center px-4">
                  Clique no botão abaixo para ativar a câmera e escanear o QR Code do restaurante
                </p>
              </div>
              <Button 
                onClick={() => setScanning(true)}
                className="bg-gastro-orange hover:bg-gastro-darkBrown"
              >
                Iniciar Scanner
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manualCode">Código do Restaurante</Label>
            <Input
              id="manualCode"
              maxLength={6}
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.replace(/[^\d]/g, '').slice(0, 6))}
              placeholder="Digite o código de 6 dígitos"
            />
            <p className="text-xs text-muted-foreground">Informe o código de 6 dígitos do restaurante</p>
          </div>
          <Button 
            onClick={handleManualSubmit} 
            className="w-full bg-gastro-orange hover:bg-gastro-darkBrown"
            disabled={manualCode.length !== 6}
          >
            Confirmar
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default QRScanner;
