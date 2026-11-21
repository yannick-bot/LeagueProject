export interface ValidationFieldError {
  field: string;
  message: string;
}

export interface ProblemDetail {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  timestamp?: string;
  invalidParams?: ValidationFieldError[];
}
