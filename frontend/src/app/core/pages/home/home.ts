import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly env = environment;
}
