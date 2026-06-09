const formulario =
document.getElementById("conversorForm");

const resultado =
document.getElementById("resultado");

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

        if(isNaN(valor) || valor <= 0){

            resultado.innerHTML =
            "Digite um valor válido.";

            return;
        }

        if(origem === destino){

            resultado.innerHTML =
            `Resultado: ${valor.toFixed(2)} ${destino}`;

            return;
        }

        resultado.innerHTML =
        "Consultando cotação...";

        try{

            const resposta =
            await fetch(
            `https://api.frankfurter.app/latest?amount=${valor}&from=${origem}&to=${destino}`
            );

            if(!resposta.ok){

                throw new Error(
                    "Erro ao consultar API"
                );
            }

            const dados =
            await resposta.json();

            const convertido =
            dados.rates[destino];

            resultado.innerHTML =
            `
            ${valor.toFixed(2)} ${origem}
            <br><br>
            =
            <br><br>
            ${convertido.toFixed(2)} ${destino}
            `;

        }
        catch(erro){

            resultado.innerHTML =
            `
            Não foi possível
            realizar a conversão.
            <br>
            Verifique sua conexão
            e tente novamente.
            `;
        }
    }
);
