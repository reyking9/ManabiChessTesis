import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header.js";
import ModalAlumnos from "./Modals/ModalAlumnos";
//import moments from "moment";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Form,
  Spinner,
} from "reactstrap";
let dias = [];
const Maps = () => {
  const [nivel, niveles] = useState({
    listaNiveles: [],
  });
  const [tasks, setTasks] = useState([]);

/*   const limpiar = () => {
    cursos({
      id_personas: "",
      dias_semana: "",
      hora_inicio: "",
      hora_fin: "",
      id_nivel: "",
    });
  } */
  const [docente, docentes] = useState({
    listaDocentes: [],
  });

  const [curso, cursos] = useState({
  
    id_personas: "",
    hora_inicio: "",
    hora_fin: "",
    dias_semana: { dias },
    id_nivel: "",
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadTasks = async () => {
    const response = await fetch("http://localhost:3001/cursos");
    const data = await response.json();
    setTasks(data);
    console.log(data)
  };
  const [modal, setModal] = useState(false);
  const OpenModal = () => setModal(!modal);
  const Nuevocurso = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(curso);
    const res = await fetch('http://localhost:3001/cursos', {
      method: 'POST',
      body: JSON.stringify(curso),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
   console.log(data);
    setLoading(false);
  };

  const Actualizarcurso = async (e) => {
    e.preventDefault();
    console.log(curso);
    const res = await fetch('http://localhost:3001/cursos/actualizar', {
      method: 'POST',
      body: JSON.stringify(curso),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data);
  };
  const Eliminarcurso = async (id) => {
    console.log(id);
    await fetch('http://localhost:3001/cursos/eliminar', {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    })
    setTasks(tasks.filter((task) => task.id_curso !== id));
  }
  const NuevoDato = (e) => {
    cursos({ ...curso, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    console.log(curso);
  }
  const Cargarcurso = async (idcurso) => {
    console.log(idcurso);
    console.log(editando);
    const res = await fetch(`http://localhost:3001/cursos/${idcurso}`);
    const data = await res.json();
    console.log(data);
    cursos({
      id_curso: parseInt(data.id_curso),
      docente: data.nombre + " " + data.apellido,
      hora_inicio: data.hora_inicio,
      hora_fin: data.hora_fin,
      nivel: data.nivel,
    });

  }
  function DiaSemana(dia) {
    var i = dias.indexOf(dia);
    if (i !== -1) {
      dias.splice(i, 1);
    } else { dias.push(dia); }
    console.log(dias)
  }
  const Cargardocentes = async () => {
    const res = await fetch('http://localhost:3001/docentes');
    const data = await res.json();
    //  console.log(data.Row[0].nombre);
    console.log(data)
    docentes({
      listaDocentes: data
    });
  }
  const Cargarniveles = async () => {
    const res = await fetch('http://localhost:3001/niveles');
    const data = await res.json();
    //  console.log(data.Row[0].nombre);
    console.log(data)
    niveles({
      listaNiveles: data
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);
  // core components
  return (

    <>
      <Header /> {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div>
                  <Button color="primary" onClick={() => { OpenModal(); setEditando(false); /*dias = []*/; Cargardocentes(); Cargarniveles() }}>Agregar curso</Button>
                  <Modal onClosed={() => { setEditando(false) }} scrollable={true} isOpen={modal} toggle={OpenModal} >
                    <ModalHeader >Agregar curso</ModalHeader>
                    <ModalBody style={{ height: "75vh" }}>
                      <Form onSubmit={editando ? Actualizarcurso : Nuevocurso}>
                        <FormGroup>
                          <Label for="EnviarCiudad">
                            Nivel
                          </Label>
                          <Input
                            id="EnviarCiudad"
                            name="id_nivel"
                            type="select"
                            onChange={NuevoDato}
                          >
                            {nivel.listaNiveles.map(elemento => (
                              <option key={elemento.id_nivel} value={elemento.id_nivel}>{elemento.nombre_nivel}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label check>
                            Dias semana
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarLunes"
                            name="lunes"
                            type="checkbox"
                            //    onChange={NuevoDato}
                            value={curso.dias_semana}
                            onChange={() => { DiaSemana('Lunes') }}
                          // onchecked = {() => {DiaSemana("1")}}
                          />
                          <Label check>
                            Lunes
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarMartes"
                            name="martes"
                            type="checkbox"
                            onChange={() => { DiaSemana('Martes') }}
                            value={curso.dias_semana}

                          />
                          <Label check>
                            Martes
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarMiercoles"
                            name="miercoles"
                            type="checkbox"
                            onChange={() => { DiaSemana('Miercoles') }}
                            value={curso.dias_semana}
                          />
                          <Label check>
                            Miercoles
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarJueves"
                            name="jueves"
                            type="checkbox"
                            onChange={() => { DiaSemana('Jueves') }}
                            value={curso.dias_semana}
                          />
                          <Label check>
                            Jueves
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarViernes"
                            name="viernes"
                            type="checkbox"
                            onChange={() => { DiaSemana('Viernes') }}
                            value={curso.dias_semana}
                          />
                          <Label check>
                            Viernes
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarSabado"
                            name="sabado"
                            type="checkbox"
                            onChange={() => { DiaSemana('Sabado') }}
                            value={curso.dias_semana}
                          />
                          <Label check>
                            Sabado
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input
                            id="EnviarDomingo"
                            name="domingo"
                            type="checkbox"
                            onChange={() => { DiaSemana('Domingo') }}
                            value={curso.dias_semana}
                          />
                          <Label check>
                            Domingo
                          </Label>
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarApellidos">
                            Hora de inicio
                          </Label>
                          <Input
                            id="EnviarApellidos"
                            name="hora_inicio"
                            placeholder="Ingrese su apellido"
                            type="time"
                            onChange={NuevoDato}
                            value={curso.hora_inicio}

                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarFechaNacimiento">
                            Hora fin
                          </Label>
                          <Input
                            id="hora_inicio"
                            name="hora_fin"
                            type="time"
                            onChange={NuevoDato}
                            value={curso.hora_fin}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarCiudad">
                            Docente
                          </Label>
                          <Input
                            id="EnviarCiudad"
                            name="id_personas"
                            type="select"
                            onChange={NuevoDato}
                          >
                            {docente.listaDocentes.map(elemento => (
                              <option key={elemento.id_personas} value={elemento.id_personas}>{elemento.nombre + " " + elemento.apellido + " " + elemento.cedula}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <Button color="success" type='submit'>
                          {loading ? <Spinner color="light" /> : editando ? "Modificar" : "Guardar"}
                        </Button>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      {/*  <Button color="success" onClick={Agregarcurso}>
                        Cerrar{" "}
                      </Button> */}
                    </ModalFooter>
                  </Modal >
                </div>
              </CardHeader>
              <Table className="align-items-end table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> Nivel </th>
                    <th scope="col"> Dias de semana </th>
                    <th scope="col"> Hora inicio</th>
                    <th scope="col"> Hora fin </th>
                    <th scope="col"> Docente </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (

                    <tr key={task.id_curso}>
                      <td>{task.nombre_nivel}</td>
                      <td>{task.dias}</td>
                      <td>{task.hora_inicio}</td>
                      <td>{task.hora_fin}</td>
                      <td>{task.nombre} {task.apellido}</td>
                      <td>
                        <Button color="success" type="button" onClick={() => { <ModalAlumnos/> }}>
                          Alumnos
                        </Button>
                        <Button color="danger" type="button" onClick={() => { Eliminarcurso(task.id_curso) }}>
                          Eliminar
                        </Button>
                        <Button color="primary" type="button" onClick={() => { Cargarcurso(task.id_curso); OpenModal(); setEditando(true); }} >
                          Modificar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default Maps;
