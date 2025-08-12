import fs from 'fs';
import path from 'path';
import Quiz from './Quiz'; // We will create this component next

export default function Home() {
  // 1. Read the quiz data from the file system on the server.
  const dataDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDirectory, 'quiz.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const quizData = JSON.parse(fileContents);

  // 2. Pass the data to the interactive Quiz component.
  return (
    <main>
      <Quiz quizData={quizData} />
    </main>
  );
}