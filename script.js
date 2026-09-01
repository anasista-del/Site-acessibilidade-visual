/* =========================
   MENU DO CELULAR
========================= */
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
    menu.classList.toggle("open");
});

/* =========================
   QUIZ MELHORADO
========================= */
const definitions = document.querySelectorAll(".definition");
const images = document.querySelectorAll(".quiz-image");

let selectedDefinition = null;
let selectedImage = null;
let selectedDefinitionElement = null;
let selectedImageElement = null;

definitions.forEach(function (definition) {
    definition.addEventListener("click", function () {
        // Se já foi acertado antes, não faz nada
        if (definition.classList.contains("correct-pair")) return;

        definitions.forEach(function (item) {
            if (!item.classList.contains("correct-pair")) {
                item.classList.remove("selected");
            }
        });

        definition.classList.add("selected");
        selectedDefinition = definition.dataset.answer;
        selectedDefinitionElement = definition;

        verificarSelecao();
    });
});

images.forEach(function (image) {
    image.addEventListener("click", function () {
        // Se já foi acertado antes, não faz nada
        if (image.classList.contains("correct-pair")) return;

        images.forEach(function (item) {
            if (!item.classList.contains("correct-pair")) {
                item.classList.remove("selected");
            }
        });

        image.classList.add("selected");
        selectedImage = image.dataset.image;
        selectedImageElement = image;

        verificarSelecao();
    });
});

function verificarSelecao() {
    if (selectedDefinition !== null && selectedImage !== null) {
        const resultado = document.getElementById("quizResult");

        if (selectedDefinition === selectedImage) {
            resultado.textContent = "✅ Combinação correta!";
            resultado.style.color = "#2ecc71";

            // Destaca em verde e marca como par correto
            selectedDefinitionElement.classList.remove("selected");
            selectedImageElement.removeEventListener;
            selectedImageElement.classList.remove("selected");
            
            selectedDefinitionElement.classList.add("correct-pair");
            selectedImageElement.classList.add("correct-pair");
            
            // Adiciona estilos visuais diretos de acerto
            selectedDefinitionElement.style.border = "2px solid #2ecc71";
            selectedDefinitionElement.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
            selectedImageElement.style.border = "2px solid #2ecc71";
            selectedImageElement.style.backgroundColor = "rgba(46, 204, 113, 0.2)";

            // Limpa a seleção atual para o próximo par
            selectedDefinition = null;
            selectedImage = null;
            selectedDefinitionElement = null;
            selectedImageElement = null;
        } else {
            resultado.textContent = "❌ Essa combinação não corresponde. Tente novamente!";
            resultado.style.color = "#e74c3c";

            // Destaca temporariamente em vermelho o erro
            const defErrada = selectedDefinitionElement;
            const imgErrada = selectedImageElement;
            
            defErrada.style.border = "2px solid #e74c3c";
            imgErrada.style.border = "2px solid #e74c3c";

            setTimeout(function() {
                if (!defErrada.classList.contains("correct-pair") && defErrada.classList.contains("selected")) {
                    defErrada.classList.remove("selected");
                    defErrada.style.border = "";
                }
                if (!imgErrada.classList.contains("correct-pair") && imgErrada.classList.contains("selected")) {
                    imgErrada.classList.remove("selected");
                    imgErrada.style.border = "";
                }
            }, 1000);

            selectedDefinition = null;
            selectedImage = null;
        }
    }
}

/* =========================
   VERIFICAR QUIZ (TOTAL)
========================= */
document.getElementById("checkQuiz").addEventListener("click", function () {
    let paresAcertados = 0;

    definitions.forEach(function (definition) {
        if (definition.classList.contains("correct-pair")) {
            paresAcertados++;
        }
    });

    const resultado = document.getElementById("quizResult");

    if (paresAcertados === 4) {
        resultado.textContent = "🎉 Espetacular! Você relacionou todos os 4 pares corretamente!";
        resultado.style.color = "#2ecc71";
    } else if (paresAcertados > 0) {
        resultado.textContent = `💡 Você já encontrou ${paresAcertados} par(es) correto(s). Continue procurando os outros!`;
        resultado.style.color = "#f1c40f";
    } else {
        resultado.textContent = "💡 Selecione uma definição da lista e clique na imagem correspondente para testar.";
        resultado.style.color = "#ffffff";
    }
});

/* =========================
   REFAZER QUIZ
========================= */
document.getElementById("resetQuiz").addEventListener("click", function () {
    selectedDefinition = null;
    selectedImage = null;
    selectedDefinitionElement = null;
    selectedImageElement = null;

    definitions.forEach(function (item) {
        item.classList.remove("selected", "correct-pair");
        item.style.border = "";
        item.style.backgroundColor = "";
    });

    images.forEach(function (item) {
        item.classList.remove("selected", "correct-pair");
        item.style.border = "";
        item.style.backgroundColor = "";
    });

    const resultado = document.getElementById("quizResult");
    resultado.textContent = "";
    resultado.style.color = "";
});

/* =========================
   FEEDBACK
========================= */
const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById("comment").value;
    const message = document.getElementById("feedbackMessage");

    if (!rating) {
        message.textContent = "Por favor, escolha uma opção.";
        return;
    }

    if (comment.trim() === "") {
        message.textContent = "Obrigada pelo feedback! Sua avaliação foi registrada nesta demonstração.";
    } else {
        message.textContent = "💚 Obrigada pelo feedback! Sua opinião é muito importante para o nosso projeto.";
    }

    feedbackForm.reset();
});
