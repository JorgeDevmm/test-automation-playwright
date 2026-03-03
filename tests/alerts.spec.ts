import { test, expect } from '@playwright/test';
import { AlertsPage } from './pages/AlertsPage';

test.describe('Pregunta 4B - Manejo de Alertas JavaScript', () => {
  let paginaAlerts: AlertsPage;

  test.beforeEach(async ({ page }) => {
    paginaAlerts = new AlertsPage(page);

    // Navegar al home de DemoQA (https://demoqa.com)
    await paginaAlerts.navegarUrl();
    
    // Hacer clic en el menú "Alerts, Frame & Windows"
    await paginaAlerts.clickAlertFrame();
    
    // Navegar a la página de Alerts
    await paginaAlerts.navegarAlerts();
  });

  test('TC001 - Click en alert button y aceptar el alert', async ({ page }) => {
    // Hacer clic en el botón de alert y aceptarlo
    const mensajeAlert = await paginaAlerts.clickYAceptarAlertSimple();
    
    // Verificar que se capturó el mensaje del alert
    expect(mensajeAlert).toBeTruthy();
    expect(mensajeAlert.length).toBeGreaterThan(0);
    console.log(`Alert aceptado exitosamente`);
    console.log(`Mensaje capturado: "${mensajeAlert}"`);
    
    // Validación adicional: Verificar que el alert se cerró (la página sigue funcionando)
    const botonVisible = await paginaAlerts.botonAlertSimple.isVisible();
    expect(botonVisible).toBeTruthy();
    console.log('Estado posterior verificado: La página sigue funcionando correctamente');
  });

  test('TC002 - Click en confirm alert y aceptar (OK)', async ({ page }) => {
    // Hacer clic en confirm y aceptar
    const mensajeConfirm = await paginaAlerts.clickYAceptarConfirm();
    
    // Verificar que se capturó el mensaje
    expect(mensajeConfirm).toBeTruthy();
    console.log(`Confirm detectado: "${mensajeConfirm}"`);
    
    // Verificar el mensaje de resultado en la página
    const mensajeResultado = await paginaAlerts.obtenerMensajeResultadoConfirm();
    expect(mensajeResultado).toContain('Ok');
    console.log(`Resultado en la página: "${mensajeResultado}"`);
    console.log('Validación completa: El confirm fue aceptado correctamente');
  });

  test('TC003 - Click en confirm alert y cancelar', async ({ page }) => {
    // Hacer clic en confirm y cancelar
    const mensajeConfirm = await paginaAlerts.clickYCancelarConfirm();
    
    // Verificar que se capturó el mensaje
    expect(mensajeConfirm).toBeTruthy();
    console.log(`Confirm detectado: "${mensajeConfirm}"`);
    
    // Verificar el mensaje de resultado en la página (debe indicar cancelación)
    const mensajeResultado = await paginaAlerts.obtenerMensajeResultadoConfirm();
    expect(mensajeResultado).toContain('Cancel');
    console.log(`Resultado en la página: "${mensajeResultado}"`);
    console.log('Validación completa: El confirm fue cancelado correctamente');
  });

  test('TC004 - Click en prompt alert y capturar el texto ingresado', async ({ page }) => {
    // Definir el texto que vamos a ingresar
    const textoAIngresar = 'Jorge Rodriguez';
    console.log(`Texto a ingresar en el prompt: "${textoAIngresar}"`);
    
    // Hacer clic en prompt e ingresar el texto
    const mensajePrompt = await paginaAlerts.clickYResponderPrompt(textoAIngresar);
    
    // Verificar que se capturó el mensaje del prompt
    expect(mensajePrompt).toBeTruthy();
    console.log(`Prompt detectado: "${mensajePrompt}"`);
    
    // Verificar que el texto ingresado aparece en el resultado
    const mensajeResultado = await paginaAlerts.obtenerMensajeResultadoPrompt();
    expect(mensajeResultado).toContain(textoAIngresar);
    console.log(`✓ Resultado en la página: "${mensajeResultado}"`);
    console.log(`✓ Validación completa: El texto "${textoAIngresar}" fue capturado correctamente`);
  });
});
