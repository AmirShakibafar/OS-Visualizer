// Get the modal
var modal = document.getElementById("guide-container-mobile");

// Get the button that opens the modal
var btn = document.getElementById("guideBTN");


btn.onclick = function() {
  modal.style.display = "flex";
  modal.style.zIndex = "1";
  modal.style.boxShadow = "0 0 0 500px rgba(255, 255, 255, 0.8)"
  modal.style.width = "80%";
  modal.style.flexWrap = "wrap";
  modal.style.background = "white";
  modal.style.padding = "20px";
  modal.style.borderRadius = "8px";
  modal.style.border= "2px solid var(--primary-color)";
  modal.style.fontFamily = "Poppins, serif";
  modal.style.cursor = "pointer";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.style.zIndex = "";
    modal.style.boxShadow = "none"
  }
}