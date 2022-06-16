import { NextFunction, Request, Response } from "express";
import BaseRoute from "./BaseRoute";

export default class HelloRoute extends BaseRoute {
  constructor() {
    super();
    this.router.get("/", this.hello);
  }

  private async hello(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        message: "Hello, World!",
      });
    } catch (err) {
      next(err);
    }
  }
}
