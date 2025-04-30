import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { Component, DebugElement, input } from '@angular/core';
import { ITask } from '../../interfaces/task';
import { DatabaseService } from '../../services/database/database.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Status } from '../../shared/enum/status';
import { IForm } from '../formsTask/forms-task.component';
import { By } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { CardTaskComponent } from '../cardTask/card-task.component';




// @Component({
//   selector: 'app-card-task',
//   template: ''
// })
// class FakeCardTaskComponent {
//   task = input.required<ITask>();

// }

class FakeServiceDatase {
  obDatabase = jest.fn();

}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        {
          provide: DatabaseService,
          useClass: FakeServiceDatase
        }
      ]
    })
      .compileComponents();

    TestBed.overrideComponent(ListComponent, {
      set: {
        imports: [
          CardTaskComponent,
          NgClass
        ]
      }
    })


  });

  it('should lisar as tarefas', () => {

    const fakeData = [
      {
        id: '1',
        titulo: 'titulo 1',
        conteudo: 'conteudo 1' ,
        status: Status.aFazer
      },
      {
        id: '2',
        titulo: 'titulo 2',
        conteudo: 'conteudo 2',
        status: Status.aFazer
      }
    ]
    const databaseService = TestBed.inject(DatabaseService);

    (databaseService.obDatabase as jest.Mock).mockReturnValue(of(fakeData));

      fixture = TestBed.createComponent(ListComponent);

      fixture.detectChanges()

      expect(databaseService.obDatabase).toHaveBeenCalled();


      const cardFake =  fixture.debugElement.queryAll(By.directive(CardTaskComponent));

      expect(cardFake.length).toBe(fakeData.length);
  });


});
