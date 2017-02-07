$(document).ready(function () {

  var inputClasses = [".eventReg",".emailReg", ".addressReg",".cityReg",".stateReg",".zipReg",".spotsReg",".priceReg"];

  $('form').on('submit', function(event) {
    for (var i = 0; i < inputClasses.length; i++) {
      var $input = $(inputClasses[i]);
      if (!$input.val()) {
        invalid();
        event.preventDefault();
        return;
      }
    }
    valid();

  });

  function invalid() {
    $('.alert').css('display','none');
    $('.alert-danger').css('display','block');
  }

  function valid() {
    $('.alert').css('display','none');
    $('.alert-success').css('display','block');
  }

})
