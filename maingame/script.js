document.addEventListener("DOMContentLoaded", function () {

    let score = 0;
    let timeLeft = 0;
    let combo = 0;
    let timerInterval = null;
    let difficultyTier = 1;
    let isPaused = false


    const menuOverlay = document.getElementById("menu-overlay")
    const menuTitle = document.getElementById("menu-title")

    const resumeBtn = document.getElementById("resumeBtn")
    const restartBtn = document.getElementById("restartBtn")
    const soundBtn = document.getElementById("soundBtn")
    const homeBtn = document.getElementById("homeBtn")
    const menuBtn = document.getElementById("menuBtn")



    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const cardContainer = document.getElementById("card-container");

    const comboDisplay = document.getElementById("combo-display");
    let missingElements = [];

    const elements = [
        { symbol: "H", category: "nonmetal", row: 1, col: 1 },
        { symbol: "He", category: "noble", row: 1, col: 18 },

        { symbol: "Li", category: "alkali", row: 2, col: 1 },
        { symbol: "Be", category: "alkaline", row: 2, col: 2 },
        { symbol: "B", category: "metalloid", row: 2, col: 13 },
        { symbol: "C", category: "nonmetal", row: 2, col: 14 },
        { symbol: "N", category: "nonmetal", row: 2, col: 15 },
        { symbol: "O", category: "nonmetal", row: 2, col: 16 },
        { symbol: "F", category: "halogen", row: 2, col: 17 },
        { symbol: "Ne", category: "noble", row: 2, col: 18 },

        { symbol: "Na", category: "alkali", row: 3, col: 1 },
        { symbol: "Mg", category: "alkaline", row: 3, col: 2 },
        { symbol: "Al", category: "postmetal", row: 3, col: 13 },
        { symbol: "Si", category: "metalloid", row: 3, col: 14 },
        { symbol: "P", category: "nonmetal", row: 3, col: 15 },
        { symbol: "S", category: "nonmetal", row: 3, col: 16 },
        { symbol: "Cl", category: "halogen", row: 3, col: 17 },
        { symbol: "Ar", category: "noble", row: 3, col: 18 },

        { symbol: "K", category: "alkali", row: 4, col: 1 },
        { symbol: "Ca", category: "alkaline", row: 4, col: 2 },
        { symbol: "Sc", category: "transition", row: 4, col: 3 },
        { symbol: "Ti", category: "transition", row: 4, col: 4 },
        { symbol: "V", category: "transition", row: 4, col: 5 },
        { symbol: "Cr", category: "transition", row: 4, col: 6 },
        { symbol: "Mn", category: "transition", row: 4, col: 7 },
        { symbol: "Fe", category: "transition", row: 4, col: 8 },
        { symbol: "Co", category: "transition", row: 4, col: 9 },
        { symbol: "Ni", category: "transition", row: 4, col: 10 },
        { symbol: "Cu", category: "transition", row: 4, col: 11 },
        { symbol: "Zn", category: "transition", row: 4, col: 12 },
        { symbol: "Ga", category: "postmetal", row: 4, col: 13 },
        { symbol: "Ge", category: "metalloid", row: 4, col: 14 },
        { symbol: "As", category: "metalloid", row: 4, col: 15 },
        { symbol: "Se", category: "nonmetal", row: 4, col: 16 },
        { symbol: "Br", category: "halogen", row: 4, col: 17 },
        { symbol: "Kr", category: "noble", row: 4, col: 18 },

        { symbol: "Rb", category: "alkali", row: 5, col: 1 },
        { symbol: "Sr", category: "alkaline", row: 5, col: 2 },
        { symbol: "Y", category: "transition", row: 5, col: 3 },
        { symbol: "Zr", category: "transition", row: 5, col: 4 },
        { symbol: "Nb", category: "transition", row: 5, col: 5 },
        { symbol: "Mo", category: "transition", row: 5, col: 6 },
        { symbol: "Tc", category: "transition", row: 5, col: 7 },
        { symbol: "Ru", category: "transition", row: 5, col: 8 },
        { symbol: "Rh", category: "transition", row: 5, col: 9 },
        { symbol: "Pd", category: "transition", row: 5, col: 10 },
        { symbol: "Ag", category: "transition", row: 5, col: 11 },
        { symbol: "Cd", category: "transition", row: 5, col: 12 },
        { symbol: "In", category: "postmetal", row: 5, col: 13 },
        { symbol: "Sn", category: "postmetal", row: 5, col: 14 },
        { symbol: "Sb", category: "metalloid", row: 5, col: 15 },
        { symbol: "Te", category: "metalloid", row: 5, col: 16 },
        { symbol: "I", category: "halogen", row: 5, col: 17 },
        { symbol: "Xe", category: "noble", row: 5, col: 18 },

        { symbol: "Cs", category: "alkali", row: 6, col: 1 },
        { symbol: "Ba", category: "alkaline", row: 6, col: 2 },
        { symbol: "La", category: "lanthanide", row: 6, col: 3 },
        { symbol: "Hf", category: "transition", row: 6, col: 4 },
        { symbol: "Ta", category: "transition", row: 6, col: 5 },
        { symbol: "W", category: "transition", row: 6, col: 6 },
        { symbol: "Re", category: "transition", row: 6, col: 7 },
        { symbol: "Os", category: "transition", row: 6, col: 8 },
        { symbol: "Ir", category: "transition", row: 6, col: 9 },
        { symbol: "Pt", category: "transition", row: 6, col: 10 },
        { symbol: "Au", category: "transition", row: 6, col: 11 },
        { symbol: "Hg", category: "transition", row: 6, col: 12 },
        { symbol: "Tl", category: "postmetal", row: 6, col: 13 },
        { symbol: "Pb", category: "postmetal", row: 6, col: 14 },
        { symbol: "Bi", category: "postmetal", row: 6, col: 15 },
        { symbol: "Po", category: "metalloid", row: 6, col: 16 },
        { symbol: "At", category: "halogen", row: 6, col: 17 },
        { symbol: "Rn", category: "noble", row: 6, col: 18 },

        { symbol: "Fr", category: "alkali", row: 7, col: 1 },
        { symbol: "Ra", category: "alkaline", row: 7, col: 2 },
        { symbol: "Ac", category: "actinide", row: 7, col: 3 },
        { symbol: "Rf", category: "transition", row: 7, col: 4 },
        { symbol: "Db", category: "transition", row: 7, col: 5 },
        { symbol: "Sg", category: "transition", row: 7, col: 6 },
        { symbol: "Bh", category: "transition", row: 7, col: 7 },
        { symbol: "Hs", category: "transition", row: 7, col: 8 },
        { symbol: "Mt", category: "transition", row: 7, col: 9 },
        { symbol: "Ds", category: "transition", row: 7, col: 10 },
        { symbol: "Rg", category: "transition", row: 7, col: 11 },
        { symbol: "Cn", category: "transition", row: 7, col: 12 },
        { symbol: "Nh", category: "postmetal", row: 7, col: 13 },
        { symbol: "Fl", category: "postmetal", row: 7, col: 14 },
        { symbol: "Mc", category: "postmetal", row: 7, col: 15 },
        { symbol: "Lv", category: "postmetal", row: 7, col: 16 },
        { symbol: "Ts", category: "halogen", row: 7, col: 17 },
        { symbol: "Og", category: "noble", row: 7, col: 18 },

        // Lanthanide
        { symbol: "Ce", category: "lanthanide", row: 8, col: 4 },
        { symbol: "Pr", category: "lanthanide", row: 8, col: 5 },
        { symbol: "Nd", category: "lanthanide", row: 8, col: 6 },
        { symbol: "Pm", category: "lanthanide", row: 8, col: 7 },
        { symbol: "Sm", category: "lanthanide", row: 8, col: 8 },
        { symbol: "Eu", category: "lanthanide", row: 8, col: 9 },
        { symbol: "Gd", category: "lanthanide", row: 8, col: 10 },
        { symbol: "Tb", category: "lanthanide", row: 8, col: 11 },
        { symbol: "Dy", category: "lanthanide", row: 8, col: 12 },
        { symbol: "Ho", category: "lanthanide", row: 8, col: 13 },
        { symbol: "Er", category: "lanthanide", row: 8, col: 14 },
        { symbol: "Tm", category: "lanthanide", row: 8, col: 15 },
        { symbol: "Yb", category: "lanthanide", row: 8, col: 16 },
        { symbol: "Lu", category: "lanthanide", row: 8, col: 17 },

        // Actinide
        { symbol: "Th", category: "actinide", row: 9, col: 4 },
        { symbol: "Pa", category: "actinide", row: 9, col: 5 },
        { symbol: "U", category: "actinide", row: 9, col: 6 },
        { symbol: "Np", category: "actinide", row: 9, col: 7 },
        { symbol: "Pu", category: "actinide", row: 9, col: 8 },
        { symbol: "Am", category: "actinide", row: 9, col: 9 },
        { symbol: "Cm", category: "actinide", row: 9, col: 10 },
        { symbol: "Bk", category: "actinide", row: 9, col: 11 },
        { symbol: "Cf", category: "actinide", row: 9, col: 12 },
        { symbol: "Es", category: "actinide", row: 9, col: 13 },
        { symbol: "Fm", category: "actinide", row: 9, col: 14 },
        { symbol: "Md", category: "actinide", row: 9, col: 15 },
        { symbol: "No", category: "actinide", row: 9, col: 16 },
        { symbol: "Lr", category: "actinide", row: 9, col: 17 }];

    const table = document.getElementById("periodic-table");

    function openMenu(title = "Paused") {

        menuTitle.textContent = title

        menuOverlay.classList.remove("hidden")

        clearInterval(timerInterval)

        isPaused = true

    }

    function closeMenu() {

        menuOverlay.classList.add("hidden")

        startTimer()

        isPaused = false

    }

    resumeBtn.onclick = () => {

        closeMenu()

    }
    restartBtn.onclick = () => {

        location.reload()

    }
    homeBtn.onclick = () => {

        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 500);

    }
    menuBtn.onclick = () => {

        if (!isPaused) {

            openMenu()

        }

    }
    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            if (isPaused) {

                closeMenu()

            } else {

                openMenu()

            }

        }

    })

    let selectedCard = null;

    function createTable() {
        table.innerHTML = "";

        elements.forEach((el, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell", el.category);

            cell.style.gridRowStart = el.row;
            cell.style.gridColumnStart = el.col;

            if (missingElements.includes(index)) {
                cell.classList.add("missing");
                cell.dataset.correct = el.symbol;
                cell.textContent = "?";

                cell.addEventListener("dragover", e => e.preventDefault());

                const handlePlacement = (draggedSymbol) => {
                    if (draggedSymbol === cell.dataset.correct) {

                        cell.textContent = draggedSymbol;
                        cell.classList.remove("missing");

                        combo++;
                        let baseScore = 100;
                        let comboBonus = combo * baseScore;
                        let totalGain = baseScore + comboBonus;

                        score += totalGain;
                        const combotext = document.getElementById("totalGain");
                        combotext.textContent = totalGain;
                        
                        scoreDisplay.textContent = score;
                        updateScoreColor();

                        showFloatingScore(totalGain);
                        updateComboDisplay();
                        updateDifficulty();

                        document.body.classList.add("heal");

                        setTimeout(() => {
                            document.body.classList.remove("heal");
                        }, 400);

                        const usedCard = document.querySelector(
                            `.card[data-symbol="${draggedSymbol}"]`
                        );

                        if (usedCard) {
                            usedCard.classList.add("break");

                            setTimeout(() => {
                                usedCard.remove();


                                if (document.querySelectorAll(".card").length === 0) {
                                    nextRound();
                                }

                            }, 400);
                        }
                        
                        if (selectedCard) {
                            selectedCard.classList.remove("selected");
                            selectedCard = null;
                        }

                    } else {

                        let timePenalty = 5 + (combo * 2);
                        timeLeft -= timePenalty;
                        if (timeLeft < 0) timeLeft = 0;
                        timerDisplay.textContent = timeLeft;
                        showTimePenalty(timePenalty);
                        combo = 0;
                        updateComboDisplay();
                        updateDifficulty();


                        timerDisplay.style.color = "red";
                        timerDisplay.classList.add("score-pop");

                        setTimeout(() => {
                            timerDisplay.classList.remove("score-pop");
                        }, 300);


                        document.body.classList.add("damage");

                        setTimeout(() => {
                            document.body.classList.remove("damage");
                        }, 400);

                        const wrongCard = document.querySelector(
                            `.card[data-symbol="${draggedSymbol}"]`
                        );

                        if (wrongCard) {
                            wrongCard.classList.add("wrong");
                            setTimeout(() => wrongCard.classList.remove("wrong"), 300);
                        }

                        if (selectedCard) {
                            selectedCard.classList.remove("selected");
                            selectedCard = null;
                        }
                    }
                };

                cell.addEventListener("drop", function (e) {
                    e.preventDefault();
                    const draggedSymbol = e.dataTransfer.getData("text");
                    handlePlacement(draggedSymbol);
                });

                cell.addEventListener("click", function () {
                    if (selectedCard) {
                        handlePlacement(selectedCard.dataset.symbol);
                    }
                });

            } else {
                cell.textContent = el.symbol;
            }

            table.appendChild(cell);
        });
    }

    function updateDifficulty() {

        if (score >= 4000) {
            difficultyTier = 4;
        }
        else if (score >= 3000) {
            difficultyTier = 3;
        }
        else if (score >= 1500) {
            difficultyTier = 2;
        }
        else {
            difficultyTier = 1;
        }

    }

    function pickRandomMissing() {

        missingElements = [];

        let missingCount = 5;

        if (difficultyTier >= 3) {
            missingCount = 8;
        }

        while (missingElements.length < missingCount) {

            const randomIndex = Math.floor(Math.random() * elements.length);

            if (!missingElements.includes(randomIndex)) {
                missingElements.push(randomIndex);
            }
        }
    }

    function startNewRound() {
        pickRandomMissing();
        createTable();
        createCards();

        if (difficultyTier === 1) timeLeft = 80
        if (difficultyTier === 2) timeLeft = 100
        if (difficultyTier === 3) timeLeft = 90
        if (difficultyTier === 4) timeLeft = 80
        timerDisplay.textContent = timeLeft;

        clearInterval(timerInterval);
        gameStarted = false;
        startTimer();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft > 60) {
                timerDisplay.style.color = "green"
            }
            if (timeLeft <= 60) {
                timerDisplay.style.color = "orange";
            }

            if (timeLeft <= 30) {
                timerDisplay.style.color = "red";
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                gameOver();
            }

            if (timeLeft <= 0) {

                clearInterval(timerInterval)

                openMenu("Game Over")

            }
        }, 1000);
    }



    function createCards() {
        cardContainer.innerHTML = "";

        missingElements.forEach(index => {
            const el = elements[index];

            const card = document.createElement("div");
            card.classList.add("card");
            card.textContent = el.symbol;
            card.draggable = true;
            card.dataset.symbol = el.symbol;

            card.addEventListener("dragstart", dragStart);
            
            card.addEventListener("click", function() {
                if (selectedCard) {
                    selectedCard.classList.remove("selected");
                }
                
                if (selectedCard === this) {
                    selectedCard = null;
                } else {
                    selectedCard = this;
                    this.classList.add("selected");
                }
            });

            cardContainer.appendChild(card);
        });
    }

    function dragStart(e) {
        e.dataTransfer.setData("text", e.target.dataset.symbol);
    }

    function nextRound() {
        clearInterval(timerInterval);

        setTimeout(() => {
            pickRandomMissing();
            createTable();
            createCards();

            timeLeft = 80;
            timerDisplay.style.color = "green";
            timerDisplay.textContent = timeLeft;

            startTimer();
        }, 800);
    }

    

    function updateScoreColor() {
        const scoreEl = document.getElementById("score");
        const comboGain = document.getElementById("totalGainH3");

        scoreEl.classList.remove(
            "score-negative",
            "score-low",
            "score-medium",
            "score-high",
            "score-legend",
            "score-mythic"
        );

        comboGain.classList.remove(
            "score-negative",
            "score-low",
            "score-medium",
            "score-high",
            "score-legend",
            "score-mythic"
        );

        if (score < 0) {
            scoreEl.classList.add("score-negative");
        } else if (score < 500) {
            scoreEl.classList.add("score-low");
        } else if (score < 1000) {
            scoreEl.classList.add("score-medium");
        } else if (score < 3000) {
            scoreEl.classList.add("score-high");
        } else if (score < 5000) {
            scoreEl.classList.add("score-legend");
        } else {
            scoreEl.classList.add("score-mythic");
        }

        if (combo < 300) {
            comboGain.classList.add("score-medium");
        } else if (score < 600) {
            comboGain.classList.add("score-high");
        } else if (score < 900) {
            comboGain.classList.add("score-legend");
        }  else {
            comboGain.classList.add("score-mythic");
        }


        // ทำเอฟเฟคเด้ง
        scoreEl.classList.add("score-pop");
        setTimeout(() => {
            scoreEl.classList.remove("score-pop");
        }, 200);
    }

    function showFloatingScore(points) {
        const container = document.getElementById("floating-score-container");
        const el = document.createElement("div");

        el.textContent = "+" + points;
        el.classList.add("floating-score");

        // เลือกสีตามคะแนน
        if (points < 300) {
            el.classList.add("float-low");
        } else if (points < 600) {
            el.classList.add("float-mid");
        } else if (points < 900) {
            el.classList.add("float-high");
        } else {
            el.classList.add("float-epic");
        }

        container.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 1000);
    }

    function showTimePenalty(seconds) {
        const container = document.getElementById("floating-score-container");
        const el = document.createElement("div");

        el.textContent = "-" + seconds + "s";
        el.classList.add("floating-score");
        el.style.color = "#ff3b3b";

        container.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 1000);
    }

    function updateComboDisplay() {
        if (combo > 1) {
            comboDisplay.textContent = "COMBO x" + combo;
            comboDisplay.classList.add("combo-active");
        } else {
            comboDisplay.classList.remove("combo-active");
        }
    }

    function gameOver() {
        clearInterval(timerInterval);

        alert("⏰ หมดเวลา! เกมโอเวอร์\nคะแนนของคุณ: " + score);

        document.querySelectorAll(".card").forEach(card => {
            card.draggable = false;
        });
    }

    startNewRound();

});


