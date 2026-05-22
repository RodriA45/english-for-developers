document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLE ---
    const themeBtn = document.getElementById('theme-toggle');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeText = document.getElementById('theme-text');

    // Revisar si ya había preferencia
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIconSun.style.display = 'block';
        themeIconMoon.style.display = 'none';
        themeText.textContent = 'Modo Claro';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            themeIconSun.style.display = 'block';
            themeIconMoon.style.display = 'none';
            themeText.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIconSun.style.display = 'none';
            themeIconMoon.style.display = 'block';
            themeText.textContent = 'Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
    });

    // --- NAVIGATION ---
    const navBtns = document.querySelectorAll('.nav-btn, .start-btn');
    const sections = document.querySelectorAll('.view-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.id === 'theme-toggle') return; // Ignorar el botón de tema para la navegación
            
            // Buscar el data-view (si hace clic en un icono o span dentro del botón)
            const targetBtn = e.target.closest('button');
            const targetView = targetBtn.dataset.view || 'practica'; // start-btn goes to practica
            
            // Update Active Classes
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            if(targetBtn.classList.contains('nav-btn')) targetBtn.classList.add('active');
            else document.querySelector('.practice-btn').classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`view-${targetView}`).classList.add('active');

            if(targetView === 'practica') initQuiz();
        });
    });

    // --- TEMAS (GRID) ---
    const topicsContainer = document.getElementById('topics-container');
    const topicReader = document.getElementById('topic-reader');
    const topicContentBody = document.getElementById('topic-content-body');
    const backToTopics = document.getElementById('back-to-topics');

    function renderTopics() {
        topicsContainer.innerHTML = '';
        for (const [key, section] of Object.entries(studyData.theory)) {
            const card = document.createElement('div');
            card.className = 'topic-card';
            card.innerHTML = `
                <h3>${section.title}</h3>
                <p>Haz clic para leer la teoría de este tema.</p>
                <span class="badge">Estudiar →</span>
            `;
            card.addEventListener('click', () => {
                topicsContainer.classList.add('hidden');
                topicReader.classList.remove('hidden');
                topicContentBody.innerHTML = `<h2>${section.title}</h2>${section.content}`;
            });
            topicsContainer.appendChild(card);
        }
    }
    renderTopics();

    backToTopics.addEventListener('click', () => {
        topicReader.classList.add('hidden');
        topicsContainer.classList.remove('hidden');
    });

    // --- PRACTICA (QUIZ ENGINE) ---
    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    let practiceQuestions = studyData.practice;
    
    const questionContainer = document.getElementById('question-container');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackMsg = document.getElementById('feedback-message');
    const quizResults = document.getElementById('quiz-results');
    const quizArea = document.querySelector('.quiz-container');

    function initQuiz() {
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        quizResults.classList.add('hidden');
        quizArea.classList.remove('hidden');
        document.getElementById('quiz-total').textContent = practiceQuestions.length;
        updateGlobalProgress();
        renderQuestion();
    }

    function renderQuestion() {
        const q = practiceQuestions[currentQuestionIndex];
        document.getElementById('quiz-current').textContent = currentQuestionIndex + 1;
        document.getElementById('quiz-topic-badge').textContent = q.topic;
        
        feedbackMsg.textContent = '';
        feedbackMsg.className = 'feedback-message';
        checkBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        checkBtn.disabled = false;

        let html = '';
        if (q.type === 'choice') {
            html += `<div class="question-text">${q.question}</div>`;
            html += `<div class="options-grid">`;
            q.options.forEach(opt => {
                html += `<button class="option-btn" onclick="selectOption(this)">${opt}</button>`;
            });
            html += `</div>`;
            questionContainer.innerHTML = html;
        } else if (q.type === 'drag') {
            html += `<div class="question-text">${q.instruction}</div>`;
            html += `<div class="sentence-container" id="sentence-container">`;
            
            q.sentence.forEach((part, index) => {
                if (part === '____') {
                    html += `<div class="drop-zone" data-index="${index}"></div>`;
                } else {
                    html += `<span>${part}</span>`;
                }
            });
            html += `</div>`;
            
            html += `<div class="words-bank" id="words-bank">`;
            // Mezclar palabras
            const shuffledWords = [...q.words].sort(() => Math.random() - 0.5);
            shuffledWords.forEach((word, index) => {
                html += `<div class="draggable-word" draggable="true" id="word-${index}">${word}</div>`;
            });
            html += `</div>`;
            
            questionContainer.innerHTML = html;
            setupDragAndDrop();
        }
    }

    // Lógica Choice
    window.selectOption = function(btn) {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    }

    // Lógica Drag and Drop
    function setupDragAndDrop() {
        const draggables = document.querySelectorAll('.draggable-word');
        const dropZones = document.querySelectorAll('.drop-zone');
        const wordsBank = document.getElementById('words-bank');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });
            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });

        // Sincronizar estado visual de todas las zonas
        function syncDropZones() {
            dropZones.forEach(z => {
                if(z.children.length > 0) z.classList.add('filled');
                else z.classList.remove('filled');
            });
        }

        // Permitir soltar en las zonas vacías
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
                zone.style.borderColor = 'var(--primary)';
            });
            zone.addEventListener('dragleave', () => {
                zone.style.borderColor = 'var(--border)';
            });
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.style.borderColor = 'var(--border)';
                const draggable = document.querySelector('.dragging');
                if (!draggable) return;
                
                // Si la zona ya tiene algo, devolverlo al banco
                if (zone.children.length > 0) {
                    wordsBank.appendChild(zone.children[0]);
                }
                zone.appendChild(draggable);
                syncDropZones();
            });
        });

        // Permitir devolver al banco
        wordsBank.addEventListener('dragover', e => e.preventDefault());
        wordsBank.addEventListener('drop', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                wordsBank.appendChild(draggable);
            }
            syncDropZones();
        });
    }

    // Comprobar
    checkBtn.addEventListener('click', () => {
        const q = practiceQuestions[currentQuestionIndex];
        let isCorrect = false;

        if (q.type === 'choice') {
            const selected = document.querySelector('.option-btn.selected');
            if (!selected) return; // Nada seleccionado
            
            checkBtn.disabled = true;
            if (selected.textContent === q.answer) {
                isCorrect = true;
                selected.classList.add('correct');
            } else {
                selected.classList.add('incorrect');
                // Marcar la correcta
                document.querySelectorAll('.option-btn').forEach(btn => {
                    if (btn.textContent === q.answer) btn.classList.add('correct');
                });
            }
        } else if (q.type === 'drag') {
            const dropZones = document.querySelectorAll('.drop-zone');
            let userAnswers = [];
            let allFilled = true;
            
            dropZones.forEach(zone => {
                if (zone.children.length > 0) {
                    userAnswers.push(zone.children[0].textContent);
                } else {
                    allFilled = false;
                }
            });

            if (!allFilled) {
                alert("Completa todos los espacios antes de comprobar.");
                return;
            }

            checkBtn.disabled = true;
            isCorrect = JSON.stringify(userAnswers) === JSON.stringify(q.answers);
            
            // Colorear draggables
            dropZones.forEach((zone, index) => {
                const word = zone.children[0];
                if (word.textContent === q.answers[index]) {
                    word.classList.add('correct');
                } else {
                    word.classList.add('incorrect');
                }
                word.draggable = false;
            });
        }

        if (isCorrect) {
            correctAnswersCount++;
            feedbackMsg.textContent = '¡Correcto! Excelente trabajo.';
            feedbackMsg.classList.add('correct');
            feedbackMsg.classList.remove('incorrect');
        } else {
            feedbackMsg.textContent = 'Incorrecto. Revisa la respuesta.';
            feedbackMsg.classList.add('incorrect');
            feedbackMsg.classList.remove('correct');
        }

        checkBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
        updateGlobalProgress();
    });

    // Siguiente
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < practiceQuestions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizArea.classList.add('hidden');
        quizResults.classList.remove('hidden');
        document.getElementById('correct-count').textContent = correctAnswersCount;
        document.getElementById('total-count').textContent = practiceQuestions.length;
        document.getElementById('stat-progress').textContent = '100%';
        document.getElementById('global-progress-fill').style.width = '100%';
    }

    document.getElementById('restart-btn').addEventListener('click', initQuiz);

    function updateGlobalProgress() {
        const pct = Math.round((currentQuestionIndex / practiceQuestions.length) * 100);
        document.getElementById('stat-progress').textContent = `${pct}%`;
        document.getElementById('global-progress-fill').style.width = `${pct}%`;
    }
});
