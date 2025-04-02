'use client'

import { useEffect, useState } from "react";
import OpenAI from "openai";
import sampleTopics from "./temp/sampleTopics.json";

type Topic = {
  name: string;
  subtopics: string[];
}

export default function Home() {
  const [subject, setSubject] = useState<string>('marine biology')
  const [topics, setTopics] = useState<Topic[]>(sampleTopics);
  const [topic, setTopic] = useState<string>('')
  const [subtopic, setSubtopic] = useState<string>('')
  const [subtopicText, setSubtopicText] = useState<string>();

  useEffect(() => {
    fetch("/sampleLecture.txt")
    .then(res => res.text())
    .then(text => setSubtopicText(text))
    .catch(err => console.error("Error fetching subtopic text:", err));
  }, [])

  useEffect(() => {
    console.log(topics)
  }, [topics])

  const generateSyllabus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const client = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    const response = await client.responses.create({
      model: "gpt-4o",
      input: `You are a teacher. Create a bulleted list of topics that should be studied for a student to gain a better understanding of ${subject}. Format your response as an array.  Each array element should be an object with a name field and a subtopics field. Do not return triple backticks or the words 'json'.`
    })
    setTopics(JSON.parse(response.output_text) as Topic[]);
  }

  const generateSubtopicText = async (topic: string, subtopic: string) => {
    const client = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    const prompt = `You are a teacher. You are teaching a college student about '${subject}'. You are currently teaching a series about '${topic}'.  Write a 500 word lecture about '${subtopic}' that fits into your curicculum so that I can better understand it.  Format your response as if you were giving a lecture.`;
    setTopic(topic);
    setSubtopic(subtopic);
    const response = await client.responses.create({
      model: "gpt-4o",
      input: prompt
    })
    console.log(response);
    if (response) {
      setSubtopicText(response.output_text);
    }
  }

  useEffect(() => {
    console.log(subtopicText)
  }, [subtopicText])

  return (
    <div className="p-32 flex items-center justify-center flex-col gap-5 min-h-screen bg-gray-100">
      {/* Prompt */}
      <details open className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          What would you like to learn about?
        </summary>
        <form>
          <input
            type="text"
            placeholder="Enter your text here"
            className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <button
            onClick={e => generateSyllabus(e)}
            className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            type="submit"
          >
            Enter
          </button>
        </form>
      </details>

      {/* Syllabus */}
      <details className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          Syllabus
        </summary>
        <ul className="space-y-4">
          {topics.map((topic, index) => (
            <li key={index} className="border border-gray-300 rounded-lg p-4">
              <details>
                <summary className="cursor-pointer text-lg font-semibold text-blue-600">
                  {topic.name}
                </summary>
                <ul className="mt-2 ml-4 list-disc text-gray-700">
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <li
                      className="cursor-pointer"
                      data-subtopic={subtopic}
                      onClick={() => generateSubtopicText(topic.name, subtopic)}
                      key={subIndex}
                    >
                      {subtopic}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </details>

      {/* Subtopic and Subtopic Text */}
      <details open={!!subtopicText} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          {subtopic ? `Lecture on: ${subtopic}` : "Select a subtopic to view the lecture"}
        </summary>
        <div className="text-gray-700 whitespace-pre-wrap">
          {subtopicText || "No lecture available. Please select a subtopic."}
        </div>
      </details>
    </div>
  );
}