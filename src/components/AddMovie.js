import React, { useRef } from "react";

import classes from "./AddMovies.module.css";

const AddMovie = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const enteredTitle = titleRef.current.value;

  const enteredOpeningText = openingTextRef.current.value;

  const enteredReleaseDate = releaseDateRef.current.value;
 

 // let overallFormIsvalid = false;

  // if (enteredTitleIsValid && enteredOpeningTextIsValid) {
  //   overallFormIsvalid = true;
  // }

  const submitFormHandler = (event) => {
    event.preventDefault();

    // if (!overallFormIsvalid) {
    //   return;
    // }

    const movie = {
      title: enteredTitle,
      openingText: enteredOpeningText,
      releaseDate: enteredReleaseDate,
    };
    props.onAddMovie(movie);
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="openingText">Opening Text</label>
        <textarea id="openingText" rows="5" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="releaseDate">Release Date</label>
        <input
          type="date"
          id="releaseDate"
          ref={releaseDateRef}
          required="required"
        />
      </div>
      <button >Add Movie</button>
    </form>
  );
};

export default AddMovie;
