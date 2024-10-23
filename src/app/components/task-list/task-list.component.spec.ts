import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../../services/task/task.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {

    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasks','getTaskById', 'createTask', 'updateTask', 'deleteTask']);
    taskServiceMock.getTasks.and.returnValue(of([{ id: 1, title: 'Test Task', description: 'Test Description' }]));
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      },
      params: of({ id: '1' })
    };


    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TaskService, useValue: taskServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    taskServiceMock.deleteTask.and.returnValue(of({}));
    taskServiceMock.getTasks.and.returnValue(of([{ id: 1, title: 'Test Task', description: 'Test Description' }]));
    component.deleteTask(1);
    expect(component).toBeTruthy();
  });

  it('should get an error on delete a task', () => {
    taskServiceMock.deleteTask.and.returnValue(throwError(() => new Error('Error creating task')));
    component.deleteTask(1);
    expect(component).toBeTruthy();
  });

});
