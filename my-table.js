define(['text!./my-table.css'], function(cssText){
  // Create <style> element
  var style = document.createElement('style');
  // Add css text
  style.innerHTML = cssText;
  // Append <style element to document <head>
  document.querySelector('head').appendChild(style);


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
    var backendApi = this.backendApi;

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
      var th = document.createElement('th'); // create <th> element
      th.innerHTML = qDimensionInfo[i].qFallbackTitle; // add html text to element
      headerRow.appendChild(th); // append <th> to header row
    }
    /* Loop through measure labels and append to header row */
    for(var i = 0; i < qMeasureInfo.length; i++){
      var th = document.createElement('th'); // create <th> element
      th.innerHTML = qMeasureInfo[i].qFallbackTitle; // add html text to element
      headerRow.appendChild(th); // append <th> to header row
    }
  
    // Append Header Row to table
    table.appendChild(headerRow);


    // Create Body Rows
    var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
    // Loop through each row in qMatrix
    for(var i = 0; i < qMatrix.length; i++){
      // Create a table row for each row in qMatrix
      var bodyRow = document.createElement('tr');
      bodyRow.classList.add('selectable');
      bodyRow.setAttribute('elem-no', qMatrix[i][0].qElemNumber);

      var rowData = qMatrix[i];
      // Loop through each cell in this row
      for(var j = 0; j < rowData.length; j++){
        // for each cell, create a <td> element
        var td = document.createElement('td');
        // then give it some html text
        td.innerHTML = rowData[j].qText;

        // then append it to the bodyRow
        bodyRow.appendChild(td);
      }

      // Append bodyRow to table
      table.appendChild(bodyRow);
    }


    // Append table to main element
    $element.append(table);


    // Click Events
    $('.selectable').on('click', function(){
      var elementNumber = +this.getAttribute('elem-no')
      backendApi.selectValues(0, [elementNumber], true);
    })
  }


  // ========== Return Properties ==========
  return {
    definition: definitionProps,
    initialProperties: initialProps,
    paint: paintFunc
  }
})