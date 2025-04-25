
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { isValidRestaurantCode } from '@/utils/validation';
import { mockRestaurants } from '@/utils/mockData';
import { ScanQrCode, Code } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (restaurantCode: string) => void;
  mode?: 'combined';
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [activeMethod, setActiveMethod] = useState<'qr' | 'manual' | null>(null);
  const { toast } = useToast();

  const handleScan = (data: { text: string } | null) => {
    if (data) {
      setScanning(false);
      
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

  const resetSelection = () => {
    setActiveMethod(null);
    setScanning(false);
    setManualCode('');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        {!activeMethod ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-gastro-brown mb-6">
              Como você deseja informar o código do restaurante?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => setActiveMethod('qr')}
                className="h-auto py-8 flex flex-col gap-4 bg-gastro-cream hover:bg-gastro-cream/90"
              >
                <ScanQrCode className="h-12 w-12 text-gastro-brown" />
                <span className="text-gastro-brown font-medium">Escanear QR Code</span>
              </Button>
              <Button
                onClick={() => setActiveMethod('manual')}
                className="h-auto py-8 flex flex-col gap-4 bg-gastro-cream hover:bg-gastro-cream/90"
              >
                <Code className="h-12 w-12 text-gastro-brown" />
                <span className="text-gastro-brown font-medium">Digitar Código</span>
              </Button>
            </div>
          </div>
        ) : activeMethod === 'qr' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gastro-brown">Escaneie o QR Code</h3>
              <Button variant="outline" onClick={resetSelection}>Voltar</Button>
            </div>
            {scanning ? (
              <div className="relative w-full max-w-md mx-auto">
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
                <div className="w-full max-w-md h-48 bg-muted flex items-center justify-center rounded-lg border border-dashed border-muted-foreground">
                  <p className="text-muted-foreground text-center px-4">
                    Clique no botão abaixo para ativar a câmera
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
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gastro-brown">Digite o código do restaurante</h3>
              <Button variant="outline" onClick={resetSelection}>Voltar</Button>
            </div>
            <div className="max-w-md mx-auto space-y-4">
              <Input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.replace(/[^\d]/g, '').slice(0, 6))}
                placeholder="Digite o código de 6 dígitos"
                className="text-center text-xl tracking-wider"
                maxLength={6}
              />
              <p className="text-sm text-muted-foreground text-center">
                Informe o código de 6 dígitos disponível no restaurante
              </p>
              <Button 
                onClick={handleManualSubmit} 
                className="w-full bg-gastro-orange hover:bg-gastro-darkBrown"
                disabled={manualCode.length !== 6}
              >
                Confirmar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRScanner;
