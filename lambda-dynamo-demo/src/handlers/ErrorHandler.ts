import { NextFunction, Request, Response, Router } from "express";
import BaseRoute from "../BaseRoute";

export default class ErrorHandler extends BaseRoute {
  constructor() {
    super();
    this.router.use(this.notFoundError);
    this.router.use(this.internalServerError);
  }

  private notFoundError(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ message: "Not found" });
  }

  private internalServerError(req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ message: "Internal server error" });
  }
}
