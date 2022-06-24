/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import DAO.NotasDAO;
import Model.Notas;
import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.apache.commons.io.IOUtils;


/**
 *
 * @author adele
 */
@WebServlet(name = "Notas", urlPatterns = {"/Notas"})
@MultipartConfig(maxFileSize = 1024*1024*15, maxRequestSize= 1024 * 1024 * 15)// 15mb
public class Nota extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        InputStream inputStream =null;
        String accion = request.getParameter("accion");
      
        PrintWriter out = response.getWriter();
        if (accion.equalsIgnoreCase("registrar")) {
            
            inputStream = null;
            Part filePart = request.getPart("file");
            
            if (filePart!=null){
                String mimetype= filePart.getContentType();
                try {
                
                    inputStream= filePart.getInputStream();
                  
                    byte[] barr = IOUtils.toByteArray(inputStream);
                    out.print(InsertarNota(request,barr,mimetype));
                } catch (SQLException ex) {
                    Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
                }
            }else{
                try {
                    out.print(InsertarNota(request,null,null));
                } catch (SQLException ex) {
                    Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }else if (accion.equalsIgnoreCase("listar")) {
           try {
               out.print(ListaNotas(request));
           } catch (SQLException ex) {
               Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
           }
        }else if(accion.equalsIgnoreCase("eliminar")){
            String idMiNota=request.getParameter("indiceNota");
            out.print(EliminarNotas(request,idMiNota));
        }else if(accion.equalsIgnoreCase("modificar")){
                inputStream = null;
                Part filePart = request.getPart("file");
                
                
                if (filePart!=null){
                    String mimetype= filePart.getContentType();
                    
                    try {
                
                    inputStream= filePart.getInputStream();
                  
                    byte[] barr = IOUtils.toByteArray(inputStream);
                    out.print(ModificarNotas(request,barr,mimetype));
                    } catch (IOException ex) {
                        Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }else{
                    out.print(ModificarNotas(request,null,null));
                }
            
        }else if(accion.equalsIgnoreCase("listarP")){
            out.print(ListaNotasCountP(request));
        }else if(accion.equalsIgnoreCase("listarPSimple")){
            try {
                String indice = request.getParameter("indice");
                String cantidad = request.getParameter("cantidad");
                out.print(ListaNotasPaginacion(request,Integer.parseInt(indice),Integer.parseInt(cantidad)));
            } catch (SQLException ex) {
                Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if(accion.equalsIgnoreCase("traerNota")){
            String idMiNota=request.getParameter("indiceNota");
            out.print(TraerNota(request,Integer.parseInt(idMiNota)));
        }else if(accion.equalsIgnoreCase("busFechaCant")){
            try {
                out.print(BusFechaCount(request));
            } catch (SQLException ex) {
                Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if(accion.equalsIgnoreCase("listarBFecha")){
            String indice = request.getParameter("indice");
            String cantidad = request.getParameter("cantidad");
            String fecha1=request.getParameter("fecha1");
            String fecha2=request.getParameter("fecha2");
            out.print(BusFechaList(request,Integer.parseInt(indice),Integer.parseInt(cantidad),fecha1,fecha2));
        }else if(accion.equalsIgnoreCase("buscarTituloC")){
            try {
                out.print(BusTitCount(request));
            } catch (SQLException ex) {
                Logger.getLogger(Nota.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if(accion.equalsIgnoreCase("listarBTit")){
            String indice = request.getParameter("indice");
            String cantidad = request.getParameter("cantidad");
            String titulo=request.getParameter("titulo");
            out.print(BusTitList(request,Integer.parseInt(indice),Integer.parseInt(cantidad),titulo));
        }else if(accion.equalsIgnoreCase("buscarEtiquetaC")){
            out.print(BusEtqCount(request));
        }else if(accion.equalsIgnoreCase("listarBEtiq")){
            String indice = request.getParameter("indice");
            String cantidad = request.getParameter("cantidad");
            String etiqueta=request.getParameter("etiqueta");
            out.print(BusEtqList(request,Integer.parseInt(indice),Integer.parseInt(cantidad),etiqueta));
        }else{
            out.print("No se encontro una accion para lo que quiere ejecutar");
        }
        out.flush();
    }
    
    
    
    private String InsertarNota(HttpServletRequest request,byte[] foto, String mimeType) throws ServletException, IOException, SQLException{
          
      
        HashMap resultado = new HashMap();
        HttpSession sesion;
        sesion=request.getSession();
        String json;
       
        String titulo = request.getParameter("tituloNotaN");
        String descripcion = request.getParameter("descNotaN");
        String hashtags = request.getParameter("hashNotaN");
        
        Notas nota = new Notas(titulo,descripcion,hashtags,foto,mimeType);
        
        NotasDAO notasDAO = new NotasDAO();
        
        if(sesion.getAttribute("usuario")!=null){
        Boolean respuesta=notasDAO.agregar(nota, Integer.parseInt(sesion.getAttribute("usuario").toString()));
        resultado.put("Respuesta",respuesta);
        }
        json = new Gson().toJson(resultado);
        return json;
    }

    private String ListaNotas(HttpServletRequest request) throws SQLException{
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        ArrayList<Notas> notes=null;
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        if(sesion.getAttribute("usuario")!=null){
            notes=(ArrayList<Notas>) notasDao.listar(Integer.parseInt(sesion.getAttribute("usuario").toString()));
        if(notes!=null){
            resultado.put("notas", notes);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
    return json;
    }
    
    private String TraerNota(HttpServletRequest request,int idNota){
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        Notas miNota=null;
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        if(sesion.getAttribute("usuario")!=null){
            miNota=notasDao.traerNota(Integer.parseInt(sesion.getAttribute("usuario").toString()), idNota);
            if(miNota!=null){
                resultado.put("nota", miNota);
                resultado.put("Respuesta",true);
                json = new Gson().toJson(resultado);
            }else{
                resultado.put("Respuesta",false);
                json = new Gson().toJson(resultado); 
            }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        
         return json;
    }
    
    private String ModificarNotas(HttpServletRequest request,byte[] foto, String mimeType){
        String json;
        HashMap resutado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        String id = request.getParameter("idNota");
        String titulo = request.getParameter("tituloNotaN");
        String descripcion = request.getParameter("descNotaN");
        String hashtags = request.getParameter("hashNotaN");
        if(mimeType.equalsIgnoreCase("application/octet-stream")){
            mimeType=null;
            foto=null;
            Notas nota = new Notas(Integer.parseInt(id),titulo,descripcion,hashtags,null,null);
            resutado.put("Respuesta", notasDao.modificar(nota));
            json = new Gson().toJson(resutado);
        }else{
        
        Notas nota = new Notas(Integer.parseInt(id),titulo,descripcion,hashtags,foto,mimeType);
        resutado.put("Respuesta", notasDao.modificar(nota));
        json = new Gson().toJson(resutado);
        }
        return json;
    }
    
    private String EliminarNotas(HttpServletRequest request, String idMiNota){
        
        HashMap resutado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        
        
        Notas nota = new Notas(Integer.parseInt(idMiNota));
        resutado.put("Respuesta", notasDao.eliminar(nota));
        String json = new Gson().toJson(resutado);
        return json;
    }
    
    private String ListaNotasCountP(HttpServletRequest request){
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        if(sesion.getAttribute("usuario")!=null){
           int items=notasDao.contarListaP(Integer.parseInt(sesion.getAttribute("usuario").toString()));
           if (items>0){
            resultado.put("items",items);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
           }else{
               
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
           }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        
        return json;
    }
    
    private String ListaNotasPaginacion(HttpServletRequest request,int indice,int cantidad) throws SQLException{
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        ArrayList<Notas> notes=null;
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        if(sesion.getAttribute("usuario")!=null){
            notes=(ArrayList<Notas>) notasDao.listarPaginacion(Integer.parseInt(sesion.getAttribute("usuario").toString()),indice,cantidad);
        if(notes!=null){
            resultado.put("notas", notes);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
    return json;
        
    }
    
    private String BusFechaCount(HttpServletRequest request) throws SQLException{
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        String fecha1 = request.getParameter("despuesDe");
        String fecha2 = request.getParameter("antesDe");
        //verificar cual esta vacio para q no haya errores
        if(fecha1.length()==0){
            fecha1="-1";
        }else if(fecha2.length()==0){
            fecha2="-1";
        }
        
        if(sesion.getAttribute("usuario")!=null){
           int items=notasDao.contarBusFech(Integer.parseInt(sesion.getAttribute("usuario").toString()),fecha1,fecha2);
           if (items>0){
            resultado.put("items",items);
            resultado.put("fecha1",fecha1);
            resultado.put("fecha2",fecha2);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
           }else{
               
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
           }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        
        return json;
    }
    
    private String BusFechaList(HttpServletRequest request,int indice,int cantidad, String fecha1, String fecha2){
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        ArrayList<Notas> notes=null;
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        
        if(sesion.getAttribute("usuario")!=null){
            notes=(ArrayList<Notas>) notasDao.listarBusFecha(Integer.parseInt(sesion.getAttribute("usuario").toString()),indice,cantidad,fecha1,fecha2);
        if(notes!=null){
            resultado.put("notas", notes);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
    return json;
        
    }
   
    private String BusTitCount(HttpServletRequest request) throws SQLException{
        
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        String titulo=request.getParameter("busqueda");
       
        
        if(sesion.getAttribute("usuario")!=null){
           int items=notasDao.contarBusTit(Integer.parseInt(sesion.getAttribute("usuario").toString()),titulo);
           if (items>0){
            resultado.put("items",items);
            resultado.put("variable",titulo);
            resultado.put("bus","tit");
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
           }else{
               
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
           }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        
        return json;
        
    }
    
    private String BusTitList(HttpServletRequest request,int indice,int cantidad, String buscTit){
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        ArrayList<Notas> notes=null;
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        
        if(sesion.getAttribute("usuario")!=null){
            notes=(ArrayList<Notas>) notasDao.listarBusTit(Integer.parseInt(sesion.getAttribute("usuario").toString()),indice,cantidad,buscTit);
        if(notes!=null){
            resultado.put("notas", notes);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
    return json;
        
    }
    
    private String BusEtqCount(HttpServletRequest request){
         HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        String etiqueta=request.getParameter("busqueda");
       
        
        if(sesion.getAttribute("usuario")!=null){
           int items=notasDao.contarBusEtq(Integer.parseInt(sesion.getAttribute("usuario").toString()),etiqueta);
           if (items>0){
            resultado.put("items",items);
            resultado.put("variable",etiqueta);
            resultado.put("bus","etiqueta");
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
           }else{
               
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
           }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        
        return json;
    }
    
    private String BusEtqList(HttpServletRequest request,int indice,int cantidad, String buscEtiq){
        HashMap resultado = new HashMap();
        NotasDAO notasDao = new NotasDAO();
        ArrayList<Notas> notes=null;
        HttpSession sesion;
        sesion=request.getSession();
        String json;
        
        if(sesion.getAttribute("usuario")!=null){
            notes=(ArrayList<Notas>) notasDao.listarBusEtq(Integer.parseInt(sesion.getAttribute("usuario").toString()),indice,cantidad,buscEtiq);
        if(notes!=null){
            resultado.put("notas", notes);
            resultado.put("Respuesta",true);
            json = new Gson().toJson(resultado);
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
        }else{
            resultado.put("Respuesta",false);
            json = new Gson().toJson(resultado);
        }
    return json;
    }
   
}
