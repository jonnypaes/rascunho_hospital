import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Calendar, 
  Trash2, 
  PlusCircle, 
  Stethoscope, 
  Clock, 
  ClipboardList 
} from 'lucide-react';
import './App.css';

interface Exam {
  id: number;
  name: string;
  price: string;
}

interface Appointment {
  id: number;
  scheduled_at: string;
  patientName: string;
  examType: string;
  dateTime: string;
  observations: string;
  exam: {
    name: string;
  };
}

const API_URL = 'http://localhost:3000';

export default function App() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({ examId: '', dateTime: '', notes: '' });

  useEffect(() => {
    fetchExams();
    fetchAppointments();
  }, []);

  const fetchExams = async () => {
    const res = await axios.get(`${API_URL}/exams`);
    setExams(res.data);
  };

  const fetchAppointments = async () => {
    const res = await axios.get(`${API_URL}/appointments`);
    setAppointments(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/appointments`, {
        // Map frontend names to Entity names
        appointmentDate: formData.dateTime, 
        observations: formData.notes,
        exam: { id: Number(formData.examId) },
        patientName: "Admin", 
      });
  
      setFormData({ examId: '', dateTime: '', notes: '' });
      fetchAppointments();
    } catch (err) {
      alert("Erro ao agendar.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este agendamento?")) {
      await axios.delete(`${API_URL}/appointments/${id}`);
      fetchAppointments();
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Stethoscope size={32} color="#2563eb" />
        <h1>Gestão Médica</h1>
      </header>

      <div className="dashboard-grid">
        {/* Sidebar: Form */}
        <aside className="card sticky-card">
          <h2><PlusCircle size={20} /> Novo Agendamento</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Exame</label>
              <select 
                required 
                value={formData.examId} 
                onChange={e => setFormData({...formData, examId: e.target.value})}
              >
                <option value="">Selecione o Exame</option>
                {exams.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Data e Hora</label>
              <input 
                type="datetime-local" 
                required 
                value={formData.dateTime}
                onChange={e => setFormData({...formData, dateTime: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Observações</label>
              <textarea 
                rows={3}
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            <button type="submit" className="btn-primary">Agendar Agora</button>
          </form>
        </aside>

        {/* Main: List */}
        <main>
          <h2 style={{ marginBottom: '20px' }}>
            <ClipboardList size={20} /> Seus Agendamentos
          </h2>
          
          <div className="appointment-list">
            {appointments.length === 0 && (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
                Nenhum agendamento marcado.
              </p>
            )}
            
            {appointments.map(app => (
              <div key={app.id} className="appointment-item">
                <div className="appointment-info">
                  <h3>{app.examType}</h3>
                  <div className="date-text">
                    <Clock size={14} />
                    {new Date(app.dateTime).toLocaleString('pt-BR')}
                  </div>
                  {app.notes && <div className="notes-box">{app.notes}</div>}
                </div>
                <button className="delete-btn" onClick={() => handleDelete(app.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}