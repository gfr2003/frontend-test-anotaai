import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { CardService } from '../services/cards.service';
import { CardComponent } from '../shared/card/card.component';
import { SearchComponent } from '../shared/search/search.component';
import { ICard } from '../models/card.model';

// Mock do CardService
class MockCardService {
  getCards() {
    return of([
      { id: 1, title: 'Card 1', description: 'Description 1', img: 'img1.jpg', type: 1 },
      { id: 2, title: 'Card 2', description: 'Description 2', img: 'img2.jpg', type: 2 },
    ]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cardService: CardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CardComponent, SearchComponent],
      providers: [{ provide: CardService, useClass: MockCardService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cards on initialization', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.cards.length).toBe(2);
    expect(component.filteredCards.length).toBe(2);
  });

  it('should filter cards based on search term', () => {
    component.filterCards('Card 1');
    fixture.detectChanges();
    expect(component.filteredCards.length).toBe(1);
    expect(component.filteredCards[0].title).toBe('Card 1');
  });

  it('should clear filter and show all cards when search term is empty', () => {
    component.filterCards('Card 1');
    fixture.detectChanges();
    component.filterCards('');
    fixture.detectChanges();
    expect(component.filteredCards.length).toBe(2);
  });


});
