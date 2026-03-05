const { Question, connectDB } = require("./database");

const questions = [
  // SCIENCE
  {
    questionText: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    correctAnswer: "Mitochondria",
    category: "Science",
    difficulty: "easy"
  },
  {
    questionText: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
    category: "Science",
    difficulty: "easy"
  },
  {
    questionText: "What is the speed of light in a vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"],
    correctAnswer: "300,000 km/s",
    category: "Science",
    difficulty: "medium"
  },
  
  // HISTORY
  {
    questionText: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
    correctAnswer: "George Washington",
    category: "History",
    difficulty: "easy"
  },
  {
    questionText: "In which year did World War II end?",
    options: ["1918", "1945", "1939", "1950"],
    correctAnswer: "1945",
    category: "History",
    difficulty: "easy"
  },
  {
    questionText: "Who was the first woman to win a Nobel Prize?",
    options: ["Mother Teresa", "Marie Curie", "Jane Addams", "Rosa Parks"],
    correctAnswer: "Marie Curie",
    category: "History",
    difficulty: "medium"
  },

  // TECHNOLOGY
  {
    questionText: "Who is known as the father of the World Wide Web?",
    options: ["Steve Jobs", "Bill Gates", "Tim Berners-Lee", "Mark Zuckerberg"],
    correctAnswer: "Tim Berners-Lee",
    category: "Technology",
    difficulty: "medium"
  },
  {
    questionText: "What does CPU stand for?",
    options: ["Central Process Unit", "Computer Processing Unit", "Central Processing Unit", "Control Process Unit"],
    correctAnswer: "Central Processing Unit",
    category: "Technology",
    difficulty: "easy"
  },
  {
    questionText: "Which company developed the Android operating system?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    correctAnswer: "Google",
    category: "Technology",
    difficulty: "easy"
  },

  // GEOGRAPHY
  {
    questionText: "What is the largest continent by land area?",
    options: ["Africa", "North America", "Asia", "Europe"],
    correctAnswer: "Asia",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "Which river is the longest in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: "Nile",
    category: "Geography",
    difficulty: "medium"
  },
  {
    questionText: "What is the capital of France?",
    options: ["London", "Berlin", "Madrid", "Paris"],
    correctAnswer: "Paris",
    category: "Geography",
    difficulty: "easy"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Seeding questions...");
    
    // We use bulkCreate. options is a JSON field in the model, 
    // but Sequelize handles JS arrays automatically for JSON columns.
    await Question.bulkCreate(questions);
    
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
