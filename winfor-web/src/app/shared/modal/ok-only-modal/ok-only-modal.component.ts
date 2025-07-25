import { Component, Input } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ok-only-modal',
  imports: [NgbModule],
  templateUrl: './ok-only-modal.component.html',
  styleUrl: './ok-only-modal.component.css'
})
export class OkOnlyModalComponent {
  @Input() text: string = '';
  constructor(public activeModal: NgbActiveModal) {}
}
