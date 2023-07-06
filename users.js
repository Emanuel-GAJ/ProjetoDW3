import Auth from './auth.js';

// Corpo da tabela de usuários.
const tbody = document.querySelector('tbody #usuarios');


// Função para pegar os dados do usuário.
async function getUsers() {
    try {
        const response = await fetch('/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

// Função para formatar a data.
function formatDate(date) {
    // Formata a data e hora para o padrão brasileiro.
    const dateFormated = new Date(date).toLocaleString('pt-BR');

    return dateFormated;

}

// Função para renderizar os dados do usuário.
async function renderUsers() {

    // Pega os dados do usuário.
    const { users } = await getUsers();

    // Pegando o tbody da tabela.
    const tbody = document.querySelector('tbody#usuarios');

    // Renderizando os dados do usuário.
    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.uuid}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${formatDate(user.createdAt)}</td>
            </tr>
        `;
    });
}


// Verifica se o usuário está logado, antes de carregar a página.
if (Auth.isAuthenticated()) {
    Auth.setUser();
    Auth.logout();

    renderUsers();
}

