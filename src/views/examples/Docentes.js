import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header.js";
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
const ListarDocentes = () => {
  const [tasks, setTasks] = useState([]);
  const limpiar = () => {
    docentes({
    id_docente: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_de_nacimiento: "",
    celular: "",
    ciudad: "",
    sexo: "Masculino",
    }); 
  }

  const [docente, docentes] = useState({
    id_edocente: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_de_nacimiento: "",
    celular: "",
    ciudad: "",
    sexo: "Masculino",
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadTasks = async () => {
    const response = await fetch("http://localhost:3001/docentes");
    const data = await response.json();
    setTasks(data);
  };
  const [modal, setModal] = useState(false);
  const OpenModal = () => setModal(!modal);
  const NuevoDocentes = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:3001/docentes', {
      method: 'POST',
      body: JSON.stringify(docente),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data);
    setLoading(false);
  };

  const ActualizarDocentes = async (e) => {
    e.preventDefault();
    console.log(docente);
    const res = await fetch('http://localhost:3001/docentes/actualizar', {
      method: 'POST',
      body: JSON.stringify(docente),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data);
  };
  const EliminarDocentes = async (id) => {
    console.log(id);
    await fetch('http://localhost:3001/docentes/eliminar', {
      method: 'POST',
      body: JSON.stringify({id: id}),
      headers: { 'Content-Type': 'application/json' }
    })
    setTasks(tasks.filter((task) => task.id_docente !== id));
  }
  const NuevoDato = (e) => {
    docentes({ ...docente, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  }
  const CargarDocentes = async (iddocente) => {
    const res = await fetch(`http://localhost:3001/docentes/${iddocente}`);
    const data = await res.json();
    console.log(data);
     docentes({
      id_docente: parseInt(data.id_docente),
      cedula: data.cedula, 
      nombres: data.nombre,
      apellidos: data.apellido,
      fecha_de_nacimiento: data.fecha_nacimiento,
      celular: data.celular_representante,
      ciudad: data.ciudad,
      sexo: data.sexo,
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
                  <Button  color="primary" onClick ={() => {OpenModal(); setEditando(false); limpiar(); console.log(docente)}}>Agregar docente</Button>
                  <Modal  onClosed={() => {setEditando(false)}} scrollable={true} isOpen={modal} toggle={OpenModal} >
                    <ModalHeader >Agregar Docente</ModalHeader>
                    <ModalBody style={{ height: "75vh" }}>
                      <Form onSubmit={ editando ? ActualizarDocentes: NuevoDocentes}> 
                        <FormGroup>
                          <Label for="exampleEmail">
                            Cedula
                          </Label>
                          <Input
                            id="exampleEmail"
                            name="cedula"
                            placeholder="Ingrese su cedula"
                            type="text"
                            onChange={NuevoDato}
                            value = {docente.cedula}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarNombres">
                            Nombres
                          </Label>
                          <Input
                            id="EnviarNombres"
                            name="nombres"
                            placeholder="Ingrese su nombre"
                            type="text"
                            onChange={NuevoDato}
                            value = {docente.nombres}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarApellidos">
                            Apellidos
                          </Label>
                          <Input
                            id="EnviarApellidos"
                            name="apellidos"
                            placeholder="Ingrese su apellido"
                            type="text"
                            onChange={NuevoDato}
                            value = {docente.apellidos}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarFechaNacimiento">
                            Fecha de nacimiento
                          </Label>
                          <Input
                            id="EnviarFechaNacimiento"
                            name="fecha_de_nacimiento"
                            type="date"
                            onChange={NuevoDato}
                            value = {docente.fecha_de_nacimiento}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarCelular">
                            Celular
                          </Label>
                          <Input
                            id="EnviarCelular"
                            name="celular"
                            placeholder="Ingrese su celular"
                            type="text"
                            onChange={NuevoDato}
                            value = {docente.celular}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarCiudad">
                            Ciudad
                          </Label>
                          <Input
                            id="EnviarCiudad"
                            name="ciudad"
                            placeholder="Ingrese su ciudad"
                            type="text"
                            onChange={NuevoDato}
                            value = {docente.ciudad}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarSexo">
                            Sexo
                          </Label>
                          <Input
                            id="EnviarSexo"
                            name="sexo"
                            type="select"
                            onChange={NuevoDato}
                            value = {docente.sexo}
                          >
                            <option>
                              Masculino
                            </option>
                            <option>
                              Femenino
                            </option>
                          </Input>
                        </FormGroup>
                        <Button color="success" type='submit'>
                          {loading ? <Spinner color="light" /> : editando ? "Modificar" : "Guardar"}
                        </Button>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      {/*  <Button color="success" onClick={AgregarEstudiante}>
                        Cerrar{" "}
                      </Button> */}
                    </ModalFooter>
                  </Modal >
                </div>
              </CardHeader>
              <Table className="align-items-end table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> Cedula </th>
                    <th scope="col"> Nombres </th>
                    <th scope="col"> Apellidos </th>
                    <th scope="col"> Fecha de nacimiento </th>
                    <th scope="col"> Teléfono </th>
                    <th scope="col"> Ciudad </th>
                    <th scope="col"> Sexo </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id_docente}>
                      <td>{task.cedula}</td>
                      <td>{task.nombre}</td>
                      <td>{task.apellido}</td>
                      <td>{task.fecha_nacimiento}</td>
                      <td>{task.telefono}</td>
                      <td>{task.ciudad}</td>
                      <td>{task.sexo}</td>
                      <td>
                        <Button color="success" type="button" onClick={() => { console.log("Click") }}>
                          Ver más
                        </Button>
                        <Button color="danger" type="button" onClick={() => { EliminarDocentes(task.id_docente) }}>
                          Eliminar
                        </Button>
                        <Button color="primary" type="button" onClick={() => {CargarDocentes(task.id_docente); OpenModal(); setEditando(true);}} >
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

export default ListarDocentes;
