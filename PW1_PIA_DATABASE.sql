CREATE DATABASE NotedDB;
USE NotedDB;

CREATE TABLE Usuario(
	idUsuario int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario varchar(30) UNIQUE NOT NULL,
    passU varchar(30) NOT NULL,
    correo varchar(50)  UNIQUE NOT NULL,
    nameU varchar(40) NOT NULL,
    lastnameU varchar(40) NOT NULL,
    fechaNac date NOT NULL,
    profilePic blob,
    fechaCreacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fechaMod timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    inactivoU bit
);

DROP TABLE Usuario;

CREATE TABLE Nota(
	idUsuarioNota int,
	idNota int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tituloNota varchar(50) NOT NULL,
    descNota varchar(256) NOT NULL,
    hastTags varchar(50),
    picNote blob,
    fechaAlta timestamp DEFAULT CURRENT_TIMESTAMP,
    fechaModN timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    eliminada bit,
    CONSTRAINT FK_USUARIO FOREIGN KEY(idUsuarioNota) REFERENCES Usuario(idUsuario)
);

SELECT *
FROM usuario;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarNota`(IN _idnota INT)
BEGIN
UPDATE Nota
SET
eliminada=1
WHERE idNota=_idnota;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarNota`(IN _idUs INT, IN _tituloNota varchar(50), IN _descNota varchar(256), IN _hastTags varchar(50), IN _picNote blob)
BEGIN
DECLARE Activo BIT;
SET Activo=0;
IF _hastTags IS NULL AND _picNote  IS NULL THEN
INSERT INTO Nota(idUsuarioNota,tituloNota,descNota,eliminada)
VALUES(_idUs,_tituloNota,_descNota,Activo);
ELSEIF _picNote  IS NULL THEN
INSERT INTO Nota(idUsuarioNota,tituloNota,descNota,hastTags,eliminada)
VALUES(_idUs,_tituloNota,_descNota,_hastTags,Activo);
ELSE
INSERT INTO Nota(idUsuarioNota,tituloNota,descNota,hastTags,picNote,eliminada)
VALUES(_idUs,_tituloNota,_descNota,_hastTags,_picNote,Activo);
END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar`(IN _usId INT)
BEGIN
SELECT 
idNota, tituloNota, descNota, hastTags, picNote
FROM Nota
WHERE  idUsuarioNota=_usId AND eliminada=0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Login`(IN _usuario VARCHAR(30), IN _contra VARCHAR(30))
BEGIN
SELECT 
idUsuario, usuario, passU, correo, nameU, lastnameU, fechaNac, profilePic
FROM usuario
WHERE usuario = _usuario AND passU = _contra AND inactivoU=0;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificarNota`(IN _idnota INT, IN _tituloNota varchar(50), IN _descNota varchar(256), IN _hastTags varchar(50), IN _picNote blob)
BEGIN

IF _hastTags IS NULL AND _picNote  IS NULL THEN
UPDATE Nota
SET
tituloNota=_tituloNota,
descNota=_descNota
WHERE idNota= _idnota;

ELSEIF _picNote  IS NULL THEN
UPDATE Nota
SET
tituloNota=_tituloNota,
descNota=_descNota,
hastTags=_hastTags
WHERE idNota= _idnota;
ELSE 
UPDATE Nota
SET
tituloNota=_tituloNota,
descNota=_descNota,
hastTags=_hastTags,
picNote=_picNote
WHERE idNota= _idnota;
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Register`(IN _usuario varchar(30),IN _contrasena varchar(30),IN _correo VARCHAR(50),IN _nombre varchar(40),IN _apell varchar(40),IN _cumple date, IN _foto blob)
BEGIN
DECLARE inActivo BIT;
SET inActivo=0;
IF _foto IS NULL THEN
INSERT INTO Usuario(usuario, passU, correo, nameU, lastnameU, fechaNac,inactivoU)
VALUES(_usuario,_contrasena,_correo, _nombre,_apell,_cumple, inActivo);
ELSE
INSERT INTO Usuario(usuario, passU, correo, nameU, lastnameU, fechaNac, profilePic, inactivoU)
VALUES(_usuario,_contrasena,_correo, _nombre,_apell,_cumple,_foto, inActivo);
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `selectID`(IN _idUsuario INT)
BEGIN
SELECT
idUsuario, usuario, passU, correo, nameU, lastnameU, fechaNac, profilePic
FROM usuario
WHERE idUsuario=_idUsuario AND inactivoU=0;
END$$
DELIMITER ;












