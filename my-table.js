define([], function(){

  // ========== Definition Properties ==========
  var definitionProps = {
    type: 'items',
    component: 'accordion',
    items: {
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
    backgroundColor: 'lightblue'
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