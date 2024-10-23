"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";

const Questions = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      explanation: "",
    },
  });

  const onSubmit = (values) => {
    setIsSubmitting(true);
    console.log(values); // Handle form submission here
    setIsSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Adjust alignment for better layout
        minHeight: '100vh',
        backgroundColor: '#f4f5f7', // Subtle background color
        padding: '24px', // Padding for overall page responsiveness
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
          maxWidth: '900px', // Increased maxWidth to match the UI
          backgroundColor: '#fff',
          padding: '40px', // Increased padding for a cleaner look
          borderRadius: '12px', // Rounded corners
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Shadow for depth
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4" // Larger heading
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: '#333', fontSize: '28px' }} // Bold heading
        >
          Ask a Question
        </Typography>

        {/* Title Field */}
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
                  backgroundColor: '#f9f9f9', // Lighter background inside input
                  fontSize: '16px', // Larger input font size
                  borderRadius: '8px',
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: '#e0e0e0',
                    },
                    "&:hover fieldset": {
                      borderColor: '#aaa', // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: '#3f51b5', // Blue when focused
                    },
                  },
                }}
              />
            </Box>
          )}
        />

        {/* Explanation Field */}
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
                  height: 300, // Height for editor
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
                    "body { font-family:Inter, sans-serif; font-size:16px; }", // Text styling inside editor
                }}
              />
            </Box>
          )}
        />

        {/* Submit Button */}
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
            textTransform: 'none', // Prevent uppercase
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
