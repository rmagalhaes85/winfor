import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../cursos/curso.service';
import { Curso } from '../cursos/curso';
import { MatrizCurricularService } from './matriz-curricular.service';
import { MatrizCurricular } from './matriz-curricular';
import { MatrizDisciplina } from './matriz-disciplina';

@Component({
  selector: 'app-exibir-matriz-curricular',
  imports: [CommonModule, FormsModule],
  templateUrl: './exibir-matriz-curricular.component.html',
  styleUrl: './exibir-matriz-curricular.component.css'
})
export class ExibirMatrizCurricularComponent implements OnInit {
  cursos: Curso[] = [];
  cursoSelecionado: Curso | null = null;
  matrizCurricular: MatrizCurricular | null = null;
  matrizDisciplinas: MatrizDisciplina[] = [];

  constructor(
    public cursoService: CursoService,
    public matrizCurricularService: MatrizCurricularService
  ) {}

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos(): void {
    this.cursoService.getCursos().subscribe(
      cursos => this.cursos = cursos.sort((a, b) => a.nome.localeCompare(b.nome))
    );
  }

  getMatrizCurricular(cursoId: number | undefined): void {
    if (!cursoId) {
      this.matrizCurricular = null;
      this.matrizDisciplinas = [];
      return;
    }
    this.matrizCurricularService.getMatrizCurricular(cursoId).subscribe(
      matrizCurricular => {
        this.matrizCurricular = matrizCurricular;
        this.getMatrizDisciplinas(matrizCurricular?.id);
      }

    );
  }

  getMatrizDisciplinas(matrizId: number | undefined): void {
    if (!matrizId) {
      this.matrizDisciplinas = [];
      return;
    }
    this.matrizCurricularService.getMatrizDisciplinas(matrizId).subscribe(
      matrizDisciplinas => this.matrizDisciplinas = matrizDisciplinas
    );
  }

  onCursoSelecionadoChange(): void {
    this.getMatrizCurricular(this.cursoSelecionado?.id);
  }

}
