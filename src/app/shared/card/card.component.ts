import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICard } from '../../models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: ICard;
  @Output() deleteCardEvent = new EventEmitter<ICard>();

  onDelete() {
    this.deleteCardEvent.emit(this.card);
  }
}
