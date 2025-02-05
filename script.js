document
  .getElementById("buscarToken")
  .addEventListener("click", async function () {
    const matricula = document.getElementById("matricula").value;

    if (!matricula) {
      alert("Por favor, informe a matrícula.");
      return;
    }

    try {
      const response = await fetch(
        `https://sua-api.com/token?matricula=${matricula}`
      );
      if (response.ok) {
        const data = await response.json();
        document.getElementById("nome").value = data.nome; // Preenche o nome do usuário
        sessionStorage.setItem("token", data.token); // Armazena o token para uso posterior

        // Libera os campos e o botão de envio
        liberarFormulario();
      } else {
        alert("Matrícula não encontrada.");
      }
    } catch (error) {
      alert("Erro ao buscar o token.");
      console.error(error);
    }
  });

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Você precisa buscar o token antes de enviar o formulário.");
      return;
    }

    const formData = {
      nome: document.getElementById("nome").value,
      cep: document.getElementById("cep").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
    };

    try {
      const response = await fetch("https://sua-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

function liberarFormulario() {
  document.getElementById("nome").disabled = false;
  document.getElementById("cep").disabled = false;
  document.getElementById("numero").disabled = false;
  document.getElementById("complemento").disabled = false;
  document.getElementById("enviarForm").disabled = false;
}
