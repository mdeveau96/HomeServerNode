document.getElementById("fileUpload").addEventListener("change", function () {
  const fileName = this.files[0]?.name || "No file chosen";
  document.querySelector(".file-name").textContent = fileName;
});

document.getElementById("alert-banner").addEventListener("change", function (e) {
  e.preventDefault();
  this.classList.toggle("alert")
});