/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;
import Config.Conexion;
import Model.Notas;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
/**
 *
 * @author adele
 */
public class NotasDAO {
    
    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    CallableStatement cs;
    ResultSet rs;
    Notas not = null;
    
    public List listar(int idUs)throws SQLException {
        ArrayList<Notas> list = new ArrayList();
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL Listar(?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,idUs);
            rs = cs.executeQuery();
            while (rs.next()) {
                Notas nota = new Notas(rs.getInt("idNota"),
                        rs.getString("tituloNota"),
                        rs.getString("descNota"), 
                        rs.getString("hastTags"));
                        
                        InputStream is =rs.getBinaryStream("picNote");
                        if (is!=null){
                            byte[] photoByte=new byte[is.available()];

                            is.read(photoByte);
                            nota.setFoto(photoByte);
                            
                            nota.setMimeType(rs.getString("mimetype"));

                            nota.setFotoString("data:"+nota.getMimeType()+";base64," + base64(nota.getFoto()));
                        }else{
                            nota.setFoto(null);
                            nota.setFotoString("-1");
                            nota.setMimeType("-1");
                        }
                list.add(nota);
            }
        } catch (IOException | SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
           
            cerrarConexiones();
        }

        return list;
    }
    
    public int contarListaP(int idUs){
          
        try {
            con = Conexion.getConnection();
            
            String sql = "SELECT COUNT(*) AS total FROM Nota WHERE  idUsuarioNota= ? AND eliminada=0;";
            ps = con.prepareStatement(sql);
            ps.setInt(1,idUs);
            rs = ps.executeQuery();
            while (rs.next()) {
               return rs.getInt("total");
            }
        } catch (SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
            cerrarConexiones();
        }

        return 0;
    }
    public List listarPaginacion(int idUS,int page, int numItems){
        ArrayList<Notas> list = new ArrayList();
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL listarPaginacion(?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,idUS);
            cs.setInt(2, page);
            cs.setInt(3,numItems);
            rs = cs.executeQuery();
            while (rs.next()) {
                Notas nota = new Notas(rs.getInt("idNota"),
                        rs.getString("tituloNota"),
                        rs.getString("descNota"), 
                        rs.getString("hastTags"));
                        
                        InputStream is =rs.getBinaryStream("picNote");
                        if (is!=null){
                            byte[] photoByte=new byte[is.available()];

                            is.read(photoByte);
                            nota.setFoto(photoByte);
                            
                            nota.setMimeType(rs.getString("mimetype"));

                            nota.setFotoString("data:"+nota.getMimeType()+";base64," + base64(nota.getFoto()));
                        }else{
                            nota.setFoto(null);
                            nota.setFotoString("-1");
                            nota.setMimeType("-1");
                        }
                list.add(nota);
            }
        } catch (IOException | SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
            cerrarConexiones();
        }
        return list;
    }
    
    public Notas traerNota(int idUS, int idNota){
        Notas nota = null;
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL traerNota(?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,idUS);
            cs.setInt(2,idNota);
            rs = cs.executeQuery();
            while (rs.next()) {
                nota = new Notas(rs.getInt("idNota"),
                        rs.getString("tituloNota"),
                        rs.getString("descNota"), 
                        rs.getString("hastTags"));
                        
                        InputStream is =rs.getBinaryStream("picNote");
                        if (is!=null){
                            byte[] photoByte=new byte[is.available()];

                            is.read(photoByte);
                            nota.setFoto(photoByte);
                            
                            nota.setMimeType(rs.getString("mimetype"));

                            nota.setFotoString("data:"+nota.getMimeType()+";base64," + base64(nota.getFoto()));
                        }else{
                            nota.setFoto(null);
                            nota.setFotoString("-1");
                            nota.setMimeType("-1");
                        }
                return nota;
            }
        } catch (IOException | SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
            cerrarConexiones();
        }

        return nota;
    }
    
    public int contarBusFech(int idUs,String Fecha1,String Fecha2) throws SQLException{
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL filFechaCount(?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, idUs);
            if(Fecha1.equals("-1")){
                cs.setDate(2,null);
            }else{
                cs.setDate(2,java.sql.Date.valueOf(Fecha1));
            }
            if(Fecha2.equals("-1")){
                cs.setDate(3,null);
            }else{
               cs.setDate(3,java.sql.Date.valueOf(Fecha2));
            }
            rs = cs.executeQuery();
            while (rs.next()) {
               return rs.getInt("total");
            }
        }catch(SQLException e){
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
           
        }finally{
            cerrarConexiones();
        }
         return 0;
    }
    
    public List listarBusFecha(int idUS,int page, int numItems,String fecha1, String fecha2){
        ArrayList<Notas> list = new ArrayList();
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL filtrarPorFecha(?, ?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,idUS);
            cs.setInt(2, page);
            cs.setInt(3,numItems);
            if(fecha1.equals("-1")){
                cs.setDate(4,null);
            }else{
                cs.setDate(4,java.sql.Date.valueOf(fecha1));
            }
            if(fecha2.equals("-1")){
                cs.setDate(5,null);
            }else{
               cs.setDate(5,java.sql.Date.valueOf(fecha2));
            }
            rs = cs.executeQuery();
            while (rs.next()) {
                Notas nota = new Notas(rs.getInt("idNota"),
                        rs.getString("tituloNota"),
                        rs.getString("descNota"), 
                        rs.getString("hastTags"));
                        
                        InputStream is =rs.getBinaryStream("picNote");
                        if (is!=null){
                            byte[] photoByte=new byte[is.available()];

                            is.read(photoByte);
                            nota.setFoto(photoByte);
                            
                            nota.setMimeType(rs.getString("mimetype"));

                            nota.setFotoString("data:"+nota.getMimeType()+";base64," + base64(nota.getFoto()));
                        }else{
                            nota.setFoto(null);
                            nota.setFotoString("-1");
                            nota.setMimeType("-1");
                        }
                list.add(nota);
            }
        } catch (IOException | SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
            cerrarConexiones();
        }
        return list;
    }
    
    public int contarBusTit(int idUs, String titulo){
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL fillTituloCount(?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, idUs);
            cs.setString(2, titulo);
            rs = cs.executeQuery();
            while (rs.next()) {
               return rs.getInt("total");
            }
        }catch(SQLException e){
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
           
        }finally{
            cerrarConexiones();
        }
         return 0;
    }
    
    public List listarBusTit(int idUS,int page, int numItems,String titulo){
        ArrayList<Notas> list = new ArrayList();
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL buscarContYTit(?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,idUS);
            cs.setInt(2, page);
            cs.setInt(3,numItems);
            cs.setString(4, titulo);
            rs = cs.executeQuery();
            while (rs.next()) {
                Notas nota = new Notas(rs.getInt("idNota"),
                        rs.getString("tituloNota"),
                        rs.getString("descNota"), 
                        rs.getString("hastTags"));
                        
                        InputStream is =rs.getBinaryStream("picNote");
                        if (is!=null){
                            byte[] photoByte=new byte[is.available()];

                            is.read(photoByte);
                            nota.setFoto(photoByte);
                            
                            nota.setMimeType(rs.getString("mimetype"));

                            nota.setFotoString("data:"+nota.getMimeType()+";base64," + base64(nota.getFoto()));
                        }else{
                            nota.setFoto(null);
                            nota.setFotoString("-1");
                            nota.setMimeType("-1");
                        }
                list.add(nota);
            }
        } catch (IOException | SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
            cerrarConexiones();
        }
        return list;
    }
    
    public int contarBusEtq(int idUs, String etiqueta){
           try {
            con = Conexion.getConnection();
            
            String sql = "CALL fillEtiqCount(?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, idUs);
            cs.setString(2, etiqueta);
            rs = cs.executeQuery();
            while (rs.next()) {
               return rs.getInt("total");
            }
        }catch(SQLException e){
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
           
        }finally{
            cerrarConexiones();
        }
         return 0;
    }
    
    public List listarBusEtq(int idUS,int page, int numItems,String etiqueta){
        ArrayList<Notas> list = new ArrayList();
        try {
            con = Conexion.getConnection();
            
            String sql = "CALL buscarHashtag(?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1,idUS);
            cs.setInt(2, page);
            cs.setInt(3,numItems);
            cs.setString(4, etiqueta);
            rs = cs.executeQuery();
            while (rs.next()) {
                Notas nota = new Notas(rs.getInt("idNota"),
                        rs.getString("tituloNota"),
                        rs.getString("descNota"), 
                        rs.getString("hastTags"));
                        
                        InputStream is =rs.getBinaryStream("picNote");
                        if (is!=null){
                            byte[] photoByte=new byte[is.available()];

                            is.read(photoByte);
                            nota.setFoto(photoByte);
                            
                            nota.setMimeType(rs.getString("mimetype"));

                            nota.setFotoString("data:"+nota.getMimeType()+";base64," + base64(nota.getFoto()));
                        }else{
                            nota.setFoto(null);
                            nota.setFotoString("-1");
                            nota.setMimeType("-1");
                        }
                list.add(nota);
            }
        } catch (IOException | SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
        }finally {
            cerrarConexiones();
        }
        return list;
    }
    
    public boolean modificar(Notas nota){
        try{
            con = Conexion.getConnection();
            String sql = "Call modificarNota(?, ?, ?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, nota.getIdNota());
            cs.setString(2, nota.getTituloNota());
            cs.setString(3, nota.getDescNota());
            cs.setString(4, nota.getHashTagsNota());
            //cs.setBlob(5, nota.getFotoNota());
            if(nota.getFoto()!=null){
            cs.setBlob(5, new ByteArrayInputStream(nota.getFoto()));
            cs.setString(6,nota.getMimeType());
            }else{
            Blob vacio=null;
            cs.setBlob(5, vacio);
            cs.setString(6,null);
            }
            int result = cs.executeUpdate();
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }catch(SQLException e){
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }finally{
            cerrarConexiones();
        }
    }
    public boolean eliminar(Notas nota){
        try{
            con = Conexion.getConnection();
            String sql = "Call eliminarNota(?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, nota.getIdNota());
            int result = cs.executeUpdate();
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        }catch(SQLException e){
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }finally{
            cerrarConexiones();
        }
    }
    public boolean agregar(Notas nota,int idUs)throws SQLException {
        
        try {
            con = Conexion.getConnection();
            String sql = "Call insertarNota(?, ?, ?, ?, ?, ?)";
            cs = con.prepareCall(sql);
            cs.setInt(1, idUs);
            cs.setString(2, nota.getTituloNota());
            cs.setString(3, nota.getDescNota());
            cs.setString(4, nota.getHashTagsNota());
            //cs.setBlob(5, fotoIn);
            cs.setBlob(5, new ByteArrayInputStream(nota.getFoto()));
            cs.setString(6,nota.getMimeType());
            int result = cs.executeUpdate();
            if (result > 0) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException e) {
            Logger.getLogger(NotasDAO.class.getName()).log(Level.SEVERE, null, e);
            return false;
        }finally {
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
