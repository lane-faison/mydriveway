// Google Maps API

function initMap() {
  var broncos = {lat: 39.743993, lng: -105.021949};
  var locations = [
    ['$20', 39.743981,-105.029849, 'info','A', 'example@yahoo.com'],
    ['$30', 39.743,-105.02, 'info','B'],
    ['$5', 39.7437,-105.03284, 'info','C'],
    ['$12', 39.742,-105.0116, 'info','D'],
    ['$test', 39.751,-105.0214, 'test_info', 'test E']
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: broncos
  });

  var infowindow = new google.maps.InfoWindow;

  var marker, i;

  for (i=0; i<locations.length;i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1],locations[i][2]),
        map: map
    });

    google.maps.event.addListener(marker, 'mouseover', (function(marker,i) {
      return function() {
        infowindow.setContent(locations[i][4] + ": " + locations[i][0]);
        infowindow.open(map,marker);
      }
    })(marker,i));

    google.maps.event.addListener(marker, 'mouseout', (function(marker,i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.close(map,marker);
      }
    })(marker,i));

    var $section = $('<section>').text(locations[i][4] + ": " + locations[i][0] + ", " + locations[i][3]);

    var $email = $('<input class="emailOwner" type="button" value="Email owner" />',{value: locations[i][5]});

    $('.location_list').append($section).append($email);

    $('.emailOwner').on('click', function(event) {
      event.preventDefault();
      var email = 'christopher.faison@me.com';
      var subject = 'myDriveway: I would like to rent your spot!';
      var emailBody = 'Hello, is your spot still available?';
      window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
    });
  }
}
