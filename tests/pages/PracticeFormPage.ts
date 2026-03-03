import { Page, Locator } from '@playwright/test';

export class PracticeFormPage {
  readonly page: Page;
  
  // Localizadores
  readonly campoNombre: Locator;
  readonly campoApellido: Locator;
  readonly campoEmail: Locator;
  readonly campoMovil: Locator;
  readonly campoFechaNacimiento: Locator;
  readonly campoMateria: Locator;
  readonly campoDireccionActual: Locator;
  readonly botonEnviar: Locator;
  readonly modalConfirmacion: Locator;
  readonly tituloModal: Locator;
  readonly contenidoModal: Locator;
  readonly botonCerrarModal: Locator;

  // localizador para el menú Forms 
  readonly menuForms: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.campoNombre = page.locator('#firstName');
    this.campoApellido = page.locator('#lastName');
    this.campoEmail = page.locator('#userEmail');
    this.campoMovil = page.locator('#userNumber');
    this.campoFechaNacimiento = page.locator('#dateOfBirthInput');
    this.campoMateria = page.locator('#subjectsInput');
    this.campoDireccionActual = page.locator('#currentAddress');
    this.botonEnviar = page.locator('#submit');
    this.modalConfirmacion = page.locator('.modal-content');
    this.tituloModal = page.locator('#example-modal-sizes-title-lg');
    this.contenidoModal = page.locator('.modal-body');
    this.botonCerrarModal = page.locator('#closeLargeModal');

    // Localizador para el menu del previo al formulario
    this.menuForms = page.locator('h5', { hasText: 'Forms' });
  }

  async navegarUrl(){
    await this.page.goto('https://demoqa.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickFormulario(){
    await this.menuForms.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navegarAlFormulario() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async llenarNombre(nombre: string) {
    await this.campoNombre.waitFor({ state: 'visible' });
    await this.campoNombre.fill(nombre);
  }

  async llenarApellido(apellido: string) {
    await this.campoApellido.fill(apellido);
  }

  async llenarEmail(email: string) {
    await this.campoEmail.fill(email);
  }

  async seleccionarGenero(genero: 'Male' | 'Female' | 'Other') {
    // Selector más específico para evitar ambigüedad
    await this.page.locator(`label[for="gender-radio-${genero === 'Male' ? '1' : genero === 'Female' ? '2' : '3'}"]`).click();
  }

  async llenarMovil(movil: string) {
    await this.campoMovil.fill(movil);
  }

  async seleccionarFechaNacimiento(dia: string, mes: string, anio: string) {
    await this.campoFechaNacimiento.click();
    await this.page.selectOption('.react-datepicker__month-select', mes);
    await this.page.selectOption('.react-datepicker__year-select', anio);
    await this.page.locator(`.react-datepicker__day--0${dia}:not(.react-datepicker__day--outside-month)`).first().click();
  }

  async seleccionarHobby(hobby: string) {
    // Selector para hobbies
    const hobbyMap: { [key: string]: string } = {
      'Sports': '1',
      'Reading': '2',
      'Music': '3'
    };
    await this.page.locator(`label[for="hobbies-checkbox-${hobbyMap[hobby]}"]`).click();
  }

  async llenarDireccionActual(direccion: string) {
    await this.campoDireccionActual.fill(direccion);
  }

  async enviarFormulario() {
    await this.botonEnviar.scrollIntoViewIfNeeded();
    await this.botonEnviar.click();
  }

  async esperarModalConfirmacion() {
    await this.modalConfirmacion.waitFor({ state: 'visible', timeout: 5000 });
  }

  async esModalConfirmacionVisible(): Promise<boolean> {
    return await this.modalConfirmacion.isVisible();
  }

  async obtenerTituloModal(): Promise<string> {
    return await this.tituloModal.textContent() || '';
  }

  async verificarTextoConfirmacion(nombreCompleto: string): Promise<boolean> {
    const contenido = await this.contenidoModal.textContent();
    return contenido?.includes(nombreCompleto) || false;
  }

  async cerrarModal() {
    await this.botonCerrarModal.click();
  }
}
