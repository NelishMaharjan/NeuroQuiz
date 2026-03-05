const { Question, connectDB } = require("./database");

const questions = [
  // SCIENCE (already have 3, adding 10 more)
  {
    questionText: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science",
    difficulty: "easy"
  },
  {
    questionText: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: "Diamond",
    category: "Science",
    difficulty: "easy"
  },
  {
    questionText: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    category: "Science",
    difficulty: "easy"
  },
  {
    questionText: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: "100°C",
    category: "Science",
    difficulty: "easy"
  },
  {
    questionText: "How many bones are there in the adult human body?",
    options: ["186", "206", "216", "226"],
    correctAnswer: "206",
    category: "Science",
    difficulty: "medium"
  },
  {
    questionText: "Which part of the human brain is responsible for balance and coordination?",
    options: ["Cerebrum", "Cerebellum", "Brainstem", "Thalamus"],
    correctAnswer: "Cerebellum",
    category: "Science",
    difficulty: "medium"
  },
  {
    questionText: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctAnswer: "Nitrogen",
    category: "Science",
    difficulty: "medium"
  },
  {
    questionText: "Which scientist proposed the theory of general relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
    category: "Science",
    difficulty: "medium"
  },
  {
    questionText: "What is the chemical symbol for Gold?",
    options: ["Gd", "Ag", "Fe", "Au"],
    correctAnswer: "Au",
    category: "Science",
    difficulty: "medium"
  },
  {
    questionText: "What type of lens is used to correct nearsightedness (myopia)?",
    options: ["Convex", "Concave", "Cylindrical", "Bifocal"],
    correctAnswer: "Concave",
    category: "Science",
    difficulty: "hard"
  },

  // HISTORY (already have 3, adding 10 more)
  {
    questionText: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci",
    category: "History",
    difficulty: "easy"
  },
  {
    questionText: "Which ancient civilization built the Great Pyramid of Giza?",
    options: ["Maya", "Romans", "Greeks", "Egyptians"],
    correctAnswer: "Egyptians",
    category: "History",
    difficulty: "easy"
  },
  {
    questionText: "Who was the 'Maid of Orleans'?",
    options: ["Mary Magdalene", "Joan of Arc", "Queen Elizabeth I", "Marie Antoinette"],
    correctAnswer: "Joan of Arc",
    category: "History",
    difficulty: "medium"
  },
  {
    questionText: "The 'Magna Carta' was signed in which year?",
    options: ["1066", "1215", "1492", "1776"],
    correctAnswer: "1215",
    category: "History",
    difficulty: "medium"
  },
  {
    questionText: "Which explorer is credited with discovering America in 1492?",
    options: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "James Cook"],
    correctAnswer: "Christopher Columbus",
    category: "History",
    difficulty: "easy"
  },
  {
    questionText: "What was the name of the ship that brought the Pilgrims to America in 1620?",
    options: ["The Bounty", "The Santa Maria", "The Mayflower", "The Beagle"],
    correctAnswer: "The Mayflower",
    category: "History",
    difficulty: "medium"
  },
  {
    questionText: "Which US President signed the Emancipation Proclamation?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Theodore Roosevelt"],
    correctAnswer: "Abraham Lincoln",
    category: "History",
    difficulty: "easy"
  },
  {
    questionText: "Who was the leader of the Soviet Union during World War II?",
    options: ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Mikhail Gorbachev"],
    correctAnswer: "Joseph Stalin",
    category: "History",
    difficulty: "medium"
  },
  {
    questionText: "In which year did the Berlin Wall fall?",
    options: ["1987", "1988", "1989", "1990"],
    correctAnswer: "1989",
    category: "History",
    difficulty: "medium"
  },
  {
    questionText: "Who was the first emperor of Rome?",
    options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
    correctAnswer: "Augustus",
    category: "History",
    difficulty: "hard"
  },

  // TECHNOLOGY (already have 3, adding 10 more)
  {
    questionText: "What does 'URL' stand for?",
    options: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Resource Link", "User Resource Location"],
    correctAnswer: "Uniform Resource Locator",
    category: "Technology",
    difficulty: "medium"
  },
  {
    questionText: "Which programming language is known as the 'mother of all languages'?",
    options: ["Python", "Java", "C", "Fortran"],
    correctAnswer: "C",
    category: "Technology",
    difficulty: "hard"
  },
  {
    questionText: "Who co-founded Microsoft alongside Bill Gates?",
    options: ["Steve Wozniak", "Paul Allen", "Larry Page", "Elon Musk"],
    correctAnswer: "Paul Allen",
    category: "Technology",
    difficulty: "medium"
  },
  {
    questionText: "What does 'HTTP' stand for?",
    options: ["HyperText Transfer Protocol", "Hyperlink Text Transfer Protocol", "High-Speed Transfer Protocol", "HyperText Terminal Process"],
    correctAnswer: "HyperText Transfer Protocol",
    category: "Technology",
    difficulty: "easy"
  },
  {
    questionText: "In computing, what does 'RAM' stand for?",
    options: ["Read Access Memory", "Random Access Memory", "Rapid Access Module", "Remote Analysis Method"],
    correctAnswer: "Random Access Memory",
    category: "Technology",
    difficulty: "easy"
  },
  {
    questionText: "Which year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: "2007",
    category: "Technology",
    difficulty: "medium"
  },
  {
    questionText: "Who is the CEO of Tesla and SpaceX?",
    options: ["Jeff Bezos", "Elon Musk", "Tim Cook", "Sundar Pichai"],
    correctAnswer: "Elon Musk",
    category: "Technology",
    difficulty: "easy"
  },
  {
    questionText: "What is the main purpose of a firewall?",
    options: ["Increase internet speed", "Block unauthorized access", "Store user passwords", "Backup data"],
    correctAnswer: "Block unauthorized access",
    category: "Technology",
    difficulty: "medium"
  },
  {
    questionText: "Which social media platform was originally called 'TheFacebook'?",
    options: ["Twitter", "Instagram", "Facebook", "LinkedIn"],
    correctAnswer: "Facebook",
    category: "Technology",
    difficulty: "easy"
  },
  {
    questionText: "What does 'SSD' stand for in computer storage?",
    options: ["Super Speed Drive", "Solid State Drive", "System Storage Device", "Stable Software Design"],
    correctAnswer: "Solid State Drive",
    category: "Technology",
    difficulty: "medium"
  },

  // GEOGRAPHY (already have 3, adding 10 more)
  {
    questionText: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    correctAnswer: "Vatican City",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "Mount Everest is located in which mountain range?",
    options: ["Andes", "Rockies", "Alps", "Himalayas"],
    correctAnswer: "Himalayas",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "Which desert is the largest hot desert in the world?",
    options: ["Gobi", "Sahara", "Kalahari", "Arabian"],
    correctAnswer: "Sahara",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "What is the capital of Japan?",
    options: ["Osaka", "Kyoto", "Hiroshima", "Tokyo"],
    correctAnswer: "Tokyo",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "Which country has the largest population in the world?",
    options: ["USA", "India", "China", "Russia"],
    correctAnswer: "India",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "Which country is also a continent?",
    options: ["Brazil", "Australia", "Canada", "Greenland"],
    correctAnswer: "Australia",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "The Dead Sea is located between which two countries?",
    options: ["Egypt and Libya", "Jordan and Israel", "Iraq and Iran", "Saudi Arabia and Yemen"],
    correctAnswer: "Jordan and Israel",
    category: "Geography",
    difficulty: "medium"
  },
  {
    questionText: "Which city is known as the 'Big Apple'?",
    options: ["Los Angeles", "Chicago", "New York City", "Miami"],
    correctAnswer: "New York City",
    category: "Geography",
    difficulty: "easy"
  },
  {
    questionText: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
    correctAnswer: "Canberra",
    category: "Geography",
    difficulty: "medium"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Seeding MORE questions...");
    
    // bulkCreate will add these 40 new questions to the existing ones
    await Question.bulkCreate(questions);
    
    console.log("Database seeded successfully! Total questions should now be 52.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
