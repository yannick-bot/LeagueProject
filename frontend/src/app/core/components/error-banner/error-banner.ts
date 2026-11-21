import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ErrorBannerService } from '../../services/error-banner.service';

@Component({
  selector: 'app-error-banner',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './error-banner.html',
  styleUrl: './error-banner.scss',
})
export class ErrorBanner {
  private readonly errorService = inject(ErrorBannerService);

  protected readonly error = this.errorService.error;

  protected dismiss(): void {
    this.errorService.clear();
  }
}
