import Auth from './auth.js';

// Corrigir onclicks
window.sendFile = sendFile;
window.openFolder = openFolder;

// Função para pegar arquivos enviando o path.
const listFiles = async (path) => {
    // Faz a requisição para o servidor.
    const response = await fetch('/local/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`,
        },

        // Passa o path para o servidor.
        body: JSON.stringify({
            path,
        }),
    });

    // Retorna os arquivos.
    return response.json();
};


// Função para montar tabela  com path recebido. (POST-> /files/list)
const mountTable = () => {
    // Pega o elemento com id="file-table-body".
    const fileTableBody = document.getElementById("file-table-body");


    // Botão search para pesquisar o path.
    const searchButton = document.querySelector('#button-search');

    // evento de click no botão search.
    searchButton.addEventListener('click', async () => {

        // Input para o path.
        const pathInput = document.querySelector('.input-group input');

        // Limpa o input.
        pathInput.value = '';

        // Faz a requisição para o servidor.
        const files = await listFiles(pathInput.value);

        // Limpa a tabela.
        fileTableBody.innerHTML = '';

        // Percorre o array de arquivos.
        createTbody(files);
    });
}

// Função para criar tbody percorrendo o array de arquivos.
const createTbody = (files) => {

    // Pega o elemento com id="file-table-body".
    const fileTableBody = document.getElementById("file-table-body");


    files.forEach((file) => {
        // Icone para o arquivo.
        let icon = '';

        // Botão para abrir a pasta.
        let btnOpen = '';

        // Botão para enviar o arquivo.
        let btnSend = '';

        // Tratar o filePath para o windows.
        file.filePath = file.filePath.replace(/\\/g, '\\\\');

        // Verifica se é um arquivo.
        if (file.type === 'file') {
            icon = '<i class="bi bi-file-earmark-richtext text-info"></i>';
            btnSend = `<button class="btn btn-sm btn-primary" onclick="sendFile('${file.name}','${file.type}', '${file.size}','${file.filePath}')"><i class="bi bi-cloud-arrow-up-fill"></i></button>`;
        } else {
            icon = '<i class="bi bi-folder text-warning"></i>';
            btnOpen = `<button class="btn btn-sm btn-warning" onclick="openFolder('${file.filePath}')"><i class="bi bi-folder2-open"></i></button>`;
        }

        // Monta o tbody da tabela.
        fileTableBody.innerHTML += `
            <tr id="${file.id}">
                <td>${file.name}</td>
                <td>${icon}</td>
                <td>${file.size}</td>
                <td>${file.date}</td>
                <td>${file.filePath}</td>
                <td>${btnOpen || btnSend}</td>
            </tr>
        `;

    });
}


// Função para entrar em uma pasta.
async function openFolder(path) {

    // input para o path.
    const pathInput = document.querySelector('.input-group input');

    // Limpa o input.
    pathInput.value = path;

    // Pega o elemento com id="file-table-body".
    const fileTableBody = document.getElementById("file-table-body");

    // Faz a requisição para o servidor.
    const files = await listFiles(path);

    // Limpa a tabela.
    fileTableBody.innerHTML = '';

    // Percorre o array de arquivos.
    createTbody(files);

}

// Função para enviar o arquivo.
async function sendFile(filename, filetype, filesize, filePath) {
    // Pegar a string depois do / no filename.
    const newFilename = filename.split('/')[1];

    const file = {
        filename: newFilename,
        type: filetype,
        size: filesize,
        filePath: filePath,
    };

    // Faz a requisição para o servidor.
    const response = await fetch('/files/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify({
            file,
        }),

    });

    // Verifica se o status da requisição é 200.
    if (response.status === 200) {
        alert('Arquivo enviado com sucesso!');
    } else {
        alert('Erro ao enviar o arquivo!');
    }
}




// Verifica se o usuário está logado, antes de carregar a página.
if (Auth.isAuthenticated()) {
    Auth.setUser();
    Auth.logout();

    mountTable();


}
