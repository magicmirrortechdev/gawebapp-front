import Index from "views/Index.jsx";
import Home from "views/Home";
import Login from "views/Login";

import Time from "views/examples/Time.jsx";
import Estimates from "views/examples/Estimates.jsx";
import Expenses from "views/examples/Expenses.jsx";
import UpdateEstimate from "views/examples/UpdateEstimate.jsx";
import AddExpense from "views/examples/AddExpense.jsx";
import AddExpenseByWorker from "views/examples/AddExpenseByWorker.jsx";
import AddTime from "views/examples/AddTime.jsx";
import AddEstimate from "views/examples/AddEstimate.jsx";
import AddEstimateByUser from './views/examples/AddEstimateByUser.jsx'
import AddInvoiceByEstimate from './views/examples/AddInvoiceByEstimate.jsx'
import AddTimeAllUsers from "views/examples/AddTimeAllUsers";
import SendEstimate from "views/examples/SendEstimate";
import UpdateExpense from "views/examples/UpdateExpense";
import UpdateTime from "./views/examples/UpdateTime";

var routesWorker = [
  {
    path: "/sign",
    name: "Sign",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: "/auth",
    invisible:true
  },
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/estimates",
    name: "Estimates",
    icon: "ni ni-ruler-pencil text-blue",
    component: Estimates,
    layout: "/admin"
  },
  {
    path: "/:id/invoice",
    name: "Estimate Invoice",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddInvoiceByEstimate,
    layout: "/admin/estimates",
    invisible:true
  },
  {
    path: "/:id",
    name: "Edit Estimate",
    icon: "ni ni-ruler-pencil text-blue",
    component: UpdateEstimate,
    layout: "/admin/estimates",
    invisible:true
  },
  {
    path: "/:id/email",
    name: "Send Estimate",
    icon: "ni ni-ruler-pencil text-blue",
    component: SendEstimate,
    layout: "/admin/estimates",
    invisible:true
  },  

  {
    path: "/:estimateId/:expenseId/update",
    name: "Update Expense",
    icon: "ni ni-credit-card text-orange",
    component: UpdateExpense,
    layout: "/admin/expenses",
    invisible:true
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: "ni ni-money-coins text-info",
    component: Expenses,
    layout: "/admin"
  },
  {
    path: "/time",
    name: "Time",
    icon: "ni ni-watch-time text-blue",
    component: Time,
    layout: "/admin"
  },
  {
    path: "/addtime",
    name: "Add Time General",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddTimeAllUsers,
    layout: "/admin",
    invisible:true
  },
  {
    path: "/updatetime/:estimateId/:id/:workerId/:timeId",
    name: "Update Time",
    icon: "ni ni-ruler-pencil text-blue",
    component: UpdateTime,
    layout: "/admin/time",
    invisible:true
  },
  {
    path: "/addtime/:estimateId/:id/:workerId",
    name: "Add Time",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddTime,
    layout: "/admin/time",
    invisible:true
  },
  {
    path: "/estimatecreate/:id",
    name: "Create Estimate by User",
    icon: "ni ni-circle-08 text-pink",
    component: AddEstimateByUser,
    layout: "/admin/clients",
    invisible: true
  },

  { 
    path: "/addestimate",
    component: AddEstimate,
    layout: "/admin",
    invisible:true
  },
  { 
    path: "/:id/addexpense",
    component: AddExpense,
    layout: "/admin/jobs",
    invisible: true
  },
  { 
    path: "/addexpense",
    component: AddExpenseByWorker,
    layout: "/admin",
    invisible: true
  },

  { 
    path: "/login",
    component: Login,
    layout: "/auth",
    invisible:true
  }

];
export default routesWorker;
