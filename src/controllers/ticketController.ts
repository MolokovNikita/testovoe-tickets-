import { DataTypes, Op } from "sequelize";
import { Request, Response } from "express";
import { db } from "../../config/db";

const TicketModel = require("../../models/ticket.js");
import {
  CreateAppealBody,
  CompleteAppealBody,
  CancelAppealBody,
  GetTicketsQuery,
} from "../../src/types/types";
const Ticket = TicketModel(db, DataTypes);

class TicketController {
  // 1) Создать обращение
  async createAppeal(req: Request<{}, {}, CreateAppealBody>, res: Response) {
    try {
      const { subject, text } = req.body;
      const newTicket = await Ticket.create({
        subject,
        text,
        status: "Новое",
      });
      res.status(201).json(newTicket);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      res.status(500).json({ error });
    }
  }

  // 2) Взять обращение в работу
  async startAppeal(req: Request<{ id: string }>, res: Response) {
    try {
      const ticket = await Ticket.findByPk(req.params.id);
      if (ticket) {
        ticket.status = "В работе";
        await ticket.save();
        res.json(ticket);
      } else {
        res.status(404).json({ message: "Обращение не найдено" });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      res.status(500).json({ error });
    }
  }

  // 3) Завершить обработку обращения
  async completeAppeal(
    req: Request<{ id: string }, {}, CompleteAppealBody>,
    res: Response,
  ) {
    try {
      const { resolutionText } = req.body;
      const ticket = await Ticket.findByPk(req.params.id);
      if (ticket) {
        ticket.status = "Завершено";
        ticket.resolutionText = resolutionText;
        await ticket.save();
        res.json(ticket);
      } else {
        res.status(404).json({ message: "Обращение не найдено" });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      res.status(500).json({ error });
    }
  }

  // 4) Отмена обращения
  async cancelAppeal(
    req: Request<{ id: string }, {}, CancelAppealBody>,
    res: Response,
  ) {
    try {
      const { cancellationReason } = req.body;
      const ticket = await Ticket.findByPk(req.params.id);
      if (ticket) {
        ticket.status = "Отменено";
        ticket.cancellationReason = cancellationReason;
        await ticket.save();
        res.json(ticket);
      } else {
        res.status(404).json({ message: "Обращение не найдено" });
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      res.status(500).json({ error });
    }
  }

  // 5) Получить список обращений
  async getTickets(req: Request<{}, {}, {}, GetTicketsQuery>, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const query: Record<string, any> = {};
      if (startDate && endDate) {
        query.createdAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      }
      const tickets = await Ticket.findAll({ where: query });
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: "Обращения не найдены" });
      }
      res.json(tickets);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      res.status(500).json({ error });
    }
  }

  // 6) Отмена всех обращений в статусе "в работе"
  async cancelAllInProgress(req: Request, res: Response) {
    try {
      const [affectedCount] = await Ticket.update(
        { status: "Отменено" },
        { where: { status: "В работе" } },
      );
      res.json({
        message: `${affectedCount} обращений в статусе "в работе" отменены.`,
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      res.status(500).json({ error });
    }
  }
}

module.exports = new TicketController();
