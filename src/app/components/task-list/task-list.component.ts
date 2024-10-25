import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ITask } from '../../../models/ITask';
import { TaskService } from '../../../services/task/task.service';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/login/login.service';

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
    private authService: AuthService,
    private router: Router
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
        this.getTasks();
        this.isDeleteATask = false;
      },
      error: (error) => {
        console.error(error);
        this.isDeleteATask = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
