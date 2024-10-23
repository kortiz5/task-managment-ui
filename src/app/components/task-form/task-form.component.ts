import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../../../services/task/task.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CardModule, ButtonModule, InputTextModule, InputNumberModule, RouterModule],
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
        this.router.navigateByUrl('/');
      }
    });
  }

  createTask() {
    if (this.formTask.invalid) {
      console.log('Error in form', this.formTask);
      return;
    }
    this.taskService.createTask(this.formTask.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log('Error in create task', error);
      }
    });
  }

  updateTask() {
    if (this.formTask.invalid) {
      console.log('Error in form', this.formTask);
      return;
    }
    this.taskService.updateTask(this.taskId, this.formTask.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log('Error in update task', error);
      } 
    });
  }

 
  cancel() {
    this.router.navigateByUrl('/');
  }
}
