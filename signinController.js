import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/userRepository.js";
import CryptPassword from "../utilities/crypto.js";


// Método para autenticar um usuário.
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Usuário e/ou senha inválidos",
            });
        }

        const isValidPassword = await CryptPassword.comparePassword(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Usuário e/ou senha inválidos",
            });
        }

        const token = jwt.sign(
            {
                uuid: user.uuid,
                username: user.username,
            },
            process.env.API_TOKEN_SECRET,
            {
                expiresIn: process.env.API_TOKEN_EXPIRES_IN,
                algorithm: process.env.API_TOKEN_ALGORITHM,
            }
        );

        return res.status(200).json({
            message: "Usuário logado com sucesso.",
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao logar usuário.",
        });
    }
};

// Método para listar usuário autenticado.
export const me = async (req, res) => {
    try {
        const { uuid, username } = req.user;

        return res.status(200).json({
            message: "Usuário autenticado.",
            user: {
                uuid,
                username,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar usuário autenticado.",
        });
    }
}
