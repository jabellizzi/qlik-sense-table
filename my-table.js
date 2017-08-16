define([], function(){

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
    initialProperties: initialProps,
    paint: paintFunc
  }
})