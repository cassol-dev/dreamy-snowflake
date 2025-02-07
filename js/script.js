function showLoading() {
  document.getElementById("loadingSpinner").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingSpinner").classList.add("hidden");
}

document.getElementById("cep").addEventListener("blur", async function () {
  const cep = this.value.replace(/\D/g, "");
  if (cep.length === 8) {
    // showLoading();
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
      // hideLoading();
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
      // showLoading();
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
        // hideLoading();
      }
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  });

async function getCoordinates() {
  if (!navigator.geolocation) {
    alert("Geolocalização não é suportada pelo seu navegador.");
    return;
  }

  // showLoading();
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        // Consultando a API do Nominatim para buscar endereço pelas coordenadas
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data.address && data.address.postcode) {
          document.getElementById("cep").value = data.address.postcode.replace(
            "-",
            ""
          );
          alert(`CEP encontrado: ${data.address.postcode}`);
          document.getElementById("cep").focus();
        } else {
          alert("Não foi possível encontrar o CEP para essa localização.");
        }
      } catch (error) {
        alert("Erro ao buscar endereço pela geolocalização.");
      } finally {
        // hideLoading();
      }
    },
    (error) => {
      // hideLoading();
      alert("Erro ao obter a localização.");
    }
  );
}

// Botão para buscar o CEP pela geolocalização
document.getElementById("findByGeo").addEventListener("click", getCoordinates);
