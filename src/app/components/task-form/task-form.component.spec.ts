import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { TaskService } from '../../../services/task/task.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTaskById', 'createTask', 'updateTask']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('new')
        }
      },
      params: of({ id: 'new' })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TaskService, useValue: taskServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    taskServiceMock = null!;
    routerMock = null!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createTask when form is valid and in create mode', () => {
    component.formTask.setValue({ id: 2, title: 'New Task', description: 'New Description' });
    taskServiceMock.createTask.and.returnValue(of({}) as any);
    
    component.createTask();

    expect(taskServiceMock.createTask).toHaveBeenCalledWith({
      id: 2,
      title: 'New Task',
      description: 'New Description'
    });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should navigate to / on error creating a task', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'log');
    component.formTask.setValue({ id: 2, title: 'New Task', description: 'New Description' });
    taskServiceMock.createTask.and.returnValue(throwError(() => new Error('Error creating task')));
    component.createTask();
    tick();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.calls.reset();
  }));

  it('should not call createTask if form is invalid', () => {
    component.formTask.controls['title'].setValue('');
    component.formTask.controls['description'].setValue('Valid Description');

    component.createTask();

    expect(taskServiceMock.createTask).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should not call updateTask if form is invalid', () => {
    component.formTask.controls['title'].setValue('');
    component.formTask.controls['description'].setValue('Valid Description');

    component.updateTask();

    expect(taskServiceMock.updateTask).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should navigate to / on error update a task', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'log');
    component.formTask.setValue({ id: 2, title: 'New Task', description: 'New Description' });
    taskServiceMock.updateTask.and.returnValue(throwError(() => new Error('Error creating task')));
    component.updateTask();
    tick();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.calls.reset();
  }));


  it('should call updateTask when form is valid and in edit mode', () => {
    component.editMode = true;
    component.taskId = 1;
    component.formTask.setValue({ id: 1, title: 'Updated Task', description: 'Updated Description' });
    taskServiceMock.updateTask.and.returnValue(of({}) as any);
    
    component.updateTask();

    expect(taskServiceMock.updateTask).toHaveBeenCalledWith(1, {
      id: 1,
      title: 'Updated Task',
      description: 'Updated Description'
    });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should call getTaskById', () => {
    component.formTask.setValue({ id: 2, title: 'New Task', description: 'New Description' });
    taskServiceMock.getTaskById.and.returnValue(of({ id: 2, title: 'New Task', description: 'New Description' }) as any);
    
    component.getTaskById(2);

    expect(taskServiceMock.getTaskById).toHaveBeenCalledWith(2);
  });

  it('should navigate to / on error', fakeAsync(() => {

    taskServiceMock.getTaskById.and.returnValue(throwError(() => new Error('Error al obtener tarea')));
    component.getTaskById(1);
    tick();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  }));

  it('should enter edit mode and call getTaskById when id is not "new"', () => {
    const activatedRouteMock = TestBed.inject(ActivatedRoute);
    activatedRouteMock.snapshot.paramMap.get = jasmine.createSpy('get').and.returnValue('1');
    taskServiceMock.getTaskById.and.returnValue(of({ id: 2, title: 'New Task', description: 'New Description' }) as any);

    component.ngOnInit();
  
    expect(component.editMode).toBeTrue();
    expect(taskServiceMock.getTaskById).toHaveBeenCalledWith(1);
  });
  

});
