document.getElementById("cep").addEventListener("blur", async function () {
  const cep = this.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número

  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.ok) {
        const data = await response.json();

        if (data.erro) {
          alert("CEP não encontrado!");
        } else {
          document.getElementById("logradouro").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("uf").value = data.uf;
        }
      } else {
        alert("Erro ao buscar CEP.");
      }
    } catch (error) {
      alert("Erro ao conectar com a API de CEP.");
      console.error(error);
    }
  } else {
    alert("CEP inválido!");
  }
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      cep: document.getElementById("cep").value,
      logradouro: document.getElementById("logradouro").value,
      bairro: document.getElementById("bairro").value,
      cidade: document.getElementById("cidade").value,
      uf: document.getElementById("uf").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
    };

    try {
      const response = await fetch("https://sua-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Formulário enviado com sucesso!");
      } else {
        alert("Erro ao enviar o formulário.");
      }
    } catch (error) {
      alert("Erro ao conectar com a API.");
      console.error(error);
    }
  });
