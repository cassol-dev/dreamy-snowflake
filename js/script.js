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

document.getElementById("celular").addEventListener("input", function (event) {
  let value = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  // Validação do tamanho
  if (value.length > 11) value = value.slice(0, 11);

  // Formatação (DDD + número)
  if (value.length >= 2) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }
  if (value.length >= 10) {
    value = `${value.slice(0, 10)}-${value.slice(10)}`;
  }

  event.target.value = value;
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

    const celular = document.getElementById("celular").value.replace(/\D/g, "");
    const dddValidos = [
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "21",
      "22",
      "24",
      "27",
      "28",
      "31",
      "32",
      "33",
      "34",
      "35",
      "37",
      "38",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "51",
      "53",
      "54",
      "55",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "71",
      "73",
      "74",
      "75",
      "77",
      "79",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "87",
      "88",
      "89",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
    ];

    const ddd = celular.slice(0, 2);
    const numeroCel = celular.slice(2);

    if (!dddValidos.includes(ddd)) {
      alert("DDD inválido! Insira um DDD correto.");
      event.preventDefault();
      return;
    }

    if (!/^9[0-9]{8}$/.test(numeroCel)) {
      alert(
        "Número de celular inválido! Deve começar com 9 e conter 9 dígitos."
      );
      event.preventDefault();
      return;
    }

    if (
      name &&
      celular &&
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
          celular,
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
