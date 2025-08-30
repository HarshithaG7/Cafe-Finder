let map, infowindow;

function initMap() {
  const defaultLocation = { lat: 13.0843, lng: 80.2705 }; // Chennai
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 15,
  });
  infowindow = new google.maps.InfoWindow();
}

function findCafes() {
  const input = document.getElementById("location-input").value;
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: input }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: results[0].geometry.location,
          radius: 2000,
          type: "cafe",
        },
        (places, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            places.forEach((p) => {
              const marker = new google.maps.Marker({
                position: p.geometry.location,
                map,
                title: p.name,
              });

              marker.addListener("click", () => {
                infowindow.setContent(`
                <div style="font-weight:bold; color:black;">${p.name}</div>
                <div style="color:black;">${p.vicinity}</div>
  `             );
                infowindow.open(map, marker);
              });
            });
          }
        }
      );
    } else {
      alert("Geocode failed: " + status);
    }
  });
}

window.initMap = initMap;

