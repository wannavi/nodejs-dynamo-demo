import { Router } from "express";

export default class BaseRoute {
  public readonly router: Router;

  constructor() {
    this.router = Router();
  }
}
