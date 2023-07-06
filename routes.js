import express from 'express';

// Instanciando um objeto do tipo Router.
const router = express.Router();


// Importando utilitários.
import { listFiles } from './utilities/files.js';

// Importando os controllers que serão utilizados.
import * as userController from './controllers/userController.js';
import * as signinController from './controllers/signinController.js';
import * as filesController from './controllers/filesController.js';

// Importando o middleware de autenticação.
import { isAuthenticated } from './middlewares/auth.js';


//==================================================
// ROTAS PARA AUTENTICAÇÃO
//==================================================

// Rota para autenticar um usuário.
router.post("/signin", signinController.signin);

//==================================================
// ROTAS PARA USUÁRIOS AUTENTICADOS
//==================================================

// Rota para listar usuário autenticado.
router.get("/user/me", isAuthenticated, signinController.me);



//==================================================
// ROTAS PARA O USUÁRIO
//==================================================

// Rota para criar um novo usuário.
router.post('/user', userController.createUser);

// Rota para listar todos os usuários.
router.get('/user', isAuthenticated, userController.findAllUsers);

// Rota para listar um usuário específico.
router.get('/user/:uuid', isAuthenticated, userController.findUser);

// Rota para atualizar um usuário específico.
router.put('/user/:uuid', isAuthenticated, userController.updateUser);

// Rota para deletar um usuário específico.
router.delete('/user/:uuid', isAuthenticated, userController.deleteUser);


//==================================================
// ROTAS PARA LISTAR ARQUIVOS E PASTAS
//==================================================

// Rota para testar a conexão com o servidor.
router.get('/files/connection', isAuthenticated, filesController.connection);

// Rota para listar arquivos e pastas (remotos )
router.get('/files/list', isAuthenticated, filesController.list);

// Rota para listar arquivos e pastas (Banco de dados)
router.get('/files', isAuthenticated, filesController.listAll);

// Rota para upload de arquivos.
router.post('/files/upload', isAuthenticated, filesController.upload);


//==================================================
// ROTAS PARA ARQUIVOS
//==================================================

// Rota para listar todos os arquivos.
router.get('/local/files', isAuthenticated, async (req, res) => {
    const files = await listFiles();

    res.status(200).send(files);
});

// Rota para listar arquivos de um caminho específico.
router.post('/local/files', isAuthenticated, async (req, res) => {
    const { path } = req.body;
    let files;
    // verifica se o path foi passado.
    if (!path) {
        files = await listFiles();
    } else {
        files = await listFiles(path);
    }

    res.status(200).send(files);

});




// Exportando o objeto router.
export default router;
