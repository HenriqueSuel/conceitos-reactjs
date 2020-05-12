import React, { useState , useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [ repositories, setRepositories ] = useState([])
  useEffect(() => {
    api.get('/repositories').then(response => setRepositories([...response.data]))
  },{})

  async function handleAddRepository() {
    const data = {
      title: 'Henrique5',
      url: 'Suel',
      techs: ['vueJS']
    }
    api.post('/repositories',data).then(response => setRepositories([...repositories,response.data]))
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      setRepositories(repositories.filter(r => r.id !== id))
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map((value) => 
          <li key={value.id}>
            {value.title} 
          <button onClick={() => handleRemoveRepository(value.id)}>
          Remover
          </button>

          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
