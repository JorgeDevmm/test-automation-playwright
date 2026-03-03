import { Page, Locator } from '@playwright/test';

export class AlertsPage {
  readonly page: Page;
  
  // Localizador del menú principal
  readonly menuAlertsFrameWindows: Locator;
  
  // Localizadores de botones de alertas
  readonly botonAlertSimple: Locator;
  readonly botonAlertConfirm: Locator;
  readonly botonAlertPrompt: Locator;
  
  // Localizadores de mensajes de resultado
  readonly mensajeResultadoConfirm: Locator;
  readonly mensajeResultadoPrompt: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Localizador para el menú Alerts, Frame & Windows
    this.menuAlertsFrameWindows = page.locator('h5', { hasText: 'Alerts, Frame & Windows' });
    
    // Botones de alertas
    this.botonAlertSimple = page.locator('#alertButton');
    this.botonAlertConfirm = page.locator('#confirmButton');
    this.botonAlertPrompt = page.locator('#promtButton'); // Nota: tiene un typo en el HTML original
    
    // Mensajes de resultado
    this.mensajeResultadoConfirm = page.locator('#confirmResult');
    this.mensajeResultadoPrompt = page.locator('#promptResult');
  }

  /**
   * Navega a la página principal de DemoQA
   */
  async navegarUrl() {
    await this.page.goto('https://demoqa.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Hace clic en el menú Alerts, Frame & Windows
   */
  async clickAlertFrame() {
    await this.menuAlertsFrameWindows.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navega directamente a la página de Alerts
   */
  async navegarAlerts() {
    await this.page.goto('https://demoqa.com/alerts');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Hace clic en el botón de alerta simple y acepta el alert
   * @returns El mensaje del alert
   */
  async clickYAceptarAlertSimple(): Promise<string> {
    let mensajeAlert = '';
    
    // Configurar el listener para capturar el alert antes de que aparezca
    this.page.once('dialog', async dialog => {
      mensajeAlert = dialog.message();
      console.log(`📢 Alert detectado: "${mensajeAlert}"`);
      await dialog.accept(); // Aceptar el alert
    });
    
    // Hacer clic en el botón que dispara el alert
    await this.botonAlertSimple.click();
    
    // Esperar un momento para asegurar que el alert fue manejado
    await this.page.waitForTimeout(500);
    
    return mensajeAlert;
  }

  /**
   * Hace clic en el botón de confirm alert y acepta
   * @returns El mensaje del confirm
   */
  async clickYAceptarConfirm(): Promise<string> {
    let mensajeConfirm = '';
    
    // Configurar el listener para el dialog de confirmación
    this.page.once('dialog', async dialog => {
      mensajeConfirm = dialog.message();
      console.log(`📢 Confirm detectado: "${mensajeConfirm}"`);
      await dialog.accept(); // Aceptar (OK)
    });
    
    // Hacer clic en el botón
    await this.botonAlertConfirm.click();
    
    // Esperar a que aparezca el mensaje de resultado
    await this.page.waitForTimeout(500);
    
    return mensajeConfirm;
  }

  /**
   * Hace clic en el botón de confirm alert y cancela
   * @returns El mensaje del confirm
   */
  async clickYCancelarConfirm(): Promise<string> {
    let mensajeConfirm = '';
    
    // Configurar el listener para el dialog de confirmación
    this.page.once('dialog', async dialog => {
      mensajeConfirm = dialog.message();
      console.log(`📢 Confirm detectado: "${mensajeConfirm}"`);
      await dialog.dismiss(); // Cancelar
    });
    
    // Hacer clic en el botón
    await this.botonAlertConfirm.click();
    
    // Esperar a que aparezca el mensaje de resultado
    await this.page.waitForTimeout(500);
    
    return mensajeConfirm;
  }

  /**
   * Obtiene el mensaje de resultado del confirm
   * @returns El texto del mensaje resultante
   */
  async obtenerMensajeResultadoConfirm(): Promise<string> {
    return await this.mensajeResultadoConfirm.textContent() || '';
  }

  /**
   * Hace clic en el botón de prompt alert e ingresa un texto
   * @param textoAIngresar - El texto que se ingresará en el prompt
   * @returns El mensaje del prompt
   */
  async clickYResponderPrompt(textoAIngresar: string): Promise<string> {
    let mensajePrompt = '';
    
    // Configurar el listener para el dialog de prompt
    this.page.once('dialog', async dialog => {
      mensajePrompt = dialog.message();
      console.log(`📢 Prompt detectado: "${mensajePrompt}"`);
      console.log(`⌨️  Ingresando texto: "${textoAIngresar}"`);
      await dialog.accept(textoAIngresar); // Aceptar e ingresar el texto
    });
    
    // Hacer clic en el botón
    await this.botonAlertPrompt.click();
    
    // Esperar a que aparezca el mensaje de resultado
    await this.page.waitForTimeout(500);
    
    return mensajePrompt;
  }

  /**
   * Obtiene el mensaje de resultado del prompt
   * @returns El texto del mensaje resultante
   */
  async obtenerMensajeResultadoPrompt(): Promise<string> {
    return await this.mensajeResultadoPrompt.textContent() || '';
  }
}
