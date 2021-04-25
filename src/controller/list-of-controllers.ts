import { CarteController } from "./carte.controller";
import { CategoryController } from "./category.controller";
import { CustomerController } from "./customer.controller";
import { NotificationController } from "./notification.controller";
import { RecipeController } from "./recipe.controller";
import { StockController } from "./stock.controller";
import { UserGroupController } from "./user-group.controller";
import { UserController } from "./user.controller";

export const listOfControllers = [
  new CarteController(),
  new CategoryController(),
  new CustomerController(),
  new RecipeController(),
  new NotificationController(),
  new StockController(),
  new UserGroupController(),
  new UserController(),
];
