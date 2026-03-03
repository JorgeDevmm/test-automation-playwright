import { test, expect } from '@playwright/test';
import { DroppablePage } from './pages/DroppablePage';

test.describe('Pregunta 5 - Acciones avanzadas y Drag & Drop', () => {
  let paginaDroppable: DroppablePage;

  test.beforeEach(async ({ page }) => {
    paginaDroppable = new DroppablePage(page);

    // Navegar al home de DemoQA (https://demoqa.com)
    await paginaDroppable.navegarUrl();
    
    // Hacer clic en el menú "Interactions"
    await paginaDroppable.clickInteractions();
    
    // Navegar a la página de Droppable
    await paginaDroppable.navegarDroppable();
  });

  test('TC001 - Arrastrar "Drag Me" y soltar en "Drop Here", verificar cambio de texto y color', async ({ page }) => {
    console.log('Verificando estado inicial del área de destino...');
    
    // Capturar el estado inicial
    const textoInicial = await paginaDroppable.obtenerTextoAreaDestino();
    const colorInicial = await paginaDroppable.obtenerColorFondoAreaDestino();
    console.log(`Estado inicial - Texto: "${textoInicial}", Color: ${colorInicial}`);
    
    // Verificar que el texto inicial es "Drop Here"
    expect(textoInicial).toContain('Drop Here');
    
    // Realizar el drag & drop
    await paginaDroppable.arrastrarYSoltarSimple();
    
    // Capturar el estado después del drop
    const textoFinal = await paginaDroppable.obtenerTextoAreaDestino();
    const colorFinal = await paginaDroppable.obtenerColorFondoAreaDestino();
    console.log(`Estado final - Texto: "${textoFinal}", Color: ${colorFinal}`);
    
    // Verificar que el texto cambió a "Dropped!"
    expect(textoFinal).toContain('Dropped!');
    console.log('El texto cambió correctamente a "Dropped!"');
    
    // Verificar que el color cambió (debe ser diferente al inicial)
    expect(colorFinal).not.toBe(colorInicial);
    console.log('El color de fondo cambió exitosamente');
    
    console.log('Validación completa: El drag & drop funcionó correctamente');
  });

  test('TC002 - Arrastrar elemento fuera del área de destino (no debe cambiar)', async ({ page }) => {
    console.log('Verificando escenario negativo: soltar fuera del área...');
    
    // Capturar el estado inicial del área de destino
    const textoInicial = await paginaDroppable.obtenerTextoAreaDestino();
    const colorInicial = await paginaDroppable.obtenerColorFondoAreaDestino();
    console.log(`Estado inicial - Texto: "${textoInicial}", Color: ${colorInicial}`);
    
    // Verificar que el texto inicial es "Drop Here"
    expect(textoInicial).toContain('Drop Here');
    
    // Arrastrar el elemento pero soltarlo fuera del área de destino
    const elementoArrastrable = page.locator('#draggable');
    const box = await elementoArrastrable.boundingBox();
    
    if (box) {
      // Iniciar el arrastre
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      
      // Mover a una posición fuera del área de destino (arriba a la derecha)
      await page.mouse.move(box.x + 300, box.y - 100, { steps: 10 });
      await page.mouse.up();
      
      await page.waitForTimeout(500);
    }
    
    // Capturar el estado después de soltar fuera
    const textoFinal = await paginaDroppable.obtenerTextoAreaDestino();
    const colorFinal = await paginaDroppable.obtenerColorFondoAreaDestino();
    console.log(`Estado final - Texto: "${textoFinal}", Color: ${colorFinal}`);
    
    // Verificar que el texto NO cambió (sigue siendo "Drop Here")
    expect(textoFinal).toContain('Drop Here');
    expect(textoFinal).not.toContain('Dropped!');
    console.log('El texto NO cambió (como se esperaba al soltar fuera)');
    
    // Verificar que el color NO cambió
    expect(colorFinal).toBe(colorInicial);
    console.log('El color NO cambió (el drop fue rechazado correctamente)');
    
    console.log('Validación completa: Soltar fuera del área no afecta el estado');
  });

  test('TC003 - Realizar drag & drop múltiple (verificar que se puede repetir)', async ({ page }) => {
    console.log('Verificando drag & drop múltiple en tab Simple...');
    
    // Primer drag & drop
    console.log('Realizando primer drag & drop...');
    await paginaDroppable.arrastrarYSoltarSimple();
    
    const textoInicial = await paginaDroppable.obtenerTextoAreaDestino();
    const colorInicial = await paginaDroppable.obtenerColorFondoAreaDestino();
    console.log(`Después del 1er drop - Texto: "${textoInicial}", Color: ${colorInicial}`);
    
    // Verificar que cambió a "Dropped!"
    expect(textoInicial).toContain('Dropped!');
    console.log('Primer drag & drop exitoso');
    
    // Esperar un momento
    await page.waitForTimeout(1000);
    
    // Segundo drag & drop (para verificar que se puede repetir)
    console.log('Realizando segundo drag & drop...');
    await paginaDroppable.arrastrarYSoltarSimple();
    
    const textoFinal = await paginaDroppable.obtenerTextoAreaDestino();
    const colorFinal = await paginaDroppable.obtenerColorFondoAreaDestino();
    console.log(`Después del 2do drop - Texto: "${textoFinal}", Color: ${colorFinal}`);
    
    // Verificar que sigue mostrando "Dropped!"
    expect(textoFinal).toContain('Dropped!');
    console.log('Segundo drag & drop exitoso');
    
    // Verificar que el color se mantiene
    expect(colorFinal).not.toContain('rgba(0, 0, 0, 0)');
    console.log('El color se mantiene después del segundo drop');
    
    console.log('Validación completa: El drag & drop se puede realizar múltiples veces');
  });
});
