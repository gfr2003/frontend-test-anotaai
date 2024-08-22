import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICard } from '../models/card.model';
import { CardService } from '../services/cards.service';
import { CardComponent } from '../shared/card/card.component';
import { SearchComponent } from '../shared/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, SearchComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards: ICard[] = [];
  filteredCards: ICard[] = [];
  searchField = new FormControl('');

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.loadCards();
    this.searchField.valueChanges.subscribe(value => this.filterCards(value || ''));
  }

  deleteCard(selectedCard: ICard) {
    this.cards = this.cards.filter(cards => cards !== selectedCard);
    this.filteredCards = this.filteredCards.filter(cards => cards !== selectedCard);
  }

  public loadCards() {
    this.cardService.getCards().subscribe({
      next: (cards: ICard[]) => {
        this.cards = cards;
        this.filteredCards = cards;
      },
      error: error => console.error('Error loading cards:', error),
    });
  }

  filterCards(searchTerm: string) {
    const term = searchTerm.toLowerCase().trim();
    this.filteredCards = term
      ? this.cards.filter(card =>
          card.title.toLowerCase().includes(term) ||
          card.description.toLowerCase().includes(term)
        )
      : this.cards;
  }
}
