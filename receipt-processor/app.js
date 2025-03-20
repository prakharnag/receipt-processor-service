const express = require('express');
const app = express();
const { router: processRoutes } = require('./routes/process');
const pointsRoutes = require('./routes/points');

app.use(express.json());

app.use('/receipts', processRoutes);
app.use('/receipts', pointsRoutes);

// Export the app for testing
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 