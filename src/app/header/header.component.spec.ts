import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo image', () => {
    const logoImg: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('logo.png');
  });

  it('should display the title', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector('h4');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Teste de Desenvolvedor Front-End - Anota AI');
  });

  it('should display the name with dividers', () => {
    const nameContainer: HTMLElement = fixture.nativeElement.querySelector('.name-container');
    expect(nameContainer).toBeTruthy();
    expect(nameContainer.textContent).toContain('Gustavo Félix');

    const dividers: NodeListOf<HTMLElement> = nameContainer.querySelectorAll('.divider');
    expect(dividers.length).toBe(2);
  });
});
