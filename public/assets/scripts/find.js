// Google Maps API

function initMap() {
  var broncos = {lat: 39.743993, lng: -105.021949};
  var locations = [
    ['$20', 39.743981,-105.029849, 2,'A', 'example1@yahoo.com','Broncos vs. Patriots'],
    ['$30', 39.743,-105.02, 1,'B','example2@yahoo.com','Broncos vs. Patriots'],
    ['$5', 39.7437,-105.03284, 3,'C','example3@yahoo.com','Broncos vs. Chiefs'],
    ['$12', 39.742,-105.0116, 2,'D','example4@yahoo.com','Broncos vs. Patriots'],
    ['$5', 39.751,-105.0214, 2, 'E','example5@yahoo.com','Broncos vs. Chiefs']
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: broncos
  });

  var infowindow = new google.maps.InfoWindow;

  var marker;

  // Below, locationsNew returns a new array containing only the driveway locations for the selected event. select option:selected gets the needed event for the filter.

  $('select.event-select').change(function() {

    var selected = $(".event-select option:selected").val();
    $('section').hide();

    var locationsNew = locations.filter(filteredLocations);

    function filteredLocations(location, index, locations) {
      if (locations[index][6] == selected) {
        return location;
      }
    };

    for (let i=0; i<locationsNew.length;i++) {

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locationsNew[i][1],locationsNew[i][2]),
          map: map
      });

      // Reveals the assigned letter and price of spot
      google.maps.event.addListener(marker, 'mouseover', (function(marker,i) {
        return function() {
          infowindow.setContent(locationsNew[i][4] + ": " + locationsNew[i][0]);
          infowindow.open(map,marker);
        }
      })(marker,i));

      // Hides the assigned letter and price of spot
      google.maps.event.addListener(marker, 'mouseout', (function(marker,i) {
        return function() {
          infowindow.setContent(locationsNew[i][0]);
          infowindow.close(map,marker);
        }
      })(marker,i));

      var $section = $('<section>').text(locationsNew[i][4] + ": " + locationsNew[i][0] + ", Spots available: " + locationsNew[i][3]);

      var $email = $('<input class="emailOwner" type="button" value="Email owner" />',{value: locationsNew[i][5]});
      $section.append($email);
      $('.location_list').append($section);

      $email.on('click', function(event) {
        event.preventDefault();

        let email = locationsNew[i][5];
        var subject = 'myDriveway: I would like to rent your spot!';
        var emailBody = 'Hello, is your spot still available?';
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
      });
    }
  }) //.change function line 23
}
