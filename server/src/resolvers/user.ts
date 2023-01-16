import argon2 from "argon2";
import { dataManager } from "../AppDataSource";
import { UserEntity as User } from "../entities/user";
import { Resolvers } from "../generated/graphql";

export const UserResolvers: Resolvers = {
    Query: {
        me(_, { id }) {
            return dataManager.findOneBy(User, 
                { id: parseInt(id) });
        }
    },
    Mutation: {
        async login(_, { username, password }) {
            const existingUser = await dataManager.findOneBy(User, 
                { username });
            if (!existingUser) {
                return null;
            }
            const validPassword = await argon2.verify(existingUser.password, password);
            if (!validPassword) {
                return null;
            }
            return existingUser;
        },
        async register(_, { username, password, email }) {
            const existingUser = await dataManager.findOneBy(User, 
                { username });
            if (existingUser) {
                return existingUser;
            } 
            const hashedPassword = await argon2.hash(password);
            const newUser = dataManager.create(User, 
                { 
                    username, 
                    password: hashedPassword, 
                    email 
                });
            await dataManager.save(newUser);
            return newUser;
        }, 
        logout() {
            return true;
        }
    }
};
