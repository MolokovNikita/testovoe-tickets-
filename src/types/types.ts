export type CreateAppealBody = {
  subject: string;
  text: string;
};

export type CompleteAppealBody = {
  resolutionText: string;
};

export type CancelAppealBody = {
  cancellationReason: string;
};

export type GetTicketsQuery = {
  startDate?: string;
  endDate?: string;
};
