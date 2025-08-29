$(document).ready(function(){
    var owl = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: false,
    dots: true,   // 기본 dots 켬
    nav: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
    });

    // dot 클릭 시 수동 제어
    $(".owl-dot a").on("click", function(e){
        e.preventDefault();
        var index = $(this).parent().index(); // 클릭한 dot index
        owl.trigger("to.owl.carousel", [index, 300]);
    });

    // 슬라이드 변경 시 dot & active 클래스 업데이트
    owl.on("changed.owl.carousel", function(event){
        var index = event.item.index;
        
        // owl-item active 업데이트
        $(".owl-carousel .owl-item").removeClass("active");
        $(".owl-carousel .owl-item").eq(index).addClass("active");

        // dot active 업데이트
        $(".owl-dot").removeClass("active");
        $(".owl-dot").eq(index).addClass("active");
    });

    // 초기 상태
    $(".owl-carousel .owl-item").eq(0).addClass("active");
    });

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".renew-condition-box", {
    slidesPerView: 2,   // 👉 한 번에 하나만 보이게
    spaceBetween: 30,   // 간격
    navigation: {
      nextEl: ".swiper-button-next", // 다음 버튼
      prevEl: ".swiper-button-prev"  // 이전 버튼
    },
    loop: false
  });
});

$(document).ready(function() {
    // 탭 메뉴 클릭
    $(".main-title-tab ul > li > a.main-tab-content").on("click", function(e) {
        e.preventDefault();

        var $parentLi = $(this).parent(); // 클릭한 li
        var index = $parentLi.index();   // 몇 번째 탭인지

        // 1. 탭 메뉴 active 처리
        $parentLi.addClass("active").siblings().removeClass("active");

        // 2. 콘텐츠 show/hide 처리
        $(".main-content-tab > li").eq(index).addClass("active").siblings().removeClass("active");
    });
});

