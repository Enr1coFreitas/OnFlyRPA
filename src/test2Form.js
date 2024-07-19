function alteraTextoParagrafos() {
  const paragrafos = document.querySelectorAll('p');
  paragrafos.forEach(paragrafo => {
    paragrafo.textContent = 'Texto alterado';
  });
}

alteraTextoParagrafos();