

function initMap() {
  console.log(google); // 確認 google 物件是否已經定義
  console.log(google.maps); // 確認 google.maps 物件是否已經定義
  // 創建一個新的地圖對象
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8, // 地圖縮放級別
  center: {lat: 25.042029, lng: 121.534846} // 中心座標
  });
  var searchService = new google.maps.places.PlacesService(map);
  document.getElementById('search-btn').addEventListener('click', function() {
  var query = document.getElementById('search-box').value;
  var request = {
  query: query,
  fields: ['name', 'geometry']
  };
  searchService.findPlaceFromQuery(request, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
  // 成功搜尋到地點，將地圖移動到該地點位置
  var location = results[0].geometry.location;
  map.setCenter(location);
  // 在地圖上標記出該地點
  var marker = new google.maps.Marker({
  map: map,
  position: location
  });
  } else {
  // 搜尋失敗，提示使用者
  alert('很抱歉，找不到符合搜尋條件的地點。');
  }
  });
  });
  }

window.initMap = initMap;
