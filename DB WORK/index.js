// const button=document.getElementsByClassName('menubutton')
// button[4].addEventListener('click',function(){
//     const maincontent=document.getElementById('maincontent');
//     maincontent.style.justifyContent='center';
//     maincontent.innerHTML=`<p style="text-align: center;">請先登入<a href="signin.html" style="color: aqua; text-decoration: none;">會員</a></p>`;
// })
var queryString = window.location.search;
  
  // 使用 URLSearchParams 解析查詢字串
var params = new URLSearchParams(queryString);
  
  // 取得參數值

let login=false
let username=params.get('param1')
login=params.get('param2')
console.log(login)
if(login){
  const usernameloc=document.getElementById("usernameloc")
  usernameloc.innerText=username.substring(0,8)+"...";
  usernameloc.addEventListener('click', function(event) {
    event.preventDefault(); // 取消點擊事件的預設行為
  });
  const innerlist=document.querySelector(".innerlist")
  console.log(innerlist)
  const usernameloclist=document.getElementById("usernameloclist")
  usernameloclist.addEventListener('mouseover', function() {
    // 鼠標移入時的樣式設置
    innerlist.style.display='block'
  });
  
  usernameloclist.addEventListener('mouseout', function() {
    // 鼠標移出時的樣式設置
    innerlist.style.display='none'
  });
  const logo=document.getElementById("logo")
  logo.addEventListener('click', function(event) {
    event.preventDefault(); // 取消點擊事件的預設行為
    let link='index.html?param1='+encodeURIComponent(username)+"&param2="+encodeURIComponent(login);
    window.location.href=link;
  });

}


window.onload = function () {
  let slideIndex = 1;
  showSlide(slideIndex);

  let prev = document.getElementById("prev");
  prev.addEventListener("click", divideSlides, false);

  let next = document.getElementById("next");
  next.addEventListener("click", plusSlides, false);

  const selectdot = document.querySelectorAll(".dot");
  for (let i = 0; i < selectdot.length; i++) {
    selectdot[i].addEventListener("click", function (e) {
      showSlide((slideIndex = i + 1));
    });
  }

  function plusSlides() {
    showSlide((slideIndex += 1));
  }

  function divideSlides() {
    showSlide((slideIndex -= 1));
  }

  function showSlide(num) {
    let slides = document.getElementsByClassName("slide__item");
    let dots = document.getElementsByClassName("dot");
    if (num > slides.length) {
      slideIndex = 1;
    }

    if (num < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
};

