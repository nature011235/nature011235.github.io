// var data = {
//   "informations": [
//     {
//       "address": "宜蘭縣 三星鄉 三星路5段39號",
//       "name": "泉興機車行"
//     },
//     {
//       "address": "宜蘭縣 宜蘭市 泰山路240號",
//       "name": "元凱機車行"
//     },
//     {
//       "address": "金門縣 金湖鎮 市港路40號",
//       "name": "永慶機車行"
//     },
//     {
//       "address": "臺東縣 太麻里鄉 多良村大溪路110-3號1樓",
//       "name": "鎮山機車行"
//     },
//     {
//       "address": "臺東縣 台東巿 豐榮路271號",
//       "name": "高盛車業"
//     }
//   ],
//   "positions": [
//     {
//       "latitude": 24.6659191,
//       "longitude": 121.651767
//     },
//     {
//       "latitude": 24.751336,
//       "longitude": 121.737675
//     },
//     {
//       "latitude": 24.4369503,
//       "longitude": 118.410629
//     },
//     {
//       "latitude": 22.4806529,
//       "longitude": 120.9429404
//     },
//     {
//       "latitude": 22.7519484,
//       "longitude": 121.1337971
//     }
//   ]
// };

function initMap() {
  console.log(google); // 確認 google 物件是否已經定義
  console.log(google.maps); // 確認 google.maps 物件是否已經定義
  // 創建一個新的地圖對象
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8, // 地圖縮放級別
    center: { lat: 25.042029, lng: 121.534846 } // 中心座標
  });
  var searchService = new google.maps.places.PlacesService(map);

  document.getElementById('locate-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
      // 獲取地理位置
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      // 瀏覽器不支援地理位置API
      alert('瀏覽器不支援地理位置功能');
    }
  });

  function successCallback(position) {
    var latitude = position.coords.latitude; // 緯度
    var longitude = position.coords.longitude; // 經度

    // 將緯度和經度填充到表單中
    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;

    // 創建使用者的LatLng對象
    var userLocation = new google.maps.LatLng(latitude, longitude);

    // 在地圖上標記使用者的位置
    var marker = new google.maps.Marker({
      position: userLocation,
      map: map
    });

    // 將地圖中心設置為使用者的位置
    map.setCenter(userLocation);
  }

  function errorCallback(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("使用者拒絕提供地理位置");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("無法獲取地理位置資訊");
        break;
      case error.TIMEOUT:
        alert("獲取地理位置超時");
        break;
      case error.UNKNOWN_ERROR:
        alert("發生未知錯誤");
        break;
    }
  }

  document.getElementById('search-btn').addEventListener('click', function() {
    var lat = parseFloat(document.getElementById('latitude').value);
    var lng = parseFloat(document.getElementById('longitude').value);
    var location = new google.maps.LatLng(lat, lng);

    var request = {
      location: location,
      radius: 1000000, // 搜尋半徑，單位為公尺
      query: lat + ',' + lng,
      fields: ['name', 'geometry']
    };

    searchService.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // 成功搜尋到地點，將地圖移動到該地點位置
        var place = results[0];
        map.setCenter(place.geometry.location);
        // 在地圖上標記出該地點
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      } else {
        // 搜尋失敗，提示使用者
        alert('很抱歉，找不到符合搜尋條件的地點。');
      }
    });
  });

  // var informationList = document.getElementById('information-list');

  // var markers = []; // 儲存所有標記的陣列

  // var showInfoBtn = document.getElementById('show-info-btn');
  // showInfoBtn.addEventListener('click', function() {
  //   // 顯示資訊列表
  //   informationList.style.display = 'block';
  //   for (var i = 0; i < data.informations.length; i++) {
  //     var information = data.informations[i];
  //     var position = data.positions[i];

  //   // Create information div
  //     var infoDiv = document.createElement('div');
  //     infoDiv.innerHTML = '<h3>' + information.name + '</h3>' +
  //       '<p>地址: ' + information.address + '</p>';

  //   // Append information div to information list
  //     informationList.appendChild(infoDiv);

  //   // Create marker
  //     var marker = new google.maps.Marker({
  //       position: { lat: position.latitude, lng: position.longitude },
  //       map: map
  //     });

  //     markers.push(marker); // 將標記加入陣列
  //   }
  // });
}

window.initMap = initMap;