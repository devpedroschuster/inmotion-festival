import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import API_URL from '../api';

const classes = [
  { id: 1, time: '10:00', style: 'Jazz Funk', instructor: 'Prof. Amanda', level: 'Iniciante' },
  { id: 2, time: '13:00', style: 'Hip Hop Avançado', instructor: 'B-Boy Zulu', level: 'Avançado' },
  { id: 3, time: '15:30', style: 'Contemporâneo', instructor: 'Marta Silva', level: 'Intermediário' },
  { id: 4, time: '17:00', style: 'K-Pop Cover', instructor: 'Grupo Stars', level: 'Todos' },
  { id: 5, time: '19:00', style: 'Urban Dance', instructor: 'Carlos D.', level: 'Avançado' },
  { id: 6, time: '20:30', style: 'Ballet Clássico', instructor: 'Ana Beatriz', level: 'Iniciante' },
];

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: #121212;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  
  span {
    border-bottom: 3px solid #ff4081;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #333;
  transition: transform 0.3s, border-color 0.3s;
  text-align: left;

  &:hover {
    transform: translateY(-5px);
    border-color: #ff4081;
  }
`;

const Time = styled.div`
  color: #ff4081;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ClassName = styled.h3`
  color: white;
  margin: 0 0 10px 0;
  font-size: 1.5rem;
`;

const Instructor = styled.p`
  color: #aaa;
  margin: 0;
  font-size: 0.9rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: 2px solid #ff4081;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ff4081;
    color: white;
  }
`;

export default function Schedule() {

  const [selectedClass, setSelectedClass] = useState(null);

  const handleOpenModal = (aula) => {
    setSelectedClass(aula);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
  };

  return (
    <Section>
      <SectionTitle><span>Programação</span> do Evento</SectionTitle>
      
      <Grid>
        {classes.map((aula) => (
          <Card key={aula.id}>
            <Time>⏰ {aula.time}</Time>
            <ClassName>{aula.style}</ClassName>
            <Instructor>Com: {aula.instructor}</Instructor>
            <p style={{color: '#888', fontSize: '0.9rem'}}>Nível: {aula.level}</p>
            <Button onClick={() => handleOpenModal(aula)}>Inscrever-se</Button>
          </Card>
        ))}
      </Grid>

      <Modal 
        isOpen={selectedClass !== null} 
        onClose={handleCloseModal} 
        aula={selectedClass}
      />
      
    </Section>
  );
}