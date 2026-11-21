import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ProblemDetail } from '../models/problem-detail.model';
import { ErrorBannerService } from '../services/error-banner.service';

export const problemDetailInterceptor: HttpInterceptorFn = (req, next) => {
  const errorBanner = inject(ErrorBannerService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        errorBanner.show(toProblemDetail(error));
      }
      return throwError(() => error);
    }),
  );
};

function toProblemDetail(error: HttpErrorResponse): ProblemDetail {
  if (error.status === 0) {
    return {
      title: 'Service indisponible',
      status: 0,
      detail: 'Impossible de joindre le serveur API (backend arrete, mock ferme ou erreur CORS).',
      instance: error.url ?? undefined,
    };
  }

  const payload = error.error;
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    return {
      type: typeof record['type'] === 'string' ? record['type'] : undefined,
      title: typeof record['title'] === 'string' ? record['title'] : error.statusText || 'Erreur HTTP',
      status: typeof record['status'] === 'number' ? record['status'] : error.status,
      detail: typeof record['detail'] === 'string' ? record['detail'] : error.message,
      instance: typeof record['instance'] === 'string' ? record['instance'] : (error.url ?? undefined),
      timestamp: typeof record['timestamp'] === 'string' ? record['timestamp'] : undefined,
      invalidParams: Array.isArray(record['invalidParams'])
        ? (record['invalidParams'] as ProblemDetail['invalidParams'])
        : undefined,
    };
  }

  return {
    title: error.statusText || 'Erreur HTTP',
    status: error.status,
    detail: error.message || 'Une erreur inattendue est survenue.',
    instance: error.url ?? undefined,
  };
}
