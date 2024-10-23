module.exports = function (config) {
  config.set({
    // Define el marco de trabajo
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    
    // Configuración de los reportes
    reporters: ['progress', 'kjhtml', 'coverage'],

    // Configuración del reporte de cobertura
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // Captura la salida de la consola desde el navegador
    client: {
      captureConsole: true,   // Asegura que los logs de console.log() sean capturados
      clearContext: false,    // Evita limpiar el contexto del navegador después de cada test
    },

    // Muestra los logs de la consola en el terminal
    browserConsoleLogOptions: {
      level: 'log',           // Captura logs de nivel 'log'
      format: '%b %T: %m',
      terminal: true          // Asegura que se impriman en la terminal
    },

    // Configuración del navegador para los tests (puedes cambiar a 'ChromeHeadless' si lo prefieres)
    browsers: ['Chrome'],     // Usa Chrome completo para depuración visual
    //browsers: ['ChromeHeadless'], // Alternativa: ejecutar en modo headless

    // Nivel de logs de Karma
    logLevel: config.LOG_INFO, // Puedes cambiar a LOG_DEBUG si necesitas más detalles

    jasmine: {
      // Evita que falle si no hay expectativas en los tests
      failSpecWithNoExpectations: false
    },

    // Otras configuraciones necesarias para el proyecto
    files: [
      // Archivos de test aquí
    ],

    preprocessors: {
      // Preprocesadores aquí
    },

    // Configuración para mantener los tests en modo watch
    autoWatch: true,
    singleRun: false,  // Cambia a true si quieres que solo se ejecuten una vez
  });
};
