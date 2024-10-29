"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useUser } from "../../context/Usecontext";
import { db } from "../../Firebase/firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Questions = () => {
  const user = useUser(); 
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      explanation: "",
    },
  });

  // Check if user and user.user are defined before accessing uid
  console.log(user && user.user ? user.user.uid : "User not logged in");

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (user && user.user && user.user.uid) { // Check if user.user.uid exists
        await addDoc(collection(db, "questions"), {
          userId: user.user.uid,
          title: values.title,
          explanation: values.explanation,
          createdAt: Timestamp.now(),
          likes: 0,
          views: 0,
          comments: [],
        });
        console.log("Question submitted successfully");
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.error("Error submitting question: ", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f4f5f7', 
        padding: '24px', 
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
          maxWidth: '900px', 
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <Typography
          variant="h4" 
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: '#333', fontSize: '28px' }} 
        >
          Ask a Question
        </Typography>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography
                variant="h6"
                component="label"
                sx={{
                  mb: 1,
                  fontSize: '16px',
                  color: '#555',
                  fontWeight: 500,
                }}
              >
                Question title <span style={{ color: "#f50057" }}>*</span>
              </Typography>
              <TextField
                {...field}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                placeholder="Be specific and imagine you're asking a question to another person."
                sx={{
                  backgroundColor: '#f9f9f9', 
                  fontSize: '16px', 
                  borderRadius: '8px',
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: '#e0e0e0',
                    },
                    "&:hover fieldset": {
                      borderColor: '#aaa', 
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: '#3f51b5', 
                    },
                  },
                }}
              />
            </Box>
          )}
        />

        <Controller
          name="explanation"
          control={control}
          render={({ field }) => (
            <Box>
              <Typography
                variant="h6"
                component="label"
                sx={{
                  mb: 1,
                  fontSize: '16px',
                  color: '#555',
                  fontWeight: 500,
                }}
              >
                Detailed explanation of your problem{" "}
                <span style={{ color: "#f50057" }}>*</span>
              </Typography>
              <Editor
                apiKey='3tyyaj049ws7lfwkluh6d4fq94g6g12kg47xsmsnj6qnb3yk'
                onInit={(evt, editor) => (editorRef.current = editor)}
                onBlur={field.onBlur}
                onEditorChange={(content) => field.onChange(content)}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks codesample fullscreen",
                    "insertdatetime media table",
                  ],
                  toolbar:
                    "undo redo | codesample | bold italic forecolor | alignleft aligncenter |" +
                    "alignright alignjustify | bullist numlist",
                  content_style:
                    "body { font-family:Inter, sans-serif; font-size:16px; }",
                }}
              />
            </Box>
          )}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{
            alignSelf: 'flex-start',
            backgroundColor: '#3f51b5',
            color: '#fff',
            fontSize: '16px',
            padding: '12px 28px',
            borderRadius: '8px',
            textTransform: 'none', 
            "&:hover": {
              backgroundColor: '#303f9f',
            },
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default Questions;
