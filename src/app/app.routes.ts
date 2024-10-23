import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
    {   
        path: '',
        component: TaskListComponent,
        title: 'Task Management App',
    },
    {
        path: 'task-form/:id',
        component: TaskFormComponent,
        title: 'Task Management form',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];
