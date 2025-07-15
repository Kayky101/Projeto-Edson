document.addEventListener('DOMContentLoaded', () => {

    const listaTransacoesEl = document.getElementById('lista-transacoes');
    const form = document.getElementById('form-transacao');
    const inputDescricao = document.getElementById('descricao');
    const inputValor = document.getElementById('valor');

    let transacoes = [];

    function addTransactionDOM(transacao) {
        const tipo = transacao.valor > 0 ? 'receita' : 'despesa';
        const sinal = transacao.valor > 0 ? '+' : '-';
        const item = document.createElement('li');
        item.classList.add(tipo);
        item.innerHTML = `
            ${transacao.descricao}
            <span>${sinal} R$ ${Math.abs(transacao.valor).toFixed(2)}</span>
            <button class="btn-delete">x</button>
        `;
        listaTransacoesEl.appendChild(item);
    }
    
    function init() {
        listaTransacoesEl.innerHTML = '';
        transacoes.forEach(addTransactionDOM);
    }

    function addTransacao(e) {
        e.preventDefault();
        if (inputDescricao.value.trim() === '' || inputValor.value.trim() === '') {
            alert('Por favor, preencha a descrição e o valor.');
            return;
        }
        const transacao = {
            id: Math.floor(Math.random() * 100000000),
            descricao: inputDescricao.value,
            valor: parseFloat(inputValor.value)
        };
        transacoes.push(transacao);
        init();
        inputDescricao.value = '';
        inputValor.value = '';
    }

    init();
    form.addEventListener('submit', addTransacao);
});