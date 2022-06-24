/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;
import java.io.InputStream;
import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;



/**
 *
 * @author adele
 */
public class Usuario {
    private int id_Usuario;
    private String nameUsuario;
    private String lastNameUsuario;
    private String clave;
    private String usuario;
    private String correoUsuario;
    private Date cumpleUsuario;
    private String cumpleUsuarioS;
    private int edadUsuario;
    private byte[] foto;
    private String mimetype;
    private String fotoString;
    

    public Usuario(){
        
    }
    // ESTA SE USA PARA INICIALIZAR EL LOGIN DE USUARIOS
    public Usuario(String usuario,String clave) { 
        this.clave = clave;
        this.usuario = usuario;
    }
    //ESTA SE USA PARA INICIALIZAR EL REGISTRO DE USUARIOS
    public Usuario(String nameUsuario, String lastNameUsuario, String clave, String usuario, String correoUsuario, String _cumpleUsuario) {
        this.nameUsuario = nameUsuario;
        this.lastNameUsuario = lastNameUsuario;
        this.clave = clave;
        this.usuario = usuario;
        this.correoUsuario = correoUsuario;
        this.cumpleUsuarioS=_cumpleUsuario;
        Date fechaTemp=obtainFechaUsuario(_cumpleUsuario);
        if (fechaTemp!=null){
            this.cumpleUsuario=fechaTemp;
        }
    }
    //ESTA ES PARA MODIFICAR USUARIO, Y YA TIENE SU IMAGEN PREPARADA
    public Usuario(int id_Usuario, String nameUsuario, String lastNameUsuario, String clave, String usuario, String correoUsuario, String cumpleUsuarioS,byte[]foto, String mimetype) {
        this.id_Usuario = id_Usuario;
        this.nameUsuario = nameUsuario;
        this.lastNameUsuario = lastNameUsuario;
        this.clave = clave;
        this.usuario = usuario;
        this.foto=foto;
        this.correoUsuario = correoUsuario;
        this.cumpleUsuarioS = cumpleUsuarioS;
        Date fechaTemp=obtainFechaUsuario(cumpleUsuarioS);
        if (fechaTemp!=null){
            this.cumpleUsuario=fechaTemp;
        }
        this.mimetype=mimetype;
    }

    public String getMimetype() {
        return mimetype;
    }

    public void setMimetype(String mimetype) {
        this.mimetype = mimetype;
    }

    public String getFotoString() {
        return fotoString;
    }

    public void setFotoString(String fotoString) {
        this.fotoString = fotoString;
    }
    

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }
    

    public int getId_Usuario() {
        return id_Usuario;
    }

    public String getCumpleUsuarioS() {
        return cumpleUsuarioS;
    }

    public String getNameUsuario() {
        return nameUsuario;
    }

    public String getLastNameUsuario() {
        return lastNameUsuario;
    }

    public String getClave() {
        return clave;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public Date getCumpleUsuario() {
        return cumpleUsuario;
    }

    public Date obtainFechaUsuario(String fecha){
        Date result;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            result=(Date)df.parse(fecha);
            return result;
        } catch (ParseException ex) {
            Logger.getLogger(Usuario.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        } 
    }
    public int getEdadUsuario() {
        return edadUsuario;
    }

   

    public void setId_Usuario(int id_Usuario) {
        this.id_Usuario = id_Usuario;
    }

    public void setCumpleUsuarioS(String cumpleUsuarioS) {
        this.cumpleUsuarioS = cumpleUsuarioS;
    }

    public void setNameUsuario(String nameUsuario) {
        this.nameUsuario = nameUsuario;
    }

    public void setLastNameUsuario(String lastNameUsuario) {
        this.lastNameUsuario = lastNameUsuario;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public void setCumpleUsuario(Date cumpleUsuario) {
        this.cumpleUsuario = cumpleUsuario;
        Date today=new Date();
        long time_difference =  today.getTime()-this.cumpleUsuario.getTime();
        long years_difference = (time_difference / (1000l*60*60*24*365));   
        int years=(int)years_difference;
        setEdadUsuario(years);
        
    }

  

    public void setEdadUsuario(int edadUsuario) {
        this.edadUsuario = edadUsuario;
    }


}
    
