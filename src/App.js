import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({}); 
  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum cep!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data); // atualize o estado cep com os dados recebidos
      setInput("");
    } catch {
      alert("Cep não encontrado");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonsearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}</span>
        </main>
         )}
    </div>
  );
}

export default App;