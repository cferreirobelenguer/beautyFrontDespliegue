import React,{Component} from "react";
import styles from '../assets/css/estilos.module.css';
import axios from 'axios';
import fotoPortada from '../assets/images/veCita.png';
import { Link } from 'react-router-dom';
var nombre;
var apellidos;

class VeCita extends Component{
    //Creamos referencias vinculadas a los datos que recogemos del formulario
    //Identifica cada uno de los campos del formulario
    
    nombreVeCita=React.createRef();
    apellidosVeCita=React.createRef();
    
    
    recibirVeCita=(e)=>{
        //  No se recarga la página
        e.preventDefault();
        
        //Se crea un objeto user y se le atribuyen los valores de los input
        //current.value se usa para coger los valores
    
        nombre=this.nombreVeCita.current.value;
        apellidos=this.apellidosVeCita.current.value

        
    }
    //Definimos el state que va a ser el objeto que almacene los datos de la petición ajax
    state ={
        //Defino el objeto al iniciar con un valor para que no me muestra al cargar el mensaje de que no se encuentran datos
        resultadosVeCita:[],
        status:null,
        
    }
    //En getClientes se realiza la petición ajax para mostrar las reservas del cliente
    getClientes=()=>{
        
        axios.get('https://beautyaplication.herokuapp.com/api/ver/'+nombre+'&'+apellidos)
        //Se realiza la promesa
        .then(res=>{
            //Se introducen los datos de la petición dentro del objeto resultado
            this.setState({
                resultadosVeCita:res.data.resultados2,
                //Estado sucess para indicar que la petición se ha realizado correctamente
                status:"sucess"
                
            })
            //Console log que muestra el objeto resultado con los datos de la petición
            console.log(this.state);
            
            
        })
        
    }

    render(){
        
        return(
            <div>
                <center>
                    <img src={fotoPortada} width="1500" height="1000" className="img-fluid"></img>
                </center>
                
                <div className="d-flex flex-column bd-highlight mb-3" id={styles.pideCitaFondo}>
                
                <div className="d-flex justify-content-center" id={styles.rotuloVeCita}>
                    <h1>Aquí puedes ver tus reservas</h1>
                </div>
                <div className="d-flex justify-content-center">
                        <form className="mid-form" onSubmit={this.recibirVeCita} onChange={this.recibirVeCita}>
                            <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="" class="col-form-label">Nombre&nbsp;&nbsp;&nbsp;</label>
                                <input type="text" class="form-control" ref={this.nombreVeCita} name='nombreVeCita' required="required"/>
                            </div>
                            <div className="d-flex  justify-content-center"><br></br></div>
                            <div className="col-auto">
                                <label htmlFor="" class="col-form-label">Apellidos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="text" class="form-control" ref={this.apellidosVeCita} name='apellidosVeCita' required="required"/>
                            </div>
                            <div className="d-flex  justify-content-center"><br></br></div>
                            <div className="d-flex  justify-content-center"><br></br></div>
                        </div>  
                            <input type="submit" className="btn text-decoration-none btn" value="Enviar" id={styles.botonTratamientos} onClick={this.getClientes}/>&nbsp;&nbsp;&nbsp;
                            <div className="d-flex justify-content-center"><br></br></div>
                            <input type="reset" className="btn text-decoration-none btn" value="Limpiar" id={styles.botonTratamientos}/>
                            <div className="d-flex justify-content-center"><br></br></div>
                            <div className="d-flex justify-content-center"><br></br></div>
                        </form>
                    </div>
                </div>
                <div className="d-flex flex-column bd-highlight mb-3" id={styles.contenidoBusqueda}>
                {  
                    /*En caso de que el objeto de la petición sea mayor o igual 1 de longitud se muestran datos*/
                    this.state.resultadosVeCita.length>=1? this.state.resultadosVeCita.map((citas)=>{
                        /*Se muestran los datos de la petición*/
                        return(
                            
                            <div className="d-flex flex-column bd-highlight mb-3" id={styles.contenidoCitas}>
                                <h4>Tu número de reserva es: {citas._id}</h4>
                                <h4>El id vas a necesitarlo para modificar o eliminar citas</h4>
                                <h4>Estos son los datos de tu cita: </h4>
                                <h4>Nombre: {citas.nombre}</h4>
                                <h4>Apellidos: {citas.apellidos}</h4>
                                <h4>Tratamiento: {citas.tratamiento}</h4>
                                <h4>Fecha: {citas.fecha}</h4>
                                <h4>Hora: {citas.hora}</h4>&nbsp;&nbsp;
                                
                            </div>
                            
                        );
                        
                        }) :"" }

                    {/*Con esto le digo que si el status es null pero el objeto resultadosVeCita es igual a 0 que no me muestra nada porque es la vista principal
                    y si no es null significa que hay una respuesta a la API con lo cual es success y si resultadosVeCita es igual a 0 que me muestre que no se han 
                    encontrado resultados*/
                    (() => {
                        if (this.state.status==null)
                            return ""
                        else 
                            if(this.state.resultadosVeCita==0)
                            return <h4>No se han encontrado resultados</h4>
                    })()
                }
            
                
                    <section className={styles.menuOpciones}>
                        <button className="text-decoration-none btn" id={styles.botonTratamientos}><Link to="/menuCita" className="text-decoration-none text-light" >Menú de citas</Link></button>
                        <div className="d-flex justify-content-center"><br></br></div>
                        <div className="d-flex justify-content-center"><br></br></div>
                    </section>
                
                </div>
            </div>
        );
    }
}
export default VeCita;