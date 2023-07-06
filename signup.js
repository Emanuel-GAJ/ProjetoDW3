const btnCancel = document.getElementById('btnCancel'); // Botão de cancelar
const btnRegister = document.getElementById('btnRegister');  // Botão de registro
const form = document.querySelector('form.needs-validation'); // Formulário de registro


// Ao clicar no botão de cancelar, redireciona para a página de login
btnCancel.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "index.html";
});

// Validação do formulário de registro ao clicar no botão de registro
btnRegister.addEventListener('click', function (event) {
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
        const [nomeUsuario, emailCadastro, senhaCadastro] = form.elements;

        // Criando o objeto data com os dados do formulário
        const data = {
            username: nomeUsuario.value,
            email: emailCadastro.value,
            password: senhaCadastro.value
        }

        // Enviando os dados para a rota /user via método POST
        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(data)
        }).then(async (response) => {
            // Verifica se o status da resposta é 201 (Created)
            if (response.status === 201) {
                // Se for, mostra a mensagem de sucesso e redireciona para a página de login
                const data = await response.json();

                // Mostra a mensagem de sucesso
                alert(data.message);

                // Redireciona para a página de login
                window.location.href = "index.html";
            } else {
                // Se não for, mostra a mensagem de erro
                const data = await response.json();
                // Mostra a mensagem de erro
                alert(data.message);
            }
        });
    }
});
