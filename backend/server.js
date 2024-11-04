const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Route for saving order data
app.post('/save-order', (req, res) => {
  const orderData = req.body;
  const orderId = `order_${Date.now()}.json`;
  const filePath = path.join(__dirname, 'order', orderId);

  fs.writeFile(filePath, JSON.stringify(orderData, null, 2), (err) => {
    if (err) {
      console.error('Error saving order:', err);
      return res.status(500).json({ message: 'Failed to save order' });
    }
    console.log('Order saved:', orderId);
    res.status(200).json({ message: 'Order saved successfully', orderId });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
