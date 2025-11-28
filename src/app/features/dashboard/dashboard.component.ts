import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    template: `
        <!-- Wrapper principal del contenido (sin menú lateral extra) -->
        <div class="dashboard-content">

            <!-- Header de Bienvenida -->
            <div class="page-header">
                <!-- El título se adapta si es móvil o escritorio -->
                <h1 *ngIf="!mobileQuery">Bienvenido de nuevo! 👋</h1>
                <h1 *ngIf="mobileQuery">Hola, Alex! 👋</h1>

                <p *ngIf="!mobileQuery">Gestión integral de tus mascotas</p>
            </div>

            <!-- Stats Cards (Grid Responsivo) -->
            <div class="stats-grid">
                <mat-card *ngFor="let stat of stats" class="stat-card">
                    <mat-card-content>
                        <div class="stat-icon" [style.background-color]="stat.color + '20'">
                            <mat-icon [style.color]="stat.color">{{ stat.icon }}</mat-icon>
                        </div>
                        <div class="stat-info">
                            <div class="stat-label">{{ stat.label }}</div>
                            <div class="stat-value">{{ stat.value }}</div>
                        </div>
                    </mat-card-content>
                </mat-card>
            </div>

            <!-- Sección Mis Mascotas (Carrusel Responsivo) -->
            <h2 class="section-title">Mis Mascotas</h2>

            <div class="carousel-container">
                <!-- Botón Izquierda -->
                <button
                        mat-icon-button
                        class="carousel-button left"
                        (click)="scrollLeft()"
                        [disabled]="!canGoBack"
                        [style.display]="mobileQuery ? 'none' : 'flex'"> <!-- Ocultar flechas en móvil si prefieres scroll -->
                    <mat-icon>chevron_left</mat-icon>
                </button>

                <div class="carousel-track">
                    <mat-card *ngFor="let mascota of visibleMascotas" class="mascota-card">
                        <div class="mascota-image" [style.background-image]="'url(' + mascota.imagen + ')'"></div>
                        <mat-card-content>
                            <div class="mascota-header">
                                <mat-icon class="mascota-icon" [style.color]="'#ff9800'">pets</mat-icon>
                                <div class="mascota-info">
                                    <h3 class="mascota-nombre">{{ mascota.nombre }}</h3>
                                    <p class="mascota-raza">{{ mascota.raza }} • {{ mascota.tipo }}</p>
                                </div>
                            </div>
                            <mat-chip-set>
                                <mat-chip class="edad-chip">{{ mascota.edad }}</mat-chip>
                            </mat-chip-set>
                        </mat-card-content>
                        <mat-card-actions>
                            <button mat-button color="primary">Ver Detalles</button>
                        </mat-card-actions>
                    </mat-card>
                </div>

                <!-- Botón Derecha -->
                <button
                        mat-icon-button
                        class="carousel-button right"
                        (click)="scrollRight()"
                        [disabled]="!canGoForward"
                        [style.display]="mobileQuery ? 'none' : 'flex'">
                    <mat-icon>chevron_right</mat-icon>
                </button>
            </div>

            <!-- Sección Próximas Citas -->
            <h2 class="section-title" style="margin-top: 48px;">Próximas Citas</h2>

            <div class="appointments-container">
                <mat-card *ngFor="let appointment of appointments" class="appointment-card">
                    <!-- Franja de color -->
                    <div class="color-strip" [style.background-color]="appointment.iconColor + '20'"></div>

                    <mat-card-content class="card-content-wrapper">
                        <div class="appointment-icon-wrapper">
                            <mat-icon [style.color]="appointment.iconColor">{{ appointment.icon }}</mat-icon>
                        </div>
                        <div class="appointment-details">
                            <h3 class="appointment-title">{{ appointment.title }}</h3>
                            <p class="appointment-pet">Para: <strong>{{ appointment.pet }}</strong></p>
                            <div class="appointment-meta">
                                <span class="date-text">{{ appointment.date }}</span>
                                <span class="status-text" [class.overdue]="appointment.status === 'overdue'">
                  {{ appointment.statusText }}
                </span>
                            </div>
                        </div>
                    </mat-card-content>
                </mat-card>

                <!-- Botón Flotante para Añadir -->
                <div class="fab-container">
                    <button mat-fab extended color="warn" class="add-pet-btn">
                        <mat-icon>add</mat-icon>
                        <span>Nuevo</span>
                    </button>
                </div>
            </div>

        </div>
    `,
    styles: [`
        /* Contenedor principal limpio */
        .dashboard-content {
            padding: 24px;
            max-width: 1400px; /* Ancho máximo para pantallas muy grandes */
            margin: 0 auto;
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
        }

        .page-header { margin-bottom: 32px; }
        .page-header h1 { margin: 0; font-size: 2rem; color: #1a1a1a; font-weight: 700; }
        .page-header p { margin: 8px 0 0; color: #666; font-size: 1.1rem; }

        /* --- STATS GRID --- */
        .stats-grid {
            display: grid;
            /* Grid responsivo: se adapta automáticamente */
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
            margin-bottom: 48px;
        }

        .stat-card {
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            padding: 0;
            transition: transform 0.2s;
            &:hover { transform: translateY(-2px); }
        }
        .stat-card mat-card-content { padding: 24px; display: flex; align-items: center; gap: 16px; }

        .stat-icon {
            width: 48px; height: 48px; border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
        }
        .stat-info .stat-label { font-size: 0.9rem; color: #666; margin-bottom: 4px; }
        .stat-info .stat-value { font-size: 1.5rem; font-weight: 700; color: #1a1a1a; }

        /* --- CAROUSEL --- */
        .section-title { font-size: 1.5rem; color: #1a1a1a; margin-bottom: 24px; font-weight: 500; }

        .carousel-container {
            position: relative;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .carousel-track {
            display: flex;
            gap: 24px;
            padding: 4px;
            flex: 1;
            /* En móvil, permite scroll horizontal nativo si se desborda */
            overflow-x: auto;
            scroll-behavior: smooth;

            /* Ocultar barra de scroll estética */
            scrollbar-width: none;
            &::-webkit-scrollbar { display: none; }
        }

        .mascota-card {
            min-width: 280px;
            flex: 1;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 0;
            transition: transform 0.2s;
            &:hover { transform: translateY(-4px); }
        }

        .mascota-image { height: 160px; background-size: cover; background-position: center; }
        .mascota-header { display: flex; gap: 12px; margin: 16px 0 12px; }
        .mascota-info h3 { margin: 0; font-weight: 600; font-size: 1.1rem; }
        .mascota-info p { margin: 2px 0 0; font-size: 0.85rem; color: #666; }

        .carousel-button {
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 10;
            flex-shrink: 0;
            width: 40px; height: 40px;
        }

        /* --- APPOINTMENTS --- */
        .appointments-container { display: flex; flex-direction: column; gap: 16px; }

        .appointment-card {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            padding: 0 !important;
        }

        .color-strip { width: 100%; height: 14px; }

        .card-content-wrapper {
            padding: 16px 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .appointment-icon-wrapper mat-icon { font-size: 28px; width: 28px; height: 28px; }

        .appointment-details { display: flex; flex-direction: column; gap: 4px; }
        .appointment-title { margin: 0; font-size: 1.1rem; font-weight: 700; color: #333; }
        .appointment-pet { margin: 0; font-size: 0.95rem; color: #555; }

        .appointment-meta { margin-top: 8px; display: flex; flex-direction: column; gap: 2px; font-size: 0.9rem; }
        .date-text { color: #666; }
        .status-text { font-weight: 500; color: #666; }
        .status-text.overdue { color: #d32f2f; font-weight: 700; }

        .fab-container { margin-top: 24px; }
        .add-pet-btn { height: 56px !important; border-radius: 28px !important; font-weight: 600; font-size: 1rem; padding: 0 24px !important; }

        /* --- MEDIA QUERIES (RESPONSIVE) --- */
        @media (max-width: 768px) {
            .dashboard-content { padding: 16px; padding-bottom: 80px; }

            .page-header h1 { font-size: 1.5rem; }

            .stats-grid { grid-template-columns: 1fr; } /* 1 columna en móvil */

            .mascota-card {
                min-width: 85vw; /* En móvil la tarjeta ocupa casi todo el ancho */
                margin-right: 8px;
            }

            .carousel-container { gap: 0; }
        }
    `]
})
export class DashboardComponent implements OnInit {

