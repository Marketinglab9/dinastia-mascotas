import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Calendario</h1>
      <mat-card>
        <mat-card-content class="empty-state">
          <mat-icon>event</mat-icon>
          <p>Gestiona citas y vacunación</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 28px; font-weight: 500; margin-bottom: 24px; }
    .empty-state { 
      text-align: center; 
      padding: 64px 24px !important; 
      mat-icon { font-size: 64px; width: 64px; height: 64px; color: rgba(0,0,0,0.3); }
      p { margin-top: 16px; color: rgba(0,0,0,0.6); }
    }
  `]
})
export class CalendarioComponent {}
