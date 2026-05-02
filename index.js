const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// --- FIX: THIS STOPS THE "NOT FOUND" ERROR ON YOUR MAIN LINK ---
app.get('/', (req, res) => {
    res.send('<h2>Biotech Dissertation API is running successfully!</h2><p>Your server is live and ready to generate topics.</p>');
});
// ----------------------------------------------------------------

// Dynamic Generation Logic
const generators = {
    "Plant Tissue Culture": {
        methods: ["In-Vitro Regeneration and In-Silico Modeling of", "Optimization of Micropropagation Protocols for", "Agrobacterium-mediated Transformation in"],
        subjects: ["Endangered Medicinal Plants", "High-Value Agricultural Crops", "Drought-Resistant Cultivars"]
    },
    "Nanoparticle-mediated Elicitation": {
        methods: ["Impact of Green-Synthesized Zinc Oxide Nanoparticles on", "Elicitation using Silver Nanoparticles for", "Synergistic Effects of Abiotic Elicitors and Nanomaterials on"],
        subjects: ["Secondary Metabolite Production in Callus Cultures", "Bioactive Compound Synthesis", "Enhanced Antioxidant Yields in Suspension Cultures"]
    },
    "Sustainable Metal Recovery": {
        methods: ["Genomic Analysis and Bioleaching Efficiency of", "Sustainable Biocyanidation Techniques for", "Acidophilic Microbial Consortia Dynamics in"],
        subjects: ["Copper Recovery from Waste Printed Circuit Boards", "Precious Metal Extraction from E-Waste", "Heavy Metal Bioremediation from Industrial Runoff"]
    }
};

app.get('/api/generate', (req, res) => {
    const category = req.query.category;
    
    if (!generators[category]) {
        return res.status(400).json({ error: "Category not found" });
    }

    const data = generators[category];
    const method = data.methods[Math.floor(Math.random() * data.methods.length)];
    const subject = data.subjects[Math.floor(Math.random() * data.subjects.length)];
    
    const title = `${method} ${subject}.`;
    const abstract = `This proposed dissertation explores the ${method.toLowerCase()} ${subject.toLowerCase()}. By bridging established wet-lab techniques with advanced analytical frameworks, this research aims to optimize efficiency, sustainability, and yield. The study will provide novel insights into underlying molecular and physiological mechanisms, offering scalable solutions for future industrial and environmental applications.`;
    const searchQuery = `${method} ${subject}`;

    res.json({ title, abstract, searchQuery });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
