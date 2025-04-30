import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { ITask } from '../../interfaces/task';
import { Status } from '../../shared/enum/status';
import { IForm } from '../../components/formsTask/forms-task.component';
import { v4 as uuidv4 } from 'uuid';

describe('DatabaseService', () => {
  let service: DatabaseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseService],

    });

    service = TestBed.inject(DatabaseService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrun list task', (done) => {
    service['database$'].next([
      { id: uuidv4(), status: Status.aFazer, conteudo: "conteudo", titulo: "titulo" },
      { id: uuidv4(), status: Status.aFazer, conteudo: "conteudo", titulo: "titulo" },
      { id: uuidv4(), status: Status.fazendo, conteudo: "conteudo", titulo: "titulo" },
    ]);

    service.obDatabase().subscribe(e => {
      expect(e.length).toBe(3);
      done();
    })


  });
  it('should create task', () => {

    const from: IForm = { conteudo: " conteudo", titulo: "conteudo" };
    const task = service.createdTask(from);

    expect(task.conteudo).toBe(from.conteudo);
    expect(task.titulo).toBe(from.titulo);
    expect(task.id).not.toBe(null)
    expect(task.status).toBe(Status.aFazer);


  });


  it('should update task conteudo and titulo', () => {

    const currentTask: ITask = {
      id: uuidv4(),
      status: Status.aFazer,
      conteudo: "conteudo",
      titulo: "titulo"
    };

    const formTask: IForm = {
      titulo: "TITULONOVO",
      conteudo: "NOVOCONTEUDO"
    };

    const udaptedTask = service.taskUpdate(currentTask, formTask);

    expect(udaptedTask.conteudo).toBe(formTask.conteudo);
    expect(udaptedTask.titulo).toBe(formTask.titulo);
    expect(udaptedTask.id).toBe(currentTask.id);
    expect(udaptedTask.status).toBe(currentTask.status);



  })

  it('should delete task', (done) => {

    const TASK_FAKE_1 = { id: uuidv4(), status: Status.aFazer, conteudo: "conteudo", titulo: "Tarefa Importante" };
    const TASK_FAKE_2 = { id: uuidv4(), status: Status.aFazer, conteudo: "conteudo", titulo: "Reunião Semanal" };
    const TASK_FAKE_3 = { id: uuidv4(), status: Status.aFazer, conteudo: "conteudo", titulo: "Projeto Urgente" };

    const TASKS_FAKE: ITask[] = [TASK_FAKE_1, TASK_FAKE_2, TASK_FAKE_3];

    service['database$'].next(TASKS_FAKE);

    service.removerTask(TASK_FAKE_1.id);

    service.obDatabase().subscribe(t => {
      const task = t.find(x => x.id == TASK_FAKE_1.id) || null;
      expect(task).toBeNull();
      done();
    })

  })

  it('should update task status', (done) => {
    const currentTask: ITask = { id: uuidv4(), status: Status.aFazer, conteudo: "ss", titulo: "ff" };
    const status = Status.fazendo;
    service['database$'].next([currentTask]);

    service.udapteStatus(currentTask, status);

    service.obDatabase().subscribe(t => {
      expect(t[0].status).toBe(Status.fazendo);
      done();
    })
  })

});
