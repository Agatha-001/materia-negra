document.addEventListener('DOMContentLoaded', () => {

    // SIMULADOR DE CORPO NEGRO

    const temp = document.getElementById('tempCorpo');
    const canvas = document.getElementById('graficoCorpo');

    if (temp && canvas) {

        const ctx = canvas.getContext('2d');

        const out = document.getElementById('tempOut');
        const picoOut = document.getElementById('picoOut');

        // Constantes físicas
        const h = 6.62607015e-34;
        const c = 299792458;
        const k = 1.380649e-23;
        const b = 2.897771955e-3;

        function desenhar() {

            const T = Number(temp.value);

            out.textContent = T.toLocaleString('pt-BR');

            const picoNm = (b / T) * 1e9;

            picoOut.textContent =
                `Pico aproximado pela lei de Wien: ${picoNm.toFixed(0)} nm`;

            const W = canvas.width;
            const H = canvas.height;

            const left = 65;
            const right = 20;
            const top = 22;
            const bottom = 48;

            ctx.clearRect(0, 0, W, H);

            ctx.fillStyle = '#f8fcff';
            ctx.fillRect(0, 0, W, H);

            // Eixos
            ctx.strokeStyle = '#9fb7c8';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(left, top);
            ctx.lineTo(left, H - bottom);
            ctx.lineTo(W - right, H - bottom);
            ctx.stroke();

            ctx.font = '18px Arial';
            ctx.fillStyle = '#17324d';

            ctx.fillText('Intensidade relativa', 12, 20);
            ctx.fillText(
                'Comprimento de onda (nm)',
                W / 2 - 110,
                H - 8
            );

            // Cálculo da radiação de Planck
            const minNm = 100;
            const maxNm = 3000;
            const points = 450;

            let vals = [];

            for (let i = 0; i < points; i++) {

                const nm = minNm +
                    (maxNm - minNm) * i / (points - 1);

                const lam = nm * 1e-9;

                const exponent =
                    (h * c) / (lam * k * T);

                const denom = Math.expm1(
                    Math.min(exponent, 700)
                );

                const intensity =
                    (2 * h * c * c) /
                    (Math.pow(lam, 5) * denom);

                vals.push({
                    nm,
                    intensity
                });
            }

            const maxI = Math.max(
                ...vals.map(v => v.intensity)
            );

            // Desenhar curva
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 4;
            ctx.beginPath();

            vals.forEach((v, i) => {

                const x = left +
                    (v.nm - minNm) /
                    (maxNm - minNm) *
                    (W - left - right);

                const y = H - bottom -
                    (v.intensity / maxI) *
                    (H - top - bottom);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

            });

            ctx.stroke();

            // Região aproximada da luz visível
            const x1 = left +
                (380 - minNm) /
                (maxNm - minNm) *
                (W - left - right);

            const x2 = left +
                (750 - minNm) /
                (maxNm - minNm) *
                (W - left - right);

            ctx.fillStyle = '#facc1530';

            ctx.fillRect(
                x1,
                top,
                x2 - x1,
                H - top - bottom
            );

            ctx.fillStyle = '#17324d';
            ctx.font = '15px Arial';

            ctx.fillText('100', left - 10, H - bottom + 25);
            ctx.fillText('1000', left + 110, H - bottom + 25);
            ctx.fillText('2000', left + 400, H - bottom + 25);
            ctx.fillText('3000', W - right - 35, H - bottom + 25);

            ctx.fillText('Faixa visível', x1 + 5, top + 18);

        }

        temp.addEventListener('input', desenhar);

        desenhar();
    }

    // SIMULADOR DE AQUECIMENTO DA PISCINA

    const ids = [
        'volume',
        'area',
        'sol',
        'horas'
    ];

    const els = {};

    ids.forEach(id => {
        els[id] = document.getElementById(id);
    });

    if (ids.every(id => els[id])) {

        const outputs = {
            volume: document.getElementById('volumeOut'),
            area: document.getElementById('areaOut'),
            sol: document.getElementById('solOut'),
            horas: document.getElementById('horasOut')
        };

        const delta = document.getElementById('deltaTemp');

        const explicacao =
            document.getElementById('explicacaoPiscina');

        function atualizar() {

            const V = Number(els.volume.value);
            const A = Number(els.area.value);
            const G = Number(els.sol.value);

            const t = Number(els.horas.value) * 3600;

            // Eficiência didática de 50%
            const eficiencia = 0.50;

            // Energia térmica aproveitada
            const energia = G * A * t * eficiencia;

            // Calor específico da água
            const calorEspecifico = 4186;

            // V litros aproximadamente equivalem a V kg
            const aumento =
                energia / (V * calorEspecifico);

            outputs.volume.textContent =
                V.toLocaleString('pt-BR');

            outputs.area.textContent = A;
            outputs.sol.textContent = G;
            outputs.horas.textContent = els.horas.value;

            delta.textContent =
                `+${aumento.toFixed(2)} °C`;

            explicacao.textContent =
                `Com esses valores, o modelo idealizado estima ${
                    Math.round(energia / 1000000)
                } MJ de energia útil. Na piscina real, perdas térmicas e condições do sistema alteram o resultado.`;

        }

        ids.forEach(id => {
            els[id].addEventListener('input', atualizar);
        });

        atualizar();
    }

});
