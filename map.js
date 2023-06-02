var markers = [];
var map;
var i = 0;
function getDataWithInput(table) {
    var input1 = document.getElementById('County').value;
    var input2 = document.getElementById('district').value;
    getData(table, input1, input2);
}
function getData(table, input1, input2) {
    // 使用AJAX或其他方式向後端發送請求並傳遞table值
    // 在這裡可以使用AJAX函式庫（例如jQuery的$.ajax()函式）或原生的fetch API等方法
    // 下面是一個使用fetch API的示例：
    fetch("/get_data/" + table  + "/" + input1 + " " + input2, {
    method: "GET",
    // 可以根據需要設定其他請求選項，例如標頭或內容類型
    })
    .then(response => response.json())
    .then(data => {
    // 在这里处理后端返回的数据
    // 假设数据是一个数组，每个元素都是包含需要显示的字段的对象
    // 在这里，我们假设有一个id为 "result-container" 的 HTML 元素作为显示结果的容器
    const positions = data.positions;
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = ""; // 清空容器内容

    // 遍历数据并将其显示在网页上
    data.informations.forEach(item => {
        const listItem = document.createElement("li");
        const value = Object.values(item).join(', '); // 将对象的值组合成字符串
        listItem.textContent = value;
        resultContainer.appendChild(listItem);
    });

    markers.forEach(marker => marker.setMap(null));
    markers.length = 0;

    data.positions.forEach(position => {
    const marker = new google.maps.Marker({
        position: { lat: position.latitude, lng: position.longitude },
        map: map
        });
        const customLabel = {
            color: '#2e648c', // 文本颜色
            fontWeight: 'bold', // 文本粗细
            fontSize: '14px', // 文本大小
            text: {
                backgroundColor: '#ffffff', // 背景颜色
                borderRadius: '5px', // 边框圆角半径
                padding: '5px 10px' // 内边距
            }
        };

        marker.addListener("click", function() {
            // 清空其他标记的信息
            markers.forEach(marker => {
                if (marker !== this) {
                    marker.setLabel(null); // 清除标记的文本
                }
            });

            // 将信息显示在标记上
            const labelText = `${information.address} , ${information.name}`;
            this.setLabel({
                ...customLabel,
                text: labelText
            }); // 将自定义标签设置为标记的文本
        });
        const information = data.informations[i];
        i++;
    markers.push(marker); // 将标记加入数组
    });
    })
    .catch(error => {
    console.error("Error:", error);
    });
}

function getDataWithInput1(table) {
    var input1 = document.getElementById('County').value;
    var input2 = document.getElementById('district').value;
    getData1(table, input1, input2);
}
function getData1(table, input1, input2) {
    // 使用AJAX或其他方式向後端發送請求並傳遞table值
    // 在這裡可以使用AJAX函式庫（例如jQuery的$.ajax()函式）或原生的fetch API等方法
    // 下面是一個使用fetch API的示例：
    fetch("/get_data/" + table  + "/" + input1 + input2, {
    method: "GET",
    // 可以根據需要設定其他請求選項，例如標頭或內容類型
    })
    .then(response => response.json())
    .then(data => {
    // 在这里处理后端返回的数据
    // 假设数据是一个数组，每个元素都是包含需要显示的字段的对象
    // 在这里，我们假设有一个id为 "result-container" 的 HTML 元素作为显示结果的容器
    const positions = data.positions;
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = ""; // 清空容器内容

    // 遍历数据并将其显示在网页上
    data.informations.forEach(item => {
        const listItem = document.createElement("li");
        const value = Object.values(item).join(', '); // 将对象的值组合成字符串
        listItem.textContent = value;
        resultContainer.appendChild(listItem);
    });

    markers.forEach(marker => marker.setMap(null));
    markers.length = 0;

    data.positions.forEach(position => {
    const marker = new google.maps.Marker({
        position: { lat: position.latitude, lng: position.longitude },
        map: map
        });
        const customLabel = {
            color: '#2e648c', // 文本颜色
            fontWeight: 'bold', // 文本粗细
            fontSize: '14px', // 文本大小
            text: {
                backgroundColor: '#ffffff', // 背景颜色
                borderRadius: '5px', // 边框圆角半径
                padding: '5px 10px' // 内边距
            }
        };

        marker.addListener("click", function() {
            // 清空其他标记的信息
            markers.forEach(marker => {
                if (marker !== this) {
                    marker.setLabel(null); // 清除标记的文本
                }
            });

            // 将信息显示在标记上
            const labelText = `${information.address} , ${information.name}`;
            this.setLabel({
                ...customLabel,
                text: labelText
            }); // 将自定义标签设置为标记的文本
        });
        const information = data.informations[i];
        i++;
    markers.push(marker); // 将标记加入数组
    });
    })
    .catch(error => {
    console.error("Error:", error);
    });
}

function initMap() {
console.log(google); // 確認 google 物件是否已經定義
console.log(google.maps); // 確認 google.maps 物件是否已經定義
// 創建一個新的地圖對象
map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8, // 地圖縮放級別
    center: { lat: 22.997483, lng: 120.218214 } // 中心座標
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
}

window.initMap = initMap;