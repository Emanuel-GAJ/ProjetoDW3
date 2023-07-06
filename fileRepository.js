import { PrismaClient } from "@prisma/client";


// Criando uma nova instância do PrismaClient.
const prisma = new PrismaClient();

// Função para criar um novo arquivo.
export const createFile = async (data) => {
    const file = await prisma.files.create({
        data,
    });

    return file;
}

// Função para buscar um arquivo pelo UUID.
export const findFileByUuid = async (uuid) => {
    const file = await prisma.files.findUnique({
        where: {
            uuid,
        },
    });

    return file;
}


// Função para buscar todos os arquivos.
export const findAllFiles = async () => {
    const fileList = await prisma.files.findMany();

    return fileList;
}
