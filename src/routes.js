
import Index from "views/Index.jsx";

import Login from "views/examples/Login.jsx";
import Expenses from "views/examples/Expenses.jsx";
import Estimates from "views/examples/Estimates.jsx";
import UpdateEstimate from "views/examples/UpdateEstimate.jsx";
import Invoices from "views/examples/Invoices.jsx";
import Clients from "views/examples/Clients.jsx";
import AddClient from "views/examples/AddClient.jsx";
import Workers from "views/examples/Workers.jsx";
import AddExpense from "views/examples/AddExpense.jsx";
import Jobs from "views/examples/Jobs.jsx";
import AddJob from "views/examples/AddJob.jsx";
import AddWorker from "views/examples/AddWorker.jsx";
import AddEstimate from "views/examples/AddEstimate.jsx";
import Reports from "./views/examples/Reports";
import AddReport from "./views/examples/AddReport";



var routes = [
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
    path: "/:id",
    name: "Edit Estimate",
    icon: "ni ni-ruler-pencil text-blue",
    component: UpdateEstimate,
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
    path: "/invoices",
    name: "Invoices",
    icon: "ni ni-credit-card text-orange",
    component: Invoices,
    layout: "/admin"
  },
  {
    path: "/time",
    name: "Time",
    icon: "ni ni-watch-time text-blue",
    component: Jobs,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "ni ni-ruler-pencil text-red",
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "ni ni-single-02 text-yellow",
    component: Clients,
    layout: "/admin"
    
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: "ni ni-money-coins text-info",
    component: Expenses,
    layout: "/admin"
  },
  {
    path: "/workers",
    name: "Workers",
    icon: "ni ni-circle-08 text-pink",
    component: Workers,
    layout: "/admin"
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
