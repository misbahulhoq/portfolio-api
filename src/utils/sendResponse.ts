import { Response } from "express";

interface IResponse<data = any> {
  statusCode: number;
  message: string;
  success: boolean;
  data?: data;
}
export const sendResponse = (res: Response, payload: IResponse) => {
  res.status(payload.statusCode).send(payload);
};
