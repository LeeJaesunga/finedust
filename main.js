$(document).ready(function () {
  // ======================
  // 1) OWL: 하드코딩된 DOM 그대로 제어 (플러그인 미사용)
  // ======================
  var $carousel = $(".owl-carousel");
  if ($carousel.length) {
    var $stage = $carousel.find(".owl-stage");
    var $items = $stage.find(".owl-item");
    var $dots  = $carousel.find(".owl-dots .owl-dot");
    var count  = $items.length;
    var current = $dots.filter(".active").index();
    if (current < 0) current = $items.filter(".active").index();
    if (current < 0) current = 0;

    // 레이아웃 강제 (한 화면에 한 슬라이드)
    $stage.css({
      display: "flex",
      transition: "transform 0.3s ease",
      width: (100 * count) + "%"
    });
    $items.css({
      flex: "0 0 100%",
      maxWidth: "100%"
    });

    function goTo(i, animate) {
      if (i < 0) i = 0;
      if (i >= count) i = count - 1;
      current = i;

      $items.removeClass("active").eq(current).addClass("active");
      $dots.removeClass("active").eq(current).addClass("active");

      if (animate === false) $stage.css("transition", "none");
      $stage.css("transform", "translateX(" + (-100 * current) + "%)");
      if (animate === false) {
        // 리플로우 후 트랜지션 복구
        $stage[0].offsetHeight;
        $stage.css("transition", "transform 0.3s ease");
      }

      // Owl의 changed 이벤트를 흉내낸 커스텀 이벤트
      $carousel.trigger("changed.custom.owl.carousel", { index: current });
    }

    // dot 클릭 (a 태그 포함 방지)
    $carousel.on("click", ".owl-dots .owl-dot, .owl-dots .owl-dot a", function (e) {
      e.preventDefault();
      var idx = $(this).closest(".owl-dot").index();
      goTo(idx);
      restartAuto();
    });

  
    // (옵션) 외부에서 변경 감지용
    $carousel.on("changed.custom.owl.carousel", function (e, data) {
      // console.log("슬라이드 바뀜:", data.index);
    });
  }

  // ======================
  // 2) 탭 메뉴
  // ======================
  $(".main-title-tab ul > li > a.main-tab-content").on("click", function (e) {
    e.preventDefault();
    var $li = $(this).parent();
    var idx = $li.index();
    $li.addClass("active").siblings().removeClass("active");
    $(".main-content-tab > li").eq(idx).addClass("active").siblings().removeClass("active");
  });
});

// ======================
// 3) Swiper 초기화
// ======================
$(document).ready(function () {
  var $carousel = $(".main-content03-carousel .owl-carousel");
  var $stage = $carousel.find(".owl-stages");
  var $items = $stage.find(".owl-item").not(".cloned");
  var itemsPerView = 3;
  var currentPage = 0;
  var totalPages = Math.ceil($items.length / itemsPerView);

  function updateWidths() {
    var stageWidth = $carousel.width();
    var itemWidth = stageWidth / itemsPerView;
    $items.css({
      flex: "0 0 " + itemWidth + "px",
      maxWidth: itemWidth + "px"
    });
    return itemWidth;
  }

  function goToPage(page) {
    if (page < 0) page = 0;
    if (page >= totalPages) page = totalPages - 1;
    currentPage = page;

    var itemWidth = updateWidths();
    var offset = -(itemWidth * itemsPerView * currentPage);

    // 마지막 페이지에서 남은 아이템이 화면보다 적으면 맞춤
    var remainingItems = $items.length - itemsPerView * currentPage;
    if (remainingItems < itemsPerView) {
      offset = -(itemWidth * ($items.length - itemsPerView));
    }

    // 첫 페이지는 offset 0
    if (currentPage === 0) offset = 0;

    $stage.css({
      transform: "translateX(" + offset + "px)",
      transition: "transform 0.4s ease"
    });

    // active 클래스
    $items.removeClass("active");
    $items.slice(currentPage * itemsPerView, currentPage * itemsPerView + itemsPerView)
          .addClass("active");

    // 버튼 활성/비활성
    $(".main-content03-carousel .prev").toggleClass("disabled", currentPage === 0);
    $(".main-content03-carousel .next").toggleClass("disabled", currentPage >= totalPages - 1);
  }

  goToPage(0);

  $(".main-content03-carousel .prev").on("click", function (e) {
    e.preventDefault();
    if (!$(this).hasClass("disabled")) goToPage(currentPage - 1);
  });

  $(".main-content03-carousel .next").on("click", function (e) {
    e.preventDefault();
    if (!$(this).hasClass("disabled")) goToPage(currentPage + 1);
  });

  $(window).on("resize", function () {
    goToPage(currentPage);
  });
});










