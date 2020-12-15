const pool = require('../utils/pool');
const CyberTruck = require('./CyberTruck');

module.exports = class ModelS {
  id;
  title;
  descript;
  model;
  color;
  wheelType;
  interior;

  constructor(row) {
    this.id = String(row.id);
    this.title = row.title;
    this.descript = row.descript;
    this.model = row.model;
    this.color = row.color;
    this.wheelType = row.wheel_type;
    this.interior = row.interior;
  }

  // CRUD-------------------------------------
  // PUT--------------------

  static async insert({ title, descript, model, color, wheelType, interior, cyber_trucks = [] }) {
    const { rows } = await pool.query(
      `INSERT INTO model_s (title, descript, model, color, wheel_type, interior)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [title, descript, model, color, wheelType, interior]
    );

    await pool.query(
      `INSERT INTO models_cybertruck (model_s_id, cyber_trucks_id)
      SELECT ${rows[0].id}, id 
      FROM cyber_trucks 
      WHERE title = ANY($1::text[])`,
      [cyber_trucks]);

    return new ModelS(rows[0]);
  }

  // ------------------------------------------
  // FIND--------------------
  static async find() {
    const { rows } = await pool.query('SELECT * FROM model_s');

    return rows.map(row => new ModelS(row));
  }

  // -------------------------------------------
  // FINDBYID------------------

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT 
        model_s.*,
        json_agg(cyber_trucks.title) AS Cyber Trucks
      FROM models_cybertruck
      JOIN model_s
        ON models_cybertruck.model_s_id = model_s.id
      JOIN cyber_trucks
        ON models_cybertruck.cyber_trucks_id = cybertruck.id
      WHERE model_s.id=$1
      GROUP BY model_s.id`,    
      [id]
    );
    
    return {
      ...new ModelS(rows[0]),
      cybertruck: rows[0].CyberTruck.map(cybertruck => new CyberTruck(cybertruck))
    };
  }

  // --------------------------------------------
  // Update---------------------

  static async update(id, { title, descript, model, color, wheelType, interior }) {
    const { rows } = await pool.query(
      `UPDATE model_s
      SET title=$1,
          descript=$2,
          model=$3,
          color=$4,
          wheel_type=$5,
          interior=$6
      WHERE id=$7
      RETURNING *
      `,
      [title, descript, model, color, wheelType, interior, id]
    );

    return new ModelS(rows[0]);
  }


  // ---------------------------------------------
  //   DELETE-------------------

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM model_s WHERE id=$1 RETURNING *',
      [id]
    );

    return new ModelS(rows[0]);
  } 


};
