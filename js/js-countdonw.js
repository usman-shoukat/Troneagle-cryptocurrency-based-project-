document.addEventListener('DOMContentLoaded', () => {

  // Unix timestamp (in seconds) to count down to
  var dateDeadline = new Date("Sept 17, 2020 21:00:00").getTime();

  var now = new Date().getTime();
  var timeleft = dateDeadline - now;

  // Calculating the days, hours, minutes and seconds left
   var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
   var daystosec = 86400 * days;
   var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   var hrstosec = 3600 * hours
   var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
   var mnstosec = 60 * minutes
   var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  var total = daystosec + hrstosec + mnstosec + seconds;
  var twoDaysFromNow = (new Date().getTime() / 1000) + (total) + 1;



console.log(now)
  // Set up FlipDown
  var flipdown = new FlipDown(twoDaysFromNow).start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log('The countdown has ended!');
    });

  // Toggle theme


  // Show version number
  var ver = document.getElementById('ver');
  ver.innerHTML = flipdown.version;
});
