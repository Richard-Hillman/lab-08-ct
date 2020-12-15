const pool = require('../utils/pool');

module.exports = class CyberTruck{
    id;
    title;
    descript;
    color;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.descript = row.descript;
      this.color = row.color;
    }

    // -----------------------------------------

    static async insert({ title, descript, color }) {
      const { rows } = await pool.query(
        'INSERT INTO cyber_trucks (title, descript, color) VALUES ($1, $2, $3) RETURNING *',
        [title, descript, color]
      );
  
      return new CyberTruck(rows[0]);
    }
  
    // ------------------------------------------
  
    static async find() {
      const { rows } = await pool.query('SELECT * FROM cyber_trucks');
  
      return rows.map(row => new CyberTruck(row));
    }
  
    // -------------------------------------------
  
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cyber_trucks WHERE id=$1',
        [id]
      );
  
      if(!rows[0]) throw new Error(`No model with ${id}`);
      return new CyberTruck(rows[0]);
    }
  
    // --------------------------------------------
  
    static async update(id, { title, descript, color }) {
      const { rows } = await pool.query(
        `UPDATE cyber_trucks
         SET title=$1,
            descript=$2,
            color=$3,
        WHERE id=$4
        RETURNING *
        `,
        [title, descript, color, id]
      );
  
      return new CyberTruck(rows[0]);
    }
  
    // ---------------------------------------------
    
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM cyber_trucks WHERE id=$1 RETURNING *',
        [id]
      );
  
      return new CyberTruck(rows[0]);
    } 
  
}; 
