document.getElementById('imageUpload').addEventListener('change', function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    // A variável 'reader.result' contém os dados da imagem.
    // Você pode definir isso como o fundo do quebra-cabeça.
    startGame(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
