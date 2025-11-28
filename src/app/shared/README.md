# 🔄 Shared Module

Componentes, pipes y directivas reutilizables en toda la app.

## Estructura Recomendada

```
shared/
├── components/     # Componentes reutilizables
├── pipes/          # Pipes personalizados
└── directives/     # Directivas custom
```

## Ejemplos de Uso

### Componente
```typescript
// components/card/card.component.ts
@Component({
  selector: 'app-card',
  standalone: true,
  template: '<div class="card"><ng-content></ng-content></div>'
})
export class CardComponent {}
```

### Pipe
```typescript
// pipes/format-raza.pipe.ts
@Pipe({ name: 'formatRaza', standalone: true })
export class FormatRazaPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
```

### Directiva
```typescript
// directives/highlight.directive.ts
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {}
```
