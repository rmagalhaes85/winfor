import { MatrizDisciplina } from './matriz-disciplina';

export interface MatrizCurricular {
  id: number;
  cursoId: number;
  disciplinas: MatrizDisciplina[] | null;
}
