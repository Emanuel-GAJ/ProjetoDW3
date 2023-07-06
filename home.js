import Auth from './auth.js';


// Buscar todos os arquivos.
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


// Função para contar os arquivos.
export const countFiles = async () => {

    const spanCountSent = document.querySelector('#totalSent');
    const spanCountFailed = document.querySelector('#totalFailed');

    // Captura os arquivos.
    const { data } = await findAllFiles();

    // Contador (enviados).
    let countSent = 0;

    // Contador (falha ao enviar).
    let countFailed = 0;

    // Percorre os arquivos.
    data.forEach(file => {

        // Verifica o status do arquivo.
        if (file.status === 'Falha ao enviar') {
            countFailed++;
        } else {
            countSent++;
        }

    });

    // Captura os elementos.

    // Atualiza o contador (enviados).
    spanCountSent.innerHTML = countSent;

    // Atualiza o contador (falha ao enviar).
    spanCountFailed.innerHTML = countFailed;
}



// Verifica se o usuário está logado, antes de carregar a página.
if (Auth.isAuthenticated()) {
    Auth.setUser();
    Auth.logout();

    countFiles();
}