    mobileQuery = false; // Variable para detectar móvil

    stats = [
        { icon: 'event', label: 'Citas Pendientes', value: '5', color: '#ff9800' },
        { icon: 'vaccines', label: 'Vacunas', value: '2', color: '#4caf50' },
    ];

    appointments = [
        {
            title: 'Vacuna Anual Rabia',
            pet: 'Fido (Golden Retriever)',
            date: 'Oct 25, 2024',
            status: 'upcoming',
            statusText: 'En 2 semanas',
            icon: 'vaccines',
            iconColor: '#ff9800'
        },
        {
            title: 'Chequeo General',
            pet: 'Luna (Gato Siamés)',
            date: 'Nov 5, 2024',
            status: 'overdue',
            statusText: 'Vencido',
            icon: 'medical_services',
            iconColor: '#f44336'
        }
    ];

    mascotas = [
        {
            nombre: 'Max', tipo: 'Perro', raza: 'Golden Retriever', edad: '3 años',
            imagen: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=300&fit=crop'
        },
        {
            nombre: 'Luna', tipo: 'Gato', raza: 'Persa', edad: '2 años',
            imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop'
        },
        {
            nombre: 'Rocky', tipo: 'Perro', raza: 'Bulldog', edad: '4 años',
            imagen: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop'
        },
        {
            nombre: 'Bella', tipo: 'Gato', raza: 'Siamés', edad: '2 años',
            imagen: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop'
        },
        {
            nombre: 'Charlie', tipo: 'Perro', raza: 'Labrador', edad: '5 años',
            imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop'
        }
    ];

    // Variables para el carrusel
    currentIndex = 0;
    visibleCards = 4;

    ngOnInit() {
        this.checkScreenSize();
    }

    // Listener para detectar cambios de tamaño de ventana
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenSize();
    }

    checkScreenSize() {
        const width = window.innerWidth;

        // Detectar si es móvil para ajustar titulos y grids
        this.mobileQuery = width < 768;

        // Lógica responsiva del carrusel (cuántas tarjetas mostrar)
        if (width < 768) {
            this.visibleCards = 1;
        } else if (width < 1280) {
            this.visibleCards = 2;
        } else {
            this.visibleCards = 4;
        }

        this.validateIndex();
    }

    validateIndex() {
        // Evita errores si cambias de tamaño y el índice queda fuera de rango
        if (this.currentIndex + this.visibleCards > this.mascotas.length) {
            this.currentIndex = Math.max(0, this.mascotas.length - this.visibleCards);
        }
    }

    // Helpers para el carrusel
    get visibleMascotas() {
        return this.mascotas.slice(this.currentIndex, this.currentIndex + this.visibleCards);
    }

    get canGoBack() { return this.currentIndex > 0; }
    get canGoForward() { return this.currentIndex + this.visibleCards < this.mascotas.length; }

    scrollLeft() { if (this.canGoBack) this.currentIndex--; }
    scrollRight() { if (this.canGoForward) this.currentIndex++; }
}