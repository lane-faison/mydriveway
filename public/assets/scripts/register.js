$(document).ready(function () {

  // Creates an array of classes so they can later be checked for a completed input.
  var inputClasses = [".eventReg",".emailReg", ".addressReg",".cityReg",".stateReg",".zipReg",".spotsReg",".priceReg"];

  // Loops through all the inputs and selections to make sure the user put something in.
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
    event.preventDefault();

    let email = 'faisonusmc@gmail.com';

    var subject = 'myDriveway: Spot Registration';

    var emailBody = "Hello, I would like to register my driveway for the " + $('.eventReg').val() + " game. My information is: " + $('.emailReg').val() + ", " + $('.addressReg').val() + ", " + $('.cityReg').val() + ", " + $('.stateReg').val() + ", " + $('.zipReg').val() + ". I will notify you when my spot has been taken.";

    window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;

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
