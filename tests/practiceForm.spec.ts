import { test, expect } from '@playwright/test';
import { PracticeFormPage } from './pages/PracticeFormPage';

test.describe('Formulario de Práctica - Pruebas de Automatización', () => {
  let paginaFormulario: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    paginaFormulario = new PracticeFormPage(page);

    await paginaFormulario.navegarUrl(); // entra al home de DemoQA 
    await paginaFormulario.clickFormulario(); // hace clic en el menú Forms
    await paginaFormulario.navegarAlFormulario();// navegar al formulario
  });

  test('TC001 - Llenar y enviar formulario completo con datos válidos', async ({ page }) => {
    // Datos de prueba
    const datosPrueba = {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      genero: 'Male' as const,
      movil: '1234567890',
      dia: '15',
      mes: '2', // Marzo (0-indexed)
      anio: '1990',
      hobby: 'Sports',
      direccion: 'Calle Principal #123, Ciudad, País'
    };

    // Act - Llenar formulario
    await paginaFormulario.llenarNombre(datosPrueba.nombre);
    await paginaFormulario.llenarApellido(datosPrueba.apellido);
    await paginaFormulario.llenarEmail(datosPrueba.email);
    await paginaFormulario.seleccionarGenero(datosPrueba.genero);
    await paginaFormulario.llenarMovil(datosPrueba.movil);
    await paginaFormulario.seleccionarFechaNacimiento(datosPrueba.dia, datosPrueba.mes, datosPrueba.anio);
    await paginaFormulario.seleccionarHobby(datosPrueba.hobby);
    await paginaFormulario.llenarDireccionActual(datosPrueba.direccion);
    
    // Enviar formulario
    await paginaFormulario.enviarFormulario();
    
    // Assert - Verificar modal de confirmación
    await paginaFormulario.esperarModalConfirmacion();
    
    const esModalVisible = await paginaFormulario.esModalConfirmacionVisible();
    expect(esModalVisible).toBeTruthy();

    const tituloModal = await paginaFormulario.obtenerTituloModal();
    expect(tituloModal).toContain('Thanks for submitting the form');

    // Validar que el nombre completo aparezca en el modal
    const nombreCompleto = `${datosPrueba.nombre} ${datosPrueba.apellido}`;
    const contieneNombreCompleto = await paginaFormulario.verificarTextoConfirmacion(nombreCompleto);
    expect(contieneNombreCompleto).toBeTruthy();

    // Screenshot para evidencia
    await page.screenshot({ 
      path: `test-results/confirmacion-modal-${Date.now()}.png`,
      fullPage: true 
    });
  });

  test('TC002 - Validar campos obligatorios - Sin Nombre', async () => {
    await paginaFormulario.llenarApellido('Pérez');
    await paginaFormulario.seleccionarGenero('Male');
    await paginaFormulario.llenarMovil('1234567890');
    
    await paginaFormulario.enviarFormulario();

    // Esperar un momento para validación
    await paginaFormulario.page.waitForTimeout(1000);
    
    const esModalVisible = await paginaFormulario.esModalConfirmacionVisible();
    expect(esModalVisible).toBeFalsy();
  });

  test('TC003 - Seleccionar múltiples hobbies', async ({ page }) => {
    await paginaFormulario.llenarNombre('María');
    await paginaFormulario.llenarApellido('González');
    await paginaFormulario.seleccionarGenero('Female');
    await paginaFormulario.llenarMovil('9876543210');
    
    // Seleccionar múltiples hobbies
    await paginaFormulario.seleccionarHobby('Sports');
    await paginaFormulario.seleccionarHobby('Reading');
    await paginaFormulario.seleccionarHobby('Music');
    
    await paginaFormulario.enviarFormulario();
    await paginaFormulario.esperarModalConfirmacion();

    const esModalVisible = await paginaFormulario.esModalConfirmacionVisible();
    expect(esModalVisible).toBeTruthy();

    await page.screenshot({ 
      path: `test-results/multiples-hobbies-${Date.now()}.png` 
    });
  });
});
