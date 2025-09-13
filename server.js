const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes to allow requests from your frontend.
app.use(cors());

// Use body-parser to handle JSON data from form submissions.
app.use(bodyParser.json());

// Serve static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory "database" to store submissions.
let submissions = [];

// Endpoint for form submissions from the frontend.
app.post('/api/submit-form', (req, res) => {
    try {
        const formData = req.body;

        // Basic data validation to prevent empty submissions.
        if (!formData.name || !formData.email) {
            console.error('Validation Error: Missing name or email.');
            return res.status(400).json({ message: 'Name and email are required.' });
        }

        console.log('Received new form submission:', formData);

        // Simulate saving the form data to a database.
        submissions.push(formData);

        res.status(200).json({ message: 'Submission successful!', data: formData });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Endpoint to get submissions with search, filtering, and pagination
app.get('/api/submissions', (req, res) => {
    try {
        let { search, page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        let filtered = submissions;

        // Search by name or email
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(sub =>
                sub.name.toLowerCase().includes(searchLower) ||
                sub.email.toLowerCase().includes(searchLower)
            );
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginated = filtered.slice(startIndex, endIndex);

        res.status(200).json({
            total: filtered.length,
            page,
            limit,
            data: paginated
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});