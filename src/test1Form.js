function validarEmail() {
  const regex = /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
      const email = emailInput.value;
      const testRegex = regex.test(email);
      if (testRegex === false) {
        alert("O e-mail inserido não é válido. Por favor, insira um e-mail válido.");
        return;
      }
  }
}

function preencherCamposDinamicos() {
    function preencher() {
      const valores = {
        "Nome Completo": "Carlos Felipe",
        "Telefone": "+55 11 91234-5678",
        "E-mail": "carlos.felipe",
        "CEP": "30500-000",
        "Endereço": "Rua Getulio Tulio, 999",
        "Cidade": "Belo Horizonte",
        "Estado": "MG",
        "Nome do Titular": "Carlos Felipe Dias",
        "Número do Cartão": "1234-5678-1234-5678",
        "Data de Validade": "07/2028",
        "CVV": "123"
      };
      const inputs = document.querySelectorAll(".input-field input");
      inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && valores[label.textContent.trim()]) {
          input.value = valores[label.textContent.trim()];
        }
      });
    }

    const intervalo = setInterval(() => {
      const inputs = document.querySelectorAll(".input-field input");
      if (inputs.length > 0) {
        clearInterval(intervalo);
        preencher();
      }
    }, 500);
}

preencherCamposDinamicos();
validarEmail();