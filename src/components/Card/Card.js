import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";

const Cards = ({ books, search }) => {
  const navigate = useNavigate();

  if (!books?.length && search.length) {
    return (
      <div className="no-author">
        <Typography variant="body4" color="text.secondary">
          There Is No Books For This Author
        </Typography>
      </div>
    );
  }
  return (
    <div className="card-container">
      {books.map((book, index) => {
        return (
          <Card
            sx={{ minWidth: 320, mb: "25px", cursor: "pointer" }}
            onClick={() => {
              localStorage.setItem("lastsearch", search);
              navigate(`/bookDetails/${book?.id}`);
            }}
            key={index.toString()}
          >
            <CardMedia
              component="img"
              height="250"
              image={book?.volumeInfo?.imageLinks?.thumbnail || "Not Available"}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" align="left">
                <b>Publisher: </b>{" "}
                {book?.volumeInfo?.publisher || "Not Available"}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="left">
                <b>Published Date:</b>{" "}
                {book?.volumeInfo?.publishedDate || "Not Available"}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="left">
                <b>Author/s:</b>
                {book?.volumeInfo?.authors?.map((author, index) => {
                  return <div key={index.toString()}>{author}</div>;
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="left">
                <b>Number of Ratings:</b>{" "}
                {book?.volumeInfo?.ratingsCount || "Not Available"}
              </Typography>
              <Rating
                sx={{ mt: 2 }}
                name="read-only"
                value={book?.volumeInfo?.averageRating}
                readOnly
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Cards;
