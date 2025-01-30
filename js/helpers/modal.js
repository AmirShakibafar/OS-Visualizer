// Get the modal
var modal = document.getElementById("guide-container-mobile");

// Get the button that opens the modal
var btn = document.getElementById("guideBTN");


btn.onclick = function() {
  modal.style.display = "flex";
  modal.style.zIndex = "900";
  modal.style.boxShadow = "0 0 0 500px rgba(255, 255, 255, 0.8)"
  modal.style.border = "1px solid red";
  modal.innerHTML = "modal";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.style.zIndex = "";
    modal.style.boxShadow = "none"
  }
}