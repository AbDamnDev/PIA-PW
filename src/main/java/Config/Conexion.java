package Config;

import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.apache.commons.dbcp.BasicDataSource;
//import com.mysql.jdbc.Driver;

public class Conexion {

    //private Connection con=null;
    private String serverName = "localhost";
    private String port = "3306";
    private String databaseName = "noteddb";
    private String url = "jdbc:mysql://" + serverName + ":" + port+ "/" + databaseName;
    private String userName = "root";
    private String password = "Vc20201877$#";
    private static final BasicDataSource dataSource = new BasicDataSource();
  
//    public Conexion() {
//        try {
//            Class.forName("com.mysql.jdbc.Driver");
//            
//            con = DriverManager.getConnection(url, userName, password);
//        } catch (ClassNotFoundException | SQLException e) {
//            System.out.println("Error" + e);
//        }
//
//    }

//    public Connection getConnection() throws SQLException {
//        return con;
//    }


    // Inicializamos la conexion
    static {
        // Tipo de Driver, este es el de mysql
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        // La URL a la conexion, especificando que es de mysql
        // la ruta que es localhost puerto 3306
        // el nombre de la base de datos que es pwDB
        // lo demas son parametros para que no tengan problemas con zonas horarias
        dataSource.setUrl("jdbc:mysql://localhost:3306/noteddb?useUnicode=true&useJDBCCompliantTimeZoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC");
        // El nombre de usuario de su conexion
        dataSource.setUsername("root");
        // La contraseña del usuario de su conexion
        dataSource.setPassword("Vc20201877$#");
        // dataSource.setMaxIdle(0);
        // dataSource.setMaxActive(100);
    }

    /* *
     * Metodo para obtener la conexion
     *
     * @return Conexion a Base de datos
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    /* Metodo para cerrar la conexion
     *
     * @throws SQLException
     */
    public static void closeConnection() throws SQLException {
        dataSource.close();
    }
    
}
