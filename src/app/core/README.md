# 📦 Core Module

Aquí van los servicios, modelos y guards globales de la aplicación.

## Estructura Recomendada

```
core/
├── services/       # Servicios singleton (API, Auth, etc)
├── models/         # Interfaces y modelos de datos
├── guards/         # Route guards (auth, permissions)
└── interceptors/   # HTTP interceptors
```

## Ejemplos de Uso

### Servicio
```typescript
// services/api.service.ts
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
}
```

### Modelo
```typescript
// models/cachorro.model.ts
export interface Cachorro {
  id: string;
  nombre: string;
  raza: string;
}
```

### Guard
```typescript
// guards/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  // Tu lógica de autenticación
};
```
