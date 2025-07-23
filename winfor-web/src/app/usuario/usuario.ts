export interface Usuario {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  role: string;
  // em condições reais, não transportaria a senha desta forma
  senha: string;
}

