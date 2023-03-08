let ModalMensage = "";

function isNumber(cep) {
  document.getElementById("error").value = "CEP Inválido";
  return /^[0-9]+$/.test(cep);
}

function validCep(cep) {
  return cep.length == 8 && isNumber(cep);
}

function clearFieldsCEP() {
  document.getElementById("endereco").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("ibge").value = "";
  document.getElementById("ddd").value = "";
  document.getElementById("siafa").value = "";
}

function clearFields() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("ibge").value = "";
  document.getElementById("ddd").value = "";
  document.getElementById("siafa").value = "";
  document.getElementById("endereco").value = "";
}

function setErrorCEP(error) {
  if (error) {
    const error = document.getElementById("error");
    error.style.display = null;
  } else {
    const error = document.getElementById("error");
    error.style.display = "none";
  }
}

function setErrorFields(error) {
  if (error) {
    const error = document.getElementById("fieldnull");
    error.style.display = null;
  } else {
    const error = document.getElementById("fieldnull");
    error.style.display = "none";
  }
}

async function getCep() {
  const cep = document.getElementById("cep").value.replace("-", "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  if (validCep(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    console.log(endereco);
    if (endereco.erro) {
      clearFieldsCEP();
      setErrorCEP(true);
    } else {
      document.getElementById("endereco").value = endereco.logradouro;
      document.getElementById("bairro").value = endereco.bairro;
      document.getElementById("cidade").value = endereco.localidade;
      document.getElementById("estado").value = endereco.uf;
      document.getElementById("ibge").value = endereco.ibge;
      document.getElementById("ddd").value = endereco.ddd;
      document.getElementById("siafa").value = endereco.siafi;

      setErrorCEP(false);
    }
  }
}

function renderInfo() {
  if (
    document.getElementById("nome").value != "" ||
    document.getElementById("email").value != "" ||
    document.getElementById("cep").value != "" ||
    document.getElementById("numero").value != "" ||
    document.getElementById("bairro").value != "" ||
    document.getElementById("cidade").value != "" ||
    document.getElementById("estado").value != "" ||
    document.getElementById("ibge").value != "" ||
    document.getElementById("ddd").value != "" ||
    document.getElementById("siafa").value != "" ||
    document.getElementById("endereco").value != ""
  ) {
    const data = [
      `Nome do aluno: ${document.getElementById("nome").value}`,
      `Email do aluno: ${document.getElementById("email").value}`,
      `CEP do aluno: ${document.getElementById("cep").value}`,
      `Endereço: ${document.getElementById("endereco").value}`,
      `Numero: ${document.getElementById("numero").value}`,
      `Bairro: ${document.getElementById("bairro").value}`,
      `Cidade: ${document.getElementById("cidade").value}`,
      `Estado: ${document.getElementById("estado").value}`,
      `IBGE: ${document.getElementById("ibge").value}`,
      `DDD: ${document.getElementById("ddd").value}`,
      `SIAFA: ${document.getElementById("siafa").value}`,
    ];

    document.getElementById("btnSend").removeAttribute("disabled");
    const dataField = document.getElementById("data");
    const dataString = data.map((data) => `${data}<br>`).join("");
    dataField.innerHTML = dataString;
    const errorMsg = document.getElementById("error");
    errorMsg.style.display = "none";
  } else {
    const errorMsg = document.getElementById("error");
    errorMsg.style.display = "block";
    const sucessMsg = document.getElementById("sucess");
    sucessMsg.style.display = "none";
    document.getElementById("btnSend").setAttribute("disabled", true);
  }
}

function sendInfo() {
  const sucessMsg = document.getElementById("sucess");
  sucessMsg.style.display = "block";
  const errorMsg = document.getElementById("error");
  errorMsg.style.display = "none";
}

document.getElementById("cep").addEventListener("focusout", getCep);
document.querySelector("#clean").addEventListener("click", clearFields);
document.getElementById("save").addEventListener("click", renderInfo);
document.getElementById("btnSend").addEventListener("click", sendInfo);

let modal = document.getElementById("myModal");
let btn = document.getElementById("save");
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
