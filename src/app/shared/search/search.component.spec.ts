import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit searchChanged event when search field value changes', () => {
    // Espionar o método emit do EventEmitter
    const emitSpy = jest.spyOn(component.searchChanged, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    inputElement.value = 'Test';
    inputElement.dispatchEvent(new Event('input')); // Disparar evento de entrada

    fixture.detectChanges(); // Detectar mudanças para atualizar a view

    // Verificar se o método emit foi chamado
    expect(emitSpy).toHaveBeenCalledWith('Test');
  });
});
