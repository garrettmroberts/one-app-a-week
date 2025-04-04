'use client'

import { useEffect, useState, useRef } from "react";

type Topic = {
  name: string;
  subtopics: string[];
}

export default function Home() {
  const [subject, setSubject] = useState<string>('');
  const [syllabus, setSyllabus] = useState<Topic[]>([]);
  const [topic, setTopic] = useState<string>('');
  const [subtopic, setSubtopic] = useState<string>('');
  const [currentLesson, setCurrentLesson] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsState, setDetailsState] = useState({
    prompt: true,
    syllabus: false,
    lecture: false,
    reset: false
  });
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});
  const isProgrammaticChange = useRef(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const localStorageSyllabus = localStorage.getItem("syllabus");
    if (localStorageSyllabus) setSyllabus(JSON.parse(localStorageSyllabus) as Topic[]);

    const localStorageSubject = localStorage.getItem("subject");
    if (localStorageSubject) setSubject(localStorageSubject);

    const localStorageTopic = localStorage.getItem("topic");
    if (localStorageTopic) setTopic(localStorageTopic);

    const localStorageSubtopic = localStorage.getItem("subtopic");
    if (localStorageSubtopic) setSubtopic(localStorageSubtopic);

    const localStorageCurrentLesson = localStorage.getItem("currentLesson");
    if (localStorageCurrentLesson) setCurrentLesson(localStorageCurrentLesson);
  }, []);

  useEffect(() => {
    if (syllabus.length > 0) {
      localStorage.setItem("syllabus", JSON.stringify(syllabus));
    }
  }, [syllabus])

  useEffect(() => {
    if (topic !== "") {
      localStorage.setItem("topic", topic);
    }
  }, [topic])

  useEffect(() => {
    if (subtopic !== "") {
      localStorage.setItem("subtopic", subtopic);
    } 
  }, [subtopic])

  useEffect(() => {
    if (currentLesson !== "") {
      localStorage.setItem("currentLesson", currentLesson);
    }
  }, [currentLesson])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const generateSyllabus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (subject.length < 3) {
      setError("Enter a valid subject.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          input: `You are a teacher. Create a bulleted list of topics that should be studied for a student to gain a better understanding of ${subject}. Format your response as an array. Each array element should be an object with a name field and a subtopics field. Do not return triple backticks or the words 'json'.`,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSyllabus(JSON.parse(data.output_text) as Topic[]);
        localStorage.setItem("subject", subject);

        isProgrammaticChange.current = true;
        setDetailsState({
          prompt: true,
          syllabus: true,
          lecture: false,
          reset: false,
        });
        setTimeout(() => {
          isProgrammaticChange.current = false;
        }, 100);
      } else {
        setError('Error generating syllabus: ' + data.error);
      }
    } catch (error) {
      setError('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const generateLesson = async (topic: string, subtopic: string) => {
    setTopic(topic);
    setSubtopic(subtopic);
    localStorage.setItem("topic", topic);
    localStorage.setItem("subtopic", subtopic);
    setLoading(true); // Show spinner

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          input: `You are a teacher. You are teaching a college student about '${subject}'. You are currently teaching a series about '${topic}'. Write a 500 word lecture about '${subtopic}' that fits into your curriculum so that I can better understand it`,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentLesson(data.output_text);
        localStorage.setItem("currentLesson", data.output_text);
        isProgrammaticChange.current = true;
        setDetailsState({
          prompt: false,
          syllabus: false,
          lecture: true,
          reset: false,
        });
        setTimeout(() => {
          isProgrammaticChange.current = false;
        }, 100);
      } else {
        setError('Error generating subtopic text: ' + data.error);
      }
    } catch (error) {
      setError('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (index: number) => {
    setOpenTopics((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleDetails = (key: 'prompt' | 'syllabus' | 'lecture' | 'reset') => {
    setDetailsState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = 'en-US'; // Set language
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setError("Text-to-Speech is not supported in this browser.");
    }
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window && isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if ('speechSynthesis' in window && isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubject('');
    setSyllabus([]);
    setTopic('');
    setSubtopic('');
    setCurrentLesson('');

    localStorage.removeItem("subject");
    localStorage.removeItem("syllabus");
    localStorage.removeItem("topic");
    localStorage.removeItem("subtopic");
    localStorage.removeItem("currentLesson");

    stopSpeech();
    setIsSpeaking(false);
    setIsPaused(false);
  
    isProgrammaticChange.current = true;
    setDetailsState({
      prompt: true,
      syllabus: false,
      lecture: false,
      reset: false,
    });
    setTimeout(() => {
      isProgrammaticChange.current = false;
    }, 100);
  }

  return (
    <div className="p-4 md:p-8 flex items-center justify-center flex-col gap-5 min-h-screen bg-gray-100 w-full">
      {/* Toast */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
  
      {/* Prompt */}
      <details
        open={detailsState.prompt}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-sm"
        onToggle={() => {
          if (!isProgrammaticChange.current) {
            toggleDetails('prompt');
          }
        }}
      >
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          What would you like to learn about?
        </summary>
        <form>
          <input
            type="text"
            placeholder="Enter your text here"
            className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={syllabus.length > 0}
          />
          <button
            onClick={(e) => generateSyllabus(e)}
            className={`w-full my-3 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
              syllabus.length === 0 ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            type="submit"
            disabled={syllabus.length > 0 }
          >
            Enter
          </button>
        </form>
      </details>
  
      {/* Syllabus */}
      <details 
        open={detailsState.syllabus} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-sm" 
        onToggle={() => {
          if (!isProgrammaticChange.current) {
            toggleDetails('syllabus');
          }
        }}
      >
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          Syllabus
        </summary>
        <ul className="space-y-4">
          {syllabus.map((topic, index) => (
            <li key={index} className="border border-gray-300 rounded-lg p-4">
              <details
               open={!!openTopics[index]}
               onToggle={(e) => {
                e.stopPropagation();
                toggleTopic(index)
               }}
              >
                <summary className="cursor-pointer text-lg font-semibold text-blue-600">
                  {topic.name}
                </summary>
                <ul className="mt-2 ml-4 list-disc text-gray-700">
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <li
                      className="cursor-pointer"
                      data-subtopic={subtopic}
                      onClick={() => {
                        generateLesson(topic.name, subtopic);
                      }}
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
  
      {/* Curriculum Text */}
      <details 
        open={detailsState.lecture} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-sm" 
        onToggle={() => {
          if (!isProgrammaticChange.current) {
            toggleDetails('lecture');
          }
        }}
      >
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          {subtopic ? `Lecture on: ${localStorage.getItem("subject")} -> ${topic} -> ${subtopic}` : "Select a subtopic to view the lecture"}
        </summary>
        <div className="text-gray-700 whitespace-pre-wrap">
          {currentLesson || "No lecture available. Please select a subtopic."}
        </div>
      </details>

      {/* Lecture Controls */}
      {currentLesson && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex gap-4">
          <button
            onClick={() => {
              speakText(currentLesson);
            }}
            disabled={isSpeaking || isPaused}
            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
              !isSpeaking && !isPaused ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Play Lecture
          </button>
          <button
            onClick={pauseSpeech}
            disabled={!isSpeaking || isPaused}
            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
              isSpeaking && !isPaused ? 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Pause
          </button>
          <button
            onClick={resumeSpeech}
            disabled={!isSpeaking || !isPaused}
            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
              isSpeaking && isPaused ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Resume
          </button>
          <button
            onClick={stopSpeech}
            disabled={!isSpeaking}
            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
              isSpeaking ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Stop
          </button>
        </div>
      )}

      {/* Reset */}
      <details
        open={detailsState.reset} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-sm" 
        onToggle={() => {
          if (!isProgrammaticChange.current) {
            toggleDetails('reset');
          }
        }}
      >
        <summary className="text-2xl font-bold mb-4 text-gray-800 cursor-pointer">
          Reset
        </summary>
        <button
          onClick={(e) => {handleReset(e)}}
          className="w-full mt-5 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          Reset All
        </button>
      </details>
    </div>
  );
}