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
        min: 2,
        max: 2
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
          qWidth: 3,
          qHeight: 10
        }
      ]
    }
  }

  
  // ========== Paint ==========
  var paintFunc = function($element, layout){
    // Paint goes here..
    $element.html('');

    /* Use the backgroundColor property in layout to paint background */
    $element.css('background-color', layout.backgroundColor);


    // Create Table
    var table = document.createElement('table');
    // Create Header Row
    var headerRow = document.createElement('tr');

    // Create and append header cells
    var qDimensionInfo = layout.qHyperCube.qDimensionInfo;
    var qMeasureInfo = layout.qHyperCube.qMeasureInfo;

    /* Loop through dimension labels and append to header row */
    for(var i = 0; i < qDimensionInfo.length; i++){
      var th = document.createElement('th');
      th.innerHTML = qDimensionInfo[i].qFallbackTitle;
      headerRow.appendChild(th);
    }
    /* Loop through measure labels and append to header row */
    for(var i = 0; i < qMeasureInfo.length; i++){
      var th = document.createElement('th');
      th.innerHTML = qMeasureInfo[i].qFallbackTitle;
      headerRow.appendChild(th);
    }


    // Append Header Row to table
    table.appendChild(headerRow);
    // Append table to main element
    $element.append(table);
  }


  // ========== Return Properties ==========
  return {
    definition: definitionProps,
    initialProperties: initialProps,
    paint: paintFunc
  }
})