import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

import { ICard } from '../models/card.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  getCards(): Observable<ICard[]> {
    return this.httpClient.get<ICard[]>(`${environment.baseUrl}/cardlist.json`)
  }

}
