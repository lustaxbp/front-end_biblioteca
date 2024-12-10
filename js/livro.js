async function enviaLivro() {
    // Recupera os valores do formulário (ajuste os índices de acordo com o formulário correspondente)
    const livroDTO = {
        titulo: document.querySelectorAll("input")[0].value,
        autor: document.querySelectorAll("input")[1].value,
        editora: document.querySelectorAll("input")[2].value,
        anoPublicacao: document.querySelectorAll("input")[3].value,
        isbn: document.querySelectorAll("input")[4].value,
        quantTotal: parseInt(document.querySelectorAll("input")[5].value),
        quantDisponivel: parseInt(document.querySelectorAll("input")[6].value),
        valorAquisicao: parseFloat(document.querySelectorAll("input")[7].value),
        statusLivroEmprestado: document.querySelectorAll("input")[8].value,
    };

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema.");
        }

        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error.message);
        alert(`Erro ao se comunicar com o servidor: ${error.message}`);
    }
}

async function recuperarListaLivros() {
    try {
        const respostaServidor = await fetch('http://localhost:3333/lista/livros');

        if (!respostaServidor.ok) {
            throw new Error("Erro ao recuperar a lista de livros.");
        }

        const listaDeLivros = await respostaServidor.json();

        // Valida se a resposta é um array
        if (Array.isArray(listaDeLivros)) {
            criarTabelaLivros(listaDeLivros);
        } else {
            console.error("Resposta da API inválida:", listaDeLivros);
        }
    } catch (error) {
        console.error("Erro ao recuperar a lista de livros:", error.message);
    }
}

function criarTabelaLivros(livros) {
    try {
        const tBody = document.querySelector('tbody');

        // Remove linhas antigas antes de recriar a tabela
        tBody.innerHTML = "";

        livros.forEach(livro => {
            const tr = document.createElement('tr');

            // Cria e adiciona a célula para o ID
            const tdId = document.createElement('td');
            tdId.textContent = livro.idLivro;
            tr.appendChild(tdId);

            // Cria e adiciona a célula para o título
            const tdTitulo = document.createElement('td');
            tdTitulo.textContent = livro.titulo;
            tr.appendChild(tdTitulo);

            // Cria e adiciona a célula para o autor
            const tdAutor = document.createElement('td');
            tdAutor.textContent = livro.autor;
            tr.appendChild(tdAutor);

            // Cria e adiciona a célula para a editora
            const tdEditora = document.createElement('td');
            tdEditora.textContent = livro.editora;
            tr.appendChild(tdEditora);

            // Cria e adiciona a célula para o ano de publicação
            const tdAnoPublicacao = document.createElement('td');
            tdAnoPublicacao.textContent = livro.anoPublicacao;
            tr.appendChild(tdAnoPublicacao);

            // Cria e adiciona a célula para o ISBN
            const tdIsbn = document.createElement('td');
            tdIsbn.textContent = livro.isbn;
            tr.appendChild(tdIsbn);

            // Cria e adiciona a célula para quantidade disponível
            const tdDisponiveis = document.createElement('td');
            tdDisponiveis.textContent = livro.quantDisponivel;
            tr.appendChild(tdDisponiveis);

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
        console.error("Erro ao criar a tabela de livros:", error.message);
    }
}
