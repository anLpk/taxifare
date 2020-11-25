let map;
let places;
let infoWindow;
let markers = [];
let autocomplete;
const countryRestrict = { country: "tr" };
const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");

const countries = {
  tr: {
    center: { lat: 41.02, lng: 28.98 },
    zoom: 10,
  },
};

function initMap() {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(41.02, 28.98),
      new google.maps.LatLng(40.02, 29.98));
    var circle = new google.maps.Circle({ center: new google.maps.LatLng( 41, 29 ), radius: 70000 });
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: countries["tr"].zoom,
    center: countries["tr"].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  });
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById("info-content"),
  });
  
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["address"],
      componentRestrictions: countryRestrict,
      strictBounds: true,
      bounds: circle.getBounds()
    }
  );
  
  places = new google.maps.places.PlacesService(map);
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a country.
  document
    .getElementById("country")
    .addEventListener("change", setAutocompleteCountry);
    
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  const place = autocomplete.getPlace();

  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
  } else {
    document.getElementById("autocomplete").placeholder = "Enter a city";
  }
}
