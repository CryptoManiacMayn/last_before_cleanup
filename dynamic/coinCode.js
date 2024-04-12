function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
  function transferData(button,coinCode) {
    var row = button.parentNode.parentNode;
    var urlWithParam = 'currency.html?data=' + encodeURIComponent(coinCode);
    window.location.href = urlWithParam;
  }