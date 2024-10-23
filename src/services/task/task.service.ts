import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config/config';
import { ITask } from '../../models/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = config.apiTaskMngrUrl;
  private prefixPath = '/tasks/v1';
  private url = `${this.baseUrl}${this.prefixPath}`;
  private token = config.token;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  createTask(task: ITask): Observable<ITask> {

    return this.http.post<ITask>(`${this.url}/saveTask`, task, { headers: this.getHeaders() });
  }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.url}/getTask`, { headers: this.getHeaders() });
  }

  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/getTask/${id}`, { headers: this.getHeaders() });
  }

  updateTask(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.url}/updateTask/${id}`, task, { headers: this.getHeaders() });
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.url}/deleteTask/${id}`,  { headers: this.getHeaders() });
  }
}
