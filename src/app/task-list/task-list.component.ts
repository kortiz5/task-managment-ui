import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ITask } from '../../models/ITask';
import { TaskService } from '../../services/task.service';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks: ITask[] = [];
  isDeleteATask: boolean = false;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((data: ITask[]) => {
      this.tasks = data;
    });
  }

  deleteTask(id: number) {
    this.isDeleteATask = true;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'task deleted successfully',
        });
        this.getTasks();
        this.isDeleteATask = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message,
        });
        console.error(error);
        this.isDeleteATask = false;
      }
    });
  }

}
