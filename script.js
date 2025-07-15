document.addEventListener('DOMContentLoaded', () => {

    const saldoFinalEl = document.getElementById('saldo-final');
    const totalReceitasEl = document.getElementById('total-receitas');
    const totalDespesasEl = document.getElementById('total-despesas');
    const listaTransacoesEl = document.getElementById('lista-transacoes');
    const form = document.getElementById('form-transacao');
    const inputDescricao = document.getElementById('descricao');
    const inputValor = document.getElementById('valor');

    const transacoesDoLocalStorage = JSON.parse(localStorage.getItem('transacoes'));
    let transacoes = transacoesDoLocalStorage !== null ? transacoesDoLocalStorage : [];

    function updateLocalStorage() {
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    }

    function addTransactionDOM(transacao) {
        const tipo = transacao.valor > 0 ? 'receita' : 'despesa';
        const sinal = transacao.valor > 0 ? '+' : '-';
        const item = document.createElement('li');
        item.classList.add(tipo);
        item.innerHTML = `
            ${transacao.descricao}
            <span>${sinal} R$ ${Math.abs(transacao.valor).toFixed(2)}</span>
            <button class="btn-delete" onclick="removeTransacao(${transacao.id})">x</button>
        `;
        listaTransacoesEl.appendChild(item);
    }
    
    function updateDashboard() {
        const valores = transacoes.map(t => t.valor);
        const total = valores.reduce((acc, item) => (acc += item), 0).toFixed(2);
        const receitas = valores.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        const despesas = (valores.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
        
        saldoFinalEl.innerText = `R$ ${total}`;
        totalReceitasEl.innerText = `+ R$ ${receitas}`;
        totalDespesasEl.innerText = `- R$ ${despesas}`;
    }

    function init() {
        listaTransacoesEl.innerHTML = '';
        transacoes.forEach(addTransactionDOM);
        updateDashboard();
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
        updateLocalStorage();
        init();
        inputDescricao.value = '';
        inputValor.value = '';
    }

    window.removeTransacao = function(id) {
        transacoes = transacoes.filter(t => t.id !== id);
        updateLocalStorage();
        init();
    }

    init();
    form.addEventListener('submit', addTransacao);
});