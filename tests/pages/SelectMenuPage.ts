import { Page, Locator } from '@playwright/test';

export class SelectMenuPage {
  readonly page: Page;
  
  // Localizadores del menú principal
  readonly menuWidgets: Locator;
  
  // Localizadores de los dropdowns
  readonly selectValueDropdown: Locator;
  readonly selectOneDropdown: Locator;
  readonly oldStyleSelectMenu: Locator;
  readonly multiselectDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Localizador para el menú Widgets
    this.menuWidgets = page.locator('h5', { hasText: 'Widgets' });
    
    // Select Value dropdown
    this.selectValueDropdown = page.locator('#withOptGroup');
    
    // Select One dropdown
    this.selectOneDropdown = page.locator('#selectOne');
    
    // Old Style Select Menu
    this.oldStyleSelectMenu = page.locator('#oldSelectMenu');
    
    // Multiselect dropdown
    this.multiselectDropdown = page.locator('#selectMenuContainer .css-1hwfws3');
  }

  async navegarUrl(){
    await this.page.goto('https://demoqa.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickWidgets(){
    await this.menuWidgets.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navegarSelectMenu() {
    await this.page.goto('https://demoqa.com/select-menu');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Selecciona una opción en el dropdown "Select Value"
   * @param optionText - Texto completo de la opción a seleccionar (ej: "Group 1, option 1")
   */
  async seleccionarSelectValue(optionText: string) {
    // Hacer clic en el dropdown "Select Value" para abrirlo
    await this.selectValueDropdown.click();
    // Esperar un breve momento para que el menú se despliegue
    await this.page.waitForTimeout(1000);
    // Seleccionar la opción específica buscando cualquier elemento visible con ese texto exacto
    await this.page.getByText(optionText, { exact: true }).click();
  }

  /**
   * Obtiene el valor seleccionado en "Select Value"
   * @returns El texto del valor seleccionado
   */
  async obtenerValorSelectValue(): Promise<string> {
    // Esperar un breve momento para que se actualice el valor
    await this.page.waitForTimeout(300);
    // Buscar el elemento que contiene el valor seleccionado usando una clase más específica
    const valorElement = this.selectValueDropdown.locator('div[class*="singleValue"]');
    const texto = await valorElement.textContent() || '';
    return texto.trim();
  }

  /**
   * Selecciona una opción en el dropdown "Select One"
   * @param optionText - Texto de la opción (ej: "Mr.", "Mrs.", "Ms.", "Prof.", "Dr.")
   */
  async seleccionarSelectOne(optionText: string) {
    // Hacer clic en el dropdown "Select One" para abrirlo
    await this.selectOneDropdown.click();
    // Esperar un breve momento para que el menú se despliegue
    await this.page.waitForTimeout(1000);
    // Seleccionar la opción específica buscando cualquier elemento visible con ese texto exacto
    await this.page.getByText(optionText, { exact: true }).click();
  }

  /**
   * Obtiene el valor seleccionado en "Select One"
   * @returns El texto del valor seleccionado
   */
  async obtenerValorSelectOne(): Promise<string> {
    // Esperar un breve momento para que se actualice el valor
    await this.page.waitForTimeout(300);
    // Buscar el elemento que contiene el valor seleccionado usando una clase más específica
    const valorElement = this.selectOneDropdown.locator('div[class*="singleValue"]');
    const texto = await valorElement.textContent() || '';
    return texto.trim();
  }

  /**
   * Selecciona opciones del "Old Style Select Menu"
   * @param color - Color a seleccionar (ej: "Red", "Blue", "Green", etc.)
   */
  async seleccionarOldStyleMenu(color: string) {
    await this.oldStyleSelectMenu.selectOption({ label: color });
  }

  /**
   * Obtiene el valor seleccionado en el "Old Style Select Menu"
   * @returns El texto del valor seleccionado
   */
  async obtenerValorOldStyleMenu(): Promise<string> {
    return await this.oldStyleSelectMenu.inputValue();
  }

  /**
   * Verifica si un dropdown está visible
   */
  async esDropdownVisible(dropdown: Locator): Promise<boolean> {
    return await dropdown.isVisible();
  }
}
