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
function alumnosSeleccionados(alumno) {
    var i = alumno.indexOf(alumno);
    if (i !== -1) {
        alumno.splice(i, 1);
    } else { alumno.push(alumno); }
    console.log(alumno)
 
}




const ModalAlumnos = (props) => {
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Alumnos</h3>
                            </CardHeader>
                            <Modal>
                                <ModalHeader>
                                    Seleccionar Alumnos
                                </ModalHeader>
                                <ModalBody>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col"> Seleccione</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Cedula</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                               {/*  {tasks.map((task) => (
                                    <tr key={task.id_estudiante}> */}
                                        <td>
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input
                                                    className="custom-control-input"
                                                    id="customCheck1"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customCheck1"
                                                />
                                            </div>
                                        </td>
                                       {/*  <td>{task.nombre}</td>
                                        <td>{task.apellido}</td>
                                        <td>{task.cedula}</td> */}
                                      
                                        <td>
                                            <div className="btn-group btn-group-sm" role="group" aria-label="Table row actions">
                                                <Button
                                                    className="btn-icon btn-neutral"
                                                    color="info"
                                                    href="#"
                                                    id="tooltip639058792"
                                                    size="sm"
                                                    title="Ver"
                                                >
                                                    <i className="fas fa-eye" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                               {/*  ))} */}
                                </tbody>
                            </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={console.log("hola")}>
                                        Guardar
                                    </Button>{" "}
                                    <Button color="secondary" onClick={console.log("hola")}>
                                        Cancelar
                                    </Button>
                                </ModalFooter>
                            </Modal>            
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );

                                                 
                        
                                          
}
export default ModalAlumnos;