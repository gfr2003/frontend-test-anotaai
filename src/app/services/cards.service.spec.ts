import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CardService } from './cards.service';
import { ICard } from '../models/card.model';
import { environment } from '../environments/environment';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService],
    });

    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cards from the API', () => {
    const mockCards: ICard[] = [
      {
        id: 1,
        title: 'Card 1',
        description: 'Description 1',
        img: 'img1.jpg',
        type: 1,
      },
      {
        id: 2,
        title: 'Card 2',
        description: 'Description 2',
        img: 'img2.jpg',
        type: 2,
      },
    ];

    service.getCards().subscribe((cards) => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(mockCards);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/cardlist.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should handle HTTP error', () => {

    const errorMessage = 'Network error';

    service.getCards().subscribe(
      () => fail('Expected an error, but got a response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.baseUrl}/cardlist.json`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
