define([], function(){

  // ========== Definition Properties ==========
  var definitionProps = {
    type: 'items',
    component: 'accordion',
    items: {
      dimensions: { // Qlik Dimensions
        uses: 'dimensions',
        min: 1,
        max: 1
      },
      measures: { // Qlik Measures
        uses: 'measures',
        min: 1,
        max: 1
      },
      backgroundColor: { // This is where we define background color
        type: 'string',
        ref: 'backgroundColor',
        label: 'Background Color'
      },
      settings: { // This is the Qlik Appearance settings
        uses: 'settings'
      }
    }
  }


  // ========== Initial Properties ==========
  var initialProps = {
    backgroundColor: 'lightblue', // Background Color
    qHyperCubeDef: { // HyperCubeDef
      qDimensions: [],
      qMeasures: [],
      qInitialDataFetch: [
        {
          qTop: 0, 
          qLeft: 0,
          qWidth: 2,
          qHeight: 10
        }
      ]
    }
  }

  
  // ========== Paint ==========
  var paintFunc = function($element, layout){
    // Paint goes here..

    /* Use the backgroundColor property in layout to paint background */
    $element[0].style.backgroundColor = layout.backgroundColor;
  }


  // ========== Return Properties ==========
  return {
    definition: definitionProps,
    initialProperties: initialProps,
    paint: paintFunc
  }
})