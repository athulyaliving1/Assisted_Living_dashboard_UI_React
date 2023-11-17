const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;

const dbConfig = {
  host: '162.241.85.121',
  user: 'athulslv_muthukumar',
  password: 'Athulya@123',
  database: 'athulslv_sal_subscriber102'
};

const pool = mysql.createPool(dbConfig);
app.get('/api/totalAmount', (req, res) => {
    const start = req.query.start;
    const end = req.query.end;
    const branchId = req.query.branch_id;
    
      if (!start || !end || !branchId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const query = `
      SELECT NULL AS patient_id, NULL AS branch_id, SUM(pa.amount) AS total_amount
      FROM patients AS p
      INNER JOIN patient_schedules AS pa ON p.id = pa.patient_id
      WHERE p.branch_id = ?
      AND pa.invoice_status = "Pending"
      AND pa.schedule_date >= ?
      AND pa.schedule_date <= ?
      GROUP BY p.branch_id, pa.invoice_status
  
      UNION
  
      SELECT p.id AS patient_id, p.branch_id, SUM(pa.amount) AS total_amount
      FROM patients AS p
      INNER JOIN patient_schedules AS pa ON p.id = pa.patient_id
      WHERE p.branch_id = ?
      AND pa.invoice_status = "Pending"
      AND pa.schedule_date >= ?
      AND pa.schedule_date <= ?
      GROUP BY p.id, p.branch_id;
    `;
  
    pool.query(query, [branchId, start, end, branchId, start, end], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(result);
    });
  });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });