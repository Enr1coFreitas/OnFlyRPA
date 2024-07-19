let isTextChanged = false;

const changeParagraphText = () => {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    if (isTextChanged) {
      paragraph.textContent = 'Este é um parágrafo que será alterado.';
    } else {
      paragraph.textContent = 'Texto alterado';
    }
  });
  isTextChanged = !isTextChanged;
};

export default changeParagraphText;