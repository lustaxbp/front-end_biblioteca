async function enviaFormulario() {
    // Recupera os valores do formulário
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "sobrenome": document.querySelectorAll("input")[1].value,
        "dataNascimento": document.querySelectorAll("input")[2].value, // Mantém como string
        "endereco": document.querySelectorAll("input")[3].value,
        "email": document.querySelectorAll("input")[4].value,
        "celular": document.querySelectorAll("input")[5].value,
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/aluno", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }

        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        alert(`Erro ao se comunicar com o servidor: ${error.message}`);
    }
}

async function recuperarListaAlunos() {
    try {
        const respostaServidor = await fetch('http://localhost:3333/lista/alunos');

        if (!respostaServidor.ok) {
            throw new Error("Erro ao recuperar a lista de alunos.");
        }

        const listaDeAlunos = await respostaServidor.json();

        // Valida se a resposta é um array
        if (Array.isArray(listaDeAlunos)) {
            criarTabelaAlunos(listaDeAlunos);
        } else {
            console.error("Resposta da API inválida:", listaDeAlunos);
        }
    } catch (error) {
        console.error("Erro ao recuperar a lista de alunos:", error.message);
    }
}

function criarTabelaAlunos(alunos) {
    try {
        const tBody = document.querySelector('tbody');

        // Remove linhas antigas antes de recriar a tabela
        tBody.innerHTML = "";

        alunos.forEach(aluno => {
            const tr = document.createElement('tr');

            // Cria e adiciona a célula para o ID do aluno
            const tdIdAluno = document.createElement('td');
            tdIdAluno.textContent = aluno.id;
            tr.appendChild(tdIdAluno);

            // Cria e adiciona a célula para o nome do aluno
            const tdNomeAluno = document.createElement('td');
            tdNomeAluno.textContent = aluno.nome;
            tr.appendChild(tdNomeAluno);

            // Cria e adiciona a célula para o sobrenome do aluno
            const tdSobrenome = document.createElement('td');
            tdSobrenome.textContent = aluno.sobrenome;
            tr.appendChild(tdSobrenome);

            // Cria e adiciona a célula para o celular do aluno
            const tdCelularAluno = document.createElement('td');
            tdCelularAluno.textContent = aluno.celular;
            tr.appendChild(tdCelularAluno);

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
        console.error("Erro ao criar a tabela de alunos:", error.message);
    }
}


