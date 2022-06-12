import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Cursos from "views/examples/Cursos.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Estudiantes from "views/examples/Estudiantes.js";
import Clases from "views/examples/Clases.js";
import Docentes from "views/examples/Docentes.js";
import Coordinadores from "views/examples/Coordinadores.js";
import Periodos from "views/examples/Periodos.js";

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-single-02 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/clases",
    name: "Clases",
    icon: "ni ni-paper-diploma text-blue",
    component: Clases,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Cursos",
    icon: "ni ni-book-bookmark text-orange",
    component: Cursos,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Informes",
    icon: "ni ni-chart-bar-32 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Estudiantes",
    icon: "ni ni-hat-3 text-green",
    component: Estudiantes,
    layout: "/admin",
  },
  {
    path: "/docentes",
    name: "Docentes",
    icon: "ni ni-ruler-pencil text-purple",
    component: Docentes,
    layout: "/admin",
  },
  {
    path: "/coordinadores",
    name: "Coordinadores",
    icon: "ni ni-badge text-red",
    component: Coordinadores,
    layout: "/admin",
  },
  {
    path: "/periodos",
    name: "Periodo Lectivo",
    icon: "ni ni-calendar-grid-58",
    component: Periodos,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  
  
];
export default routes;
