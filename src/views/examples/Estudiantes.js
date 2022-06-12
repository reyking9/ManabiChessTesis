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
const ListarEstudiantes = () => {
  const [tasks, setTasks] = useState([]);
  const limpiar = () => {
    estudiantes({
    id_estudiante: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    correo: "",
    fecha_de_nacimiento: "",
    celular: "",
    ciudad: "",
    sexo: "Masculino",
    usuario_lichess: "",
    nombre_representante: "",
    celular_representante: "",
    correo_representante: "",
    id_nivel: "1",
    }); 
  }

  const [nivel, niveles]  = useState({
    listaNiveles: [],
    });


  const [estudiante, estudiantes] = useState({
    id_estudiante: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    correo: "",
    fecha_de_nacimiento: "",
    celular: "",
    ciudad: "",
    sexo: "Masculino",
    usuario_lichess: "",
    nombre_representante: "",
    celular_representante: "",
    correo_representante: "",
    id_nivel: "1"
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadTasks = async () => {
    const response = await fetch("http://localhost:3001/estudiantes");
    const data = await response.json();
    setTasks(data);
  };
  const [modal, setModal] = useState(false);
  const OpenModal = () => setModal(!modal);
  const NuevoEstudiante = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:3001/estudiantes', {
      method: 'POST',
      body: JSON.stringify(estudiante),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data);
    setLoading(false);
  };

  const ActualizarEstudiante = async (e) => {
    e.preventDefault();
    console.log(estudiante);
    const res = await fetch('http://localhost:3001/estudiantes/actualizar', {
      method: 'POST',
      body: JSON.stringify(estudiante),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    console.log(data);
  };
  const EliminarEstudiante = async (id) => {
    console.log(id);
    await fetch('http://localhost:3001/estudiantes/eliminar', {
      method: 'POST',
      body: JSON.stringify({id: id}),
      headers: { 'Content-Type': 'application/json' }
    })
    setTasks(tasks.filter((task) => task.id_estudiante !== id));
  }
  const NuevoDato = (e) => {
    estudiantes({ ...estudiante, [e.target.name]: e.target.value });
     console.log(e.target.name, e.target.value);
  }
  const CargarEstudiante = async (idestudiante) => {
    console.log(idestudiante);
    console.log(editando);
    const res = await fetch(`http://localhost:3001/estudiantes/${idestudiante}`);
    const data = await res.json();
    console.log(data);
     estudiantes({
      id_estudiante: parseInt(data.id_estudiante),
      cedula: data.cedula, 
      nombres: data.nombre,
      apellidos: data.apellido,
      correo: data.correo,
      fecha_de_nacimiento: data.fecha_nacimiento,
      celular: data.celular_representante,
      ciudad: data.ciudad,
      sexo: data.sexo,
      usuario_lichess: data.nombre_usuario,
      nombre_representante: data.nombre_representante,
      celular_representante: data.celular_representante,
      correo_representante: data.correo_representante,
      nivel: data.nivel,
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
      <Header /> {}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div>
                  <Button  color="primary" onClick ={() => {OpenModal(); setEditando(false); limpiar(); Cargarniveles(); console.log(estudiante)}}>Agregar estudiante</Button>
                  <Modal  onClosed={() => {setEditando(false)}} scrollable={true} isOpen={modal} toggle={OpenModal} >
                    <ModalHeader  >Agregar Estudiante</ModalHeader>
                    <ModalBody style={{ height: "75vh" }}>
                      <Form onSubmit={ editando ? ActualizarEstudiante: NuevoEstudiante}> 
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
                            value = {estudiante.cedula}
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
                            value = {estudiante.nombres}
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
                            value = {estudiante.apellidos}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarCorreo">
                            Correo electronico
                          </Label>
                          <Input
                            id="EnviarCorreo"
                            name="correo"
                            placeholder="Ingrese el correo electronico"
                            type="email"
                            onChange={NuevoDato}
                            value = {estudiante.correo}

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
                            value = {estudiante.fecha_de_nacimiento}
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
                            value = {estudiante.celular}
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
                            value = {estudiante.ciudad}
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
                            value = {estudiante.sexo}
                          >
                            <option>
                              Masculino
                            </option>
                            <option>
                              Femenino
                            </option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarUsuarioLichess">
                            Usuario Lichess
                          </Label>
                          <Input
                            id="EnviarUsuarioLichess"
                            name="usuario_lichess"
                            placeholder="Ingrese su usuario lichess"
                            type="text"
                            onChange={NuevoDato}
                            value = {estudiante.usuario_lichess}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarNombreRepresentante">
                            Nombres representante
                          </Label>
                          <Input
                            id="EnviarNombreRepresentante"
                            name="nombre_representante"
                            placeholder="Ingrese el nombre de representante"
                            type="text"
                            onChange={NuevoDato}
                            value = {estudiante.nombre_representante}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarCelularRepresentante">
                            Celular representante
                          </Label>
                          <Input
                            id="EnviarCelularRepresentante"
                            name="celular_representante"
                            placeholder="Ingrese el celular de representante"
                            type="text"
                            onChange={NuevoDato}
                            value = {estudiante.celular_representante}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="EnviarCorreoRepresentante">
                            Correo de representante
                          </Label>
                          <Input
                            id="EnviarCorreoRepresentante"
                            name="correo_representante"
                            placeholder="Ingrese el correo de representante"
                            type="email"
                            onChange={NuevoDato}
                            value = {estudiante.correo_representante}

                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="EnviarCiudad">
                            Nivel
                          </Label>
                          <Input
                            id="EnviarCiudad"
                            name="id_nivel"
                            type="select"
                            placeholder="Seleccione nivel"
                            onChange={NuevoDato}>
                              <option>Ninguno</option>
                               {nivel.listaNiveles.map(elemento=>(
                                <option key={elemento.id_nivel} value={elemento.id_nivel}>{elemento.nombre_nivel}</option>
                              ))} 
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
                    <th scope="col"> Correo electronico </th>
                    <th scope="col"> Fecha de nacimiento </th>
                    <th scope="col"> Teléfono </th>
                    <th scope="col"> Ciudad </th>
                    <th scope="col"> Sexo </th>
                    <th scope="col"> Usuario </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (

                    <tr key={task.id_estudiante}>
                      <td>{task.cedula}</td>
                      <td>{task.nombre}</td>
                      <td>{task.apellido}</td>
                      <td>{task.correo}</td>
                      <td>{task.fecha_nacimiento}</td>
                      <td>{task.telefono}</td>
                      <td>{task.ciudad}</td>
                      <td>{task.sexo}</td>
                      <td>{task.nombre_usuario}</td>
                      <td>
                        <Button color="success" type="button" onClick={() => { console.log("Click") }}>
                          Ver más
                        </Button>
                        <Button color="danger" type="button" onClick={() => { EliminarEstudiante(task.id_estudiante) }}>
                          Eliminar
                        </Button>
                        <Button color="primary" type="button" onClick={() => {CargarEstudiante(task.id_estudiante); OpenModal(); setEditando(true);}} >
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

export default ListarEstudiantes;
