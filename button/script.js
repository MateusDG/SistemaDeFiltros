document.getElementById("categoria").addEventListener("change", function () {
    atualizarOpcoes();
    exibirProdutoDesejado();
});        
document.getElementById("okButton").addEventListener("click", exibirProdutoDesejado);
document.getElementById("resetButton").addEventListener("click", resetarFiltros);

function atualizarOpcoes() {
    var categoria = document.getElementById("categoria").value;
    var opcoesDiv = document.getElementById("opcoes");
    var tipoSelect = document.getElementById("tipo");
    var tamanhoSelect = document.getElementById("tamanho");
    var litrosSelect = document.getElementById("litros");
    var queimadoresSelect = document.getElementById("queimadores");
    var voltagemSelect = document.getElementById("voltagem");

    tipoSelect.innerHTML = "<option value='' selected>Nenhuma opção selecionada</option>";
    tamanhoSelect.innerHTML = "<option value='' selected>Nenhuma opção selecionada</option>";
    litrosSelect.innerHTML = "<option value='' selected>Nenhuma opção selecionada</option>";
    queimadoresSelect.innerHTML = "<option value='' selected>Nenhuma opção selecionada</option>";
    voltagemSelect.innerHTML = "<option value='' selected>Nenhuma opção selecionada</option>";

    if (categoria !== "") {
        opcoesDiv.style.display = "block";

        tipoSelect.innerHTML += "<option value='Todos'>Mostrar Todos</option>";
        tamanhoSelect.innerHTML += "<option value='Todos'>Mostrar Todos</option>";
        litrosSelect.innerHTML += "<option value='Todos'>Mostrar Todos</option>";
        queimadoresSelect.innerHTML += "<option value='Todos'>Mostrar Todos</option>";
        voltagemSelect.innerHTML += "<option value='Todos'>Mostrar Todos</option>";

        switch (categoria) {
            case "Coifas":
                adicionarOpcoes(tipoSelect, ["Coifa Ilha", "Coifa Parede", "Coifa de Embutir"]);
                adicionarOpcoes(tamanhoSelect, ["35cm", "50cm", "60cm", "80cm", "90cm", "106cm", "110cm", "120cm", "125cm"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
            case "Cooktop":
                adicionarOpcoes(tipoSelect, ["À Gás", "Indução"]);
                adicionarOpcoes(tamanhoSelect, ["30cm", "38cm", "60cm", "65cm", "70cm", "75cm", "80cm", "90cm"]);
                adicionarOpcoes(queimadoresSelect, ["1", "2", "3", "4", "5"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
            case "Fogão":
                adicionarOpcoes(tipoSelect, ["À Gás", "Elétrico", "À Gás/Elétrico"]);
                adicionarOpcoes(queimadoresSelect, ["3", "4", "5", "6"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                adicionarOpcoes(tamanhoSelect, ["50cm", "60cm", "75cm"]);
                break;
            case "Fornos":
                adicionarOpcoes(tipoSelect, ["À Gás", "Elétrico"]);
                adicionarOpcoes(litrosSelect, ["60", "75", "90"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
            case "Microondas":
                adicionarOpcoes(tipoSelect, ["À Gás", "Elétrico"]);
                adicionarOpcoes(litrosSelect, ["23", "25", "32", "40"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
        }

        desativarOpcoesNaoSelecionadas();
    } else {
        opcoesDiv.style.display = "none";
    }
}

function adicionarOpcoesRadio(container, name, opcoes) {
    var label = document.createElement("label");
    label.textContent = "Selecione " + name + ":";
    container.appendChild(label);

    var divAlternativas = document.createElement("div");
    divAlternativas.className = "alternativas";

    for (var i = 0; i < opcoes.length; i++) {
        var alternativa = document.createElement("div");
        alternativa.className = "alternativa";

        var input = document.createElement("input");
        input.type = "radio";
        input.id = name + i;
        input.name = name;
        input.value = opcoes[i];

        var labelOpcao = document.createElement("label");
        labelOpcao.for = name + i;
        labelOpcao.textContent = opcoes[i];

        alternativa.appendChild(input);
        alternativa.appendChild(labelOpcao);
        divAlternativas.appendChild(alternativa);
    }

    container.appendChild(divAlternativas);
}

function exibirProdutoDesejado() {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "Filtrando produtos...";

    setTimeout(function () {
        var categoria = document.getElementById("categoria").value;
        var tipo = getOpcaoSelecionada("tipo");
        var tamanho = getOpcaoSelecionada("tamanho");
        var litros = getOpcaoSelecionada("litros");
        var queimadores = getOpcaoSelecionada("queimadores");
        var voltagem = getOpcaoSelecionada("voltagem");

        var produtos = filtrarProdutosPorOpcoes(categoria, tipo, tamanho, litros, queimadores, voltagem);

        if (produtos.length > 0) {
            resultadoDiv.innerHTML = "<h2>Produtos encontrados:</h2><div class='produtos-container'>";
            for (var i = 0; i < produtos.length; i++) {
                var produto = produtos[i];
                resultadoDiv.innerHTML += `
                    <div class="produto">
                        <h3>${produto.nome}</h3>
                        <p><strong>Categoria:</strong> ${produto.categoria}</p>
                        <p><strong>Tipo:</strong> ${produto.tipo}</p>
                        <p><strong>Tamanho:</strong> ${produto.tamanho || 'N/A'}</p>
                        ${produto.litros ? `<p><strong>Litros:</strong> ${produto.litros}</p>` : ''}
                        ${produto.queimadores ? `<p><strong>Queimadores:</strong> ${produto.queimadores}</p>` : ''}
                        <p><strong>Voltagem:</strong> ${produto.voltagem}</p>
                    </div>`;
            }
            resultadoDiv.innerHTML += "</div>";
        } else {
            resultadoDiv.innerHTML = "<p>Não há produtos correspondentes às opções selecionadas.</p>";
        }
    }, 1000);
}




function getOpcaoSelecionada(name) {
    var opcoes = document.getElementsByName(name);
    for (var i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            return opcoes[i].value;
        }
    }
    return "";
}

function resetarFiltros() {
    document.getElementById("categoria").value = "";
    document.querySelectorAll('input[name="tipo"]').forEach(function (radio) {
        radio.checked = false;
    });
    document.querySelectorAll('input[name="tamanho"]').forEach(function (radio) {
        radio.checked = false;
    });

    document.getElementById("resultado").innerHTML = "";

    atualizarOpcoes();
}

function filtrarProdutosPorOpcoes(categoria, tipo, tamanho, litros, queimadores, voltagem) {
    var produtos = [
        { nome: "Coifa Ilha 35cm 127v", categoria: "Coifas", tipo: "Coifa Ilha", tamanho: "35cm", voltagem: "127v" },
        { nome: "Coifa Ilha 50cm 220v", categoria: "Coifas", tipo: "Coifa Ilha", tamanho: "50cm", voltagem: "220v" },
        { nome: "Coifa Parede 60cm 127v", categoria: "Coifas", tipo: "Coifa Parede", tamanho: "60cm", voltagem: "127v" },
        { nome: "Coifa Parede 80cm 220v", categoria: "Coifas", tipo: "Coifa Parede", tamanho: "80cm", voltagem: "220v" },
        { nome: "Cooktop À Gás 30cm 4 queimadores 127v", categoria: "Cooktop", tipo: "À Gás", tamanho: "30cm", queimadores: "4", voltagem: "127v" },
        { nome: "Cooktop À Gás 60cm 5 queimadores 220v", categoria: "Cooktop", tipo: "À Gás", tamanho: "60cm", queimadores: "5", voltagem: "220v" },
        { nome: "Fogão À Gás 4 queimadores 127v", categoria: "Fogao", tipo: "À Gás", queimadores: "4", voltagem: "127v" },
        { nome: "Fogão Elétrico 5 queimadores 220v", categoria: "Fogao", tipo: "Elétrico", queimadores: "5", voltagem: "220v" },
        { nome: "Fornos À Gás 60 litros 127v", categoria: "Fornos", tipo: "À Gás", litros: "60", voltagem: "127v" },
        { nome: "Fornos Elétrico 75 litros 220v", categoria: "Fornos", tipo: "Elétrico", litros: "75", voltagem: "220v" },
        { nome: "Microondas À Gás 25 litros 127v", categoria: "Microondas", tipo: "À Gás", litros: "25", voltagem: "127v" },
        { nome: "Microondas Elétrico 32 litros 220v", categoria: "Microondas", tipo: "Elétrico", litros: "32", voltagem: "220v" },
    ];

    if (categoria === "Todos") {
        return produtos;
    }

    var produtosFiltrados = produtos.filter(function (produto) {
        return (!categoria || produto.categoria === categoria) &&
            (!tipo || produto.tipo === tipo) &&
            (!tamanho || produto.tamanho === tamanho) &&
            (!litros || produto.litros === litros) &&
            (!queimadores || produto.queimadores === queimadores) &&
            (!voltagem || produto.voltagem === voltagem);
    });

    return produtosFiltrados;
}
