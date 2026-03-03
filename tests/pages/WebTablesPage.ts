import { Page, Locator } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;
  
  // Localizador del menú principal
  readonly menuElements: Locator;
  
  // Localizadores de la tabla
  readonly botonAdd: Locator;
  readonly campoBusqueda: Locator;
  readonly tabla: Locator;
  readonly filasTabla: Locator;
  
  // Localizadores del formulario de registro
  readonly campoFirstName: Locator;
  readonly campoLastName: Locator;
  readonly campoEmail: Locator;
  readonly campoAge: Locator;
  readonly campoSalary: Locator;
  readonly campoDepartment: Locator;
  readonly botonSubmit: Locator;
  
  // Localizadores de acciones en la tabla
  readonly botonesEdit: Locator;
  readonly botonesDelete: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Localizador para el menú Elements
    this.menuElements = page.locator('h5', { hasText: 'Elements' });
    
    // Localizadores de la tabla
    this.botonAdd = page.locator('#addNewRecordButton');
    this.campoBusqueda = page.locator('#searchBox');
    this.tabla = page.locator('.rt-tbody');  // Cambiado a rt-tbody para capturar el cuerpo de la tabla
    this.filasTabla = page.locator('.rt-tr-group');
    
    // Localizadores del formulario modal
    this.campoFirstName = page.locator('#firstName');
    this.campoLastName = page.locator('#lastName');
    this.campoEmail = page.locator('#userEmail');
    this.campoAge = page.locator('#age');
    this.campoSalary = page.locator('#salary');
    this.campoDepartment = page.locator('#department');
    this.botonSubmit = page.locator('#submit');
    
    // Botones de acciones en la tabla
    this.botonesEdit = page.locator('[id^="edit-record-"]');
    this.botonesDelete = page.locator('[id^="delete-record-"]');
  }

  /**
   * Navega a la página principal de DemoQA
   */
  async navegarUrl() {
    await this.page.goto('https://demoqa.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Hace clic en el menú Elements
   */
  async clickElements() {
    await this.menuElements.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navega directamente a la página de Web Tables
   */
  async navegarWebTables() {
    await this.page.goto('https://demoqa.com/webtables');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Abre el formulario para añadir un nuevo registro
   */
  async abrirFormularioNuevoRegistro() {
    await this.botonAdd.click();
    // Esperar a que el modal sea visible
    await this.page.waitForSelector('.modal-content', { state: 'visible' });
  }

  /**
   * Llena el formulario con los datos del usuario
   * @param datos - Objeto con los datos del usuario
   */
  async llenarFormularioRegistro(datos: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
  }) {
    // Esperar a que los campos estén visibles y listos
    await this.campoFirstName.waitFor({ state: 'visible' });
    
    // Limpiar y llenar cada campo con una pequeña espera entre cada uno
    await this.campoFirstName.clear();
    await this.campoFirstName.fill(datos.firstName);
    await this.page.waitForTimeout(100);
    
    await this.campoLastName.clear();
    await this.campoLastName.fill(datos.lastName);
    await this.page.waitForTimeout(100);
    
    await this.campoEmail.clear();
    await this.campoEmail.fill(datos.email);
    await this.page.waitForTimeout(100);
    
    await this.campoAge.clear();
    await this.campoAge.fill(datos.age);
    await this.page.waitForTimeout(100);
    
    await this.campoSalary.clear();
    await this.campoSalary.fill(datos.salary);
    await this.page.waitForTimeout(100);
    
    await this.campoDepartment.clear();
    await this.campoDepartment.fill(datos.department);
    await this.page.waitForTimeout(100);
  }

  /**
   * Envía el formulario de registro
   */
  async enviarFormulario() {
    await this.botonSubmit.click();
    // Esperar a que el modal se cierre completamente
    await this.page.waitForSelector('.modal-content', { state: 'hidden', timeout: 3000 });
    // Esperar un momento adicional para que la tabla se actualice
    await this.page.waitForTimeout(1000);
  }

  /**
   * Busca un registro en la tabla usando el campo de búsqueda
   * @param textoBusqueda - Texto a buscar en la tabla
   */
  async buscarRegistro(textoBusqueda: string) {
    await this.campoBusqueda.clear();
    await this.campoBusqueda.fill(textoBusqueda);
    // Esperar un momento para que se filtre la tabla
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verifica si un registro existe en la tabla
   * @param textoBusqueda - Texto a verificar
   * @returns true si el registro existe, false si no
   */
  async verificarRegistroExiste(textoBusqueda: string): Promise<boolean> {
    // Esperar un momento para que la tabla se actualice
    await this.page.waitForTimeout(1000);
    
    // Estrategia simple: buscar en todo el cuerpo de la página
    const textoCompleto = await this.page.locator('body').textContent();
    
    // Verificar si el texto está presente
    return textoCompleto !== null && textoCompleto.includes(textoBusqueda);
  }

  /**
   * Obtiene el número de filas visibles en la tabla (excluyendo las vacías)
   * @returns Número de filas con datos
   */
  async obtenerNumeroFilasConDatos(): Promise<number> {
    // Esperar un momento para asegurar que la tabla está actualizada
    await this.page.waitForTimeout(500);
    
    // Contar filas que tienen un botón de editar visible (indica que hay datos)
    const botonesEditVisibles = await this.botonesEdit.count();
    return botonesEditVisibles;
  }

  /**
   * Edita un registro buscándolo primero
   * @param nombreBuscar - Nombre del registro a editar
   * @param nuevosDatos - Nuevos datos para el registro
   */
  async editarRegistro(nombreBuscar: string, nuevosDatos: {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
    salary?: string;
    department?: string;
  }) {
    // Buscar el registro primero
    await this.buscarRegistro(nombreBuscar);
    
    // Hacer clic en el botón de editar de la primera fila visible
    await this.botonesEdit.first().click();
    
    // Esperar a que el modal sea visible
    await this.page.waitForSelector('.modal-content', { state: 'visible' });
    
    // Actualizar solo los campos que se proporcionaron
    if (nuevosDatos.firstName) {
      await this.campoFirstName.clear();
      await this.campoFirstName.fill(nuevosDatos.firstName);
    }
    if (nuevosDatos.lastName) {
      await this.campoLastName.clear();
      await this.campoLastName.fill(nuevosDatos.lastName);
    }
    if (nuevosDatos.email) {
      await this.campoEmail.clear();
      await this.campoEmail.fill(nuevosDatos.email);
    }
    if (nuevosDatos.age) {
      await this.campoAge.clear();
      await this.campoAge.fill(nuevosDatos.age);
    }
    if (nuevosDatos.salary) {
      await this.campoSalary.clear();
      await this.campoSalary.fill(nuevosDatos.salary);
    }
    if (nuevosDatos.department) {
      await this.campoDepartment.clear();
      await this.campoDepartment.fill(nuevosDatos.department);
    }
  }

  /**
   * Elimina un registro buscándolo primero
   * @param nombreBuscar - Nombre del registro a eliminar
   */
  async eliminarRegistro(nombreBuscar: string) {
    // Buscar el registro primero
    await this.buscarRegistro(nombreBuscar);
    
    // Esperar un momento para asegurar que la tabla se actualizó
    await this.page.waitForTimeout(500);
    
    // Hacer clic en el botón de eliminar de la primera fila visible
    await this.botonesDelete.first().click();
    
    // Esperar a que se complete la eliminación
    await this.page.waitForTimeout(500);
  }

  /**
   * Limpia el campo de búsqueda para mostrar todos los registros
   */
  async limpiarBusqueda() {
    await this.campoBusqueda.clear();
    await this.page.waitForTimeout(500);
  }
}
