require('dotenv').config();
const express = require('express');
const app = express();
const ModelS = require('./tesla/ModelS');
const CyberTruck = require('./tesla/CyberTruck');
app.use(express.json());

// ------------------------------------------------------------
// GET-------

app.get('/tesla/model_s/', (req, res) => {
  ModelS
    .find()
    .then(modelS => res.send(modelS));
});


app.get('/tesla/cybertruck', (req, res) => {
  CyberTruck
    .find()
    .then(cybertruck => res.send(cybertruck));
  
});
  
// -------------------------------------------------------------
// getbyID---------

app.get('/tesla/model_s/:id', (req, res) => {
  ModelS
    .findById(req.params.id)
    .then(modelS => res.send(modelS));
});

app.get('/tesla/cybertruck/:id', (req, res) => {
  CyberTruck
    .findById(req.params.id)
    .then(cybertruck => res.send(cybertruck));
});
  

// ----------------------------------------------------------------
// POST-------

app.post('/tesla/model_s', async(req, res) => {
  ModelS 
    .insert(req.body)
    .then(modelS => res.send(modelS));
});


app.post('/tesla/cybertruck', async(req, res) => {
  CyberTruck 
    .insert(req.body)
    .then(cybertruck => res.send(cybertruck));
});

// --------------------------------------------------------------
// PUT----------

app.put('/tesla/model_s/:id', (req, res) => {
  ModelS
    .update(req.params.id, req.body)
    .then(modelS => res.send(modelS));
});

app.put('/tesla/cybertruck/:id', (req, res) => {
  CyberTruck
    .update(req.params.id, req.body)
    .then(cybertruck => res.send(cybertruck));
});
  
// -----------------------------------------------------------------
// DELETE---------

app.delete('/tesla/model_s/:id', (req, res) => {
  ModelS
    .delete(req.params.id)
    .then(modelS => res.send(modelS));
}); 

app.delete('/tesla/cybertruck/:id', (req, res) => {
  CyberTruck
    .delete(req.params.id)
    .then(cybertruck => res.send(cybertruck));
}); 

// ==============================================================

module.exports = app ;
