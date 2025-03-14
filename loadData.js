// Função para carregar os dados da planilha
async function loadSheetData() {
    const spreadsheetId = '1mlWkSU2NgBKhs1IVi50A6ecSADbnjPeikKKGplCFaoQ'; // ID da planilha
    const range = 'FORMATAÇÃO!A1:J2'; // Intervalo de células
    const apiKey = 'AIzaSyDiCYaVwgq3gmuQWhZIICEJoN5iTwbo-AY'; // Sua chave de API

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = ''; // Limpa o conteúdo anterior da tabela

            // Preenche a tabela com os dados da planilha
            data.values.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                row.forEach((cell, cellIndex) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        } else {
            console.error('Nenhum dado encontrado na planilha.');
        }
    } catch (error) {
        console.error('Erro ao carregar os dados da planilha:', error);
    }
}

// Carrega os dados ao carregar a página
window.onload = loadSheetData;
