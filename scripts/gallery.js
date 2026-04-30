// ── Gallery carousel (autoplay + arrows) ─────────────────────────────────────

(function () {
  var AUTOPLAY_INTERVAL = 2000; // ms between auto-scrolls
  var AUTOPLAY_PAUSE = 4000; // ms to pause after manual interaction
  var SCROLL_AMOUNT = 0.85; // fraction of visible width to scroll per click

  document.querySelectorAll(".gallery-wrap").forEach(function (wrap) {
    var scroller = wrap.querySelector(".gallery-scroll");
    var prevBtn = wrap.querySelector(".gallery-arrow--prev");
    var nextBtn = wrap.querySelector(".gallery-arrow--next");
    if (!scroller) return;

    var autoTimer = null;
    var pauseTimer = null;
    var isHorizontal = false;

    // ── Detect scroll direction based on layout ──────────────────────────
    function checkDirection() {
      isHorizontal = window.innerWidth <= 980;
    }
    checkDirection();
    window.addEventListener("resize", checkDirection);

    // ── Arrow visibility ─────────────────────────────────────────────────
    function updateArrows() {
      if (!prevBtn || !nextBtn) return;

      if (!isHorizontal) {
        prevBtn.classList.add("is-hidden");
        nextBtn.classList.add("is-hidden");
        return;
      }

      var atStart = scroller.scrollLeft <= 2;
      var atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;

      prevBtn.classList.toggle("is-hidden", atStart);
      nextBtn.classList.toggle("is-hidden", atEnd);
    }

    scroller.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    // Initial check after images may have loaded
    setTimeout(updateArrows, 200);

    // ── Scroll by amount ─────────────────────────────────────────────────
    function scrollBy(direction) {
      if (isHorizontal) {
        var amount = scroller.clientWidth * SCROLL_AMOUNT * direction;
        scroller.scrollBy({ left: amount, behavior: "smooth" });
      } else {
        var amount = scroller.clientHeight * 0.5 * direction;
        scroller.scrollBy({ top: amount, behavior: "smooth" });
      }
    }

    // ── Arrow clicks ─────────────────────────────────────────────────────
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        scrollBy(-1);
        pauseAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        scrollBy(1);
        pauseAutoplay();
      });
    }

    // ── Autoplay ─────────────────────────────────────────────────────────
    function autoScroll() {
      if (isHorizontal) {
        var atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;
        if (atEnd) {
          scroller.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by one tile width
          var tile = scroller.querySelector(".tile");
          var step = tile ? tile.offsetWidth + 14 : scroller.clientWidth * 0.33;
          scroller.scrollBy({ left: step, behavior: "smooth" });
        }
      } else {
        var atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        if (atEnd) {
          scroller.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          var tile = scroller.querySelector(".tile");
          var step = tile ? tile.offsetHeight * 0.6 : 200;
          scroller.scrollBy({ top: step, behavior: "smooth" });
        }
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoTimer = setInterval(autoScroll, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function pauseAutoplay() {
      stopAutoplay();
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(startAutoplay, AUTOPLAY_PAUSE);
    }

    // Pause on hover / touch
    scroller.addEventListener("mouseenter", stopAutoplay);
    scroller.addEventListener("mouseleave", function () {
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(startAutoplay, 1200);
    });

    scroller.addEventListener("touchstart", pauseAutoplay, { passive: true });

    // ── IntersectionObserver: only autoplay when visible ──────────────────
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              startAutoplay();
            } else {
              stopAutoplay();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(scroller);
    } else {
      startAutoplay();
    }
  });
})();
