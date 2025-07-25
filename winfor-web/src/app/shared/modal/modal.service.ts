import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OkOnlyModalComponent } from './ok-only-modal/ok-only-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModalService: NgbModal) { }

  showModal(text: string): void {
    const modalRef = this.ngbModalService.open(OkOnlyModalComponent);
    modalRef.componentInstance.text = text;
  }
}
