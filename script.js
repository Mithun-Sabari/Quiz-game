document.addEventListener('DOMContentLoaded', (event) => {
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const timerElement = document.getElementById('timer');
  const scoreContainerElement = document.getElementById('score-container');
  const scoreElement = document.getElementById('score');

  let score;
  let shuffledQuestions, currentQuestionIndex;

  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });

  function startGame() {
    console.log('Game started');
    timeSetter();
    score = 0;
    startButton.classList.add('hide');
    let questions1 = [];
    const randomIndexes = getRandomIndexes(10, questions.length);
    questions1 = questions.sort(() => Math.random() - .5);
    shuffledQuestions = randomIndexes.map(index => questions1[index]);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }

  function getRandomIndexes(numItems, max) {
    const indexes = [];
    while (indexes.length < numItems) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      timerElement.classList.add('hide');
      questionContainerElement.classList.add('hide');
      scoreContainerElement.classList.remove('hide');
      scoreElement.innerText = `Your Score: ${score}`;
      console.log(score);
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  const questions = [
  {
    question: 'What is the capital of Uzbekistan?',
    answers: [
      { text: 'Tashkent', correct: true },
      { text: 'Samarkand', correct: false},
      { text: 'Bishkek', correct: false },
      { text: 'Dushanbe', correct: false }
    ]
  },
  {
    question: 'Who wrote the novel "One Hundred Years of Solitude"? ',
    answers: [
      { text: ' Gabriel Garcia Marquez', correct: true },
      { text: ' Isabel Allende', correct: false },
      { text: ' Jorge Luis Borges', correct: false },
      { text: '  Julio Cortazar', correct: false }
    ]
  },
  {
    question: ' In which year did the French Revolution begin?',
    answers: [
      { text: '1776 ', correct: false },
      { text: ' 1789', correct: true },
      { text: ' 1798', correct: false },
      { text: ' 1804', correct: false }
    ]
  },
  {
    question: 'Which scientist developed the theory of general relativity? ',
    answers: [
      { text: ' Isaac Newton', correct: false },
      { text: ' Albert Einstein', correct: true },
      { text: ' Max Planck', correct: false },
      { text: ' Stephen Hawking', correct: false }
    ]
  },
  {
    question: ' What is the chemical symbol for the element gold?',
    answers: [
      { text: 'Ag ', correct: false },
      { text: 'Au ', correct: true},
      { text: 'Fe ', correct: false },
      { text: ' Hg', correct: false }
    ]
  },
  {
    question: 'Who painted the famous artwork "The Starry Night"? ',
    answers: [
      { text: '  Leonardo da Vinci', correct: false },
      { text: 'Pablo Picasso ', correct: false },
      { text: 'Vincent van Gogh ', correct: true },
      { text: '  Claude Monet', correct: false }
    ]
  },
  {
    question: 'Which country is the largest producer of coffee in the world? ',
    answers: [
      { text: ' Colombia', correct: false },
      { text: ' Ethiopia', correct: false },
      { text: 'Vietnam ', correct: false },
      { text: ' Brazil', correct: true }
    ]
  },
  {
    question: ' Who discovered penicillin?',
    answers: [
      { text: ' Marie Curie', correct: false },
      { text: ' Louis Pasteur', correct: false },
      { text: ' Alexander Fleming', correct: true},
      { text: '  Robert Koch', correct: false }
    ]
  },
  {
    question: 'In which year did the United States declare its independence from Great Britain? ',
    answers: [
      { text: '1789 ', correct: false },
      { text: ' 1812', correct: false },
      { text: '1865 ', correct: false },
      { text: ' 1776', correct: true }
    ]
  },
  {
    question: 'Which planet is known as the "Red Planet"? ',
    answers: [
      { text: 'Saturn ', correct: false },
      { text: ' Mars', correct: true },
      { text: 'Venus ', correct: false },
      { text: 'Jupiter ', correct: false }
    ]
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"? ',
    answers: [
      { text: 'Arthur Miller ', correct: false },
      { text: 'Tennessee Williams ', correct: true },
      { text: ' William Shakespeare', correct: true },
      { text: 'Oscar Wilde ', correct: false }
    ]
  },
  {
    question: 'What is the largest organ in the human body? ',
    answers: [
      { text: 'Skin ', correct: true},
      { text: ' Heart', correct: false },
      { text: ' Liver', correct: false },
      { text: 'Brain ', correct: false }
    ]
  },
  {
    question: 'Which scientist proposed the theory of evolution by natural selection? ',
    answers: [
      { text: '  Alfred Russel Wallace ', correct: false },
      { text: 'Gregor Mendel ', correct: false },
      { text: 'Thomas Huxley ', correct: false },
      { text: ' Charles Darwin', correct: true }
    ]
  },
  {
    question: 'Who composed the music for the ballet "Swan Lake"? ',
    answers: [
      { text: 'Ludwig van Beethoven ', correct: false },
      { text: ' Pyotr Ilyich Tchaikovsky', correct: true },
      { text: ' Johann Sebastian Bach', correct: false },
      { text: ' Wolfgang Amadeus Mozart', correct: false }
    ]
  },
  {
    question: 'What is the tallest mountain in Africa? ',
    answers: [
      { text: ' Mount Fuji', correct: false },
      { text: 'v ', correct: false },
      { text: ' Mount Kilimanjaro ', correct: true },
      { text: 'Mount Everest ', correct: false }
    ]
  },
  {
    question: 'Who painted the mural "The Last Supper"? ',
    answers: [
      { text: 'Salvador Dali ', correct: false },
      { text: 'Pablo Picasso ', correct: false },
      { text: ' Michelangelo', correct: false },
      { text: 'Leonardo da Vinci ', correct: true }
    ]
  },
  {
    question: 'What is the chemical formula for water? ',
    answers: [
      { text: ' C6H12O6 ', correct: false },
      { text: ' CO2 ', correct: false },
      { text: ' H2O', correct: true},
      { text: 'NaCl ', correct: false }
    ]
  },
  {
    question: 'Who was the first person to walk on the moon? ',
    answers: [
      { text: 'Alan Shepard ', correct: false },
      { text: ' Neil Armstrong', correct: true },
      { text: ' Buzz Aldrin', correct: false },
      { text: 'Yuri Gagarin ', correct: false }
    ]
  },
  {
    question: 'Which novel begins with the line, "Call me Ishmael"? ',
    answers: [
      { text: ' Moby-Dick ', correct: true },
      { text: 'Pride and Prejudice ', correct: false },
      { text: 'To Kill a Mockingbird ', correct: false },
      { text: ' The Great Gatsby', correct: false }
    ]
  },
  {
    question: 'What is the capital of Australia? ',
    answers: [
      { text: ' Perth', correct: false },
      { text: ' Melbourne', correct: false },
      { text: ' Sydney', correct: false },
      { text: ' Canberra', correct: true }
    ]
  },
  {
    question: ' Which painter was famous for his series of paintings depicting water lilies?',
    answers: [
      { text: 'Claude Monet ', correct: true },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Vincent van Gogh ', correct: false },
      { text: 'Salvador Dali ', correct: false }
    ]
  },
  {
    question: 'Who wrote the novel "1984"? ',
    answers: [
      { text: 'Aldous Huxley ', correct: false },
      { text: ' Ray Bradbury', correct: false },
      { text: '  George Orwell', correct: true},
      { text: 'J.R.R. Tolkien ', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for the element iron? ',
    answers: [
      { text: 'Ir ', correct: false },
      { text: ' Fe', correct: true},
      { text: ' In', correct: false },
      { text: 'Au ', correct: false }
    ]
  },
  {
    question: 'Who wrote the play "Hamlet"? ',
    answers: [
      { text: ' Arthur Miller', correct: false },
      { text: ' Henrik Ibsen ', correct: false },
      { text: 'Tennessee Williams ', correct: false },
      { text: 'William Shakespeare ', correct: true }
    ]
  },
  {
    question: 'What is the largest planet in our solar system? ',
    answers: [
      { text: 'Saturn ', correct: false },
      { text: 'Jupiter ', correct:true },
      { text: 'Earth ', correct: false },
      { text: 'Neptune ', correct: false }
    ]
  },
  {
    question: 'Who painted the famous artwork "Guernica"? ',
    answers: [
      { text: 'Pablo Picasso ', correct: true},
      { text: 'Salvador Dali ', correct: false },
      { text: ' Vincent van Gogh', correct: false },
      { text: 'Leonardo da Vinci ', correct: false }
    ]
  },
  {
    question: 'Which country is known as the "Land of the Rising Sun"? ',
    answers: [
      { text: 'Thailand ', correct: false },
      { text: 'South Korea ', correct: false },
      { text: ' China', correct: false },
      { text: 'Japan ', correct: true }
    ]
  },
  {
    question: 'Who invented the telephone? ',
    answers: [
      { text: ' Guglielmo Marconi', correct: false },
      { text: ' Nikola Tesla', correct: false },
      { text: 'Alexander Graham Bell ', correct: true },
      { text: 'Thomas Edison ', correct: false }
    ]
  },
  {
    question: 'In which year did World War I begin? ',
    answers: [
      { text: '1918 ', correct: false },
      { text: ' 1939', correct: false },
      { text: ' 1945', correct: false },
      { text: '1914 ', correct: true }
    ]
  },
  {
    question: 'What is the chemical formula for table salt? ',
    answers: [
      { text: 'NaCl ', correct: true },
      { text: 'H2O ', correct: false },
      { text: '  C6H12O6', correct: false },
      { text: ' CO2', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean in the world? ',
    answers: [
      { text: ' Indian Ocean ', correct: false },
      { text: 'Pacific Ocean ', correct: true },
      { text: 'Atlantic Ocean ', correct: false },
      { text: 'Arctic Ocean ', correct: false }
    ]
  },
  {
    question: 'Who was the first female Prime Minister of the United Kingdom? ',
    answers: [
      { text: ' Theresa May', correct: false },
      { text: 'Angela Merkel ', correct: false },
      { text: 'Jacinda Ardern ', correct: false },
      { text: 'Margaret Thatcher ', correct: true }
    ]
  },
  {
    question: 'What is the largest desert in the world? ',
    answers: [
      { text: ' Gobi Desert', correct: false },
      { text: '  Atacama Desert', correct: false },
      { text: 'Sahara Desert ', correct: true },
      { text: 'Kalahari Desert ', correct: false }
    ]
  },
  {
    question: 'Who is considered the father of modern physics? ',
    answers: [
      { text: ' Albert Einstein ', correct:true},
      { text: ' Nikola Tesla', correct: false },
      { text: 'Galileo Galilei ', correct: false },
      { text: 'Isaac Newton ', correct: false }
    ]
  },
  {
    question: 'Who is known as the "Father of Geometry"? ',
    answers: [
      { text: ' Pythagoras', correct: false },
      { text: ' Euclid', correct: true},
      { text: ' Archimedes', correct: false },
      { text: 'Aristotle ', correct: false }
    ]
  },
  {
    question: 'Who is known as the "Father of Modern Philosophy"? ',
    answers: [
      { text: 'Immanuel Kant ', correct: false },
      { text: ' John Locke ', correct: false },
      { text: 'David Hume ', correct: false },
      { text: ' René Descartes', correct: true }
    ]
  },
  {
    question: 'What is the largest waterfall in the world by volume of water? ',
    answers: [
      { text: 'Plato ', correct: false },
      { text: 'Socrates ', correct: true},
      { text: 'Aristotle ', correct: false },
      { text: 'Confucius ', correct: false }
    ]
  },
  {
    question: 'What is the capital of South Africa? ',
    answers: [
      { text: ' Durban ', correct: false },
      { text: 'Cape Town ', correct: false },
      { text: 'Pretoria ', correct: true},
      { text: ' Johannesburg', correct: false }
    ]
  },
  {
    question: 'What is the largest animal in the world? ',
    answers: [
      { text: 'Blue whale ', correct: true},
      { text: 'Giraffe ', correct: false },
      { text: 'Saltwater crocodile ', correct: false },
      { text: 'African elephant ', correct: false }
    ]
  },
  {
    question: 'Which country is famous for its tulips? ',
    answers: [
      { text: 'Germany ', correct: false },
      { text: 'Netherlands ', correct: true },
      { text: 'France ', correct: false },
      { text: 'Italy ', correct: false }
    ]
  },
  {
    question: 'Which country is famous for the ancient ruins of Machu Picchu? ',
    answers: [
      { text: 'Egypt ', correct: false },
      { text: 'Greece ', correct: false },
      { text: 'Mexico ', correct: false },
      { text: 'Peru ', correct:true }
    ]
  },
  {
    question: 'Which country is famous for the Leaning Tower of Pisa? ',
    answers: [
      { text: 'Spain ', correct: false },
      { text: 'Germany ', correct: false },
      { text: ' Italy', correct: true },
      { text: ' France', correct: false }
    ]
  },
  {
    question: 'Which country is known as the "Land of the Midnight Sun"? ',
    answers: [
      { text: 'Norway ', correct: true},
      { text: 'Denmark ', correct: false },
      { text: ' Finland', correct: false },
      { text: ' Sweden', correct: false }
    ]
  },
  {
    question: 'Who composed the music for the opera "The Barber of Seville"? ',
    answers: [
      { text: 'Wolfgang Amadeus Mozart ', correct: false },
      { text: '  Gioachino Rossini', correct: true },
      { text: ' Richard Wagner', correct: false },
      { text: '  Giuseppe Verdi', correct: false }
    ]
  },
  {
    question: 'What is the chemical formula for sulfuric acid? ',
    answers: [
      { text: 'C6H12O6 ', correct: false },
      { text: 'NaCl ', correct: false },
      { text: ' H2SO4', correct: true },
      { text: 'CO2 ', correct: false }
    ]
  },
  {
    question: 'Who composed the music for the ballet "Giselle"? ',
    answers: [
      { text: 'Adolphe Adam', correct: true},
      { text: 'Pyotr Ilyich Tchaikovsky ', correct: false },
      { text: ' Ludwig van Beethoven', correct: false },
      { text: 'Johann Strauss II ', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for the element copper? ',
    answers: [
      { text: 'Hg ', correct: false },
      { text: 'Co ', correct: false },
      { text: ' AU', correct: false},
      { text: 'Cu ', correct: true }
    ]
  },
  {
    question: 'What is the chemical symbol for the element helium? ',
    answers: [
      { text: 'He ', correct: true},
      { text: 'Ne ', correct: false },
      { text: ' Ar', correct: false},
      { text: 'Kr', correct: false }
    ]
  },
  {
    question: 'Who wrote the play "The Importance of Being Earnest"? ',
    answers: [
      { text: 'Tom Stoppard', correct: false },
      { text: 'Oscar Wilde', correct: true },
      { text: ' Samuel Beckett', correct: false},
      { text: 'George Bernard Shaw ', correct: false }
    ]
  },
  {
    question: 'What is the largest coral reef system in the world? ',
    answers: [
      { text: 'Belize Barrier Reef', correct: false },
      { text: 'Maldives Coral Reef ', correct: false },
      { text: '  Great Barrier Reef', correct: true },
      { text: 'Red Sea Coral Reef ', correct: false }
    ]
  },


]
  function timeSetter() {
    let timeInSeconds = 60; // Initial time in seconds
    let timerInterval;  // Timer interval ID

    timerInterval = setInterval(updateTimer, 1000);
    function updateTimer() {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      timeInSeconds--; // Decrease the time by 1 second
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (timeInSeconds < 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 00:00
        questionContainerElement.classList.add('hide');
	timerElement.classList.add('hide');
        scoreContainerElement.classList.remove('hide');
        scoreElement.innerText = `Your Score: ${score}`;
      }
    }
  }
});
