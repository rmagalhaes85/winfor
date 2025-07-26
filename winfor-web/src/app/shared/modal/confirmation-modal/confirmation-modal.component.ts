import { Component, Input } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() text: string = '';
  @Input() confirmationButtonStyle: string = 'primary';
  constructor(public activeModal: NgbActiveModal) {}
}
