
import Index from "views/Index.jsx";

import Login from "views/examples/Login.jsx";
import Time from "views/examples/Time.jsx";
import Estimates from "views/examples/Estimates.jsx";
import UpdateEstimate from "views/examples/UpdateEstimate.jsx";
import UpdateJob from "views/examples/UpdateJob.jsx";
import Invoices from "views/examples/Invoices.jsx";
import Clients from "views/examples/Clients.jsx";
import AddClient from "views/examples/AddClient.jsx";
import Workers from "views/examples/Workers.jsx";
import AddExpense from "views/examples/AddExpense.jsx";
import Jobs from "views/examples/Jobs.jsx";
import AddJob from "views/examples/AddJob.jsx";
import AddWorker from "views/examples/AddWorker.jsx";
import AddWorkerJob from "views/examples/AddWorkerJob.jsx";
import AddTime from "views/examples/AddTime.jsx";
import AddPM from "views/examples/AddProjectManager.jsx";
import AddEstimate from "views/examples/AddEstimate.jsx";
import Reports from "./views/examples/Reports";
import AddReport from "./views/examples/AddReport";
import UpdateWorker from "./views/examples/UpdateWorker.jsx";
import UpdateClient from "./views/examples/UpdateClient.jsx"
import AddEstimateByUser from './views/examples/AddEstimateByUser.jsx'



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
    path: "/time",
    name: "Time",
    icon: "ni ni-watch-time text-blue",
    component: Time,
    layout: "/admin"
  },
  {
    path: "/addtime/:id",
    name: "Add Time",
    icon: "ni ni-ruler-pencil text-blue",
    component: AddTime,
    layout: "/admin/time",
    invisible:true
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
  // {
  //   path: "/expenses",
  //   name: "Expenses",
  //   icon: "ni ni-money-coins text-info",
  //   component: Expenses,
  //   layout: "/admin"
  // },
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
