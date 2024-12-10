async function enviaEmprestimo() {
    // Recupera os valores do formulário (ajuste os índices para o formulário correspondente)
    const emprestimoDTO = {
        id_aluno: parseInt(document.querySelectorAll("input")[0].value),
        id_livro: parseInt(document.querySelectorAll("input")[1].value),
        dataEmprestimo: document.querySelectorAll("input")[2].value, // Mantém como string no formato ISO
        dataDevolução: document.querySelectorAll("input")[3].value,
        statusEmprestimo: document.querySelectorAll("input")[4].value,
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/emprestimo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emprestimoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Empréstimo cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        alert(`Erro ao se comunicar com o servidor: ${error.message}`);
    }
}

async function recuperarListaEmprestimos() {
    try {
        const respostaServidor = await fetch('http://localhost:3333/lista/emprestimo');

        if (!respostaServidor.ok) {
            throw new Error("Erro ao recuperar a lista de empréstimos.");
        }

        const listaDeEmprestimos = await respostaServidor.json();

        // Valida se a resposta é um array
        if (Array.isArray(listaDeEmprestimos)) {
            criarTabelaEmprestimos(listaDeEmprestimos);
        } else {
            console.error("Resposta da API inválida:", listaDeEmprestimos);
        }
    } catch (error) {
        console.error("Erro ao recuperar a lista de empréstimos:", error.message);
    }
}

function criarTabelaEmprestimos(emprestimos) {
    try {
        const tBody = document.querySelector('tbody');

        // Remove linhas antigas antes de recriar a tabela
        tBody.innerHTML = "";

        emprestimos.forEach(emprestimo => {
            const tr = document.createElement('tr');

            // Cria e adiciona a célula para o ID do livro
            const tdIdLivro = document.createElement('td');
            tdIdLivro.textContent = emprestimo.idLivro;
            tr.appendChild(tdIdLivro);

            // Cria e adiciona a célula para o ID do aluno
            const tdIdAluno = document.createElement('td');
            tdIdAluno.textContent = emprestimo.idAluno;
            tr.appendChild(tdIdAluno);

            // Cria e adiciona a célula para a data de empréstimo
            const tdDataEmprestimo = document.createElement('td');
            tdDataEmprestimo.textContent = new Date(emprestimo.dataEmprestimo).toLocaleDateString();
            tr.appendChild(tdDataEmprestimo);

            // Cria e adiciona a célula para a data de devolução
            const tdDataDevolucao = document.createElement('td');
            tdDataDevolucao.textContent = new Date(emprestimo.dataDevolucao).toLocaleDateString();
            tr.appendChild(tdDataDevolucao);

            // Cria e adiciona a célula para o status
            const tdStatus = document.createElement('td');
            tdStatus.textContent = emprestimo.statusEmprestimo;
            tr.appendChild(tdStatus);

            // Cria e adiciona a célula de ações
            const tdAcoes = document.createElement('td');

            // Adiciona o botão de editar
            const imgEditar = document.createElement('img');
            imgEditar.src = './assets/icons/pencil-square.svg';
            imgEditar.alt = 'Editar';
            imgEditar.classList.add('btn-editar');
            tdAcoes.appendChild(imgEditar);

            // Adiciona o botão de deletar
            const imgDeletar = document.createElement('img');
            imgDeletar.src = './assets/icons/trash-fill.svg';
            imgDeletar.alt = 'Deletar';
            imgDeletar.classList.add('btn-deletar');
            tdAcoes.appendChild(imgDeletar);

            tr.appendChild(tdAcoes);

            // Adiciona a linha na tabela
            tBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao criar a tabela de empréstimos:", error.message);
    }
}


