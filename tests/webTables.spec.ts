import { test, expect } from '@playwright/test';
import { WebTablesPage } from './pages/WebTablesPage';

test.describe('Pregunta 3 - Trabajar con tablas web', () => {
  let paginaWebTables: WebTablesPage;
  
  // Datos para las pruebas
  const datosUsuario = {
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    email: 'carlos.rodriguez@test.com',
    age: '28',
    salary: '45000',
    department: 'Testing'
  };

  test.beforeEach(async ({ page }) => {
    paginaWebTables = new WebTablesPage(page);

    // Navegar al home de DemoQA (https://demoqa.com)
    await paginaWebTables.navegarUrl();
    
    // Hacer clic en el menú "Elements"
    await paginaWebTables.clickElements();
    
    // Navegar a la página de Web Tables
    await paginaWebTables.navegarWebTables();
  });

  test('TC001 - Añadir un nuevo registro con datos ficticios y verificar', async ({ page }) => {
    // Obtener el número inicial de registros
    const filasIniciales = await paginaWebTables.obtenerNumeroFilasConDatos();
    console.log(`Número de registros iniciales: ${filasIniciales}`);

    // Abrir el formulario y añadir un nuevo registro
    await paginaWebTables.abrirFormularioNuevoRegistro();
    await paginaWebTables.llenarFormularioRegistro(datosUsuario);
    await paginaWebTables.enviarFormulario();

    // Verificar que el registro fue añadido correctamente
    const registroExiste = await paginaWebTables.verificarRegistroExiste(datosUsuario.firstName);
    expect(registroExiste).toBeTruthy();
    
    // Verificar que se incrementó el número de filas
    const filasFinales = await paginaWebTables.obtenerNumeroFilasConDatos();
    expect(filasFinales).toBe(filasIniciales + 1);
    
    console.log(`Registro añadido exitosamente: ${datosUsuario.firstName} ${datosUsuario.lastName}`);
    console.log(`Número de registros finales: ${filasFinales}`);
  });

  test('TC002 - Buscar el registro creado usando la caja de búsqueda', async ({ page }) => {
    // Primero añadir el registro
    await paginaWebTables.abrirFormularioNuevoRegistro();
    await paginaWebTables.llenarFormularioRegistro(datosUsuario);
    await paginaWebTables.enviarFormulario();
    console.log(`Registro creado: ${datosUsuario.firstName} ${datosUsuario.lastName}`);

    // Buscar el registro usando diferentes criterios
    await paginaWebTables.buscarRegistro(datosUsuario.firstName);

    // Verificar que el registro se encuentra en los resultados de búsqueda
    const registroEncontrado = await paginaWebTables.verificarRegistroExiste(datosUsuario.firstName);
    expect(registroEncontrado).toBeTruthy();
    console.log(`Búsqueda exitosa: Se encontró el registro con "${datosUsuario.firstName}"`);

    // Buscar por email
    await paginaWebTables.buscarRegistro(datosUsuario.email);

    // Verificar que también se encuentra por email
    const registroPorEmail = await paginaWebTables.verificarRegistroExiste(datosUsuario.email);
    expect(registroPorEmail).toBeTruthy();
    console.log(`Búsqueda por email exitosa: "${datosUsuario.email}"`);

    // Limpiar búsqueda
    await paginaWebTables.limpiarBusqueda();
  });

  test('TC003 - Editar el registro creado y verificar los cambios', async ({ page }) => {
    // Añadir el registro que vamos a editar
    await paginaWebTables.abrirFormularioNuevoRegistro();
    await paginaWebTables.llenarFormularioRegistro(datosUsuario);
    await paginaWebTables.enviarFormulario();
    console.log(`Registro creado: ${datosUsuario.firstName} ${datosUsuario.lastName}`);

    // Datos actualizados
    const datosActualizados = {
      firstName: 'CarlosEditado',
      age: '30',
      salary: '50000'
    };

    // Editar el registro
    await paginaWebTables.editarRegistro(datosUsuario.firstName, datosActualizados);
    await paginaWebTables.enviarFormulario();
    console.log(`Registro editado con nuevos datos`);

    // Verificar que el registro editado existe con los nuevos datos
    const registroEditadoExiste = await paginaWebTables.verificarRegistroExiste(datosActualizados.firstName);
    expect(registroEditadoExiste).toBeTruthy();
    console.log(`✓ Edición verificada: Se encontró el registro con el nombre actualizado "${datosActualizados.firstName}"`);
  });

  test('TC004 - Eliminar el registro y verificar que se eliminó correctamente', async ({ page }) => {
    // Añadir el registro que vamos a eliminar
    await paginaWebTables.abrirFormularioNuevoRegistro();
    await paginaWebTables.llenarFormularioRegistro(datosUsuario);
    await paginaWebTables.enviarFormulario();
    console.log(`Registro creado: ${datosUsuario.firstName} ${datosUsuario.lastName}`);

    // Verificar que el registro existe antes de eliminarlo
    const registroExisteAntes = await paginaWebTables.verificarRegistroExiste(datosUsuario.firstName);
    expect(registroExisteAntes).toBeTruthy();
    
    // Obtener el número de filas antes de eliminar
    const filasAntes = await paginaWebTables.obtenerNumeroFilasConDatos();
    console.log(`Número de registros antes de eliminar: ${filasAntes}`);

    // Eliminar el registro
    await paginaWebTables.eliminarRegistro(datosUsuario.firstName);
    console.log(`Registro eliminado: ${datosUsuario.firstName} ${datosUsuario.lastName}`);

    // Verificar que el registro ya no existe
    await paginaWebTables.limpiarBusqueda();
    await paginaWebTables.buscarRegistro(datosUsuario.firstName);
    const registroExisteDespues = await paginaWebTables.verificarRegistroExiste(datosUsuario.firstName);
    expect(registroExisteDespues).toBeFalsy();
    console.log(`Eliminación verificada: El registro ya no existe en la tabla`);

    // Verificar que disminuyó el número de filas
    await paginaWebTables.limpiarBusqueda();
    const filasDespues = await paginaWebTables.obtenerNumeroFilasConDatos();
    expect(filasDespues).toBe(filasAntes - 1);
    console.log(`Número de registros después de eliminar: ${filasDespues}`);
  });
});
