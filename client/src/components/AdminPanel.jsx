import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import API_URL from '../api';

const Container = styled.div`
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: white;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #ff4081;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #333;
  padding: 15px;
  text-align: left;
  color: #ff4081;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #333;
  vertical-align: middle;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.2rem;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: 1px solid #ff4081;
  color: #ff4081;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ff4081;
    color: white;
  }
`;

export default function AdminPanel() {
  const [inscricoes, setInscricoes] = useState([]);

  const carregarDados = () => {
    fetch(`${API_URL}/inscricoes`)
      .then(resposta => resposta.json())
      .then(dados => setInscricoes(dados))
      .catch(erro => console.error(erro));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleDelete = async (id, nome) => {

    if (!window.confirm(`Tem certeza que deseja remover ${nome}?`)) return;

    try {
      const resposta = await fetch(`${API_URL}/inscricoes/${id}`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        toast.success('Inscrição removida!');
      
        setInscricoes(listaAtual => listaAtual.filter(item => item.id !== id));
      } else {
        toast.error('Erro ao remover.');
      }
    } catch (erro) {
      console.error(erro);
      toast.error('Erro de conexão.');
    }
  };

  return (
    <Container>
      <Title>Painel do Organizador 📋</Title>
      
      {inscricoes.length === 0 ? (
        <EmptyMessage>Nenhuma inscrição ainda... 🦗</EmptyMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Aula</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.map((item) => (
              <tr key={item._id}>
                <Td>{item.nome}</Td>
                <Td>{item.email}</Td>
                <Td>{item.aula}</Td>
                <Td>
                  <ActionButton onClick={() => handleDelete(item._id, item.nome)}>
                    Excluir 🗑️
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}