const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const ModelS = require('../lib/tesla/ModelS');
const CyberTruck = require('../lib/tesla/CyberTruck'); 

// -----------------------------------------------

describe('tests', () => {

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  // -----------------------------------------------

  afterAll(() => {
    return pool.end();
  });

  // -----------------------------------------------

  it('post a new car model_s row to the data table', async() => {

    const res = await request(app) 
      .post('/tesla/model_s')
      .send({
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'All Black'
      });
    
    expect(res.body).toEqual({
      id: '1',
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black'
    }); 
  });


  // -----------------------------------------------------

  it('gets all rows from models table', async() => {

    const models = await Promise.all([
      {
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'Cream'
      },
      {
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'Red'
      },
      {
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'All Black'
      }
    ].map(models => ModelS.insert(models)));
    
    const res = await request(app)
      .get('/tesla/model_s');
    expect(res.body).toEqual(expect.arrayContaining(models));
    expect(res.body).toHaveLength(models.length);

      
  });

  // -----------------------------------------------------

  it('get car by id', async() => { 

    const tesla = await ModelS.insert({
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black'
    });

    const response = await request(app)
      .put(`/tesla/model_s/${tesla.id}`)
      .send({ 
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'Cream'
      });

    expect(response.body).toEqual({
      ...tesla,
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'Cream'
    });
  });

  //   -----------------------------------------------------

  it('deletes a models', async() => {

    const tesla = await ModelS.insert({ 
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'Cream'
    });

    const res = await request(app)
      .delete(`/tesla/model_s/${tesla.id}`);
    expect(res.body).toEqual(tesla);
  });


  // END OF MODEL_S=======================================================


  it('post a new cybertruck', async() => {

    const post = {
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    };

    const expectation = {
      id: '1',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    };

    const data = await request(app)
      .post('/tesla/cyber_truck')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  // -----------------------------------------------------

  it('gets all rows from cyber_trucks table', async() => {
  
    const expectation = [
      {
        id: '1',
        title: 'truck',
        descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
        color: 'silver'
      }
    ];
  

    const data = await request(app) 
      .get('/tesla/cyber_truck/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation); 
    
  });

  // -----------------------------------------------------
  
  it('get cybertruck by id', async() => { 

    const tesla = await CyberTruck.insert({
      id: '1',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    });

    const response = await request(app)
      .get(`/tesla/cyber_truck/${tesla.id}`)
      .send({ 
        title: 'truck',
        descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
        color: 'silver'
      });

    expect(response.body).toEqual({
      ...tesla,
      id: '2',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    });
  });

  //   -----------------------------------------------------

  it('deletes a cybertruck', async() => {
    const expectation = {
      id: '1',
      title: 'truck',
      descript: 'The Tesla Cybertruck is an all-electric, battery-powered, light duty truck announced by Tesla, Inc. Three models have been announced, with EPA range estimates of 250–500 miles (400–800 km) and an estimated 0–60 mph time of 2.9–6.5 seconds, depending on the model.',
      color: 'silver'
    };

    const data = await request(app)
      .delete('/tesla/cyber_truck/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

  });

  // END=======================================================

});
