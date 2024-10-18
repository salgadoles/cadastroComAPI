"use strict"; // Modo restrito
// Este modo Ajuda a evitar erros comuns de programação, JavaScript opera de forma mais segura e rigorosa
/* consumo de API - https://viacep.com.br/ */
// função limpar formulario
const limparFormulario = () => {
  document.getElementById("logradouro").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("localidade").value = "";
  document.getElementById("Complemento").value = "";
  document.getElementById("uf").value = "";
};
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
/// length verifica a quantidade de caracteres do argumento cep
 
// função para preencher formulario com campos da API
const preencherFormulario = (endereco) => {
  document.getElementById("logradouro").value = endereco.logradouro;
  document.getElementById("localidade").value = endereco.localidade;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("uf").value = endereco.uf;
};
// função de consumo de API viaCep
 
// explicar dps
const pesquisarCep = async () => {
  limparFormulario();
  const url = `https://viacep.com.br/ws/${cep.value}/json/`;
  if (cepValido(cep.value)) {
    const dados = await fetch(url);
    // explicar dps
    const addres = await dados.json();
    // explicar dps
 
    // explicar dps
    if (addres.hasOwnProperty("erro")) {
      alert("Cep não encontrado");
    } else {
      preencherFormulario(addres);
    }
  } else {
    alert("CEP incorreto!");
  };
};
//adiciona escutador para executar consumo de API da ViaCep
document.getElementById("cep").addEventListener("focusout",pesquisarCep);
 

// bloco de validação de email
// -------------------------------------
function ChecarEmail() {
    if (document.forms[0].email.value == "" ||
        document.forms[0].email.value.indexOf("@") == -1 ||
        document.forms[0].email.value.indexOf(".") == -1) {
        alert("Por favor informe um email valido");
        return false
    }else{
        alert("Email informado com sucesso!")
    }
}

// ----------------------------------------------------------------


//VALIDAÇÃO DE CPF



//adiciona um escutador
// -------------------------------------------------------------------------------------------------------------------
document.getElementById("cpfForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const cpf = document.getElementById("cpf").value;
  const msg = document.getElementById("message");
  if (validateCPF(cpf)) {
    msg.textContent = "O CPF é Valido";
    msg.style.color = 'green';
  } else {
    msg.textContent = "O CPF e invalido";
    msg.style.color = 'red';
  }
});
// função de calculo de validação do CPF
// ----------------------------------------------------------------------------------------------------------
function validateCPF(cpf){
   cpf = cpf.replace(/[^\d]+/g, ''); //remove caracteres não numérico
 
// verificar se o valor contem 11 digitos e se todos os dígitos ão iguais
// --------------------------------------------------------------------------------------------------------
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
        return false;
    }
 let soma = 0;
 let resto;
 // --------------------------------------------------------------------------------------------------------
//  validação do primeiro digito verificador
for(let i = 1; i < 9; i++){
  soma += parseInt(cpf.substring(i-1, i)) * (11 - i)
}
resto (soma * 10 ) % 11;
  if((resto === 10) || (resto === 11)){
    resto = 0
  }
  if(resto !== parseInt(cpf.substring(9,10))){
 return false;
  }
 soma = 0;
 
 //validar 11 digito de CPF - 2°Digito verificador
 for( let i = 1; i <= 10; i++){
soma + parseInt( cpf.substring(i - 1, i))* (12 - i);
 }
 resto = (soma * 10) % 11;
 if((resto === 10) || (resto === 11)){
  resto = 0;
 }
 if(resto !== parseInt(cpf.substring(10,11))){
  return false;
 }
 return true;
}
