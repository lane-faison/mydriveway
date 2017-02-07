// Tabletop API //

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/16648beL07PQtYpHyTsz6ZagX86GJ0vZRDqj5mv0QpcY/pubhtml';

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true } )
}

var locations = [];

function showInfo(data, tabletop) {
  for (var i = 0; i < data.length; i++) {
    locations.push(data[i]);
  }
}
console.log(locations);
// Google Maps API //

function initMap() {
  var broncos = {lat: 39.743993, lng: -105.021949};
  // var locations = [
  //   ['$20', 39.743981,-105.029849, 2,'A', 'example1@yahoo.com','Broncos vs. Patriots'],
  //   ['$30', 39.743,-105.02, 1,'B','example2@yahoo.com','Broncos vs. Patriots'],
  //   ['$5', 39.7437,-105.03284, 3,'C','example3@yahoo.com','Broncos vs. Chiefs'],
  //   ['$12', 39.742,-105.0116, 2,'D','example4@yahoo.com','Broncos vs. Patriots'],
  //   ['$5', 39.751,-105.0214, 2, 'E','example5@yahoo.com','Broncos vs. Chiefs']
  // ];

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
      if (locations[index].Event == selected) {
        return location;
      }
    };

    for (let i=0; i<locationsNew.length;i++) {

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locationsNew[i].lat,locationsNew[i].lng),
          map: map
      });

      // Reveals the assigned letter and price of spot
      google.maps.event.addListener(marker, 'mouseover', (function(marker,i) {
        return function() {
          infowindow.setContent(locationsNew[i].Id + ": " + locationsNew[i].Price);
          infowindow.open(map,marker);
        }
      })(marker,i));

      // Hides the assigned letter and price of spot
      google.maps.event.addListener(marker, 'mouseout', (function(marker,i) {
        return function() {
          infowindow.setContent(locationsNew[i].Price);
          infowindow.close(map,marker);
        }
      })(marker,i));

      var $section = $('<section>').text(locationsNew[i].Id + ": " + locationsNew[i].Price + ", Spots available: " + locationsNew[i].Spots);

      var $email = $('<input class="emailOwner" type="button" value="Email owner" />',{value: locationsNew[i].Email});
      $section.append($email);
      $('.location_list').append($section);

      $email.on('click', function(event) {
        event.preventDefault();

        let email = locationsNew[i].Email;
        var subject = 'myDriveway: I would like to rent your spot!';
        var emailBody = 'Hello, is your spot still available?';
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
      });
    }
  }) //.change function line 23
}

window.addEventListener('DOMContentLoaded', init);
