import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  border: 1px solid #ff4081;
  box-shadow: 0 0 20px rgba(255, 64, 129, 0.3);
`;

const Title = styled.h2`
  color: white;
  margin-top: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #333;
  color: white;
  
  &:focus {
    outline: none;
    border-color: #ff4081;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-color: ${props => props.primary ? '#ff4081' : '#555'};
  color: white;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #333;
    color: #777;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default function Modal({ isOpen, onClose, aula }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const dadosInscricao = {
      nome,
      email,
      aula: aula.style 
    };

    try {
      
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const resposta = await fetch(`${API_URL}/inscrever`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosInscricao),
      });

      if (resposta.ok) {
      
        toast.success(`🎉 Inscrição confirmada para ${nome}!`);
        
        setNome('');
        setEmail('');
        onClose();
      } else {
        toast.error('❌ Ops! Algo deu errado no servidor.');
      }
    } catch (erro) {
      console.error(erro);
      toast.error('🔌 Erro de conexão! O servidor está ligado?');
    } finally {
      
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>Inscrição: {aula?.style}</Title>
        <p style={{color: '#ccc'}}>Preencha seus dados para garantir a vaga.</p>
        
        <form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Seu Nome Completo" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={loading}
          />
          <Input 
            type="email" 
            placeholder="Seu E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          
          <ButtonGroup>
            <Button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            
            <Button primary type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Confirmar'}
            </Button>
          </ButtonGroup>
        </form>
      </ModalContainer>
    </Overlay>
  );
}