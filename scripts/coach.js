// ── Coach section ─────────────────────────────────────────────────────────────

// Generic paragraph toggles (About, Experiences)
document.querySelectorAll(".btn-expand[data-target]").forEach(function (btn) {
  var targetId = btn.getAttribute("data-target");
  var target = document.getElementById(targetId);
  if (!target) return;
  btn.addEventListener("click", function () {
    var opening = !target.classList.contains("is-open");
    target.classList.toggle("is-open", opening);
    btn.classList.toggle("is-open", opening);
    btn.querySelector(".btn-expand__text").textContent = opening ? "Less" : "More";
  });
});

// Certificates toggle with layout switch
(function () {
  var certToggle = document.getElementById("certToggle");
  if (!certToggle) return;

  var certExtras = document.querySelectorAll(".cert-extra");
  var coachLayout = document.getElementById("coachLayout");
  var coachSection = document.getElementById("coach");
  var certBullet = document.getElementById("certBullet");
  var certOpen = false;

  var isDesktop = function () {
    return window.innerWidth >= 981;
  };

  function smoothScrollTo(el, offset) {
    var top = el.getBoundingClientRect().top + window.pageYOffset + (offset || 0);
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  function openCerts() {
    certOpen = true;
    certToggle.classList.add("is-open");
    certToggle.querySelector(".btn-expand__text").textContent = "Less";

    certExtras.forEach(function (li, i) {
      li.classList.add("is-visible");
      requestAnimationFrame(function () {
        setTimeout(function () {
          li.classList.add("is-animated");
        }, 20 + i * 20);
      });
    });

    if (isDesktop()) {
      coachLayout.classList.add("is-stacked");
      setTimeout(function () {
        smoothScrollTo(certBullet, -24);
      }, 460);
    } else {
      setTimeout(function () {
        smoothScrollTo(certBullet, -16);
      }, 200);
    }
  }

  function closeCerts() {
    certOpen = false;
    certToggle.classList.remove("is-open");
    certToggle.querySelector(".btn-expand__text").textContent = "More";

    certExtras.forEach(function (li) {
      li.classList.remove("is-animated");
      setTimeout(function () {
        li.classList.remove("is-visible");
      }, 280);
    });

    if (isDesktop()) {
      coachLayout.classList.remove("is-stacked");
      setTimeout(function () {
        smoothScrollTo(coachSection, -20);
      }, 460);
    } else {
      setTimeout(function () {
        smoothScrollTo(coachSection, -16);
      }, 200);
    }
  }

  certToggle.addEventListener("click", function () {
    if (certOpen) {
      closeCerts();
    } else {
      openCerts();
    }
  });
})();
