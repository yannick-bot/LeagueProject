import { Injectable, signal } from '@angular/core';
import { ProblemDetail } from '../models/problem-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorBannerService {
  private readonly currentError = signal<ProblemDetail | null>(null);

  readonly error = this.currentError.asReadonly();

  show(problem: ProblemDetail): void {
    this.currentError.set(problem);
  }

  clear(): void {
    this.currentError.set(null);
  }
}
