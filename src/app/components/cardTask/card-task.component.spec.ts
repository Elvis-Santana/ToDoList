import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaskComponent } from './card-task.component';
import { Status } from '../../shared/enum/status';
import { By } from '@angular/platform-browser';

describe('CardTaskComponent', () => {
  let component: CardTaskComponent;
  let fixture: ComponentFixture<CardTaskComponent>;
  const task = {
    id: '1',
    titulo: 'Test Task',
    conteudo: 'This is a test task',
    status: Status.aFazer
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTaskComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardTaskComponent);
    component = fixture.componentInstance;


    fixture.componentRef.setInput('task', task);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve montar os elemento do card titulo e conteudo', () => {


    const titulo = (fixture.debugElement.query(
      By.css('[data-testid="card-task-test-titulo"]')
    ).nativeElement as HTMLElement).textContent?.trim();


    const conteudo = (fixture.debugElement.query(
      By.css('[data-testid="card-task-test-conteudo"]')
    ).nativeElement as HTMLElement).textContent?.trim();

    expect(titulo).toBe(task.titulo);
    expect(conteudo).toBe(task.conteudo);

  });


});
