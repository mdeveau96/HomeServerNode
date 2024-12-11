document.getElementById("fileUpload").addEventListener("change", function () {
  const fileName = this.files[0]?.name || "No file chosen";
  document.querySelector(".file-name").textContent = fileName;
});

document.getElementById("alert-banner").addEventListener("change", function (e) {
  e.preventDefault();
  this.classList.toggle("alert")
});

var tele = document.querySelector('#telle');

tele.addEventListener('keyup', function(e){
  if (event.key != 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)){
  tele.value += '-';
  }
});