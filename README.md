# Test Automation - Playwright TypeScript

Proyecto de automatización de pruebas para DemoQA usando Playwright con TypeScript y el patrón Page Object Model.

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Playwright instalado

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## 🧪 Ejecución de Pruebas

### Ejecutar TODAS las preguntas

```bash
npx playwright test
```

> **Nota**: Son 6 archivos de prueba en total (la Pregunta 4 se divide en 4A y 4B)

### Ejecutar por pregunta individual

#### **Pregunta 1** - Automatizar el formulario de registro

**URL**: https://demoqa.com/automation-practice-form

Completa el formulario de práctica con nombre, apellido, email, género, móvil, hobbies y fecha de nacimiento. Verifica el modal de confirmación.

```bash
npx playwright test practiceForm.spec.ts
```

#### **Pregunta 2** - Seleccionar opciones en menú desplegable

**URL**: https://demoqa.com/select-menu

Automatiza la selección de opciones en varios dropdowns y valida que los valores se reflejen correctamente.

```bash
npx playwright test selectMenu.spec.ts
```

#### **Pregunta 3** - Trabajar con tablas web

**URL**: https://demoqa.com/webtables

Añade, busca, edita y elimina registros en una tabla web.

```bash
npx playwright test webTables.spec.ts
```

#### **Pregunta 4A** - Manejo de modales

**URL**: https://demoqa.com/modal-dialogs

Automatiza interacciones con ventanas modales (abrir y cerrar modales pequeños y grandes).

```bash
npx playwright test modalDialogs.spec.ts
```

#### **Pregunta 4B** - Manejo de alertas

**URL**: https://demoqa.com/alerts

Automatiza diferentes tipos de alertas JavaScript (alert, confirm, prompt).

```bash
npx playwright test alerts.spec.ts
```

#### **Pregunta 5** - Acciones avanzadas y Drag & Drop

**URL**: https://demoqa.com/droppable

Automatiza drag & drop, verificando cambios de color/texto y probando escenarios alternativos.

```bash
npx playwright test droppable.spec.ts
```

## 📊 Reportes

### Ejecutar con reporte en lista

```bash
npx playwright test --reporter=list
```

## 🐛 Modo Debug

```bash
# Debug de una pregunta específica
npx playwright test practiceForm.spec.ts --debug

# Con navegador visible
npx playwright test practiceForm.spec.ts --headed
```

## ⚙️ Configuración

- **Navegadores**: Chromium, Firefox, WebKit
- **Workers**: Configurados para ejecución paralela
- **Timeouts**: 30 segundos por test
- **Screenshots**: Se toman en caso de fallo
- **Videos**: Se graban en caso de fallo

## 📁 Estructura del Proyecto

```
test-automation-playwright/
├── tests/
│   ├── practiceForm.spec.ts      # Pregunta 1
│   ├── selectMenu.spec.ts        # Pregunta 2
│   ├── webTables.spec.ts         # Pregunta 3
│   ├── modalDialogs.spec.ts      # Pregunta 4A
│   ├── alerts.spec.ts            # Pregunta 4B
│   ├── droppable.spec.ts         # Pregunta 5
│   └── pages/
│       ├── PracticeFormPage.ts
│       ├── SelectMenuPage.ts
│       ├── WebTablesPage.ts
│       ├── ModalDialogsPage.ts
│       ├── AlertsPage.ts
│       └── DroppablePage.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## 📝 Notas Técnicas

- Se utilizan **esperas inteligentes** (`waitForSelector`, `waitForLoadState`) en lugar de esperas fijas
- Código **modular y con comentarios** para fácil comprensión

## 🏆 Cobertura de Preguntas

| Pregunta | Descripción            | Status |
| -------- | ---------------------- | ------ |
| 1        | Formulario de registro | ✅     |
| 2        | Menús desplegables     | ✅     |
| 3        | Tablas web             | ✅     |
| 4A       | Modales                | ✅     |
| 4B       | Alertas                | ✅     |
| 5        | Drag & Drop            | ✅     |

---

**Autor**: Jorge  
**Framework**: Playwright v1.x  
**Lenguaje**: TypeScript
