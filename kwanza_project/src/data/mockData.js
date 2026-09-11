// Dados mockados — substitua depois pelas chamadas reais à API

export const currentUser = {
  id: 1,
  name: 'Zuri Mendes',
  initials: 'ZM',
  email: 'zuri.mendes@kwanza.org',
  phone: '',
  birthDate: '',
  bio: 'Apaixonada por liderança e comunicação, em constante evolução no Projeto Kwanza.',
  level: 5,
  levelName: 'Copa',
  xp: 2220,
  xpToNextLevel: 2820,
  streakDays: 12,
  rankPosition: 3,
  score: 4454,
  hours: 112,
  attendance: 81,
  invites: 10,
}

export const nextGoals = [
  { id: 1, label: 'Participe de 3 encontros esta semana', xp: 150, progress: 66 },
  { id: 2, label: 'Conclua 1 módulo de curso', xp: 200, progress: 100 },
  { id: 3, label: 'Convide um novo participante', xp: 100, progress: 0 },
  { id: 4, label: 'Registre uma competência de Liderança', xp: 80, progress: 40 },
]

export const skills = [
  { id: 1, name: 'Comunicação', value: 71 },
  { id: 2, name: 'Liderança', value: 73 },
  { id: 3, name: 'Oratória', value: 60 },
  { id: 4, name: 'Resolução de Conflitos', value: 79 },
  { id: 5, name: 'Trabalho em Equipe', value: 64 },
  { id: 6, name: 'Proatividade', value: 77 },
]

// Versão curta dos rótulos para o gráfico radar
export const radarSkills = [
  { label: 'Comunicação', value: 71 },
  { label: 'Liderança', value: 73 },
  { label: 'Oratória', value: 60 },
  { label: 'Conflitos', value: 79 },
  { label: 'Equipe', value: 64 },
  { label: 'Proatividade', value: 77 },
]

export const medals = [
  { id: 1, name: 'Pontualidade', unlocked: true, color: '#2563eb' },
  { id: 2, name: 'Líder Nato', unlocked: true, color: '#d97706' },
  { id: 3, name: 'Bloqueada', unlocked: false },
  { id: 4, name: 'Bloqueada', unlocked: false },
]

export const recentActivities = [
  { id: 1, text: 'Concluiu o curso Comunicação & Oratória', time: 'há 2 horas' },
  { id: 2, text: 'Conquistou a medalha Comunicador', time: 'há 2 horas' },
  { id: 3, text: 'Presença registrada no encontro semanal', time: 'ontem' },
  { id: 4, text: '+15 pontos em Liderança', time: 'há 2 dias' },
  { id: 5, text: 'Subiu para o nível Raiz', time: 'há 4 dias' },
  { id: 6, text: 'Convidou 2 novos participantes', time: 'há 5 dias' },
]

export const courses = [
  {
    id: 1,
    category: 'Liderança',
    title: 'Liderança Juvenil',
    description: 'Desenvolva habilidades de liderança, influência positiva e tomada de decisão.',
    teacher: 'Prof. Amélia Kunda',
    hours: 24,
    progress: 72,
    status: 'in_progress',
  },
  {
    id: 2,
    category: 'Comunicação',
    title: 'Comunicação & Oratória',
    description: 'Aprenda a falar em público com clareza, confiança e impacto.',
    teacher: 'Prof. João Bastos',
    hours: 18,
    progress: 100,
    status: 'completed',
  },
  {
    id: 3,
    category: 'Competências',
    title: 'Resolução de Conflitos',
    description: 'Técnicas de mediação e gestão de conflitos no dia a dia.',
    teacher: 'Prof. Sara Nteka',
    hours: 16,
    progress: 30,
    status: 'in_progress',
  },
  {
    id: 4,
    category: 'Carreira',
    title: 'Empreendedorismo',
    description: 'Do plano de negócio à execução: crie projetos de impacto.',
    teacher: 'Prof. Carlos Vunge',
    hours: 30,
    progress: 0,
    status: 'not_started',
  },
  {
    id: 5,
    category: 'Competências',
    title: 'Inteligência Emocional',
    description: 'Autoconhecimento, empatia e gestão das emoções.',
    teacher: 'Prof. Maria Lopes',
    hours: 14,
    progress: 0,
    status: 'not_started',
  },
  {
    id: 6,
    category: 'Tecnologia',
    title: 'Cidadania Digital',
    description: 'Uso consciente da tecnologia e segurança online.',
    teacher: 'Prof. Pedro Sanga',
    hours: 20,
    progress: 45,
    status: 'in_progress',
  },
]

