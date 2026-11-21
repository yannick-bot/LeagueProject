// Verifie la banniere ProblemDetail et la structure de base du client HTTP
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { problemDetailInterceptor } from './problem-detail.interceptor';
import { ErrorBannerService } from '../services/error-banner.service';

describe('problemDetailInterceptor', () => {
  it('should capture RFC 9457 ProblemDetail payload into ErrorBannerService', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([problemDetailInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    const http = TestBed.inject(HttpClient);
    const httpMock = TestBed.inject(HttpTestingController);
    const banner = TestBed.inject(ErrorBannerService);

    http.get('/api/v1/champions/Pikachu').subscribe({
      error: () => {
        // attendu
      },
    });

    const req = httpMock.expectOne('/api/v1/champions/Pikachu');
    req.flush(
      {
        type: 'https://api.leagueplatform.com/errors/resource-not-found',
        title: 'Resource Not Found',
        status: 404,
        detail: "Aucun champion trouve avec l'identifiant 'Pikachu'.",
        instance: '/api/v1/champions/Pikachu',
      },
      { status: 404, statusText: 'Not Found' },
    );

    expect(banner.error()?.title).toBe('Resource Not Found');
    expect(banner.error()?.status).toBe(404);
    httpMock.verify();
  });
});
