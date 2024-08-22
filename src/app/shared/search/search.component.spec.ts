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

    const emitSpy = jest.spyOn(component.searchChanged, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    inputElement.value = 'Test';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();


    expect(emitSpy).toHaveBeenCalledWith('Test');
  });
});
