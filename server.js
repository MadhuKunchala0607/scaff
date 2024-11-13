require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (thank.html should be in the 'public' folder)
app.use(express.static('public'));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// POST route for form submission
app.post('/submit-form', (req, res) => {
    const { name, email, companyName, contact, amount, height, type, insurance } = req.body;

    
    // console.log(req.body);

  
    const mailOptions = {
        from: email, 
        to: process.env.RECIPIENT_EMAIL, 
        subject: 'New Form Submission',
        html: `
            <h3>Form Data</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Email</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Company Name</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${companyName}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Contact</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${contact}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Amount</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">$${amount}M</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Type of Scaffolding Works</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${type}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Height Over 10 Meters</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${height}</td>
                </tr>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Has Insurance</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${insurance}</td>
                </tr>
            </table>
        `
    };

   
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
            return res.status(500).send('Error occurred while sending the email');
        }
        console.log('Email sent: success'+info);

        
        res.redirect('/thank.html');
    });
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
