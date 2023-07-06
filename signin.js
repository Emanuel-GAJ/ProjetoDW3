import Auth from './auth.js';

const btnRegister = document.getElementById('btnRegister'); // Botão de registro
const btnLogin = document.getElementById('btnLogin'); // Botão de login
const form = document.querySelector('form.needs-validation'); // Formulário de login

// Validação do formulário de login ao clicar no botão de login
btnLogin.addEventListener('click', function (event) {
    // Adiciona a classe was-validated para mostrar os erros
    form.classList.add('was-validated');

    // Verifica se o formulário está inválido
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Verifica se o formulário está válido
    if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();

        // Obtendo os elementos do formulário
        const [email, senha] = form.elements;

        // Criando o objeto data com os dados do formulário
        const data = {
            email: email.value,
            password: senha.value

        };

        // Enviando os dados para a rota /signin via método POST
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            // Verifica se o status da resposta é 200 (OK)
            if (response.status === 200) {
                // Se for, redireciona para a página de tarefas
                const data = await response.json();
                // Redireciona para a página de tarefas
                Auth.signin(data.token);
            } else {
                // Se não for, mostra a mensagem de erro
                const data = await response.json();
                // Mostra a mensagem de erro
                alert(data.message);
            }
        });
    }
});

// Redireciona para a página de registro ao clicar no botão de registro
btnRegister.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "register.html";
});
