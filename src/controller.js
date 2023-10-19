import { pool } from './database.js';

class libroController{

  async getAll(req, res){
      const [result] = await pool.query('SELECT * FROM libros');
      
      res.json(result);
    }
      async add(req, res){
        const libro = req.body;
        const [result] = await  pool.query ("INSERT INTO libros(nombre, autor, categoria, añoPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)", [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN]);
        res.json({"id insertado" : result.insertId});
      }


      async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query('DELETE FROM libros WHERE id=?', [libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
        
      }

      async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añoPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.ISBN, 
         libro.id]);
        res.json({"Registros actualizados": result.changedRows});

    } 

       async getOne(req, res){
        const libro = req.body;
        const id_libro = parseInt(libro.id);
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=?`, [id_libro]);//obtenemos datos de un registro a partir del id

        if (result[0] != undefined) {
          res.json(result);
        }else{
          res.json({"Error" :"No se pudo encontrar el ID del libro"});
        }

        }
  } 

 export const libro = new libroController();
