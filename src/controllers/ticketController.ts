import {DataTypes, Op} from "sequelize";
import {Request, Response} from "express";
import { db } from '../../config/db';

const TicketModel = require('../../models/ticket.js');


const Ticket = TicketModel(db, DataTypes);

class TicketController {
    // 1) Создать обращение
    async createAppeal(req: Request, res: Response) {
        const { subject, text } = req.body;
        const newTicket = await Ticket.create({
            subject,
            text,
            status: 'Новое',
        });
        res.status(201).json(newTicket);
    }

    async startAppeal(req: Request, res: Response) {
        const ticket = await Ticket.findByPk(req.params.id);
        if (ticket) {
            ticket.status = 'В работе';
            await ticket.save();
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Обращение не найдено' });
        }
    }

    async completeAppeal(req: Request, res: Response) {
        const { resolutionText } = req.body;
        const ticket = await Ticket.findByPk(req.params.id);
        if (ticket) {
            ticket.status = 'Завершено';
            ticket.resolutionText = resolutionText;
            await ticket.save();
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Обращение не найдено' });
        }
    }

    async cancelAppeal(req: Request, res: Response) {
        const { cancellationReason } = req.body;
        const ticket = await Ticket.findByPk(req.params.id);
        if (ticket) {
            ticket.status = 'Отменено';
            ticket.cancellationReason = cancellationReason;
            await ticket.save();
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Обращение не найдено' });
        }
    }

    async getTickets(req: Request, res: Response) {
        const { startDate, endDate } = req.query;
        const query: any = {};

        if (startDate && endDate) {
            query.createdAt = {
                [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
            };
        }

        const tickets = await Ticket.findAll({ where: query });
        res.json(tickets);
    }

    async cancelAllInProgress(req: Request, res: Response) {
        const [affectedCount] = await Ticket.update({ status: 'Отменено' }, { where: { status: 'В работе' } });
        res.json({ message: `${affectedCount} обращений в статусе "в работе" отменены.` });
    }


}
module.exports = new TicketController();
