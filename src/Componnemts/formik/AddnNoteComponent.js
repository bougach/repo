import React from "react";
import { Formik, Form } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import * as applicationConstants from "../utils/ApplicationConstants";
import noteBg from "../../assets/imgs/bg/noteBg.jpg";
import bgbg from "../../assets/imgs/bg/bgbg.jpg";

const containerStyle = {
  maxWidth: "100%",
  minHeight: "100vh",
  backgroundImage:`url(${bgbg})`, 
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  padding: "20px",
  maxWidth: "600px",
};

const inputStyle = {
  margin: "10px 0",
};

const buttonStyle = {
  margin: "20px 0",
};

const AddnNoteComponent = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container component="main" maxWidth="lg" style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" gutterBottom>
          Add New Note
        </Typography>
        <Formik
          initialValues={{
            title: "",
            body: "",
            category: "",
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <TextField
                style={inputStyle}
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                placeholder="Enter Title"
              />
              <Typography variant="subtitle1">Description:</Typography>
              <Editor
                apiKey={applicationConstants.TINYMCE_API_KEY}
                value={formikProps.values.body}
                init={{
                  selector: "textarea",
                  plugins:
                    "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                onEditorChange={(content) => {
                  formikProps.setFieldValue("body", content);
                }}
                style={{ visibility: "visible" }}

              />
              <TextField
                style={inputStyle}
                label="Category"
                variant="outlined"
                fullWidth
                name="category"
                placeholder="Enter Category"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={buttonStyle}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddnNoteComponent;
