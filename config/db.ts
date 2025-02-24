import { Sequelize } from "sequelize";

export const db = new Sequelize("testovoe_tickets", "postgres", "1234", {
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432,
    logging: false,
});

