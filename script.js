// Função para carregar dados da planilha
async function carregarPlanilha(url, nomePlanilha) {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const planilha = workbook.Sheets[nomePlanilha];
    const json = XLSX.utils.sheet_to_json(planilha, { header: 1 });

    // Exemplo de colunas (ajuste conforme sua planilha)
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
            <th>Status</th>
        </tr>
    `;

    json.forEach((linha, index) => {
        if (index === 0) return; // Ignora o cabeçalho
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${linha[colunas.codigo]}</td>
            <td>${linha[colunas.tma]}</td>
            <td>${linha[colunas.tmia]}</td>
            <td>${linha[colunas.tme]}</td>
            <td>${linha[colunas.taxaTrans]}</td>
            <td>${linha[colunas.abProd]}</td>
            <td>${linha[colunas.pendencias]}</td>
            <td>${linha[colunas.osLog]}</td>
            <td>${linha[colunas.periodo]}</td>
            <td>${linha[colunas.status]}</td>
        `;
        tabela.appendChild(tr);
    });

    document.getElementById('tabela-container').appendChild(tabela);
}

// Função para abrir a página de assinatura
function abrirAssinatura(tipo) {
    const janela = window.open('assinatura.html', 'Assinatura', 'width=600,height=400');
    janela.onbeforeunload = () => {
        const assinatura = localStorage.getItem('assinatura');
        if (assinatura) {
            document.getElementById(`assinatura-${tipo}`).innerHTML = `<img src="${assinatura}" alt="Assinatura" style="width: 150px;">`;
            localStorage.removeItem('assinatura');
        }
    };
}

// Carregar a planilha ao iniciar
carregarPlanilha('URL_DA_PLANILHA', 'NOME_DA_PLANILHA');
