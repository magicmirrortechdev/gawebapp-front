import Index from "views/Index.jsx";
import Home from "views/Home";
import Login from "views/Login.jsx";

import Estimates from "views/estimates/Estimates.jsx";
import AddEstimateByUser from './views/estimates/AddEstimateByUser.jsx'
import UpdateEstimate from "views/estimates/UpdateEstimate.jsx";
import SendEstimate from "views/estimates/SendEstimate";
import AddEstimate from "views/estimates/AddEstimate.jsx";

import Jobs from "views/jobs/Jobs.jsx";
import AddJob from "views/jobs/AddJob.jsx";
import UpdateJob from "views/jobs/UpdateJob.jsx";

import Invoices from "views/invoices/Invoices.jsx";
import AddInvoice from './views/invoices/AddInvoice.jsx'
import AddInvoiceByEstimate from './views/invoices/AddInvoiceByEstimate.jsx'
import PayInvoice from "views/invoices/PayInvoice";
import AddInvoiceByJob from "views/invoices/AddInvoiceByJob";
import UpdateInvoice from "views/invoices/UpdateInvoice";
import SendInvoice from "views/invoices/SendInvoice";

import Time from "views/examples/Time.jsx";
import Expenses from "views/examples/Expenses.jsx";

import Clients from "views/clients/Clients.jsx";
import AddClient from "views/clients/AddClient.jsx";
import UpdateClient from "./views/clients/UpdateClient.jsx"

import Workers from "views/workers/Workers.jsx";
import AddWorker from "views/workers/AddWorker.jsx";
import UpdateWorker from "./views/workers/UpdateWorker.jsx";
import AddWorkerJob from "views/workers/AddWorkerJob.jsx";

import AddExpense from "views/examples/AddExpense.jsx";
import AddExpenseByWorker from "views/examples/AddExpenseByWorker.jsx";
import AddTime from "views/examples/AddTime.jsx";
import UpdateTime from "views/examples/UpdateTime.jsx";
import AddPM from "views/examples/AddProjectManager.jsx";
import Reports from "./views/examples/Reports";
import AddReport from "./views/examples/AddReport";

import AddTimeAllUsers from "views/examples/AddTimeAllUsers";

import UpdateExpense from "views/examples/UpdateExpense";

var routes = [
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
    path: "/:id/invoice",
    name: "Job Invoice",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddInvoiceByJob,
    layout: "/admin/jobs",
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
    path: "/jobs",
    name: "Jobs",
    icon: "ni ni-settings text-gray",
    component: Jobs,
    layout: "/admin"

  },
  {
    path: "/:id",
    name: "Edit Job",
    icon: "ni ni-ruler-pencil text-blue",
    component: UpdateJob,
    layout: "/admin/jobs",
    invisible:true
  },
  {
    path: "/addworker/:id",
    name: "Add Worker Job",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddWorkerJob,
    layout: "/admin/jobs",
    invisible:true
  },
  {
    path: "/addpm/:id",
    name: "Add PM",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddPM,
    layout: "/admin/jobs",
    invisible:true
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "ni ni-credit-card text-orange",
    component: Invoices,
    layout: "/admin"
  },
  {
    path: "/:id/:invoiceId/email",
    name: "Send Invoice",
    icon: "ni ni-ruler-pencil text-blue",
    component: SendInvoice,
    layout: "/admin/invoices",
    invisible:true
  },
  {
    path: "/:id/:invoiceId",
    name: "Pay Invoice",
    icon: "ni ni-credit-card text-orange",
    component: PayInvoice,
    layout: "/admin/invoices",
    invisible:true
  },
  {
    path: "/:estimateId/:invoiceId/update",
    name: "Update Invoice",
    icon: "ni ni-credit-card text-orange",
    component: UpdateInvoice,
    layout: "/admin/invoices",
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
    path: "/addtime/:estimateId/:id/:workerId",
    name: "Add Time",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddTime,
    layout: "/admin/time",
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
    path: "/reports",
    name: "Reports",
    icon: "ni ni-ruler-pencil text-red",
    component: Reports,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "ni ni-single-02 text-yellow",
    component: Clients,
    layout: "/admin"
  },
  {
    path: "/update/:id",
    name: "Update Client",
    icon: "ni ni-circle-08 text-pink",
    component: UpdateClient,
    layout: "/admin/clients",
    invisible: true
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
    path: "/workers",
    name: "Workers",
    icon: "ni ni-circle-08 text-pink",
    component: Workers,
    layout: "/admin"  
  },
  {
    path: "/update/:id",
    name: "Update Worker",
    icon: "ni ni-circle-08 text-pink",
    component: UpdateWorker,
    layout: "/admin/workers",
    invisible: true
  },
  { 
    path: "/addclient",
    component: AddClient,
    layout: "/admin",
    invisible:true
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
    path: "/createinvoice",
    component: AddInvoice,
    layout: "/admin",
    invisible: true
  },
  { 
    path: "/addjob",
    component: AddJob,
    layout: "/admin",
    invisible:true
  },
  { 
    path: "/addworker",
    component: AddWorker,
    layout: "/admin",
    invisible:true
  },
  {
    path: "/addreport",
    component: AddReport,
    layout: "/admin",
    invisible:true
  },
  { 
    path: "/login",
    component: Login,
    layout: "/auth",
    invisible:true
  }

];
export default routes;
