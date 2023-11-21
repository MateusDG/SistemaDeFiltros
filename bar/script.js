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

        switch (categoria) {
            case "coifas":
                adicionarOpcoes(tipoSelect, ["Coifa Ilha", "Coifa Parede", "Coifa de Embutir"]);
                adicionarOpcoes(tamanhoSelect, ["35cm", "50cm", "60cm", "80cm", "90cm", "106cm", "110cm", "120cm", "125cm"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
            case "cooktop":
                adicionarOpcoes(tipoSelect, ["À Gás", "Indução"]);
                adicionarOpcoes(tamanhoSelect, ["30cm", "38cm", "60cm", "65cm", "70cm", "75cm", "80cm", "90cm"]);
                adicionarOpcoes(queimadoresSelect, ["1", "2", "3", "4", "5"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
            case "fogao":
                adicionarOpcoes(tipoSelect, ["À Gás", "Elétrico", "À Gás/Elétrico"]);
                adicionarOpcoes(queimadoresSelect, ["3", "4", "5", "6"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                adicionarOpcoes(tamanhoSelect, ["50cm","60cm","75cm"])
                break;
            case "fornos":
                adicionarOpcoes(tipoSelect, ["À Gás", "Elétrico"]);
                adicionarOpcoes(litrosSelect, ["60", "75", "90"]);
                adicionarOpcoes(voltagemSelect, ["127v", "220v"]);
                break;
            case "microondas":
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

function desativarOpcoesNaoSelecionadas() {
    var selects = ["tipo", "tamanho", "litros", "queimadores", "voltagem"];
    selects.forEach(function (selectId) {
        var select = document.getElementById(selectId);
        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            option.disabled = option.value === "" || option.value === "Nenhuma opção selecionada";
        }
    });
}


function adicionarOpcoes(select, opcoes) {
    for (var i = 0; i < opcoes.length; i++) {
        var option = document.createElement("option");
        option.text = opcoes[i];
        select.add(option);
    }
}

function exibirProdutoDesejado() {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "Filtrando produtos...";

    setTimeout(function () {
        var categoria = document.getElementById("categoria").value;
        var tipo = document.getElementById("tipo").value;
        var tamanho = document.getElementById("tamanho").value;
        var litros = document.getElementById("litros").value;
        var queimadores = document.getElementById("queimadores").value;
        var voltagem = document.getElementById("voltagem").value;

        var produtos = filtrarProdutosPorOpcoes(categoria, tipo, tamanho, litros, queimadores, voltagem);

        if (produtos.length > 0) {
            resultadoDiv.innerHTML = "<h2>Produtos encontrados:</h2><div style='margin-top: 10px;'>";
            for (var i = 0; i < produtos.length; i++) {
                var produto = produtos[i];
                resultadoDiv.innerHTML += `
                    <div class="produto" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <strong>Nome:</strong> ${produto.nome}<br>
                        <strong>Categoria:</strong> ${produto.categoria}<br>
                        <strong>Tipo:</strong> ${produto.tipo}<br>
                        <strong>Tamanho:</strong> ${produto.tamanho}<br>
                        ${produto.litros ? `<strong>Litros:</strong> ${produto.litros}<br>` : ''}
                        ${produto.queimadores ? `<strong>Queimadores:</strong> ${produto.queimadores}<br>` : ''}
                        <strong>Voltagem:</strong> ${produto.voltagem}<br>
                    </div>`;
            }
            resultadoDiv.innerHTML += "</div>";
        } else {
            resultadoDiv.innerHTML = "<p>Não há produtos correspondentes às opções selecionadas.</p>";
        }
    }, 1000);
}



function resetarFiltros() {
    document.getElementById("categoria").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("tamanho").value = "";
    document.getElementById("litros").value = "";
    document.getElementById("queimadores").value = "";
    document.getElementById("voltagem").value = "";

    document.getElementById("resultado").innerHTML = "";

    atualizarOpcoes();
}

function filtrarProdutosPorOpcoes(categoria, tipo, tamanho, litros, queimadores, voltagem) {
    var produtos = [
        { nome: "Coifa Ilha 35cm 127v", categoria: "coifas", tipo: "Coifa Ilha", tamanho: "35cm", voltagem: "127v" },
        { nome: "Coifa Ilha 50cm 220v", categoria: "coifas", tipo: "Coifa Ilha", tamanho: "50cm", voltagem: "220v" },
        { nome: "Coifa Parede 60cm 127v", categoria: "coifas", tipo: "Coifa Parede", tamanho: "60cm", voltagem: "127v" },
        { nome: "Coifa Parede 80cm 220v", categoria: "coifas", tipo: "Coifa Parede", tamanho: "80cm", voltagem: "220v" },
        { nome: "Cooktop À Gás 30cm 4 queimadores 127v", categoria: "cooktop", tipo: "À Gás", tamanho: "30cm", queimadores: "4", voltagem: "127v" },
        { nome: "Cooktop À Gás 30cm 4 queimadores 127v", categoria: "cooktop", tipo: "Indução", tamanho: "30cm", queimadores: "4", voltagem: "127v" },
        { nome: "Cooktop À Gás 60cm 5 queimadores 220v", categoria: "cooktop", tipo: "À Gás", tamanho: "60cm", queimadores: "5", voltagem: "220v" },
        { nome: "Fogão À Gás 4 queimadores 127v", categoria: "fogao", tipo: "À Gás", tamanho: "60cm", queimadores: "4", voltagem: "127v" },
        { nome: "Fogão Elétrico 5 queimadores 220v", categoria: "fogao", tipo: "Elétrico", tamanho: "75cm", queimadores: "5", voltagem: "220v" },
        { nome: "Fornos À Gás 60 litros 127v", categoria: "fornos", tipo: "À Gás", litros: "60", voltagem: "127v" },
        { nome: "Fornos Elétrico 75 litros 220v", categoria: "fornos", tipo: "Elétrico", litros: "75", voltagem: "220v" },
        { nome: "Microondas À Gás 25 litros 127v", categoria: "microondas", tipo: "À Gás", litros: "25", voltagem: "127v" },
        { nome: "Microondas Elétrico 32 litros 220v", categoria: "microondas", tipo: "Elétrico", litros: "32", voltagem: "220v" },
    ];

    if (categoria === "todos") {
        return produtos;
    }   

    if (!categoria && !tipo && !tamanho && !litros && !queimadores && !voltagem) {
        return produtos;
    }


    var produtosFiltrados = produtos.filter(function (produto) {
        return (!categoria || produto.categoria === categoria) &&
            (!tipo || tipo === "Todos" || produto.tipo === tipo) &&
            (!tamanho || tamanho === "Todos" || produto.tamanho === tamanho) &&
            (!litros || litros === "Todos" || produto.litros === litros) &&
            (!queimadores || queimadores === "Todos" || produto.queimadores === queimadores) &&
            (!voltagem || voltagem === "Todos" || produto.voltagem === voltagem);
    });

    return produtosFiltrados;
}