import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TaskService } from '../../services/task.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CardModule, ButtonModule, InputTextModule, InputNumberModule, ToastModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  formTask!: FormGroup;
  chargingPage: boolean = false;
  editMode: boolean = false;
  taskId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formTask = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.editMode = true;
      this.taskId = parseInt(id!);
      this.getTaskById(this.taskId);
    }
  }

  getTaskById(id: number) {
    this.taskService.getTaskById(id).subscribe({
      next: (data) => {
        this.formTask.patchValue(data);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
        this.router.navigateByUrl('/');
      }
    });
  }

  createTask() {
    if (this.formTask.invalid) {
      console.log('Error in form', this.formTask);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in form' });
      return;
    }
    this.taskService.createTask(this.formTask.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created' });
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
      }
    });
  }

  updateTask() {
    if (this.formTask.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in form' });
      return;
    }
    this.taskService.updateTask(this.taskId, this.formTask.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task created' });
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
      }
    });
  }
}
