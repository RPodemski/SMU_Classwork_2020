$(document).ready(function() {
    createMap();
});

function createMap() {
    var qURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

    $.ajax({
        type: "GET",
        url: qURL,
        success: function(earthData) {
            build(earthData);

            // $.ajax({
            //     type: "GET",
            //     url: "SMU_Homework_2020\17-Mapping-Web\Instructions\static\data\PB2002_boundaries.json",
            //     success: function(plateData) {
            //         build(earthData, plateData);
            //     },
            //     error: function(XMLHttpRequest, textStatus, errorThrown) {
            //         alert("Status: " + textStatus);
            //         alert("Error: " + errorThrown);
            //     }
            // });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

//couldn't add plateData
function build(earthData) {
    var darkMode = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/dark-v10",
        accessToken: API_KEY
    });

    var lightMode = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    var myMap = L.map("mapid", {
        center: [36.7783, -119.4179],
        zoom: 4,
        layers: [lightMode, darkMode]
    });

    var earthquakes = [];
    var circles = [];
    earthData.features.forEach(function(earthquake) {
        var marker = L.geoJSON(earthquake, {
            onEachFeature: onEachFeature
        });
        earthquakes.push(marker);

        var circle = L.geoJSON(earthquake, {
            pointToLayer: function(feature, latlng) {
                var markers = markerOptions(feature)
                return L.circleMarker(latlng, markers);
            },
            onEachFeature: onEachFeature
        });
        circles.push(circle);
    });

    // var plates = L.geoJSON(plateData, {
    //     color: "orange",
    //     weight: 1
    // });


    var markLayer = L.layerGroup(earthquakes);
    var markLayer2 = L.layerGroup(circles);
    // var plateLayer = L.layerGroup([plates]);

    var baseMaps = {
        "Light Mode": lightMode,
        "Dark Mode": darkMode
    };

    var overlayMaps = {
        "Markers": markLayer,
        "Magnitude of Earthquake": markLayer2,
        // "Tectonic Plates": plateLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // plates.addTo(myMap);
    markLayer2.addTo(myMap);


    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");

        var legendData = `<h5> Earthquake Depth </h5>

        <div>
        <div style = "background:#60D394;height:12px;width:12px;display:inline-block"></div> 
        <div style = "display:inline-block"><10 Miles</div>
        </div> 

        <div>
        <div style = "background:#AAF683;height:12px;width:12px;display:inline-block"></div> 
        <div style = "display:inline-block">10-30 Miles</div>
        </div>

        <div>
        <div style = "background:#D5E880;height:12px;width:12px;display:inline-block"></div>
        <div style = "display:inline-block">30-50 Miles</div>
        </div>

        <div>
        <div style = "background:#FFD97D;height:12px;width:12px;display:inline-block"></div> 
        <div style = "display:inline-block">50-70 Miles</div>
        </div>

        <div>
        <div style = "background:#FF9B85;height:12px;width:12px;display:inline-block"></div>
        <div style = "display:inline-block">70-90 Miles</div>
        </div> 

        <div>
        <div style = "background:#EE6055;height:12px;width:12px;display:inline-block"></div>
        <div style = "display:inline-block">>90 Miles</div>
        </div>`;

        div.innerHTML = legendData;
        return (div);
    }

    legend.addTo(myMap);
}

function markerOptions(feature) {
    var depthEarth = feature.geometry.coordinates[2];

    var dColor = "";
    if (depthEarth > 90) {
        dColor = "#EE6055"
    } else if (depthEarth > 70) {
        dColor = "#FF9B85"
    } else if (depthEarth > 50) {
        dColor = "#FFD97D"
    } else if (depthEarth > 30) {
        dColor = "#D5E880"
    } else if (depthEarth > 10) {
        dColor = "#AAF683"
    } else {
        dColor = "#60D394"
    }

    var markerOpt = {
        radius: (feature.properties.mag * 4),
        fillColor: dColor,
        color: "Black",
        weight: .8,
        fillOpacity: .6
    };

    return (markerOpt)
}


function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.place) {
        layer.bindPopup(feature.properties.title);
    }
}