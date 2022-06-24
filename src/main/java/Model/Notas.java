/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;
import java.io.InputStream;
/**
 *
 * @author adele
 */
public class Notas {
    private int idNota;
    private String tituloNota;
    private String descNota;
    private String hashTagsNota;
    private byte[] foto;
    private String fotoString;
    private String mimeType;

    public String getFotoString() {
        return fotoString;
    }

    public void setFotoString(String fotoString) {
        this.fotoString = fotoString;
    }

    public Notas() {
    }

    public Notas(int idNota) {
        this.idNota = idNota;
    }

    public Notas(String tituloNota, String descNota) {
        this.tituloNota = tituloNota;
        this.descNota = descNota;
    }

    public Notas(String tituloNota, String descNota, String hashTagsNota) {
        this.tituloNota = tituloNota;
        this.descNota = descNota;
        this.hashTagsNota = hashTagsNota;
    }

    public Notas(String tituloNota, String descNota, String hashTagsNota, byte[] foto) {
        this.tituloNota = tituloNota;
        this.descNota = descNota;
        this.hashTagsNota = hashTagsNota;
        this.foto = foto;
    }

    public Notas(String tituloNota, String descNota, String hashTagsNota, byte[] foto, String mimeType) {
        this.tituloNota = tituloNota;
        this.descNota = descNota;
        this.hashTagsNota = hashTagsNota;
        this.foto = foto;
        this.mimeType = mimeType;
    }
    

    public Notas(int idNota, String tituloNota, String descNota, String hashTagsNota) {
        this.idNota = idNota;
        this.tituloNota = tituloNota;
        this.descNota = descNota;
        this.hashTagsNota = hashTagsNota;
    }

    public Notas(int idNota, String tituloNota, String descNota, String hashTagsNota, byte[] foto, String mimeType) {
        this.idNota = idNota;
        this.tituloNota = tituloNota;
        this.descNota = descNota;
        this.hashTagsNota = hashTagsNota;
        this.foto = foto;
        this.mimeType = mimeType;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    
    
    public int getIdNota() {
        return idNota;
    }

    public void setIdNota(int idNota) {
        this.idNota = idNota;
    }

    public String getTituloNota() {
        return tituloNota;
    }

    public void setTituloNota(String tituloNota) {
        this.tituloNota = tituloNota;
    }

    public String getDescNota() {
        return descNota;
    }

    public void setDescNota(String descNota) {
        this.descNota = descNota;
    }

    public String getHashTagsNota() {
        return hashTagsNota;
    }

    public void setHashTagsNota(String hashTagsNota) {
        this.hashTagsNota = hashTagsNota;
    }

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

   
    
    
    
    
}
