import { Router } from "express";

export interface IRouteType {
  path: string;
  route: Router;
}
