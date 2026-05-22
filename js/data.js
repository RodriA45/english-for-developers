const studyData = {
    theory: {
        passiveVoice: {
            title: "Passive Voice",
            content: `
                <p>La <strong>Voz Pasiva</strong> enfoca la oración en la acción o en el objeto que recibe la acción.</p>
                <h3>Estructura Básica:</h3>
                <p><code>Objeto + verbo "to be" + Verbo en Participio Pasado (3ra columna)</code></p>
                <ul>
                    <li><strong>Passive with agent:</strong> Se menciona quién hizo la acción usando <em>"by"</em> (ej. <em>"The app was developed by the team."</em>).</li>
                    <li><strong>Passive without agent:</strong> No se menciona quién (ej. <em>"The files are uploaded."</em>).</li>
                    <li><strong>Impersonal passive:</strong> Opiniones generales (ej. <em>"It is expected that..."</em>).</li>
                </ul>
            `
        },
        perfectTenses: {
            title: "Perfect Tenses",
            content: `
                <p>Conectan diferentes momentos en el tiempo.</p>
                <ul>
                    <li><strong>Present Perfect:</strong> <code>Have/Has + Participio Pasado</code> (Impacto en el presente. Ej: <em>"We have tested the app."</em>)</li>
                    <li><strong>Past Perfect:</strong> <code>Had + Participio Pasado</code> (Acción antes de otra acción pasada. Ej: <em>"The server had crashed before the backup started."</em>)</li>
                    <li><strong>Future Perfect:</strong> <code>Will have + Participio Pasado</code> (Estará terminada antes de un futuro. Ej: <em>"By next week, we will have finished the project."</em>)</li>
                    <li><strong>Present Perfect Continuous:</strong> <code>Have/Has been + Verbo-ing</code> (Duración. Ej: <em>"She has been programming all morning."</em>)</li>
                </ul>
            `
        },
        conditionals: {
            title: "Conditionals",
            content: `
                <p>Condicionales para especular resultados lógicos o hipotéticos.</p>
                <ul>
                    <li><strong>Zero (Hechos):</strong> <code>If + Present, Present</code> (Ej. <em>"If the server fails, it shows an alert."</em>)</li>
                    <li><strong>First (Futuro probable):</strong> <code>If + Present, Will + Verbo Base</code> (Ej. <em>"If you update, it will work better."</em>)</li>
                    <li><strong>Second (Hipotético presente):</strong> <code>If + Past, Would + Verbo Base</code> (Ej. <em>"If I knew, I would tell you."</em>)</li>
                    <li><strong>Third (Pasado irreal):</strong> <code>If + Past Perfect, Would have + Participio</code> (Ej. <em>"If they had installed the patch, it would have worked."</em>)</li>
                </ul>
            `
        }
    },
    practice: [
        // Passive Voice
        {
            topic: "Passive Voice",
            type: "drag",
            instruction: "Transforma a voz pasiva arrastrando las palabras: 'The developer fixed the bug.'",
            sentence: ["The", "bug", "____", "____", "by the", "____", "."],
            words: ["developer", "was", "fixed", "were", "fix"],
            answers: ["was", "fixed", "developer"]
        },
        {
            topic: "Passive Voice",
            type: "choice",
            question: "Identifica el tipo: 'The files are uploaded automatically.'",
            options: ["Passive with agent", "Passive without agent", "Impersonal passive"],
            answer: "Passive without agent"
        },
        {
            topic: "Passive Voice",
            type: "choice",
            question: "Identifica el tipo: 'The database was protected by the firewall.'",
            options: ["Passive with agent", "Passive without agent", "Impersonal passive"],
            answer: "Passive with agent"
        },
        // Perfect Tenses
        {
            topic: "Perfect Tenses",
            type: "drag",
            instruction: "Completa la oración arrastrando:",
            sentence: ["The", "programmer", "____", "already", "____", "the problem."],
            words: ["have", "has", "solve", "solved", "had"],
            answers: ["has", "solved"]
        },
        {
            topic: "Perfect Tenses",
            type: "drag",
            instruction: "Completa (Past Perfect):",
            sentence: ["The system", "____", "____", "before the backup started."],
            words: ["has", "had", "crashed", "crash", "have"],
            answers: ["had", "crashed"]
        },
        {
            topic: "Perfect Tenses",
            type: "choice",
            question: "Reconoce el tiempo verbal: 'She has been programming all morning.'",
            options: ["Present Perfect", "Present Perfect Continuous", "Past Perfect", "Future Perfect"],
            answer: "Present Perfect Continuous"
        },
        // Conditionals
        {
            topic: "Conditionals",
            type: "choice",
            question: "Indica qué tipo de condicional es: 'If the server fails, the system shows an alert.'",
            options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
            answer: "Zero Conditional"
        },
        {
            topic: "Conditionals",
            type: "drag",
            instruction: "Tercer Condicional (Third Conditional):",
            sentence: ["If they", "____", "tested the module, it", "____", "____", "crashed."],
            words: ["has", "had", "wouldn't", "have", "hasn't"],
            answers: ["had", "wouldn't", "have"]
        },
        {
            topic: "Conditionals",
            type: "choice",
            question: "Indica qué tipo de condicional es: 'If I knew the solution, I would tell you.'",
            options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"],
            answer: "Second Conditional"
        },
        // Reading Comprehension (Cybersecurity)
        {
            topic: "Reading Comprehension",
            type: "choice",
            question: "Según el texto: 'The attack was detected last year.'",
            options: ["Verdadero", "Falso"],
            answer: "Falso"
        },
        {
            topic: "Reading Comprehension",
            type: "choice",
            question: "What did the company do after detecting the attack?",
            options: ["Ignored the problem", "Updated the firewall only", "Disconnected servers and generated new passwords"],
            answer: "Disconnected servers and generated new passwords"
        }
    ]
};
