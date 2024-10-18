"use strict"; // Modo restrito

// Função para limpar o formulário
const limparFormulario = () => {
  document.getElementById("logradouro").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("localidade").value = "";
  document.getElementById("Complemento").value = "";
  document.getElementById("uf").value = "";
};

// Função para verificar se um valor é numérico
const eNumero = (numero) => /^[0-9]+$/.test(numero);

// Função para validar o CEP
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

// Função para preencher o formulário com os dados da API
const preencherFormulario = (endereco) => {
  document.getElementById("logradouro").value = endereco.logradouro;
  document.getElementById("localidade").value = endereco.localidade;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("uf").value = endereco.uf;
};

// Função para pesquisar o CEP usando a API ViaCEP
const pesquisarCep = async () => {
  limparFormulario();
  const cep = document.getElementById("cep").value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    
    if (endereco.hasOwnProperty("erro")) {
      alert("CEP não encontrado");
    } else {
      preencherFormulario(endereco);
    }
  } else {
    alert("CEP incorreto!");
  }
};

// Adiciona um escutador para executar a pesquisa de CEP ao perder o foco
document.getElementById("cep").addEventListener("focusout", pesquisarCep);

// Função para validar o email
function ChecarEmail() {
    const email = document.forms[0].email.value;
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      alert("Por favor informe um email válido");
      return false;
    } else {
      // Remove the alert here
      // alert("Email informado com sucesso!");
    }
  }
  
  // Validação de CPF
  document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const cpf = document.getElementById("cpf").value;
    const msg = document.getElementById("message");
    
    if (validateCPF(cpf)) {
      msg.textContent = "O CPF é Válido";
      msg.style.color = 'green';
    } else {
      msg.textContent = "O CPF é inválido";
      msg.style.color = 'red';
    }
    
    // Add the alert here
    alert("Campo preenchido com sucesso!");
  });
// Função de cálculo de validação do CPF
function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  // Verifica se o valor contém 11 dígitos e se todos os dígitos são iguais
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  // Validação do primeiro dígito verificador
  for (let i = 1; i < 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}