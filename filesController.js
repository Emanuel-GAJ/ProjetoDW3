// Importação das funções de conexão, upload e listagem de arquivos.
import { verifyConnection, uploadFile, listFiles } from "../utilities/scp.js";

// Importação do repositorio de arquivos.
import { createFile, findFileByUuid, findAllFiles } from "../repositories/fileRepository.js";

export const connection = async (req, res) => {
    try {
        const response = await verifyConnection();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: "Erro ao conectar!" });
    }
}

export const upload = async (req, res) => {
    // Pega o destino do arquivo.
    let destination = `/home/${process.env.SCP_USERNAME}/`;

    // Pega o arquivo enviado pelo usuário.
    const { file } = req.body;

    try {

        // Pega o uuid do usuário.
        const { uuid } = req.user;

        // Caminho completo do arquivo.
        const filePath = file.filePath;

        // Formata o caminho do arquivo.
        destination = destination + file.filename;

        await uploadFile(filePath, destination);

        const data = {
            filename: file.filename,
            type: file.type,
            size: file.size,
            remotePath: destination,
            status: "Enviado",
            userUUID: uuid,
        }

        await createFile(data);

        res.status(200).send({ message: "Arquivo enviado com sucesso!" });
    } catch (error) {

        // Pega o uuid do usuário.
        const { uuid } = req.user;

        // Pega o arquivo enviado pelo usuário.
        const file = req.body;

        const data = {
            filename: file.filename,
            type: file.type,
            size: file.size,
            remotePath: destination,
            status: "Falha ao enviar",
            userUUID: `${uuid}`,
        }

        await createFile(data);

        res.status(500).send({ message: "Erro ao enviar arquivo!" });
    }
}


// Função para listar todos os arquivos (remotos).
export const list = async (req, res) => {
    try {
        const response = await listFiles();
        res.status(200).json({
            message: "Arquivos listados com sucesso!",
            data: response,
        });
    } catch (error) {
        res.status(500).send({ message: "Erro ao listar arquivos!" });
    }
}

// Função para listar todos os arquivos (Banco de dados).
export const listAll = async (req, res) => {
    try {
        const response = await findAllFiles();
        res.status(200).json({
            message: "Arquivos listados com sucesso!",
            data: response,
        });
    } catch (error) {
        res.status(500).send({ message: "Erro ao listar arquivos!" });
    }
}
