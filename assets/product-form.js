if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cartNotification = document.querySelector('cart-notification');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      const submitButton = this.querySelector('[type="submit"]');
      if (submitButton.classList.contains('loading')) return; 

      this.handleErrorMessage();
      this.cartNotification.setActiveElement(document.activeElement);

      submitButton.setAttribute('aria-disabled', true);
      submitButton.classList.add('loading');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      config.body = JSON.stringify({
        ...JSON.parse(serializeForm(this.form)),
        sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
        sections_url: window.location.pathname
      });

      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            this.handleErrorMessage(response.description);
            return;
          }

          this.cartNotification.renderContents(response);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          submitButton.classList.remove('loading');
          submitButton.removeAttribute('aria-disabled');
        });
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  });
}


function myFunction(product,variant) {
  var selectOption = "Option-" + variant;
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
