import { PrismaClient } from "@prisma/client";

// Criando uma nova instância do PrismaClient.
const prisma = new PrismaClient();

// Função para criar um novo usuário.
export const createUser = async (data) => {
    const user = await prisma.user.create({
        data,
    });

    return user;
};

// Função para buscar um usuário pelo email.
export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user;
};

// Função para buscar um usuário pelo  UUID.
export const findUserByUuid = async (uuid) => {
    const user = await prisma.user.findUnique({
        where: {
            uuid,
        },
    });

    return user;
};

// Função para buscar todos os usuários.
export const findAllUsers = async () => {
    const users = await prisma.user.findMany();

    return users;
};

// Função para atualizar um usuário.
export const updateUser = async (uuid, data) => {
    const user = await prisma.user.update({
        where: {
            uuid,
        },
        data,
    });

    return user;
};

// Função para deletar um usuário.
export const deleteUser = async (uuid) => {
    const user = await prisma.user.delete({
        where: {
            uuid,
        },
    });

    return user;
};
