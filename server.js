require('dotenv').config();
require('./lib/utils/pool').connect();
const app = require('./lib/app');
const PORT = 3002;


app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
