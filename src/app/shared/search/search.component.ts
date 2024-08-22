import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchField = new FormControl();

  @Output() searchChanged = new EventEmitter<string>();

  constructor() {
    this.searchField.valueChanges.subscribe(value => {
      this.searchChanged.emit(value);
    });
  }
}
