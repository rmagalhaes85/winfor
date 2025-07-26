import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '.';
import { ModalService } from '../shared/modal/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  editarUsuarioForm: FormGroup;
  @Input() userId: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.editarUsuarioForm = this.fb.group({
      id: [{value: '', disabled: true}],
      username: [{value: '', disabled: true}],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      role: [''],
      senha: [''],
    });
  }

  ngOnInit() {
    if (this.userId === '') return;
    this.usuarioService.getUsuario(this.userId).subscribe({
      next: usuario => {
        this.editarUsuarioForm.patchValue(usuario);
      },
      error: err => {
        console.error({err});
        this.modalService.showModal(err.message);
      }
    });
  }

  get nome() { return this.editarUsuarioForm.get('nome'); }
  get sobrenome() { return this.editarUsuarioForm.get('sobrenome'); }
  get email() { return this.editarUsuarioForm.get('email'); }

  onSubmit() {
    if (this.editarUsuarioForm.valid) {
      this.usuarioService.updateUsuario({id: this.userId, ...this.editarUsuarioForm.value})
        .subscribe({
          next: usuario => {
            this.router.navigate(['/usuarios']);
            console.log(`Alterações gravadas com sucesso: ${usuario}`);
          },
          error: err => { this.modalService.showModal(err.message); }
        });
    } else {
      this.editarUsuarioForm.markAllAsTouched();
    }
  }
}
