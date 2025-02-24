import {Request, Response} from "express";
import {Op} from "sequelize";

const express = require("express");
const ticketRouter = express.Router();

const ticketController = require("../controllers/ticketController");

// 1) Создать обращение
ticketRouter.post('/', ticketController.createAppeal);
// 2) Взять обращение в работу
ticketRouter.post('/:id/start', ticketController.startAppeal);
// 3) Завершить обработку обращения
ticketRouter.post('/:id/complete', ticketController.completeAppeal);
// 4) Отмена обращения
ticketRouter.post('/:id/cancel', ticketController.cancelAppeal);
// 5) Получить список обращений
ticketRouter.get('/', ticketController.getTickets);
// 6) Отмена всех обращений в статусе "в работе"
ticketRouter.post('/cancel-all-in-progress', ticketController.cancelAllInProgress);


module.exports = ticketRouter;
