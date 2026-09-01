/* =========================
   MENU DO CELULAR
========================= */

const menuButton =
    document.getElementById("menuButton");

const menu =
    document.getElementById("menu");


menuButton.addEventListener("click", function () {

    menu.classList.toggle("open");

});


/* =========================
   QUIZ
========================= */

const definitions =
    document.querySelectorAll(".definition");

const images =
    document.querySelectorAll(".quiz-image");


let selectedDefinition = null;

let selectedImage = null;


definitions.forEach(function (definition) {

    definition.addEventListener("click", function () {

        definitions.forEach(function (item) {

            item.classList.remove("selected");

        });


        definition.classList.add("selected");


        selectedDefinition =
            definition.dataset.answer;


        verificarSelecao();

    });

});


images.forEach(function (image) {

    image.addEventListener("click", function () {

        images.forEach(function (item) {

            item.classList.remove("selected");

        });


        image.classList.add("selected");


        selectedImage =
            image.dataset.image;


        verificarSelecao();

    });

});


function verificarSelecao() {

    if (
        selectedDefinition !== null &&
        selectedImage !== null
    ) {

        if (
            selectedDefinition ===
            selectedImage
        ) {

            document.getElementById(
                "quizResult"
            ).textContent =
                "✅ Combinação correta!";

        } else {

            document.getElementById(
                "quizResult"
            ).textContent =
                "❌ Essa combinação não corresponde. Tente novamente!";

        }

    }

}


/* =========================
   VERIFICAR QUIZ
========================= */

document
    .getElementById("checkQuiz")
    .addEventListener("click", function () {

        let pontos = 0;


        definitions.forEach(function (definition) {

            const resposta =
                definition.dataset.answer;


            const imagem =
                document.querySelector(
                    `.quiz-image[data-image="${resposta}"]`
                );


            if (
                imagem &&
                imagem.classList.contains("correct")
            ) {

                pontos++;

            }

        });


        /*
          Como o quiz funciona por pares,
          vamos verificar cada combinação
          feita pelo usuário.
        */

        if (
            selectedDefinition !== null &&
            selectedImage !== null &&
            selectedDefinition === selectedImage
        ) {

            pontos = 1;

        }


        const resultado =
            document.getElementById(
                "quizResult"
            );


        if (pontos === 1) {

            resultado.textContent =
                "🎉 Muito bem! Você relacionou corretamente uma definição com sua imagem.";

        } else {

            resultado.textContent =
                "💡 Observe novamente as definições e tente relacioná-las às imagens.";

        }

    });


/* =========================
   REFAZER QUIZ
========================= */

document
    .getElementById("resetQuiz")
    .addEventListener("click", function () {

        selectedDefinition = null;

        selectedImage = null;


        definitions.forEach(function (item) {

            item.classList.remove("selected");

        });


        images.forEach(function (item) {

            item.classList.remove("selected");

        });


        document.getElementById(
            "quizResult"
        ).textContent = "";

    });


/* =========================
   FEEDBACK
========================= */

const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );


feedbackForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const rating =
            document.querySelector(
                'input[name="rating"]:checked'
            );


        const comment =
            document.getElementById(
                "comment"
            ).value;


        const message =
            document.getElementById(
                "feedbackMessage"
            );


        if (!rating) {

            message.textContent =
                "Por favor, escolha uma opção.";

            return;

        }


        if (comment.trim() === "") {

            message.textContent =
                "Obrigada pelo feedback! Sua avaliação foi registrada nesta demonstração.";

        } else {

            message.textContent =
                "💚 Obrigada pelo feedback! Sua opinião é muito importante para o nosso projeto.";

        }


        feedbackForm.reset();

    }
);
