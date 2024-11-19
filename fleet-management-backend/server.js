const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Initialize SQLite database (or create if it doesn't exist)
const db = new sqlite3.Database('./fleet_management.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
    }
});

// Create the maintenance table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS maintenance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicleId TEXT NOT NULL,
        description TEXT NOT NULL,
        maintenanceDate TEXT NOT NULL,
        status TEXT DEFAULT 'upcoming'
    )
`);

// POST endpoint to add a maintenance record
app.post('/api/maintenance', (req, res) => {
    const { vehicleId, description, maintenanceDate, status } = req.body;

    if (!vehicleId || !description || !maintenanceDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = `
        INSERT INTO maintenance (vehicleId, description, maintenanceDate, status)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [vehicleId, description, maintenanceDate, status], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to save maintenance record', error: err.message });
        }
        res.status(201).json({ message: 'Maintenance record saved successfully', id: this.lastID });
    });
});

// GET all maintenance records
app.get('/api/maintenance', (req, res) => {
    const query = 'SELECT * FROM maintenance';

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve records', error: err.message });
        }
        res.status(200).json(rows);
    });
});

// GET a specific maintenance record by ID
app.get('/api/maintenance/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM maintenance WHERE id = ?';

    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve record', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(row);
    });
});

// PUT endpoint to update a maintenance record by ID
app.put('/api/maintenance/:id', (req, res) => {
    const { id } = req.params;
    const { vehicleId, description, maintenanceDate, status } = req.body;

    if (!vehicleId || !description || !maintenanceDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = `
        UPDATE maintenance
        SET vehicleId = ?, description = ?, maintenanceDate = ?, status = ?
        WHERE id = ?
    `;

    db.run(query, [vehicleId, description, maintenanceDate, status, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to update maintenance record', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Record not found to update' });
        }
        res.status(200).json({ message: 'Maintenance record updated successfully' });
    });
});

// DELETE endpoint to delete a maintenance record by ID
app.delete('/api/maintenance/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM maintenance WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to delete record', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Record not found to delete' });
        }
        res.status(200).json({ message: 'Maintenance record deleted successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
