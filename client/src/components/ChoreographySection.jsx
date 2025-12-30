import { useState } from 'react';
import styled from 'styled-components';
import SubmissionModal from './SubmissionModal';

const Section = styled.section`
  padding: 4rem 2rem;
  background-color: #1a1a1a;
  color: white;
  text-align: center;
  border-top: 1px solid #333;
`;
const Title = styled.h2`
  font-size: 2.5rem; margin-bottom: 2rem;
  span { color: #ff4081; }
`;
const RulesBox = styled.div`
  background-color: #222; max-width: 800px; margin: 0 auto 2rem auto;
  padding: 2rem; border-radius: 10px; border-left: 5px solid #ff4081; text-align: left;
`;
const RuleItem = styled.li`
  margin-bottom: 10px; font-size: 1.1rem; color: #ccc;
`;
const Button = styled.button`
  padding: 15px 40px; font-size: 1.2rem; font-weight: bold; background-color: transparent;
  border: 2px solid #ff4081; color: #ff4081; border-radius: 50px; cursor: pointer; transition: all 0.3s;
  &:hover { background-color: #ff4081; color: white; }
`;

export default function ChoreographySection() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Section>
      <Title>Submeta sua <span>Coreografia</span></Title>
      
      <RulesBox>
        <h3 style={{marginTop: 0}}>📋 Regulamento para envio:</h3>
        <ul>
          <RuleItem>🔗 <strong>Vídeo:</strong> Envie um link do YouTube ou Drive (Google Drive, Dropbox) liberado para visualização.</RuleItem>
          <RuleItem>🎵 <strong>Música:</strong> Envie o arquivo de áudio em alta qualidade (MP3 ou WAV).</RuleItem>
          <RuleItem>⏱️ <strong>Duração:</strong> A música deve ter no máximo 5 minutos.</RuleItem>
          <RuleItem>📝 <strong>Descrição:</strong> Inclua uma breve defesa artística da obra.</RuleItem>
        </ul>
      </RulesBox>

      <Button onClick={() => setModalOpen(true)}>Enviar Material</Button>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  );
}