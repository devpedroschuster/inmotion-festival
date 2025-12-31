import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.8); z-index: 1000;
  display: flex; justify-content: center; align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #1a1a1a; padding: 2rem; border-radius: 10px;
  width: 90%; max-width: 600px; border: 1px solid #ff4081;
`;

const Input = styled.input`
  width: 100%; padding: 10px; margin: 10px 0; border-radius: 5px;
  border: 1px solid #333; background-color: #333; color: white;
`;

const TextArea = styled.textarea`
  width: 100%; padding: 10px; margin: 10px 0; border-radius: 5px;
  border: 1px solid #333; background-color: #333; color: white;
  min-height: 100px;
`;

const Label = styled.label`
  color: #ff4081; font-weight: bold; display: block; margin-top: 10px;
`;

const Button = styled.button`
  width: 100%; padding: 12px; margin-top: 15px;
  background-color: #ff4081; color: white; border: none; font-weight: bold;
  border-radius: 5px; cursor: pointer;
  
  &:disabled { background-color: #555; cursor: not-allowed; }
`;

const SmallText = styled.small`
  display: block; color: #888; margin-top: -5px; margin-bottom: 10px;
`;

export default function SubmissionModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nomeCoreografia: '',
    coreografo: '',
    descricao: '',
    email: '',
    videoLink: ''
  });
  const [musicFile, setMusicFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!musicFile) {
      toast.error('Por favor, anexe o arquivo da música!');
      return;
    }
    if (!form.videoLink.includes('http')) {
      toast.warning('O link do vídeo parece inválido (deve começar com http...)');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('nomeCoreografia', form.nomeCoreografia);
    formData.append('coreografo', form.coreografo);
    formData.append('descricao', form.descricao);
    formData.append('email', form.email);
    formData.append('videoLink', form.videoLink);
    formData.append('musica', musicFile);

    try {
      const resposta = await fetch(`${API_URL}/submeter-coreografia`, {
        method: 'POST',
        body: formData, 
      });

      if (resposta.ok) {
        toast.success('Coreografia e música enviadas! 🎵');
        onClose();

        setForm({ nomeCoreografia: '', coreografo: '', descricao: '', email: '', videoLink: '' });
        setMusicFile(null);
      } else {
        toast.error('Erro ao enviar.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <h2 style={{color: 'white', marginTop: 0}}>Inscrição de Obra</h2>
        <form onSubmit={handleSubmit}>
          
          <Input placeholder="Nome da Coreografia" required 
            value={form.nomeCoreografia} 
            onChange={e => setForm({...form, nomeCoreografia: e.target.value})} 
          />
          
          <Input placeholder="Nome do Coreógrafo(a)" required 
            value={form.coreografo} 
            onChange={e => setForm({...form, coreografo: e.target.value})} 
          />

          <Input type="email" placeholder="E-mail de Contato" required 
            value={form.email} 
            onChange={e => setForm({...form, email: e.target.value})} 
          />

          <TextArea placeholder="Breve explicação da coreografia / conceito..." required 
            value={form.descricao} 
            onChange={e => setForm({...form, descricao: e.target.value})} 
          />

          <Label>Link do Vídeo (YouTube/Drive):</Label>
          <Input 
            type="url" 
            placeholder="https://youtube.com/..." 
            required 
            value={form.videoLink}
            onChange={e => setForm({...form, videoLink: e.target.value})}
          />
          <SmallText>Certifique-se de que o link esteja público ou não listado.</SmallText>

          <Label>Arquivo de Música (MP3/WAV):</Label>
          <Input type="file" accept="audio/*" required 
            onChange={e => setMusicFile(e.target.files[0])} 
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Enviando Arquivos...' : 'Submeter Coreografia'}
          </Button>
          <button type="button" onClick={onClose} style={{background: 'none', border: 'none', color: '#ccc', width: '100%', marginTop: '10px', cursor: 'pointer'}}>Cancelar</button>
        </form>
      </ModalContainer>
    </Overlay>
  );
}