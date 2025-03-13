// Função para carregar dados da planilha
async function carregarPlanilha(url, nomePlanilha) {
    try {
        const response = await fetch(url);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const planilha = workbook.Sheets[nomePlanilha];
        return XLSX.utils.sheet_to_json(planilha, { header: 1 });
    } catch (error) {
        console.error("Erro ao carregar a planilha:", error);
        alert("Erro ao carregar a planilha. Verifique o console para mais detalhes.");
        return [];
    }
}

// Função para consultar o colaborador
async function consultarColaborador() {
    const codigo = document.getElementById('codigo-colaborador').value;
    if (!codigo) {
        alert("Por favor, insira o código do colaborador.");
        return;
    }

    const url = 'https://docs.google.com/spreadsheets/d/1mlWkSU2NgBKhs1IVi50A6ecSADbnjPeikKKGplCFaoQ/edit?usp=sharing'; // Substitua pela URL da planilha
    const nomePlanilha = 'FORMATAÇÃO'; // Substitua pelo nome da planilha
    const dados = await carregarPlanilha(url, nomePlanilha);

    if (dados.length === 0) {
        alert("Nenhum dado encontrado para o colaborador.");
        return;
    }

    // Mapeamento das colunas (ajuste conforme sua planilha)
    const colunas = {
        codigo: 0,
        tma: 1,
        tmia: 2,
        tme: 3,
        taxaTrans: 4,
        abProd: 5,
        pendencias: 6,
        osLog: 7,
        periodo: 8,
        status: 9
    };

    // Filtra os dados do colaborador
    const dadosColaborador = dados.filter(linha => linha[colunas.codigo] === codigo);

    if (dadosColaborador.length === 0) {
        alert("Nenhum dado encontrado para o colaborador.");
        return;
    }

    // Separa os dados por semana
    const semanas = {
        "Primeira Semana": dadosColaborador.filter(linha => linha[colunas.status] === "Primeira Semana"),
        "Segunda Semana": dadosColaborador.filter(linha => linha[colunas.status] === "Segunda Semana"),
        "Terceira Semana": dadosColaborador.filter(linha => linha[colunas.status] === "Terceira Semana"),
        "Quarta Semana": dadosColaborador.filter(linha => linha[colunas.status] === "Quarta Semana"),
        "Resultado Final": dadosColaborador.filter(linha => linha[colunas.status] === "Resultado Final")
    };

    // Redireciona para a tela de resultados com os dados
    localStorage.setItem('dadosColaborador', JSON.stringify(semanas));
    window.location.href = 'resultados.html';
}

// Função para exibir os resultados
function exibirResultados() {
    const semanas = JSON.parse(localStorage.getItem('dadosColaborador'));
    const container = document.getElementById('tabela-container');

    if (!semanas) {
        container.innerHTML = "<p>Nenhum dado encontrado.</p>";
        return;
    }

    for (const [semana, dados] of Object.entries(semanas)) {
        if (dados.length > 0) {
            const tabela = document.createElement('table');
            tabela.innerHTML = `
                <tr>
                    <th>Código</th>
                    <th>TMA</th>
                    <th>TMIA</th>
                    <th>TME</th>
                    <th>Taxa de Trans.</th>
                    <th>AB/PROD</th>
                    <th>Pendências</th>
                    <th>O.S/LOG</th>
                    <th>Período</th>
                </tr>
            `;

            dados.forEach(linha => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${linha[0]}</td>
                    <td>${linha[1]}</td>
                    <td>${linha[2]}</td>
                    <td>${linha[3]}</td>
                    <td>${linha[4]}</td>
                    <td>${linha[5]}</td>
                    <td>${linha[6]}</td>
                    <td>${linha[7]}</td>
                    <td>${linha[8]}</td>
                `;
                tabela.appendChild(tr);
            });

            container.appendChild(document.createElement('h2').textContent = semana);
            container.appendChild(tabela);
        }
    }
}

// Exibe os resultados ao carregar a página de resultados
if (window.location.pathname.endsWith('resultados.html')) {
    exibirResultados();
}
