import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario, UsuarioService } from '.';

import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'app-criar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {
  criarUsuarioForm = new FormGroup({
    username: new FormControl('', [
      Validators.required, Validators.minLength(5), Validators.maxLength(25)
    ])
  });

  constructor(
    private usuarioService: UsuarioService,
    private modalService: ModalService,
    private router: Router,
  ) { }

  get username() { return this.criarUsuarioForm.get('username'); }

  onSubmit() {
    if (this.criarUsuarioForm.valid && typeof(this.username?.value) === 'string') {
      this.usuarioService.addUsuario(this.username?.value)
        .subscribe({
          next: usuario => {
            this.router.navigate(['/usuarios/editar', usuario.id]);
            console.log(`Usuario criado: ${usuario}`);
          },
          error: err => { this.modalService.showModal(err.message); }
        });
    } else {
      this.criarUsuarioForm.markAllAsTouched();
    }
  }
}
