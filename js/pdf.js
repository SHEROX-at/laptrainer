function searchPDF() {
  const val = document.getElementById("search").value;
  const pdf = document.getElementById("pdf");

  pdf.src = "assets/gleisbau.pdf#search=" + val;
}
