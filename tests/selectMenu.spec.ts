import { test, expect } from '@playwright/test';
import { SelectMenuPage } from './pages/SelectMenuPage';

test.describe('Pregunta 2 - Selección de opciones en menú desplegable', () => {
  let paginaSelectMenu: SelectMenuPage;

  test.beforeEach(async ({ page }) => {
    paginaSelectMenu = new SelectMenuPage(page);

    // Navegar al home de DemoQA (https://demoqa.com)
    await paginaSelectMenu.navegarUrl();
    
    // Hacer clic en el menú "Widgets"
    await paginaSelectMenu.clickWidgets();
    
    // Navegar a la página de Select Menu
    await paginaSelectMenu.navegarSelectMenu();
  });

  test('TC001 - Seleccionar "Group 1, option 1" en Select Value y validar', async ({ page }) => {
    // Definir la opción esperada
    const opcionEsperada = 'Group 1, option 1';

    // Seleccionar la opción en el dropdown "Select Value"
    await paginaSelectMenu.seleccionarSelectValue(opcionEsperada);

    // Verificar que el valor seleccionado se refleja correctamente en la página
    const valorSeleccionado = await paginaSelectMenu.obtenerValorSelectValue();
    expect(valorSeleccionado).toBe(opcionEsperada);
    
    console.log(`Validación exitosa: Se seleccionó "${valorSeleccionado}" en Select Value`);
  });

  test('TC002 - Seleccionar "Mr." en Select One y validar', async ({ page }) => {
    // Definir la opción esperada
    const opcionEsperada = 'Mr.';

    // Seleccionar la opción en el dropdown "Select One"
    await paginaSelectMenu.seleccionarSelectOne(opcionEsperada);

    // Verificar que el valor seleccionado se refleja correctamente en la página
    const valorSeleccionado = await paginaSelectMenu.obtenerValorSelectOne();
    expect(valorSeleccionado).toBe(opcionEsperada);
    
    console.log(`Validación exitosa: Se seleccionó "${valorSeleccionado}" en Select One`);
  });

  test('TC003 - Seleccionar ambas opciones requeridas y validar cada una', async ({ page }) => {
    // Definir las opciones esperadas para ambos dropdowns
    const opcionSelectValue = 'Group 1, option 1';
    const opcionSelectOne = 'Mr.';

    // Seleccionar y validar "Group 1, option 1" en Select Value
    await paginaSelectMenu.seleccionarSelectValue(opcionSelectValue);
    const valorSelectValue = await paginaSelectMenu.obtenerValorSelectValue();
    expect(valorSelectValue).toBe(opcionSelectValue);
    console.log(`Select Value: Se seleccionó "${valorSelectValue}" y se validó correctamente`);

    // Seleccionar y validar "Mr." en Select One
    await paginaSelectMenu.seleccionarSelectOne(opcionSelectOne);
    const valorSelectOne = await paginaSelectMenu.obtenerValorSelectOne();
    expect(valorSelectOne).toBe(opcionSelectOne);
    console.log(`Select One: Se seleccionó "${valorSelectOne}" y se validó correctamente`);
  });
});
