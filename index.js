function downloadCSV() {
    const csvContent = "data:text/csv;charset=utf-8," +
        "ID,Nome,Sobrenome,CPF,Salário,Cargo\n" +
        listaFuncionarios.map(funcionario =>
            `${funcionario.id},"${funcionario.nome}",${funcionario.salario},${funcionario.cargo}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "funcionarios.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

let listaFuncionarios = [];
let contadorId = 1;

function addFuncionario() {
    const nome = document.getElementById("nome").value;
    const salario = parseFloat(document.getElementById("salario").value);
    const cargo = document.getElementById("cargo").value;

    if (nome && !isNaN(salario) && cargo) {
        const funcionario = {
            id: contadorId,
            nome: nome,
            salario: salario.toFixed(2),
            cargo: cargo
        };

        listaFuncionarios.push(funcionario);
        contadorId++;
        console.log("Funcionário adicionado:", funcionario);

        atualizarConteudo();
        downloadCSV();

        document.getElementById("salario").value = "";
        document.getElementById("nome").value = "";
    } else {
        window.alert("Preencha todos os campos corretamente antes de adicionar um funcionário.");
    }
}


function atualizarConteudo() {
    const conteudoDiv = document.getElementById("divConteudo");
    conteudoDiv.innerHTML = "";
    
    listaFuncionarios.forEach((funcionario) => {
        const divFuncionario = document.createElement("ul");
        divFuncionario.innerHTML = `
        <h2 id="funcionarioh2">Funcionário #${funcionario.id}</h2>
        <li><strong>Nome: </strong> ${funcionario.nome}</li>
        <li><strong>Salário: </strong> ${funcionario.salario}</li> 
        <li><strong>Cargo: </strong> ${funcionario.cargo}</li>
        <div id="divExcluir">
            <button id="botaoExcluir" onclick="excluirFuncionario(${funcionario.id}); downloadCSV();">Excluir</button>
        </div>`;
        conteudoDiv.appendChild(divFuncionario);
    });
}

function excluirFuncionario(id) {
    const index = listaFuncionarios.findIndex(funcionario => funcionario.id === id);
    if (index !== -1) {
        listaFuncionarios.splice(index, 1);
        atualizarConteudo();
    }
}