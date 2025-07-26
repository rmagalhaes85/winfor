import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }

  async deleteUsuario(id: string): Promise<void> {
    // TODO modal de confirmação
    const result = await this.modalService.showConfirmationModal(
      "Cofirma a exclusão do usuário?", "danger");
    if (result === "OK")
      this.usuarioService.deleteUsuario(id).subscribe(() => this.getUsuarios());
  }
}
