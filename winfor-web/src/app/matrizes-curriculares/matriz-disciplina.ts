import { Disciplina } from './disciplina';

export interface MatrizDisciplina {
  id: number;
  semestre: number;
  tipo: string;
  disciplina: Disciplina;
}
