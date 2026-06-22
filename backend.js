onst express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data sent from the frontend
app.use(express.json());

// 1. BACKEND API ENDPOINTS
app.post('/api/get-started', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    console.log(`New user signup: ${email}`);
    res.status(200).json({ success: true, message: 'Welcome to SmartFlow AI! Check your inbox soon.' });
});

app.post('/api/contact', (req, res) => {
    res.status(200).json({ success: true, message: 'Redirecting you to the account creation page...' });
});


// 2. FRONTEND HTML, CSS, & JAVASCRIPT (Served on the root route)
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SmartFlow AI</title>
<style>
    /* Basic styling included so the page doesn't look broken */
    body { font-family: sans-serif; margin: 0; padding: 0; color: #333; }
    header { background: #111; color: #fff; padding: 10px 20px; }
    nav { display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #fff; margin-left: 15px; text-decoration: none; }
    .hero { background: #f4f4f9; padding: 60px 20px; text-align: center; }
    .features { padding: 40px 20px; text-align: center; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 20px; }
    .card { background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    .about, .stats, .contact { padding: 40px 20px; text-align: center; }
    .stats { background: #333; color: #fff; display: flex; justify-content: space-around; }
    button { background: #007bff; color: white; border: none; padding: 12px 24px; font-size: 16px; border-radius: 4px; cursor: pointer; }
    button:hover { background: #0056b3; }
    footer { background: #111; color: #ccc; text-align: center; padding: 15px; font-size: 14px; }
</style>
</head>
<body>

<header>
    <nav>
        <h2>SmartFlow AI</h2>
        <div>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>
</header>

<section class="hero">
    <div class="hero-content">
        <h1>AI Productivity Companion</h1>
        <p>Plan smarter, prioritize better, and never miss a deadline again.</p>
        <button id="hero-btn">Get Started</button>
    </div>
</section>

<section id="features" class="features">
    <h2>Key Features</h2>
    <div class="cards">
        <div class="card"><h3>📌 Task Prioritization</h3><p>AI ranks tasks based on urgency, importance and workload.</p></div>
        <div class="card"><h3>📅 Smart Scheduling</h3><p>Automatically creates realistic schedules around your calendar.</p></div>
        <div class="card"><h3>⚠ Deadline Prediction</h3><p>Warns you before deadlines are at risk of being missed.</p></div>
        <div class="card"><h3>🎯 Goal Tracking</h3><p>Breaks long-term goals into achievable daily actions.</p></div>
        <div class="card"><h3>🎙 Voice Assistant</h3><p>Manage tasks and plans through natural conversations.</p></div>
        <div class="card"><h3>🤖 Autonomous Planning</h3><p>Creates complete action plans automatically.</p></div>
    </div>
</section>

<section id="about" class="about">
    <h2>Why SmartFlow AI?</h2>
    <p>Traditional reminder apps notify users but fail to help them take action. SmartFlow AI proactively guides users, predicts risks, and helps complete tasks before deadlines are missed.</p>
</section>

<section class="stats">
    <div class="stat-box"><h3>95%</h3><p>Task Completion Rate</p></div>
    <div class="stat-box"><h3>40%</h3><p>Less Procrastination</p></div>
    <div class="stat-box"><h3>24/7</h3><p>AI Assistance</p></div>
</section>

<section id="contact" class="contact">
    <h2>Join the Future of Productivity</h2>
    <button id="contact-btn">Try SmartFlow AI</button>
</section>

<footer>
    <p>© 2026 SmartFlow AI | Powered by Artificial Intelligence</p>
</footer>

<script>
    // FRONTEND JAVASCRIPT
    document.getElementById('hero-btn').addEventListener('click', async () => {
        const email = prompt("Enter your email to get started with SmartFlow AI:");
        if (!email) return;

        try {
            const response = await fetch('/api/get-started', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.getElementById('contact-btn').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/contact', { method: 'POST' });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    });
</script>

</body>
</html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`SmartFlow AI is running on http://localhost:${PORT}`);
});