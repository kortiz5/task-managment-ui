import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      providers: [
        TaskService,
      ],
    });
    service = TestBed.inject(TaskService);
    
  });

  afterEach(() => {

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a createTask method', () => {
        service.createTask({ id: 1, title: 'Test Task', description: 'Test Description' })
        expect(service.createTask).toBeDefined();
    });

    it('should have a getTasks method', () => {
        service.getTasks()
        expect(service.getTasks).toBeDefined();
    });

    it('should have a getTaskById method', () => {
        service.getTaskById(1)
        expect(service.getTaskById).toBeDefined();
    });

    it('should have a updateTask method', () => {
        service.updateTask(1, { id: 1, title: 'Test Task', description: 'Test Description' })
        expect(service.updateTask).toBeDefined();
    });

    it('should have a deleteTask method', () => {
        service.deleteTask(1)
        expect(service.deleteTask).toBeDefined();
    });

});
