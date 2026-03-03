import { test, expect } from '@playwright/test';
import { ModalDialogsPage } from './pages/ModalDialogsPage';

test.describe('Pregunta 4A - Manejo de Modal Dialogs', () => {
  let paginaModalDialogs: ModalDialogsPage;

  test.beforeEach(async ({ page }) => {
    paginaModalDialogs = new ModalDialogsPage(page);

    // Navegar al home de DemoQA (https://demoqa.com)
    await paginaModalDialogs.navegarUrl();
    
    // Hacer clic en el menú "Alerts, Frame & Windows"
    await paginaModalDialogs.clickAlertFrame();
    
    // Navegar a la página de Modal Dialogs
    await paginaModalDialogs.navegarModalDialogs();
  });

  test('TC001 - Abrir modal pequeño y cerrarlo', async ({ page }) => {
    // Verificar que el modal no está visible al inicio
    const modalNoVisible = await paginaModalDialogs.esModalPequenoCerrado();
    expect(modalNoVisible).toBeTruthy();
    console.log('Estado inicial: Modal pequeño no está visible');

    // Abrir el modal pequeño
    await paginaModalDialogs.abrirModalPequeno();
    console.log('Acción: Modal pequeño abierto');

    // Verificar que el modal está visible y tiene contenido
    const modalVisible = await paginaModalDialogs.esModalPequenoVisible();
    expect(modalVisible).toBeTruthy();
    
    const titulo = await paginaModalDialogs.obtenerTituloModalPequeno();
    expect(titulo).toBeTruthy();
    console.log(`Validación: Modal visible con título "${titulo}"`);

    // Cerrar el modal
    await paginaModalDialogs.cerrarModalPequeno();
    console.log('Acción: Modal pequeño cerrado');

    // Verificar que el modal se cerró correctamente
    const modalCerrado = await paginaModalDialogs.esModalPequenoCerrado();
    expect(modalCerrado).toBeTruthy();
    console.log('Validación: Modal pequeño ya no está visible');
  });

  test('TC002 - Abrir modal grande y cerrarlo', async ({ page }) => {
    // Verificar estado inicial
    console.log('Preparación: Verificando estado inicial');

    // Abrir modal grande
    await paginaModalDialogs.abrirModalGrande();
    console.log('Acción: Modal grande abierto');

    // Verificar que el modal está visible
    const modalVisible = await paginaModalDialogs.esModalGrandeVisible();
    expect(modalVisible).toBeTruthy();
    console.log('Validación: Modal grande está visible');

    // Cerrar el modal grande
    await paginaModalDialogs.cerrarModalGrande();
    console.log('Acción: Modal grande cerrado');

    // Verificar que se cerró correctamente
    await page.waitForTimeout(500);
    const modalCerrado = !(await paginaModalDialogs.esModalGrandeVisible());
    expect(modalCerrado).toBeTruthy();
    console.log('Validación: Modal grande ya no está visible');
  });
});
