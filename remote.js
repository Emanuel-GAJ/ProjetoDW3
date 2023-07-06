import Auth from './auth.js';


// Buscar todos os arquivos (remotos).
export const findAllFiles = async () => {
    const response = await fetch('/files/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`,
        },

    });

    const data = await response.json();

    return data;
}


// Função para montar a tabela.
export const mountTable = async () => {

    // Captura o corpo da tabela.
    const tbody = document.querySelector('tbody#tbody-list-files-remote');

    // Captura os arquivos.
    const { data } = await findAllFiles();

    // Percorre os arquivos.
    data.forEach(file => {
        // Icone do arquivo ou pasta.
        let icon = '';

        // Verifica se é um arquivo.
        if (file.type === '-') {
            icon = '<i class="bi bi-file-earmark-richtext text-primary"></i>';
        } else if (file.type === 'd') {
            icon = '<i class="bi bi-folder text-warning"></i>';
        }

        // Monta a tabela.
        tbody.innerHTML += `
            <tr>
                <td>${file.name}</td>
                <td>${icon}</td>
                <td>${file.group}</td>
                <td class="text-danger">${file.size}</td>
                <td>${formatDate(file.modifyTime)}</td>
            </tr>
        `;

    });

}

// Função para formatar a data.
function formatDate(modifyTime) {
    const date = new Date(modifyTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}


// Verifica se o usuário está logado, antes de carregar a página.
if (Auth.isAuthenticated()) {
    Auth.setUser();
    Auth.logout();

    mountTable();

}
