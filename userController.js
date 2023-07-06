import * as userRepo from "../repositories/userRepository.js";
import CryptPassword from "../utilities/crypto.js";


// Método para criar um novo usuário.
export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userRepo.findUserByEmail(email);

        if (user) {
            return res.status(400).json({
                message: "Já existe um usuário com esse email.",
            });
        }

        const hash = await CryptPassword.hashPassword(password);

        const newUser = await userRepo.createUser({
            username,
            email,
            password: hash,
        });

        return res.status(201).json({
            message: "Usuário criado com sucesso.",
            user: newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Não foi possível criar o usuário.",
        });
    }
}

// Método para buscar um usuário.
export async function findUser(req, res) {
    try {
        const { uuid } = req.params;

        const user = await userRepo.findUserByUuid(uuid);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado.",
            });
        }

        return res.status(200).json({
            message: "Usuário encontrado.",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Não foi possível buscar o usuário.",
        });
    }
}

// Método para listar todos os usuários.
export async function findAllUsers(req, res) {
    try {
        const users = await userRepo.findAllUsers();

        return res.status(200).json({
            message: "Usuários encontrados.",
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Não foi possível buscar os usuários.",
        });
    }
}

// Método para atualizar um usuário.
export async function updateUser(req, res) {
    try {
        const { uuid } = req.params;
        const { username, email, password } = req.body;

        const user = await userRepo.findUserByUuid(uuid);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado.",
            });
        }

        const hash = await CryptPassword.hashPassword(password);

        const updatedUser = await userRepo.updateUser(uuid, {
            username,
            email,
            password: hash,
        });

        return res.status(200).json({
            message: "Usuário atualizado com sucesso.",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Não foi possível atualizar o usuário.",
        });
    }
}


// Método para deletar um usuário.
export async function deleteUser(req, res) {
    try {
        const { uuid } = req.params;

        const user = await userRepo.findUserByUuid(uuid);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado.",
            });
        }

        await userRepo.deleteUser(uuid);

        return res.status(200).json({
            message: "Usuário deletado com sucesso.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Não foi possível deletar o usuário.",
        });
    }
}
