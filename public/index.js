const token = sessionStorage.getItem('token');
if(token){
  const login = document.querySelector('.login');
  const dashboard = document.querySelector('.dashboard');
  login.style.display = 'none';
  dashboard.style.display = 'flex';
  alert("token encontrado, redirecionando para dashboard");
}

document.getElementById('atualizar').addEventListener('click', atualizarTarefas);

function atualizarTarefas() {
  fetch('tarefas.json')
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaTarefas');
      lista.innerHTML = ''; // Limpa a lista antes de adicionar os novos dados

      data.forEach(tarefa => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>Código:</strong> ${tarefa.codigo} <br>
          <strong>Nome:</strong> ${tarefa.nome} <br>
          <strong>Descrição:</strong> ${tarefa.descricao} <br>
          <strong>Data de Criação:</strong> ${tarefa.dataCriacao}
        `;
        lista.appendChild(listItem);
      });
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));
}

document.getElementById('button-login').addEventListener('click', login);

async function login() {
  const usuario = document.getElementById('usuario')
  console.log("usuario: ",usuario.value)
  const senha = document.getElementById('senha')
  console.log("senha: ",senha.value)
  
  if(usuario.value == "admin" && senha.value == "123") {
    const username = usuario.value;
    const response = 
    await fetch('/generate-token', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify({ username }) 
    }); 

    const data = await response.json(); 
    if (response.ok) { 
      sessionStorage.setItem('token', data.token); 
    } else { 
      document.getElementById('message').innerText = data.message;
    }

    sessionStorage.setItem('token', data.token);

    const login = document.querySelector('.login');
    const dashboard = document.querySelector('.dashboard');
    login.style.display = 'none';
    dashboard.style.display = 'flex';

    alert("logado com sucesso!")
  } else {
    console.log("usuario invalido");
  }

}