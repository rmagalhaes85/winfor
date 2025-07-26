import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OkOnlyModalComponent } from './ok-only-modal/ok-only-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModalService: NgbModal) { }

  showOkOnlyModal(text: string): void {
    const modalRef = this.ngbModalService.open(OkOnlyModalComponent);
    modalRef.componentInstance.text = text;
  }

  async showConfirmationModal(text: string, confirmationButtonStyle: string): Promise<string> {
    // TODO criar mapa entre nomes e tipos de componentes e tornar código reutilizável
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.text = text;
    modalRef.componentInstance.confirmationButtonStyle = confirmationButtonStyle;
    return await modalRef.result;
  }
}
