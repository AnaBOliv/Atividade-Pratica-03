const formulario =
document.getElementById("conversorForm");

const resultado =
document.getElementById("resultado");

const temaBtn =
document.getElementById("temaBtn");

const inverterBtn =
document.getElementById("inverterBtn");

temaBtn.addEventListener(
"click",
() => {

    document.body.classList.toggle("dark");

    temaBtn.textContent =
    document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}
);

inverterBtn.addEventListener(
"click",
() => {

    const origem =
    document.getElementById("origem");

    const destino =
    document.getElementById("destino");

    const temp =
    origem.value;

    origem.value =
    destino.value;

    destino.value =
    temp;
}
);

formulario.addEventListener(
"submit",
async function(event){

    event.preventDefault();

    const valor =
    parseFloat(
        document.getElementById("valor").value
    );

    const origem =
    document.getElementById("origem").value;

    const destino =
    document.getElementById("destino").value;

    if(
        isNaN(valor)
        || valor <= 0
    ){

        resultado.innerHTML =
        "Digite um valor válido.";

        return;
    }

    if(
        origem === destino
    ){

        resultado.innerHTML =
        `
        Resultado:
        <br><br>
        ${valor.toFixed(2)}
        ${destino}
        `;

        return;
    }

    resultado.innerHTML =
    "Consultando cotação...";

    try{

        const resposta =
        await fetch(
        `https://open.er-api.com/v6/latest/${origem}`
        );

        if(!resposta.ok){

            throw new Error(
                "Erro na API"
            );
        }

        const dados =
        await resposta.json();

        const taxa =
        dados.rates[destino];

        const convertido =
        valor * taxa;

        const data =
        new Date(
            dados.time_last_update_utc
        );

        resultado.innerHTML =
        `
        <strong>
        ${valor.toFixed(2)}
        ${origem}
        </strong>

        <br><br>

        ⬇️

        <br><br>

        <strong>
        ${convertido.toFixed(2)}
        ${destino}
        </strong>

        <hr style="margin:15px 0">

        Taxa:
        1 ${origem}
        =
        ${taxa.toFixed(4)}
        ${destino}

        <br><br>

        Última atualização:
        <br>
        ${data.toLocaleString("pt-BR")}
        `;
    }
    catch(erro){

        console.error(erro);

        resultado.innerHTML =
        `
        Não foi possível
        consultar a cotação.

        <br><br>

        Verifique sua conexão
        ou tente novamente.
        `;
    }
}
);
