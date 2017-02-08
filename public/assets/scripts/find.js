////////////// Tabletop API //////////////



var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/16648beL07PQtYpHyTsz6ZagX86GJ0vZRDqj5mv0QpcY/pubhtml';

var locations = [];

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true } )
}

function showInfo(data, tabletop) {
  for (var i = 0; i < data.length; i++) {
    locations.push(data[i]);
  }
}

////////////// Google Maps API //////////////

function initMap() {

  var broncosStadium = {lat: 39.743993, lng: -105.021949};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: broncosStadium
  });
  var infowindow = new google.maps.InfoWindow;
  var markers = [];

  // Below, locationsNew returns a new array containing only the driveway locations for the selected event. 'select option:selected' gets the needed event for the filter. When the 'select' is changed to a different event, the function again re-filters the results.

  $('select.event-select').change(function() {

    // When the 'select' receives a change, the markers currently on the map are all removed so that the new ones can be added.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });

    var selected = $(".event-select option:selected").val();
    $('section').hide();

    var locationsNew = locations.filter(filteredLocations);

    // driveway locations are filtered based on the event the user selects.
    function filteredLocations(location, index, locations) {
      if (locations[index].Event == selected) {
        return location;
      }
    };
    for (let i=0; i<locationsNew.length;i++) {

      // Pulls the lat and lng from the Google Sheet for each marker.
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locationsNew[i].lat,locationsNew[i].lng),
          map: map
      });

      markers.push(marker);

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
          infowindow.close(map,marker);
        }
      })(marker,i));


      var $section = $('<section>').text(locationsNew[i].Id + ": " + locationsNew[i].Price + ", Spots available: " + locationsNew[i].Spots);

      var $email = $('<input class="emailOwner" type="button" value="Email owner" />',{value: locationsNew[i].Email});

      // The $section and $email created above are appended together and then appended in to the '.location_list' div so that they can be displayed to the user.
      $section.append($email);
      $('.location_list').append($section);

      //Specifically formatted email for when 'email owner' is clicked
      $email.on('click', function(event) {
        event.preventDefault();

        let email = locationsNew[i].Email;
        var subject = 'myDriveway: I would like to rent your spot!';
        var emailBody = 'Hello, I am interested in renting one of your spots (Location: ' + locationsNew[i].Address + ', ' + locationsNew[i].City + ', ' + locationsNew[i].State + ' ' + locationsNew[i].Zip + ') during the ' + locationsNew[i].Event + " game. Is this spot still available? Thank you.";
        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
      });
    }
  }) //.change function line 23
}

window.addEventListener('DOMContentLoaded', init);
