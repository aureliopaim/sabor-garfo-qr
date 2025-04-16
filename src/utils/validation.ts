
// Função para validar CPF (implementação simplificada)
export const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  
  if (cleanCPF.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
  // Em uma implementação real, teria a validação completa dos dígitos verificadores
  return true;
};

// Função para validar número de telefone brasileiro
export const isValidBrazilianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  
  // Formato: (DDD) 9xxxx-xxxx
  if (cleanPhone.length !== 11) return false;
  
  // Verificar se o primeiro dígito após DDD é 9
  if (cleanPhone[2] !== '9') return false;
  
  return true;
};

// Função para validar código de 6 dígitos
export const isValidRestaurantCode = (code: string): boolean => {
  return /^\d{6}$/.test(code);
};
