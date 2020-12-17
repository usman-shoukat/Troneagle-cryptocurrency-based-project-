function copytoclipboard(id) {
    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  }

  window.onload = function() {
    Particles.init({
      selector: '.background',
      color: '#ffffff',
      connectParticles: 'true',
      maxParticles: "100",
      speed: '1'
    });
  };


$(".navbar li a[href^='#']").on('click', function(event) {
  var target = this.hash;

  event.preventDefault();

  var navOffset = $('#navbar').height();

  return $('html, body').animate({
    scrollTop: $(this.hash).offset().top - navOffset
  }, 300, function() {
    return window.history.pushState(null, null, target);
  });
});


$(function () {
  $(document).scroll(function () {
	  var $nav = $(".fixed-top");
	  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	});
});