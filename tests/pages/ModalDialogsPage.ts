import { Page, Locator } from '@playwright/test';

export class ModalDialogsPage {
  readonly page: Page;
  
  // Localizador del menú principal
  readonly menuAlertsFrameWindows: Locator;
  
  // Localizadores de botones de modales
  readonly botonSmallModal: Locator;
  readonly botonLargeModal: Locator;
  
  // Localizadores del modal pequeño
  readonly modalSmall: Locator;
  readonly tituloModalSmall: Locator;
  readonly contenidoModalSmall: Locator;
  readonly botonCerrarSmall: Locator;
  
  // Localizadores del modal grande
  readonly modalLarge: Locator;
  readonly tituloModalLarge: Locator;
  readonly contenidoModalLarge: Locator;
  readonly botonCerrarLarge: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Localizador para el menú Alerts, Frame & Windows
    this.menuAlertsFrameWindows = page.locator('h5', { hasText: 'Alerts, Frame & Windows' });
    
    // Botones para abrir modales
    this.botonSmallModal = page.locator('#showSmallModal');
    this.botonLargeModal = page.locator('#showLargeModal');
    
    // Elementos del modal pequeño
    this.modalSmall = page.locator('.modal-content');
    this.tituloModalSmall = page.locator('#example-modal-sizes-title-sm');
    this.contenidoModalSmall = page.locator('.modal-body');
    this.botonCerrarSmall = page.locator('#closeSmallModal');
    
    // Elementos del modal grande
    this.modalLarge = page.locator('.modal-content');
    this.tituloModalLarge = page.locator('#example-modal-sizes-title-lg');
    this.contenidoModalLarge = page.locator('.modal-body');
    this.botonCerrarLarge = page.locator('#closeLargeModal');
  }

  /**
   * Navega a la página principal de DemoQA
   */
  async navegarUrl() {
    await this.page.goto('https://demoqa.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Hace clic en el menú Alerts, Frame & Windows
  async clickAlertFrame() {
    await this.menuAlertsFrameWindows.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Navega directamente a la página de Modal Dialogs
  async navegarModalDialogs() {
    await this.page.goto('https://demoqa.com/modal-dialogs');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Abre el modal pequeño haciendo clic en el botón
  async abrirModalPequeno() {
    await this.botonSmallModal.click();
    // Esperar a que el modal sea visible
    await this.modalSmall.waitFor({ state: 'visible', timeout: 3000 });
  }

  /**
   * Verifica si el modal pequeño está visible
   * @returns true si el modal está visible, false si no
   */
  async esModalPequenoVisible(): Promise<boolean> {
    return await this.modalSmall.isVisible();
  }

  /**
   * Obtiene el título del modal pequeño
   * @returns El texto del título
   */
  async obtenerTituloModalPequeno(): Promise<string> {
    return await this.tituloModalSmall.textContent() || '';
  }

  /**
   * Obtiene el contenido del modal pequeño
   * @returns El texto del contenido
   */
  async obtenerContenidoModalPequeno(): Promise<string> {
    return await this.contenidoModalSmall.textContent() || '';
  }

  /**
   * Cierra el modal pequeño haciendo clic en el botón de cerrar
   */
  async cerrarModalPequeno() {
    await this.botonCerrarSmall.click();
    // Esperar a que el modal se cierre completamente
    await this.modalSmall.waitFor({ state: 'hidden', timeout: 3000 });
  }

  /**
   * Verifica si el modal pequeño está cerrado (no visible)
   * @returns true si el modal está oculto, false si está visible
   */
  async esModalPequenoCerrado(): Promise<boolean> {
    return !(await this.modalSmall.isVisible());
  }

  /**
   * Abre el modal grande haciendo clic en el botón
   */
  async abrirModalGrande() {
    await this.botonLargeModal.click();
    // Esperar a que el modal sea visible
    await this.modalLarge.waitFor({ state: 'visible', timeout: 3000 });
  }

  // Cierra el modal grande haciendo clic en el botón de cerrar
  async cerrarModalGrande() {
    await this.botonCerrarLarge.click();
    // Esperar a que el modal se cierre completamente
    await this.modalLarge.waitFor({ state: 'hidden', timeout: 3000 });
  }

  /**
   * Verifica si el modal grande está visible
   * @returns true si el modal está visible, false si no
   */
  async esModalGrandeVisible(): Promise<boolean> {
    return await this.modalLarge.isVisible();
  }
}
