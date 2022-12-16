import React, { useState, useCallback, useEffect } from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { Box } from "@mui/material";
import { debounce } from "lodash";

const SearchFeild = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setBooks([]);
      return;
    }
    delaySearch(e.target.value);
  };

  const delaySearch = useCallback(
    debounce((e) => getBooks(e), 200),

    [search]
  );

  const getBooks = (e) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${e}&orderBy=newest&download=epub&filter=free-ebooks`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items);
        console.log(data);
      });
  };

  useEffect(() => {
    const LastSearch = localStorage.getItem("lastsearch");
    if (LastSearch) {
      setSearch(LastSearch);
      getBooks(LastSearch);
    }
  }, []);

  return (
    <Box>
      <Search value={search} onChange={handleSearch} />
      <Card books={books} search={search} />
    </Box>
  );
};

export default SearchFeild;
