// Devuelve el conteo absoluto de clics por opción
export function getRealVotesRaw(questionText, totalOptions = 4) {
  const all = loadVotes();
  return all[questionText] || new Array(totalOptions).fill(0);
}
const questionBank = [
  {
    question: "¿Qué significan las siglas FIEC?",
    options: [
      "Facultad de Ingeniería en Electricidad y Computación",
      "Facultad de Ingeniería en Electrónica y Computación",
      "Facultad de Ingeniería en Energía y Computación",
      "Facultad de Ingeniería en Sistemas y Computación"
    ],
    correct: 0
  },
  {
    question: "¿Cuál es la carrera de la FIEC con más estudiantes?",
    options: ["Ingeniería en Computación", "Ingeniería en Electricidad", "Ingeniería en Electrónica y Automatización", "Telecomunicaciones"],
    correct: 0
  },
  {
    question: "¿Cuál fue la última carrera que se agregó a la FIEC?",
    options: ["Ciencia de Datos e Inteligencia Artificial", "Ingeniería en Computación", "Ingeniería en Electricidad", "Telecomunicaciones"],
    correct: 0
  },
  {
    question: "¿Cuál es el color que representa a la FIEC?",
    options: ["Gris", "Azul", "Celeste", "Verde"],
    correct: 0
  },
  {
    question: "¿Cómo se llama la mascota de la FIEC?",
    options: ["Felinux", "Espolin", "TecnoBot", "ElectroCat"],
    correct: 0
  },
  {
    question: "¿Qué es Felinux?",
    options: ["Un gato robot", "Un perro robot", "Un gato", "Un perro"],
    correct: 0
  },
  {
    question: "¿Cuál es la carrera que no es de la FIEC pero suelen pensar que lo es?",
    options: ["Ingeniería Mecatrónica", "Ingeniería en Electricidad", "Ingeniería en Electrónica y Automatización", "Ciencia de Datos e Inteligencia Artificial"],
    correct: 0
  },
  {
    question: "¿Cuál de estas carreras es de la FIEC?",
    options: ["Ingeniería en Electricidad", "Diseño Gráfico", "Ingeniería Mecánica", "Ingeniería Mecatrónica"],
    correct: 0
  },
  {
    question: "¿Cuál de estos bloques de edificios no existe en la FIEC?",
    options: ["Bloque 11E", "Bloque 11A", "Bloque 11B", "Bloque 11D"],
    correct: 0
  },
  {
    question: "¿Cuáles son los bloques de la FIEC?",
    options: ["Bloque 11", "Bloque 12", "Bloque 9", "Bloque 13"],
    correct: 0
  },
  {
    question: "¿Cuál es el bloque de FIEC vieja?",
    options: ["Bloque 11D", "Bloque 11A", "Bloque 11B", "Bloque 11C"],
    correct: 0
  },
  {
    question: "¿Cuál es el bloque de FIEC nueva?",
    options: ["Bloque 11A", "Bloque 11D", "Bloque 11B", "Bloque 11C"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el decano actual en FIEC?",
    options: ["Dr. Jorge Aragundi", "Ing. Gustavo Galindo", "Rafael Bonilla", "Dra. Cecilia Paredes"],
    correct: 0
  },
  {
    question: "¿Qué laboratorio podemos encontrar en el bloque 11A?",
    options: ["Sistemas digitales", "Electrónica de potencia", "Electricidad básica", "Laboratorio de computación"],
    correct: 0
  },
  {
    question: "¿En qué edificio hay oficinas de profesores?",
    options: ["Bloque 11F", "Bloque 11G", "Bloque 11D", "Bloque 11C"],
    correct: 0
  },
  {
    question: "¿Qué rama estudiantil tiene sede en FIEC?",
    options: ["IEEE", "ASME", "SME", "AICHE"],
    correct: 0
  },
  {
    question: "¿Cuál es la carrera de FIEC con más niveles en la malla?",
    options: ["Electricidad", "Telemática", "Telecomunicaciones", "Computación"],
    correct: 0
  },
  {
    question: "¿Cuántas carreras tiene FIEC?",
    options: ["6", "5", "7", "4"],
    correct: 0
  },
  {
    question: "¿Cuándo nació Felinux?",
    options: ["26 de mayo", "26 de julio", "20 de mayo", "5 de junio"],
    correct: 0
  },
  {
    question: "¿En qué año se adoptó el nombre actual de FIEC?",
    options: ["1986", "1970", "1961", "1969"],
    correct: 0
  },
  {
    question: "¿Originalmente con qué nombre comenzó FIEC?",
    options: ["Departamento de Electricidad", "Facultad de Electricidad", "Facultad de sistemas", "Departamento de sistemas"],
    correct: 0
  },
  {
    question: "¿En qué año se fundó la facultad FIEC?",
    options: ["1961", "1970", "1953", "1981"],
    correct: 0
  },
  {
    question: "¿Dónde queda el decanato de FIEC?",
    options: ["Bloque 11A", "Bloque 11F", "Bloque 11D", "Bloque 11E"],
    correct: 0
  },
  {
    question: "¿Con qué lenguaje empiezan programando todas las carreras en FIEC?",
    options: ["Python", "JavaScript", "C++", "C#"],
    correct: 0
  },
  {
    question: "¿Qué sistema operativo hace referencia el nombre 'Felinux'?",
    options: ["Linux", "Windows", "Ubuntu", "Maclux"],
    correct: 0
  },
  {
    question: "¿Todas las carreras de FIEC su titulación es de?",
    options: ["Ingeniería", "Licenciatura", "Tecnólogo", "Ingeniería y Tecnólogo"],
    correct: 0
  },
  {
    question: "¿Cuál es la carrera de FIEC con menos estudiantes?",
    options: ["Telecomunicaciones", "Computación", "Telemática", "Electricidad"],
    correct: 0
  },
  {
    question: "¿Cuál es la empresa patrocinadora de FIEC?",
    options: ["Forever Group", "Naturissimo", "Sweet and Coffee", "Conocel"],
    correct: 0
  },
  {
    question: "¿Qué laboratorio podemos encontrar en el bloque 11C?",
    options: ["Electrónica de Potencia", "Sistemas digitales", "Sistemas embebidos", "Ciberseguridad"],
    correct: 0
  },
  {
    question: "¿Qué laboratorio podemos encontrar en el bloque 11B?",
    options: ["Computación", "Electrónica de Potencia", "Sistemas digitales", "Redes eléctricas"],
    correct: 0
  },
  {
    question: "¿En el bloque 11D se encuentra mayoritariamente?",
    options: ["Clubes y ramas estudiantiles de FIEC", "Oficina de profesores de FIEC", "Laboratorios de FIEC", "Maquinarias eléctricas"],
    correct: 0
  },
  {
    question: "¿La FIEC es la facultad que se caracteriza por qué enfoque académico?",
    options: [
      "Sistemas eléctricos, electrónicos y computacionales",
      "Sistemas tecnológicos e industriales",
      "Tecnologías digitales e información",
      "Procesos productivos automatizados"
    ],
    correct: 0
  }
];

export function getRandomQuestions(count = 5) {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map(q => {
    const correctAnswer = q.options[q.correct];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex
    };
  });
}

export function generateFakeVotes(correctIndex, totalOptions = 4) {
  const votes = [];
  for (let i = 0; i < totalOptions; i++) {
    if (i === correctIndex) {
      votes.push(Math.floor(Math.random() * 30) + 35);
    } else {
      votes.push(Math.floor(Math.random() * 15) + 3);
    }
  }
  return votes;
}

// --- Conteo real de clics por pregunta ---
const VOTES_KEY = 'felinux-votes';

function loadVotes() {
  try {
    const data = localStorage.getItem(VOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveVotes(votes) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export function recordVote(questionText, optionIndex, totalOptions = 4) {
  const all = loadVotes();
  if (!all[questionText]) {
    all[questionText] = new Array(totalOptions).fill(0);
  }
  all[questionText][optionIndex]++;
  saveVotes(all);
}

export function getRealVotes(questionText, totalOptions = 4) {
  const all = loadVotes();
  const counts = all[questionText] || new Array(totalOptions).fill(0);
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  return counts.map(c => Math.round((c / total) * 100));
}

export default questionBank;
