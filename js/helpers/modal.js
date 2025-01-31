// Get the modal
var modal = document.getElementById("guide-container-mobile");

// Get the button that opens the modal
var btn = document.getElementById("guideBTN");
var closeBTN = document.getElementById("close-modal");
closeBTN.style.position = "absolute";
closeBTN.style.top = "1%";
closeBTN.style.left = "3%";
closeBTN.style.borderRadius = "7px";


btn.onclick = function() {
  modal.style.display = "block";
  modal.style.zIndex = "1";
  modal.style.boxShadow = "0 0 0 500px rgba(255, 255, 255, 0.8)"
  modal.style.width = "80%";
  modal.style.height = "80%";
  modal.style.flexWrap = "wrap";
  modal.style.background = "white";
  modal.style.padding = "20px";
  modal.style.borderRadius = "8px";
  modal.style.border= "2px solid var(--primary-color)";
  modal.style.fontFamily = "Poppins, serif";
  modal.style.cursor = "pointer";
  modal.style.textAlign = "center";
  modal. style.overflowY = "scroll";
}

closeBTN.onclick = function() {
  modal.style.display = "none";
    modal.style.zIndex = "";
    modal.style.boxShadow = "none"
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.style.zIndex = "";
    modal.style.boxShadow = "none"
  }
}