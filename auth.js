// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    if (!getToken()) {
        window.location.href = "/";
    } else {
        return true;
    }
}

// Função para obter o token do usuário
function getToken() {
    return localStorage.getItem('@fileshare:token');
}

// Função para obter os dados do usuário
async function getUser() {

    // Token do usuário
    const token = getToken();

    // Configura a requisição
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    // Faz a requisição
    const response = await fetch("/user/me", config);

    // Obtem os dados
    const data = await response.json();

    // Retorna os dados
    return data;

}

async function setUser() {
    // Span para exibir o nome do usuário
    const spanName = document.querySelector("#nav-items-2 #span-username");

    // Obtem os dados do usuário
    const { user } = await getUser();

    // Monta a mensagem de boas vindas
    const message = `Olá, ${user.username}`;

    // Exibe a mensagem
    spanName.innerHTML = message;
}

// Função para redirecionar o usuário para a página de tarefas
function signin(token) {
    localStorage.setItem('@fileshare:token', token);
    window.location.href = "home.html";
}

// Função para deslogar o usuário
function signout() {
    localStorage.removeItem('@fileshare:token');
    window.location.href = "/";
}

// Função para deslogar o usuário
function logout() {
    // Botão de logout
    const btnLogout = document.querySelector("#nav-items-2 #btn-logout");

    // Evento de click no botão de logout
    btnLogout.addEventListener("click", (event) => {
        event.preventDefault();

        // Chamada da função para deslogar o usuário
        signout();
    });
}


// Exporta as funções
export default { isAuthenticated, getToken, getUser, signin, signout, setUser, logout };
