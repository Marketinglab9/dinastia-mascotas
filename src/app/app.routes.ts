import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // Lazy Loading del Layout
        loadComponent: () => import('./layouts/main-layout/main-layout.component')
            .then(m => m.MainLayoutComponent),
        children: [
            // Redirección inicial
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                // Ruta para ver la lista
                path: 'mascotas',
                loadComponent: () => import('./features/mis-mascotas/mis-mascotas.component')
                    .then(m => m.MisMascotasComponent)
            },
            {
                // NUEVA RUTA: Formulario para añadir (Insertada correctamente)
                path: 'mascotas/nueva',
                loadComponent: () => import('./features/mis-mascotas/anadir-mascota.component')
                    .then(m => m.AnadirMascotaComponent)
            },
            {
                path: 'calendario',
                loadComponent: () => import('./features/calendario/calendario.component')
                    .then(m => m.CalendarioComponent)
            },
            {
                path: 'configuracion',
                loadComponent: () => import('./features/configuracion/configuracion.component')
                    .then(m => m.ConfiguracionComponent)
            }
        ]
    },

    // Ruta de seguridad
    { path: '**', redirectTo: 'dashboard' }
];