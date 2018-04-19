(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  $('#kakao-navi').click(function() {
    navi();
  });
  $('#tmap-navi').click(function() {
    tmap_navi();
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    // if ($("#mainNav").offset().top > 100) {
    //   $("#mainNav").addClass("navbar-shrink");
    // } else {
    //   $("#mainNav").removeClass("navbar-shrink");
    // }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // $("#carouselExampleControls").swiperight(function() {
  //   $(this).carousel('prev');
  // });
  // $("#carouselExampleControls").swipeleft(function() {
  //   $(this).carousel('next');
  // });

})(jQuery); // End of use strict

$('.carousel').carousel({
  interval: false
})

var map = new naver.maps.Map('map');
var myaddress = '경북 영주시 원당로 80';// 도로명 주소나 지번 주소만 가능 (건물명 불가!!!!)
naver.maps.Service.geocode({address: myaddress}, function(status, response) {
  if (status !== naver.maps.Service.Status.OK) {
    console.log(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
    return;
  }
  var result = response.result;
  // 검색 결과 갯수: result.total
  // 첫번째 결과 결과 주소: result.items[0].address
  // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
  var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
  map.setCenter(myaddr); // 검색된 좌표로 지도 이동
  // 마커 표시
  var marker = new naver.maps.Marker({
    position: myaddr,
    map: map
  });
  // 마커 클릭 이벤트 처리
  naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
      infowindow.close();
    } else {
      infowindow.open(map, marker);
    }
  });
  // 마크 클릭시 인포윈도우 오픈
  var infowindow = new naver.maps.InfoWindow({
    content: '<h5>그랜드컨벤션웨딩</h5> TEL 054-637-1000 <br />경북 영주시 원당로 80'
  });
});

Kakao.init('20ab922a498f1485fcd5d70954b6a5c9');

function navi() {
  Kakao.Navi.start({
    name: "그랜드컨벤션웨딩",
    x: 128.623455,
    y: 36.819962,
    coordType: 'wgs84'
  });
}

var tmap_map;
tmap_init();
function tmap_init() {
  tmap_map = new Tmap.Map({div:'map_div',
    width:'1px',
    height:"1px"
  });
}
function tmap_navi() {
  console.log(tmap_map.tmapAppInvoke);
  tmap_map.tmapAppInvoke({
    client:"sk",
    title:"그랜드컨벤션웨딩",
    lonlat:new Tmap.LonLat(128.623455, 36.819962).transform("EPSG:4326", "EPSG:3857"),
    alert:true
  });
}

// // Map
//
// // Google Maps Scripts
// var map = null;
// // When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
// google.maps.event.addDomListener(window, 'resize', function() {
//   map.setCenter(new google.maps.LatLng(40.6700, -73.9400));
// });
//
// function init() {
//   // Basic options for a simple Google Map
//   // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
//   var mapOptions = {
//     // How zoomed in you want the map to start at (always required)
//     zoom: 15,
//
//     // The latitude and longitude to center the map (always required)
//     center: new google.maps.LatLng(40.6700, -73.9400), // New York
//
//     // Disables the default Google Maps UI components
//     disableDefaultUI: true,
//     scrollwheel: false,
//     draggable: false,
//
//     // How you would like to style the map.
//     // This is where you would paste any style found on Snazzy Maps.
//     styles: [{
//       "featureType": "water",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }]
//     }, {
//       "featureType": "landscape",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 20
//       }]
//     }, {
//       "featureType": "road.highway",
//       "elementType": "geometry.fill",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }]
//     }, {
//       "featureType": "road.highway",
//       "elementType": "geometry.stroke",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 29
//       }, {
//         "weight": 0.2
//       }]
//     }, {
//       "featureType": "road.arterial",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 18
//       }]
//     }, {
//       "featureType": "road.local",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 16
//       }]
//     }, {
//       "featureType": "poi",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 21
//       }]
//     }, {
//       "elementType": "labels.text.stroke",
//       "stylers": [{
//         "visibility": "on"
//       }, {
//         "color": "#000000"
//       }, {
//         "lightness": 16
//       }]
//     }, {
//       "elementType": "labels.text.fill",
//       "stylers": [{
//         "saturation": 36
//       }, {
//         "color": "#000000"
//       }, {
//         "lightness": 40
//       }]
//     }, {
//       "elementType": "labels.icon",
//       "stylers": [{
//         "visibility": "off"
//       }]
//     }, {
//       "featureType": "transit",
//       "elementType": "geometry",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 19
//       }]
//     }, {
//       "featureType": "administrative",
//       "elementType": "geometry.fill",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 20
//       }]
//     }, {
//       "featureType": "administrative",
//       "elementType": "geometry.stroke",
//       "stylers": [{
//         "color": "#000000"
//       }, {
//         "lightness": 17
//       }, {
//         "weight": 1.2
//       }]
//     }]
//   };
//
//   // Get the HTML DOM element that will contain your map
//   // We are using a div with id="map" seen below in the <body>
//   var mapElement = document.getElementById('map');
//
//   // Create the Google Map using out element and options defined above
//   map = new google.maps.Map(mapElement, mapOptions);
//
//   // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
//   var image = 'img/map-marker.svg';
//   var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
//   var beachMarker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     icon: image
//   });
// }
