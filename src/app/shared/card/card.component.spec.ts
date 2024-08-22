import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { ICard } from '../../models/card.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockCard: ICard = {
    id: 1,
    title: 'Test Card',
    description: 'Test Description',
    img: 'test-image.jpg',
    type: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2')!;
    expect(titleElement.textContent).toContain(mockCard.title);
  });

  it('should display card description', () => {
    const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('.short-text')!;
    expect(descriptionElement.textContent).toContain(mockCard.description);
  });

  it('should call onDelete when close button is clicked', () => {

    const onDeleteMock = jest.fn();
    component.onDelete = onDeleteMock;

    const button: HTMLElement = fixture.nativeElement.querySelector('.close-btn')!;
    button.click();

    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('should emit deleteCardEvent when close button is clicked', () => {

    const emitSpy = jest.spyOn(component.deleteCardEvent, 'emit');

    const button: HTMLElement = fixture.nativeElement.querySelector('.close-btn')!;
    button.click();

    expect(emitSpy).toHaveBeenCalledWith(mockCard);
  });
});
