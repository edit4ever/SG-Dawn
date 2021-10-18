<script type="text/javascript">
  function myFunction(product) {
  var selectOption = "variant" + product;
  var selectTitle = document.getElementById(selectOption).options[document.getElementById(selectOption).selectedIndex].title;
  var selectVariant = document.getElementById(selectOption).options[document.getElementById(selectOption).selectedIndex].value;
  var selectMax = document.getElementById(selectOption).options[document.getElementById(selectOption).selectedIndex].getAttribute('stock');
  var selectMult = 1;
  var inputOption = "option" + product;
  var length = document.getElementById(inputOption).length;
  for (i = length-1; i >= 0; i--) {
    document.getElementById(inputOption).remove(i);
  }
  if (selectTitle == "2 in" ) {
    selectMult = 64;
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('Whole Flat', 'whole');
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('½ Flat', 'half');
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('¼ Flat', 'quarter');
  }
  else if (selectTitle == "4 in") {
    selectMult = 15;
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('Whole Flat', 'whole');
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('⅔ Flat', '2third');
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('⅓ Flat', 'third');
  }
  else if (selectTitle == "6 in") {
    selectMult = 6;
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('Whole Flat', 'whole');
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('½ Flat', 'half'); 
  }
  else {
    document.getElementById(inputOption).options[document.getElementById(inputOption).options.length] = new Option('Individual', 'whole');
  }
  document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("multiplier", selectMult);
  document.getElementById("form-" + product).querySelector('input[name="quantity"]').setAttribute("title", selectVariant);
  document.getElementById("form-" + product).querySelector('input[name="quantity"]').max = selectMax * selectMult;
  document.getElementById("form-" + product).querySelector('input[name="var-mult"]').max = selectMax;
  document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = "";
  document.getElementById("form-" + product).querySelector('input[name="var-mult"]').value = "1";

  var selectVariant2 = document.getElementById(inputOption).options[document.getElementById(inputOption).selectedIndex].value;
  if (selectVariant2 == "half") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(selectMult * .5);
  }
  else if (selectVariant2 == "quarter") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(selectMult * .25);
  }
  else if (selectVariant2 == "third") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(selectMult * .33);
  }
  else if (selectVariant2 == "2third") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(selectMult * .67);
  }
  else {
    document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("class", "qty");
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = selectMult;
  }
}
</script>

<script type="text/javascript">
  function myFunction2(product) {
  var selectOption2 = "option" + product;
  var selectVariant2 = document.getElementById(selectOption2).options[document.getElementById(selectOption2).selectedIndex].value;
  var variantMult = document.getElementById("form-" + product).querySelector('input[name="var-mult"]').getAttribute('multiplier');
  if (selectVariant2 == "half") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(variantMult * .5);
    document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("class", "hidden");
  }
  else if (selectVariant2 == "quarter") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(variantMult * .25);
    document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("class", "hidden");
  }
  else if (selectVariant2 == "third") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(variantMult * .33);
    document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("class", "hidden");
  }
  else if (selectVariant2 == "2third") {
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = Math.round(variantMult * .67);
    document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("class", "hidden");
  }
  else {
    document.getElementById("form-" + product).querySelector('input[name="var-mult"]').setAttribute("class", "qty");
    document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = variantMult;
  }
}
</script>

<script type="text/javascript">
  function myFunction3(product) {
  var variantValue = document.getElementById("form-" + product).querySelector('input[name="var-mult"]').value;
  var variantMult = document.getElementById("form-" + product).querySelector('input[name="var-mult"]').getAttribute('multiplier');
  document.getElementById("form-" + product).querySelector('input[name="quantity"]').value = variantMult * variantValue;
}
</script>