const express = require('express');
const sql = require('mssql');

const app = express();

// การกำหนดค่าเพื่อเชื่อมต่อกับ SQL Server
const config = {
  user: 'sa', // ชื่อผู้ใช้ SQL Server
  password: '1Nnet', // รหัสผ่าน SQL Server
  server: '10.172.102.168', // ชื่อเซิร์ฟเวอร์ SQL Server
  database: 'QStandardOnline', // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
};

// เชื่อมต่อกับ SQL Server
sql.connect(config, (err) => {
  if (err) {
    console.error('Error connecting to SQL Server:', err);
    return;
  }
  console.log('Connected to SQL Server');
});

// สร้าง API สำหรับการเรียกข้อมูลจากฐานข้อมูล
app.get('/api/data', (req, res) => {
  const sqlQuery = 'SELECT * FROM masBusinessUnit'; // แก้ไขเป็นชื่อตารางของคุณ

  sql.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error querying SQL Server:', err);
      res.status(500).send('Error querying SQL Server');
      return;
    }
    res.json(results.recordset);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
