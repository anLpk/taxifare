let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41, lng: 29 },
    zoom: 10,
  });
}

function initMap() {
  const bounds = new google.maps.LatLngBounds();
  const markersArray = [];
  const origin1 = { lat: 55.93, lng: -3.118 };
  const origin2 = "Greenwich, England";
  const destinationA = "Stockholm, Sweden";
  const destinationB = { lat: 50.087, lng: 14.421 };
  const destinationIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=D|FF0000|000000";
  const originIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=O|FFFF00|000000";
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 55.53, lng: 9.4 },
    zoom: 10,
  });
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    },
    (response, status) => {
      if (status !== "OK") {
        alert("Error was: " + status);
      } else {
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "";
        deleteMarkers(markersArray);

        const showGeocodedAddressOnMap = function (asDestination) {
          const icon = asDestination ? destinationIcon : originIcon;

          return function (results, status) {
            if (status === "OK") {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              markersArray.push(
                new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                  icon: icon,
                })
              );
            } else {
              alert("Geocode was not successful due to: " + status);
            }
          };
        };

        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          geocoder.geocode(
            { address: originList[i] },
            showGeocodedAddressOnMap(false)
          );

          for (let j = 0; j < results.length; j++) {
            geocoder.geocode(
              { address: destinationList[j] },
              showGeocodedAddressOnMap(true)
            );
            outputDiv.innerHTML +=
              originList[i] +
              " to " +
              destinationList[j] +
              ": " +
              results[j].distance.text +
              " in " +
              results[j].duration.text +
              "<br>";
          }
        }
      }
    }
  );
}

function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

let panorama;

function initMap() {
  const astorPlace = { lat: 40.729884, lng: -73.990988 };
  // Set up the map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: astorPlace,
    zoom: 18,
    streetViewControl: false,
  });
  // Set up the markers on the map
  const cafeMarker = new google.maps.Marker({
    position: { lat: 40.730031, lng: -73.991428 },
    map,
    icon:
      "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00",
    title: "Cafe",
  });
  const bankMarker = new google.maps.Marker({
    position: { lat: 40.729681, lng: -73.991138 },
    map,
    icon:
      "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=dollar|FFFF00",
    title: "Bank",
  });
  const busMarker = new google.maps.Marker({
    position: { lat: 40.729559, lng: -73.990741 },
    map,
    icon:
      "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00",
    title: "Bus Stop",
  });
  // We get the map's default panorama and set up some defaults.
  // Note that we don't yet set it visible.
  panorama = map.getStreetView();
  panorama.setPosition(astorPlace);
  panorama.setPov(
    /** @type {google.maps.StreetViewPov} */ {
      heading: 265,
      pitch: 0,
    }
  );
}

function toggleStreetView() {
  const toggle = panorama.getVisible();

  if (toggle == false) {
    panorama.setVisible(true);
  } else {
    panorama.setVisible(false);
  }
}
