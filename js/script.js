function showLoading() {
  document.getElementById("loadingSpinner").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingSpinner").classList.add("hidden");
}

document.getElementById("cep").addEventListener("blur", async function () {
  const cep = this.value.replace(/\D/g, "");
  if (cep.length === 8) {
    showLoading();
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert("CEP não encontrado.");
      } else {
        document.getElementById("logradouro").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("uf").value = data.uf || "";
      }
    } catch (error) {
      alert("Erro ao buscar o CEP.");
    } finally {
      hideLoading();
    }
  } else {
    alert("Por favor, informe um CEP válido.");
  }
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const uf = document.getElementById("uf").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;

    if (
      name &&
      email &&
      cep &&
      logradouro &&
      bairro &&
      cidade &&
      uf &&
      numero
    ) {
      showLoading();
      try {
        const payload = {
          name,
          email,
          cep,
          logradouro,
          bairro,
          cidade,
          uf,
          numero,
          complemento,
        };
        const response = await fetch("https://sua-api.com/endpoint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("Cadastro enviado com sucesso!");
          document.getElementById("registrationForm").reset();
        } else {
          alert("Erro ao enviar o cadastro.");
        }
      } catch (error) {
        alert("Erro de conexão.");
      } finally {
        hideLoading();
      }
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  });
