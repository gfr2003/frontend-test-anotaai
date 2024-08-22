import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardService } from './cards.service';
import { ICard } from '../models/card.model';
import { environment } from '../environments/environment';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService]
    });

    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Certifique-se de que não há chamadas HTTP pendentes após cada teste
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cards from the API', () => {
    // Dados simulados para o teste
    const mockCards: ICard[] = [
      { id: 1, title: 'Card 1', description: 'Description 1', img: 'img1.jpg', type: 1 },
      { id: 2, title: 'Card 2', description: 'Description 2', img: 'img2.jpg', type: 2 }
    ];

    // Chama o método getCards
    service.getCards().subscribe(cards => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(mockCards);
    });

    // Verifica se a solicitação HTTP foi feita
    const req = httpMock.expectOne(`${environment.baseUrl}/cardlist.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards); // Fornece a resposta simulada
  });

  it('should handle HTTP error', () => {
    // Simula um erro HTTP
    const errorMessage = 'Network error';

    // Chama o método getCards
    service.getCards().subscribe(
      () => fail('Expected an error, but got a response'),
      error => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    // Verifica se a solicitação HTTP foi feita
    const req = httpMock.expectOne(`${environment.baseUrl}/cardlist.json`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' }); // Fornece a resposta de erro simulada
  });
});
