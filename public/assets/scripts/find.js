// Google Maps API

function initMap() {
  var broncos = {lat: 39.743993, lng: -105.021949};
  var locations = [
    ['$20', 39.743981,-105.029849, 'info','A', 'example1@yahoo.com','Broncos vs. Patriots'],
    ['$30', 39.743,-105.02, 'info','B','example2@yahoo.com','Broncos vs. Patriots'],
    ['$5', 39.7437,-105.03284, 'info','C','example3@yahoo.com','Broncos vs. Chiefs'],
    ['$12', 39.742,-105.0116, 'info','D','example4@yahoo.com','Broncos vs. Patriots'],
    ['$test', 39.751,-105.0214, 'test_info', 'test E','example5@yahoo.com','Broncos vs. Chiefs']
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: broncos
  });

  var infowindow = new google.maps.InfoWindow;

  var marker;

  for (let i=0; i<locations.length;i++) {
    // if (locations[i][6] == )
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
    $section.append($email);
    $('.location_list').append($section);

    $email.on('click', function(event) {
      event.preventDefault();

      let email = locations[i][5];
      var subject = 'myDriveway: I would like to rent your spot!';
      var emailBody = 'Hello, is your spot still available?';
      window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
    });
  }
}
