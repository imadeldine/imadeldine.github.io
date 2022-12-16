import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const BookPreview = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  const bookdetails = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
      });
  };
  useEffect(() => {
    if (id) {
      bookdetails();
    }
  }, []);
  return (
    <div>
      <Card
        sx={{
          display: {
            xxs: 0, // small phone
            xs: 300, // phone
            sm: "600", // tablets
            md: "flex", // small laptop
            lg: "flex", // desktop
            xl: "flex",
          },

          height: {
            xxs: "170vh", // small phone
            xs: "170vh", // phone
            sm: "170vh", // tablets
            md: "120vh", // small laptop
            lg: "120vh", // desktop
            xl: "100vh",
          },

          backgroundColor: "#f0f8ff",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" align="left" mt={3}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`/home`);
                }}
              >
                Back to your search
              </Button>{" "}
            </Typography>
            <Typography component="div" variant="h4" align="left" mt={5}>
              <b>{book?.volumeInfo?.title}</b>
            </Typography>

            <Typography
              variant="h5"
              align="left"
              mt={5}
              sx={{ display: "flex" }}
            >
              <b>Author/s: </b>{" "}
              {book?.volumeInfo?.authors.map((author, index) => {
                return <span key={index.toString()}> {author}</span>;
              })}
            </Typography>
            <Typography variant="h5" align="left" mt={3}>
              <b>Page Count:</b> {book?.volumeInfo?.pageCount}
            </Typography>
            <Typography variant="h5" align="left" mt={3}>
              <b>Publisher:</b> {book?.volumeInfo?.publisher}
            </Typography>
            <Typography variant="h5" align="left" mt={3}>
              <b>Language:</b> {book?.volumeInfo?.language}
            </Typography>

            <Typography variant="h5" align="left" mt={3}>
              <b>Preview: </b>{" "}
              <a
                style={{ textDecoration: "none" }}
                href={book?.volumeInfo?.previewLink || "N/A"}
              >
                {book?.volumeInfo?.previewLink || "N/A"}
              </a>
            </Typography>

            <Typography variant="h5" align="left" mt={3}>
              <Button
                variant="contained"
                href={book?.accessInfo?.pdf?.downloadLink}
              >
                Download
              </Button>{" "}
              The Book as pdf.
            </Typography>
            <Typography variant="h5" align="left" mt={3}>
              <Button
                variant="contained"
                href={book?.accessInfo?.epud?.downloadLink || "N/A"}
              >
                Download
              </Button>{" "}
              The Book as epub.
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          image={book?.volumeInfo?.imageLinks?.medium}
          alt="Paella dish"
        />
      </Card>
    </div>
  );
};

export default BookPreview;
