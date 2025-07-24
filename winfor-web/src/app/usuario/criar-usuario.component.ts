import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario, UsuarioService } from '.';

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

  constructor(private usuarioService: UsuarioService) { }

  get username() { return this.criarUsuarioForm.get('username'); }

  onSubmit() {
    if (this.criarUsuarioForm.valid && typeof(this.username?.value) === 'string') {
      this.usuarioService.addUsuario(this.username?.value)
        .subscribe(usuario => console.log(`Usuario gravado: ${usuario}`));
    } else {
      this.criarUsuarioForm.markAllAsTouched();
    }
  }
}
