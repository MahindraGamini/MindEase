"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MessageIcon from '@mui/icons-material/Message';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { db } from "../../Firebase/firebase-config"; // Adjust the path as needed
import { collection, getDocs } from "firebase/firestore";

const QuestionCard = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const questionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-6">
      {questions.map((question) => (
        <div key={question.id} className="bg-white shadow-lg rounded-xl p-8 sm:p-10 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <Link href={`/question/${question.id}`}>
                <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors line-clamp-1">
                  {question.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Asked {new Date(question.createdAt.seconds * 1000).toDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-md text-gray-500 hover:text-gray-700">Edit</button>
              <button className="text-md text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar alt="User" src="https://via.placeholder.com/40" className="w-12 h-12" />
              <div>
                <Link href={`/profile/${question.userId}`}>
                  <p className="text-lg font-medium text-gray-800 hover:text-blue-500">
                    {question.userId}
                  </p>
                </Link>
                <p className="text-sm text-gray-500">Experience level unknown</p>
              </div>
            </div>

            <div className="flex space-x-8">
              <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                <ThumbUpIcon className="text-blue-500" fontSize="medium" />
                <span className="text-md font-medium">{question.likes}</span>
                <p className="text-xs text-gray-500">Votes</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <MessageIcon className="text-green-500" fontSize="medium" />
                <span className="text-md font-medium">{question.comments.length}</span>
                <p className="text-xs text-gray-500">Answers</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <VisibilityIcon className="text-purple-500" fontSize="medium" />
                <span className="text-md font-medium">{question.views}</span>
                <p className="text-xs text-gray-500">Views</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
