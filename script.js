function updateQuantity(taskId, change) {
    let quantitySpan = document.getElementById(taskId + "Quantity");
    let pointsSpan = document.getElementById(taskId + "Points");
    let progressSpan = document.getElementById(taskId + "Value");

    let quantity = parseInt(quantitySpan.innerText) + change;
    if (quantity < 0) quantity = 0;

    let maxPoints = 500;
    let progress = Math.round((quantity / maxPoints) * 100);

    quantitySpan.innerText = quantity;
    pointsSpan.innerText = quantity;
    progressSpan.innerText = progress + "%";

    checkCompletion(); // Verifica se todas as tarefas chegaram a 100%
}

// Lista de monstros (IDs usados no HTML)
const monsters = [
    "gosmas", "brutoDasSombras", "morcego", "esqueleto", "inseto",
    "cavador", "espiritoDaPoeira", "caranguejoPedra", "mumia",
    "pimentaRex", "serpente", "espiritoDeMagma"
];

// Verifica se todas as porcentagens chegaram a 100%
function checkCompletion() {
    let allComplete = monsters.every(monster => {
        let progressSpan = document.getElementById(monster + "Value");
        return progressSpan.innerText === "100%";
    });

    if (allComplete) {
        showConfetti();
    }
}

// Função para exibir confetes
function showConfetti() {
    let confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";
    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.top = "0";
    confettiCanvas.style.left = "0";
    confettiCanvas.style.width = "100%";
    confettiCanvas.style.height = "100%";
    confettiCanvas.style.pointerEvents = "none"; // Não atrapalhar cliques

    document.body.appendChild(confettiCanvas);

    let confettiScript = document.createElement("script");
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2";
    confettiScript.onload = () => {
        let canvas = document.getElementById("confettiCanvas");
        let myConfetti = confetti.create(canvas, { resize: true });

        myConfetti({
            particleCount: 500,
            spread: 100,
            startVelocity: 40,
            gravity: 0.5,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            document.body.removeChild(confettiCanvas);
        }, 5000); // Remove os confetes após 5 segundos
    };

    document.body.appendChild(confettiScript);
}
