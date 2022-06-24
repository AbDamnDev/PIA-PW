/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import Config.Conexion;
import Model.Usuario;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author adele
 */
public class UsuarioDAO {
    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    CallableStatement cs;
    ResultSet rs;
    Usuario usu = null;
    
    public  Usuario identificar(Usuario user) throws SQLException {
        //String sql="select * from Usuario where usuario="+user.getUsuario() + " AND passU="+user.getClave()+ "AND inactivoU=0;";
     
        try {
            con = Conexion.getConnection();
            String sql = "call Login(?,?)";
            cs = con.prepareCall(sql);
            cs.setString(1, user.getUsuario());
            cs.setString(2, user.getClave());
            rs = cs.executeQuery();
            if (rs.next() == true) {
                usu = new Usuario();
                usu.setId_Usuario(rs.getInt("idUsuario"));
                usu.setUsuario(usu.getUsuario());
                usu.setClave(usu.getClave());
                usu.setCorreoUsuario(rs.getString("correo"));
                usu.setNameUsuario(rs.getString("nameU"));
                usu.setLastNameUsuario(rs.getString("lastNameU"));
                
            }
        } catch (Exception e) {
            Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, e);
        } finally {
            //Conexion.closeConnection();
            cerrarConexiones();
        }
        return usu;
    }
    public Usuario selectID(int id) throws SQLException, IOException {
        Usuario user=null;
        try {
            con = Conexion.getConnection();
            String sql = "call selectID(?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,id);
            rs = cs.executeQuery();
            if (rs.next() == true) {
                user = new Usuario();
                user.setId_Usuario(id);
                user.setUsuario(rs.getString("usuario"));
                user.setClave(rs.getString("passU"));
                user.setCorreoUsuario(rs.getString("correo"));
                user.setNameUsuario(rs.getString("nameU"));
                user.setLastNameUsuario(rs.getString("lastNameU"));
                user.setCumpleUsuarioS(rs.getString("fechaNac"));
                //java.sql.Date fechaprueba=rs.getDate("fechaNac"); //Revisar que no truene
                //java.util.Date fechaConvertida = new java.util.Date(fechaprueba.getTime());
                //user.setCumpleUsuario(fechaConvertida);
                user.setCumpleUsuario(rs.getDate("fechaNac"));
                InputStream is =rs.getBinaryStream("profilePic");
                if (is!=null){
                    byte[] photoByte=new byte[is.available()];

                    is.read(photoByte);
                    user.setFoto(photoByte);
                    
                    user.setMimetype(rs.getString("mimetype"));

                    user.setFotoString("data:"+user.getMimetype()+";base64," + base64(user.getFoto()));
                }else{
                    user.setFoto(null);
                    user.setFotoString("-1");
                    user.setMimetype("-1");
                }
            }
        } catch (IOException | SQLException e) {
           Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, e);
           user.setFoto(null);
        } finally {
           // Conexion.closeConnection();
            cerrarConexiones();
        }

        return user;
    }
    public String agregar(Usuario user) throws SQLException {
        
        try {
            con = Conexion.getConnection();
            String sql = "call Register(?, ?, ?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setString(1, user.getUsuario());
            cs.setString(2, user.getClave());
            cs.setString(3, user.getCorreoUsuario());
            cs.setString(4, user.getNameUsuario());
            cs.setString(5, user.getLastNameUsuario());
            cs.setDate(6,java.sql.Date.valueOf(user.getCumpleUsuarioS()));
            //cs.setBlob(7, new ByteArrayInputStream(null));
            
           int result =  cs.executeUpdate();
           if(result > 0){
                        return "true";
           }else{
                        return "false";
           }
        } catch (SQLException e) {
             Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, e);
             return "false";
        }finally{
            //Conexion.closeConnection();
            cerrarConexiones();
        }

    }
    public String modificar(Usuario user){
        try {
            con = Conexion.getConnection();
            String sql = "call modificarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, user.getId_Usuario());
            cs.setString(2, user.getUsuario());
            cs.setString(3, user.getClave());
            cs.setString(4, user.getCorreoUsuario());
            cs.setString(5, user.getNameUsuario());
            cs.setString(6, user.getLastNameUsuario());
            cs.setDate(7,java.sql.Date.valueOf(user.getCumpleUsuarioS()));
            if(user.getFoto()!=null){
            cs.setBlob(8, new ByteArrayInputStream(user.getFoto()));
            cs.setString(9,user.getMimetype());
            }else{
            Blob vacio=null;
            cs.setBlob(8, vacio);
            cs.setString(9,null);
            }
            
            //cs.setBlob(8, new ByteArrayInputStream(user.getFoto()));
           int result =  cs.executeUpdate();
           if(result > 0){
                        return "true";
           }else{
                        return "false";
           }
        } catch (SQLException e) {
             Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, e);
             return "false";
        }finally{
            //Conexion.closeConnection();
            cerrarConexiones();
        }
    }    
    public void cerrarConexiones() {
        try {
            //result
            if (rs != null && rs.isClosed() == false) {
                rs.close();
            }
            rs = null;
            //callable statement
            if (cs != null && cs.isClosed() == false) {
                cs.close();

            }
            cs = null;
            // prepared statement
            if (ps != null && ps.isClosed() == false) {
                ps.close();
            }

            ps = null;
            //connection
            if (con != null & con.isClosed() == false) {
                con.close();

            }
        } catch (SQLException ex) {
            Logger.getLogger(UsuarioDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        cn = null;
    }
    
    private String base64(byte[] bytes) throws IOException {
        
        String imageStr = Base64.getEncoder().encodeToString(bytes);
        return imageStr;
    }
}