export const ranking = [
  { id: 1, initials: 'AN', name: 'Amara Nzinga', level: 5, levelName: 'Copa', xp: 2400, score: 4800, phone: '+244 920 100 200', status: 'Inativo', attendance: 95 },
  { id: 2, initials: 'KT', name: 'Kwame Tavares', level: 5, levelName: 'Copa', xp: 2310, score: 4627, phone: '+244 921 101 201', status: 'Ativo', attendance: 88 },
  { id: 3, initials: 'ZM', name: 'Zuri Mendes', level: 5, levelName: 'Copa', xp: 2220, score: 4454, phone: '+244 922 102 202', status: 'Ativo', attendance: 81 },
  { id: 4, initials: 'JC', name: 'Jabari Costa', level: 5, levelName: 'Copa', xp: 2130, score: 4191, phone: '+244 923 103 203', status: 'Ativo', attendance: 74 },
  { id: 5, initials: 'IS', name: 'Imani Souza', level: 5, levelName: 'Copa', xp: 2040, score: 4018, phone: '+244 924 104 204', status: 'Ativo', attendance: 67 },
  { id: 6, initials: 'TA', name: 'Tariq Almeida', level: 5, levelName: 'Copa', xp: 1950, score: 3755, phone: '+244 925 105 205', status: 'Pendente', attendance: 60 },
  { id: 7, initials: 'NF', name: 'Nia Fernandes', level: 5, levelName: 'Copa', xp: 1860, score: 3582, phone: '+244 926 106 206', status: 'Ativo', attendance: 53 },
  { id: 8, initials: 'SO', name: 'Sefu Oliveira', level: 4, levelName: 'Tronco', xp: 1770, score: 3409, phone: '+244 927 107 207', status: 'Inativo', attendance: 91 },
  { id: 9, initials: 'AR', name: 'Ayana Ribeiro', level: 4, levelName: 'Tronco', xp: 1680, score: 3146, phone: '+244 928 108 208', status: 'Ativo', attendance: 70 },
  { id: 10, initials: 'BL', name: 'Bakari Lima', level: 4, levelName: 'Tronco', xp: 1590, score: 2973, phone: '+244 929 109 209', status: 'Ativo', attendance: 62 },
  { id: 11, initials: 'ZC', name: 'Zola Cardoso', level: 4, levelName: 'Tronco', xp: 1500, score: 2710, phone: '+244 930 110 210', status: 'Ativo', attendance: 58 },
  { id: 12, initials: 'DM', name: 'Dbesta Moreira', level: 4, levelName: 'Tronco', xp: 1410, score: 2537, phone: '+244 931 111 211', status: 'Pendente', attendance: 55 },
  { id: 13, initials: 'KB', name: 'Kofi Barbosa', level: 4, levelName: 'Tronco', xp: 1320, score: 2364, phone: '+244 932 112 212', status: 'Ativo', attendance: 49 },
  { id: 14, initials: 'AP', name: 'Aisha Pereira', level: 3, levelName: 'Raiz', xp: 1230, score: 2101, phone: '+244 933 113 213', status: 'Ativo', attendance: 45 },
  { id: 15, initials: 'TR', name: 'Thabo Rocha', level: 3, levelName: 'Raiz', xp: 1140, score: 1928, phone: '+244 934 114 214', status: 'Ativo', attendance: 42 },
  { id: 16, initials: 'MD', name: 'Makena Dias', level: 3, levelName: 'Raiz', xp: 1050, score: 1665, phone: '+244 935 115 215', status: 'Inativo', attendance: 38 },
  { id: 17, initials: 'JP', name: 'Jelani Pinto', level: 3, levelName: 'Raiz', xp: 960, score: 1492, phone: '+244 936 116 216', status: 'Ativo', attendance: 35 },
  { id: 18, initials: 'SC', name: 'Sade Carvalho', level: 3, levelName: 'Raiz', xp: 870, score: 1319, phone: '+244 937 117 217', status: 'Ativo', attendance: 30 },
  { id: 19, initials: 'ON', name: 'Obi Nascimento', level: 2, levelName: 'Broto', xp: 780, score: 1056, phone: '+244 938 118 218', status: 'Pendente', attendance: 25 },
  { id: 20, initials: 'FA', name: 'Femi Araújo', level: 2, levelName: 'Broto', xp: 690, score: 883, phone: '+244 939 119 219', status: 'Ativo', attendance: 20 },
]

export function emailFor(name) {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '.')
  return `${slug}@kwanza.org`
}

// ---- Painel Admin ----
export const adminStats = {
  participants: 20,
  active: 14,
  courses: 6,
  hoursLogged: 1840,
  certificates: 47,
}

export const xpEvolutionMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
export const xpEvolutionValues = [1500, 2050, 2650, 3200, 3900, 4700]

export const attendanceMonthlyValues = [62, 70, 85, 65, 80, 90]

// ---- Frequência ----
export const attendanceSummary = {
  meetingLabel: 'Encontro semanal · Junho 2026',
  present: 8,
  absent: 2,
  rate: 80,
  avgDuration: '3h',
}

export const calendarMonth = {
  label: 'Junho 2026',
  totalDays: 30,
  meetingDays: [2, 4, 9, 11, 16, 18, 23, 25, 30],
  today: 18,
}

