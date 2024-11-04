const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const menu = [
    { id: 'A1', name: 'Chicken Wings', price: 59, image: 'UI/Appetizers/Chicken_Wings.png', category: 'Appetizers', quantity: 50 },
    { id: 'A2', name: 'Cheese Balls', price: 49, image: 'UI/Appetizers/Cheese_Balls.png', category: 'Appetizers', quantity: 50 },
    { id: 'A3', name: 'French Fries', price: 55, image: 'UI/Appetizers/French_Fries.png', category: 'Appetizers', quantity: 50 },
    { id: 'A4', name: 'Spinach & Cheese Bake', price: 69, image: 'UI/Appetizers/Spinach_and_Cheese_Bake.png', category: 'Appetizers', quantity: 50 },

    { id: 'B1', name: 'Beef Steak', price: 299, image: 'UI/Main Courses/Beef_Steak.png', category: 'Main Courses', quantity: 50 },
    { id: 'B2', name: 'Spaghetti Carbonara', price: 179, image: 'UI/Main Courses/Spaghetti_Carbonara.png', category: 'Main Courses', quantity: 50 },
    { id: 'B3', name: 'Carb Meat Fried Rice', price: 239, image: 'UI/Main Courses/Carb_Meat_Fried_Rice.png', category: 'Main Courses', quantity: 50 },
    { id: 'B4', name: 'Tom Yum Goong', price: 269, image: 'UI/Main Courses/Tom_Yum_Goong.png', category: 'Main Courses', quantity: 50 },

    { id: 'C1', name: 'Thai Tea', price: 50, image: 'UI/Beverages/Thai_Tea.png', category: 'Beverages', quantity: 50 },
    { id: 'C2', name: 'Latte', price: 65, image: 'UI/Beverages/Latte.png', category: 'Beverages', quantity: 50 },
    { id: 'C3', name: 'Strawberry Italian Soda', price: 60, image: 'UI/Beverages/Strawberry_Italian_Soda.png', category: 'Beverages', quantity: 50 },
    { id: 'C4', name: 'Ice Chocolate', price: 65, image: 'UI/Beverages/Ice_Chocolate.png', category: 'Beverages', quantity: 50 },

    { id: 'D1', name: 'Chocolate Lava Cake', price: 119, image: 'UI/Desserts/Chocolate_Lava_Cake.png', category: 'Desserts', quantity: 50 },
    { id: 'D2', name: 'Strawberry Bingsu', price: 129, image: 'UI/Desserts/Strawberry_Bingsu.png', category: 'Desserts', quantity: 50 },
    { id: 'D3', name: 'Mixed Berry Pan Cake', price: 99, image: 'UI/Desserts/Mixed_Berry_Pan_Cake.png', category: 'Desserts', quantity: 50 },
    { id: 'D4', name: 'Croissant', price: 40, image: 'UI/Desserts/Croissant.png', category: 'Desserts', quantity: 50 },
];

app.get('/api/menu', (req, res) => {
    res.json(menu);
});

app.post('/api/order', (req, res) => {
    const orderData = req.body;
    console.log('Received order:', orderData);
    res.json({ message: 'Order received successfully!' });
});

const generateQRCode = async (data) => {
    const qrFilePath = path.join(__dirname, 'QR.png');
    await QRCode.toFile(qrFilePath, data, { width: 256 });
    console.log(`QR Code saved to ${qrFilePath}`);
};

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  const qrData = 'https://appfood-kukps-store.vercel.app/';
  try {
      await generateQRCode(qrData); 
  } catch (error) {
      console.error('Error starting the server or generating QR Code:', error);
  }
});
