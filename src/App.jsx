import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState("")

  function limpaTabela(){

    var tabela = document.getElementById("repos");
    var linhas = tabela.rows;
    for (var i = linhas.length - 1; i >= 0; i--) {
      
      linhas[i].remove();
      
    }

  }

  function handleBuscar(){

    limpaTabela();
    axios.get(`https://api.github.com/users/${usuario}`).then(response => loadData(response.data));
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => loadRepos(response.data));

    var cont = document.querySelectorAll(".cont");

    cont.forEach(e=> {
      
        var isLoaded = e.classList.contains("load");
      
        if(!isLoaded){

          e.classList.add("load")

        } 

    });
 
  }

  function loadData(response){

    console.log(response)
    document.getElementById('img').style.backgroundImage = `url(${response.avatar_url})`; 
    document.getElementById('nomeusuario').textContent=`${response.login} (${response.name})`;
    document.getElementById('companhia').textContent=`${response.company} - ${response.location}`;
    document.getElementById('link').setAttribute("href",`${response.html_url}`);

  }


  function loadRepos(response){

    console.log(response)
    
    var tabela = document.getElementById("repos");

    response.forEach(e => {
      
      var linha = document.createElement("tr");
      var coluna1 = document.createElement("td");
      var coluna2 = document.createElement("td");

      coluna1.textContent = `${e.name} - ${e.description}`

      linha.appendChild(coluna1)

      let link = document.createElement("a");

      link.href =`${e.html_url}`
      link.target='_blank' 
      link.rel="noopener noreferrer"
      link.textContent="Link Repo"

      coluna2.appendChild(link)

      if(e.homepage != null){

      let link = document.createElement("a");

      link.href =`${e.homepage}`
      link.target='_blank' 
      link.rel="noopener noreferrer"
      link.textContent="Link Homepage"

      coluna2.appendChild(link)

      }

      linha.appendChild(coluna2)

      tabela.appendChild(linha)

    });

  }
  

  return (
    <>

      <h1>Pesquisa de perfil Github</h1>
      <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder='Digite o nome de usuário'/>
      <button onClick={handleBuscar}>Pesquisar</button>

      <div className='cont' id='imgDiv'>

          <div id='img'>

          </div>

      </div>

      <div className='cont'>

        <h2 id="nomeusuario"></h2>

      </div>

      <div className='cont'>

        <p id="companhia"></p>

      </div>

      <div className='cont'>

        <a id="link" href='' target='_blank' rel="noopener noreferrer"><img id='github' src="https://cdn-icons-png.flaticon.com/128/733/733553.png"/><p> Link </p></a>

      </div>

      <div className='cont'>

        <h2>Repositórios</h2>

        <table id='repos'>

          <tbody>

              {


              }

          </tbody>

        </table>

      </div>

    
    </>
  )
}

export default App