export const checkins = [
  { id: 1, name: 'Amara Nzinga', initials: 'AN', entrada: '08:00', saida: '11:00', present: true },
  { id: 2, name: 'Kwame Tavares', initials: 'KT', entrada: '09:07', saida: '12:05', present: true },
  { id: 3, name: 'Zuri Mendes', initials: 'ZM', entrada: '08:14', saida: '11:10', present: true },
  { id: 4, name: 'Jabari Costa', initials: 'JC', entrada: '—', saida: '—', present: false },
  { id: 5, name: 'Imani Souza', initials: 'IS', entrada: '08:28', saida: '11:20', present: true },
  { id: 6, name: 'Tariq Almeida', initials: 'TA', entrada: '09:35', saida: '12:25', present: true },
  { id: 7, name: 'Nia Fernandes', initials: 'NF', entrada: '08:42', saida: '11:30', present: true },
  { id: 8, name: 'Sefu Oliveira', initials: 'SO', entrada: '—', saida: '—', present: false },
]

// ---- Competências ----
export const competencyCategories = [
  { id: 1, name: 'Liderança', value: 62 },
  { id: 2, name: 'Comunicação', value: 71 },
  { id: 3, name: 'Oratória', value: 55 },
  { id: 4, name: 'Resolução de Conflitos', value: 68 },
  { id: 5, name: 'Participação', value: 74 },
  { id: 6, name: 'Proatividade', value: 77 },
  { id: 7, name: 'Trabalho em Equipe', value: 64 },
  { id: 8, name: 'Responsabilidade', value: 80 },
  { id: 9, name: 'Criatividade', value: 58 },
]

export const competencyLogs = [
  { id: 1, name: 'Amara Nzinga', initials: 'AN', competency: 'Liderança', description: 'Demonstrou excelente desempenho durante a atividade em grupo.', date: '20/06/2026', teacher: 'Prof. Amélia Kunda', points: 10, color: '#2563eb' },
  { id: 2, name: 'Kwame Tavares', initials: 'KT', competency: 'Comunicação', description: 'Demonstrou excelente desempenho durante a atividade em grupo.', date: '21/06/2026', teacher: 'Prof. Amélia Kunda', points: 15, color: '#0284c7' },
  { id: 3, name: 'Zuri Mendes', initials: 'ZM', competency: 'Oratória', description: 'Demonstrou excelente desempenho durante a atividade em grupo.', date: '22/06/2026', teacher: 'Prof. Amélia Kunda', points: 20, color: '#3b82f6' },
  { id: 4, name: 'Jabari Costa', initials: 'JC', competency: 'Resolução de Conflitos', description: 'Demonstrou excelente desempenho durante a atividade em grupo.', date: '23/06/2026', teacher: 'Prof. Amélia Kunda', points: 25, color: '#16a34a' },
  { id: 5, name: 'Imani Souza', initials: 'IS', competency: 'Participação', description: 'Demonstrou excelente desempenho durante a atividade em grupo.', date: '24/06/2026', teacher: 'Prof. Amélia Kunda', points: 30, color: '#d97706' },
]

// ---- Relatórios ----
export const reportDistribution = [
  { label: 'Ativos', value: 14, color: '#2563eb' },
  { label: 'Pendentes', value: 3, color: '#93c5fd' },
  { label: 'Inativos', value: 3, color: '#bfdbfe' },
]

export const reportEnrollments = [
  { label: 'Liderança', value: 28, color: '#1d4ed8' },
  { label: 'Comunicação', value: 24, color: '#3b82f6' },
  { label: 'Tecnologia', value: 20, color: '#60a5fa' },
  { label: 'Carreira', value: 16, color: '#16a34a' },
  { label: 'Outros', value: 12, color: '#d97706' },
]

export const reportHoursByMonth = [1200, 1550, 1780, 2450, 3350, 4650]

// ---- Certificados ----
export const certificateStats = {
  issued: 47,
  eligible: 12,
  thisMonth: 6,
  avgHours: 19,
}

export const featuredCertificate = {
  participant: 'Zuri Mendes',
  course: 'Comunicação & Oratória',
  hours: 18,
}

export const certificates = [
  { id: 1, name: 'Zuri Mendes', course: 'Comunicação & Oratória', hours: 18, date: '12/05/2026', status: 'Emitido' },
  { id: 2, name: 'Amara Nzinga', course: 'Liderança Juvenil', hours: 24, date: null, status: 'Elegível' },
  { id: 3, name: 'Kwame Tavares', course: 'Cidadania Digital', hours: 20, date: '02/06/2026', status: 'Emitido' },
  { id: 4, name: 'Imani Souza', course: 'Resolução de Conflitos', hours: 16, date: null, status: 'Pendente' },
  { id: 5, name: 'Nia Fernandes', course: 'Comunicação & Oratória', hours: 18, date: null, status: 'Elegível' },
]
