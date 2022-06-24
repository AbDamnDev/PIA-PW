/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import DAO.UsuarioDAO;
import Model.Usuario;
import java.util.HashMap;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.FileInputStream;
import java.util.Date;
import java.util.Base64;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import com.google.gson.Gson;
import java.io.File;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;



/**
 *
 * @author adele
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
@MultipartConfig(maxFileSize = 1024*1024*15, maxRequestSize= 1024 * 1024 * 15)// 1.5mb
public class Login extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
        //response.setContentType("application/json");
        //response.setCharacterEncoding("UTF-16");
        String accion = request.getParameter("accion");
        //String accion2 = request.getParameter("accion2");
        PrintWriter out = response.getWriter();
        if (accion.equalsIgnoreCase("login")) {
            try {
                out.print(login(request));
            } catch (SQLException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if (accion.equalsIgnoreCase("registrar")) {
            try {
                
                out.print(registrar(request));
            } catch (SQLException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if (accion.equalsIgnoreCase("close")) {
            out.print(close(request));
        } else if (accion.equalsIgnoreCase("revisar")){
            try {
                out.print(revisar(request));
            } catch (SQLException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else if (accion.equalsIgnoreCase("modCuenta")) {
             String uploadPath= getServletContext().getRealPath("/usuarioImg/");
             File fdir=new File(uploadPath);
             if(!fdir.exists()){
                 fdir.mkdir();
             }
             
            try {
                InputStream inputStream = null;
                Part filePart = request.getPart("file"); //esta tronando aqui
                if(filePart!=null){
                    inputStream = filePart.getInputStream();

                        String mimetype= filePart.getContentType();
                        int z=  (int)filePart.getSize();
                        System.out.println(z);
                        byte[] barr=new byte[z];
                        inputStream.read(barr,0,z);
                    out.print(modificarUsuario(request, barr,mimetype));
                }else{
                    out.print(modificarUsuario(request,null,null));
                }
            } catch (SQLException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
           
        }
         out.flush();
    }
    
    private String login(HttpServletRequest request) throws SQLException {
        HashMap resutado = new HashMap();
        String usuario = request.getParameter("nomUsn");
        String contrasenia = request.getParameter("passUsn");

        Usuario user = new Usuario(usuario, contrasenia);
        UsuarioDAO userDao = new UsuarioDAO();
        user = userDao.identificar(user);
        String json;
        HttpSession sesion;
        if (user != null) {
            sesion = request.getSession();
            sesion.setAttribute("usuario", user.getId_Usuario());
            resutado.put("usuario", user);
            resutado.put("Respuesta", true);
            json = new Gson().toJson(resutado);

        } else {
            resutado.put("Respuesta", false);
            json = new Gson().toJson(resutado);
        }
        return json;
    }
       
    private String revisar(HttpServletRequest request) throws IOException, SQLException {
        HttpSession sesion = request.getSession();
        HashMap resutado = new HashMap();
        String json;
        if (sesion.getAttribute("usuario") != null) {
            //    Usuario user = new Usuario();
            UsuarioDAO userDao = new UsuarioDAO();
            Usuario user = userDao.selectID(Integer.parseInt(sesion.getAttribute("usuario").toString()));
            if(user!=null){
            resutado.put("usuario", user);
            if(user.getFoto()==null){
                resutado.put("foto",-1);
            } else {
                String bs64= base64(user.getFoto());
                resutado.put("foto", bs64);
            }
            resutado.put("Respuesta", true);
            json = new Gson().toJson(resutado);
            }else{
                resutado.put("Respuesta", false);
                json = new Gson().toJson(resutado);
            }
        } else {
            resutado.put("Respuesta", false);
            json = new Gson().toJson(resutado);
        }
        return json;
    }
    private String close(HttpServletRequest request) {
        HttpSession sesion = request.getSession();
        HashMap resutado = new HashMap();
        sesion.setAttribute("usuario", null);
        sesion.invalidate();
        resutado.put("Respuesta", true);
        String json = new Gson().toJson(resutado);
        return json;
    }
    private String registrar(HttpServletRequest request) throws SQLException {

        String json;
        HashMap resutado = new HashMap();
        HttpSession sesion;

        UsuarioDAO userDao = new UsuarioDAO();

        String usuario = request.getParameter("nomUsR");
        String contrasenia = request.getParameter("newPass");
        String apellidos = request.getParameter("apellidosN");
        String nombre= request.getParameter("nombreN");
        String correo= request.getParameter("correoCrearN");
        String fechaPrueba= request.getParameter("fechNacN");
       
        

        Usuario user = new Usuario(nombre,apellidos,contrasenia,usuario,correo,fechaPrueba);
        String respuesta = userDao.agregar(user);
        if (respuesta.equalsIgnoreCase("true")) {
            
            user = userDao.identificar(user);
            if(user!=null){
                sesion = request.getSession();
                sesion.setAttribute("usuario", user.getId_Usuario());
                resutado.put("usuario",user);
                resutado.put("Respuesta", true);
                json = new Gson().toJson(resutado);
            }else{
                resutado.put("Respuesta", false); 
                json = new Gson().toJson(resutado);
            }
        } else {
            resutado.put("Error", respuesta);
            resutado.put("Respuesta", false);
            json = new Gson().toJson(resutado);
        }

        return json;
    }
    private String modificarUsuario(HttpServletRequest request,byte[] foto, String mimeType) throws SQLException{
        String json;
        HashMap resutado = new HashMap();
        HttpSession sesion= request.getSession();

        UsuarioDAO userDao = new UsuarioDAO();
        String nombre=request.getParameter("nombreCuenta");
        String apellidos=request.getParameter("apellidosCuenta");
        String correo = request.getParameter("correoCuenta");
        String fecha = request.getParameter("fechNacCuenta");
        String usuario = request.getParameter("nomUsCuenta");
        String contrasenia = request.getParameter("nPCuenta1");
         Usuario user=null;
        
        if(mimeType.equalsIgnoreCase("application/octet-stream")){
            mimeType=null;
            foto=null;
             user = new Usuario(Integer.parseInt(sesion.getAttribute("usuario").toString()), 
                                    nombre,apellidos, contrasenia,usuario,correo,fecha, foto,null);
        }else{
            user = new Usuario(Integer.parseInt(sesion.getAttribute("usuario").toString()), 
                                    nombre,apellidos, contrasenia,usuario,correo,fecha, foto,mimeType);
        }

        
        String respuesta = userDao.modificar(user);
        
        if (respuesta.equalsIgnoreCase("true")) {
            sesion.setAttribute("usuario", user.getId_Usuario());
            resutado.put("Respuesta", true);
            json = new Gson().toJson(resutado);

        } else {
            resutado.put("Error", respuesta);
            resutado.put("Respuesta", false);
            json = new Gson().toJson(resutado);
        }

        return json;
    }
    public static byte[] toByteArray(InputStream in) throws IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();

        byte[] buffer = new byte[1024];
        int len;

        // read bytes from the input stream and store them in the buffer
        while ((len = in.read(buffer)) != -1) {
            // write bytes from the buffer into the output stream
            os.write(buffer, 0, len);
        }

        return os.toByteArray();
    }
    
    private String base64(byte[] bytes) throws IOException {
        
        String imageStr = Base64.getEncoder().encodeToString(bytes);
        return imageStr;
    }
    
    private String extractExtension(Part part){
        String contentDisp=part.getHeader("content-disposition");
        String[]items=contentDisp.split(";");
        return "";
    }

}
