document.addEventListener('DOMContentLoaded', () => {

    // MENU RESPONSIVO
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            const aberto = menu.classList.toggle('aberto');

            menuBtn.setAttribute(
                'aria-expanded',
                String(aberto)
            );
        });
    }

    // ACESSIBILIDADE
    const body = document.body;

    const contrasteBtn = document.getElementById('contrasteBtn');
    const fonteBtn = document.getElementById('fonteBtn');
    const aumentarBtn = document.getElementById('aumentarBtn');
    const diminuirBtn = document.getElementById('diminuirBtn');

    contrasteBtn?.addEventListener('click', () => {
        const ativo = body.classList.toggle('alto-contraste');

        contrasteBtn.setAttribute(
            'aria-pressed',
            String(ativo)
        );
    });

    fonteBtn?.addEventListener('click', () => {
        const ativa = body.classList.toggle('fonte-dislexia');

        fonteBtn.setAttribute(
            'aria-pressed',
            String(ativa)
        );
    });

    // AUMENTAR E DIMINUIR FONTE
    let tamanho = 16;

    function aplicarTamanho() {
        document.documentElement.style.setProperty(
            '--base',
            `${tamanho}px`
        );
    }

    aumentarBtn?.addEventListener('click', () => {
        tamanho = Math.min(22, tamanho + 1);
        aplicarTamanho();
    });

    diminuirBtn?.addEventListener('click', () => {
        tamanho = Math.max(14, tamanho - 1);
        aplicarTamanho();
    });

    // QUIZ
    document.querySelectorAll('[data-answer]').forEach(botao => {

        botao.addEventListener('click', () => {

            const selecionada = document.querySelector(
                'input[name="q1"]:checked'
            );

            const feedback = document.getElementById(
                botao.dataset.feedback
            );

            if (!feedback) return;

            if (!selecionada) {
                feedback.textContent =
                    'Selecione uma alternativa antes de conferir.';

            } else if (
                selecionada.value === botao.dataset.answer
            ) {
                feedback.textContent =
                    'Muito bem! O pico se desloca para comprimentos de onda menores.';

            } else {
                feedback.textContent =
                    'Ainda não! Pense na relação entre temperatura e comprimento de onda.';
            }

        });

    });

});
