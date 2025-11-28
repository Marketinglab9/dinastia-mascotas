import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importante para volver atrás
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-anadir-mascota', // Selector corregido
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule
    ],
    template: `
        <div class="page-container">

            <!-- Navegación Breadcrumb simple -->
            <div class="nav-header">
                <button mat-icon-button routerLink="/mascotas">
                    <mat-icon>arrow_back</mat-icon>
                </button>
                <span class="breadcrumb">Mascotas / <strong>Añadir Nueva</strong></span>
            </div>

            <h1 class="page-title">Añadir Mascota</h1>

            <div class="content-grid">
                <!-- COLUMNA IZQUIERDA: Formulario -->
                <mat-card class="main-form-card">
                    <mat-card-content>
                        <div class="photo-section">
                            <div class="avatar-placeholder">
                                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop" alt="Mascota">
                            </div>
                            <div class="photo-info">
                                <h3>Foto de Perfil</h3>
                                <p>Sube una foto para tu mascota</p>
                            </div>
                            <button mat-stroked-button class="upload-btn">SUBIR FOTO</button>
                        </div>

                        <div class="divider"></div>

                        <form class="pet-form">
                            <div class="form-row">
                                <mat-form-field appearance="outline" class="custom-field">
                                    <mat-label>Nombre</mat-label>
                                    <input matInput placeholder="Nombre">
                                </mat-form-field>
                                <mat-form-field appearance="outline" class="custom-field">
                                    <mat-label>Fecha de Nacimiento</mat-label>
                                    <input matInput [matDatepicker]="picker" placeholder="mm/dd/yyyy">
                                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                                    <mat-datepicker #picker></mat-datepicker>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="custom-field">
                                    <mat-label>Especie</mat-label>
                                    <input matInput placeholder="Perro, Gato...">
                                </mat-form-field>
                                <mat-form-field appearance="outline" class="custom-field">
                                    <mat-label>Raza</mat-label>
                                    <input matInput placeholder="Ej. Golden Retriever">
                                </mat-form-field>
                            </div>

                            <div class="form-row align-center">
                                <div class="sex-radio-group">
                                    <span class="label">Sexo</span>
                                    <mat-radio-group color="primary" value="macho">
                                        <mat-radio-button value="macho">Macho</mat-radio-button>
                                        <mat-radio-button value="hembra">Hembra</mat-radio-button>
                                    </mat-radio-group>
                                </div>
                                <mat-form-field appearance="outline" class="custom-field">
                                    <mat-label>Color</mat-label>
                                    <input matInput placeholder="Color">
                                </mat-form-field>
                            </div>
                        </form>
                    </mat-card-content>
                </mat-card>

                <!-- COLUMNA DERECHA: Vacunas -->
                <div class="side-column">
                    <mat-card class="vaccine-card">
                        <mat-card-content>
                            <div class="vaccine-header">
                                <h3>Historial de<br>Vacunación</h3>
                                <button mat-flat-button class="register-btn">
                                    <mat-icon>add</mat-icon> REGISTRAR
                                </button>
                            </div>
                            <div class="vaccine-list">
                                <div class="empty-vaccines">
                                    <p>Aún no hay vacunas registradas</p>
                                </div>
                            </div>
                        </mat-card-content>
                    </mat-card>
                </div>
            </div>

            <div class="action-footer">
                <button mat-button class="cancel-btn" routerLink="/mascotas">CANCELAR</button>
                <button mat-flat-button class="save-btn">GUARDAR MASCOTA</button>
            </div>
        </div>
    `,
    styles: [`
        .page-container { max-width: 1200px; margin: 0 auto; padding: 24px; font-family: 'Roboto', sans-serif; }

        .nav-header { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #666; }
        .breadcrumb strong { color: #2E7D32; }

        .page-title { font-size: 28px; font-weight: 700; color: #1a1a1a; margin-bottom: 32px; }

        .content-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }

        /* Estilos reutilizados del diseño anterior */
        .main-form-card { border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); padding: 16px; }
        .photo-section { display: flex; align-items: center; gap: 24px; margin-bottom: 24px; }
        .avatar-placeholder { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; background: #eee; }
        .avatar-placeholder img { width: 100%; height: 100%; object-fit: cover; }
        .photo-info h3 { margin: 0; font-size: 1.1rem; font-weight: 600; }
        .photo-info p { margin: 4px 0 0; color: #666; font-size: 0.9rem; }
        .divider { height: 1px; background-color: #eee; margin: 24px 0; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 16px; }
        .custom-field { width: 100%; }

        /* Estilos Input */
        ::ng-deep .custom-field .mat-mdc-text-field-wrapper { background-color: #f8f9fa !important; border-radius: 8px; }
        ::ng-deep .custom-field .mat-mdc-form-field-subscript-wrapper { display: none; }

        .sex-radio-group { display: flex; flex-direction: column; gap: 8px; }
        mat-radio-group { display: flex; gap: 24px; }

        .vaccine-card { border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
        .vaccine-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
        .register-btn { background-color: #e8f5e9; color: #2E7D32; font-weight: 600; }
        .empty-vaccines { text-align: center; color: #999; padding: 20px 0; font-style: italic; }

        .action-footer { margin-top: 32px; display: flex; justify-content: flex-end; gap: 16px; }
        .save-btn { background-color: #2E7D32; color: white; height: 48px; padding: 0 32px; font-weight: 700; border-radius: 8px; }
        .cancel-btn { color: #666; font-weight: 600; }

        @media (max-width: 900px) {
            .content-grid { grid-template-columns: 1fr; }
            .form-row { grid-template-columns: 1fr; }
        }
    `]
})
export class AnadirMascotaComponent {} // Clase Corregida