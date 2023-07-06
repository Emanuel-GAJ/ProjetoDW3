import Auth from './auth.js';

// Função para buscar todos os arquivos.
export const findAllFiles = async () => {
    const response = await fetch('/files', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`,
        },
    });

    const data = await response.json();

    return data;
}

// Função para formatar a data.
function formatDate(date) {
    // Formata a data e hora para o padrão brasileiro.
    const dateFormated = new Date(date).toLocaleString('pt-BR');

    return dateFormated;

}

// Função para montar a tabela de arquivos.
export const mountTable = async () => {

    // Captura os arquivos.
    const { data } = await findAllFiles();

    console.log(data);
    // Captura a tabela.
    const tbody = document.querySelector('#tbody-list-files');

    // Limpa a tabela.
    tbody.innerHTML = '';

    // Verificando status do arquivo.
    let badge = '';

    // Percorre os arquivos.
    data.forEach(file => {

        // Verifica o status do arquivo.
        if (file.status === 'Falha ao enviar') {
            badge = `<span class="badge text-bg-danger">${file.status}</span>`;
        } else {
            badge = `<span class="badge text-bg-success">${file.status}</span>`;
        }


        tbody.innerHTML += `
            <tr>
                <td>${file.filename}</td>
                <td>${file.type}</td>
                <td>${file.size}</td>
                <td>${file.remotePath}</td>
                <td>${formatDate(file.createdAt)}</td>
                <td>${badge}</td>
            </tr>
        `;

    });
}





// Verifica se o usuário está logado, antes de carregar a página.
if (Auth.isAuthenticated()) {
    Auth.setUser();
    Auth.logout();

    mountTable();
}
