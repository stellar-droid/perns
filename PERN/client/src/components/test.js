import React from "react";
import chip from '@mui/material/Chip';
import { Chip, Paper } from "@mui/material";
import { green } from '@mui/material/colors';



//  example of a functional component in which destrcturing is used
 const Pagination = ({ currentPage,todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];
                                                                    console.log("totalTodos",totalTodos);
                                                                    console.log("todosPerPage",todosPerPage);
                                                                    console.log("currentPage",currentPage);
                                                                    console.log("paginate",paginate);
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav">
        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda excepturi ea sequi, dolor, asperiores nulla, officia iure ipsum mollitia quos quaerat ab nihil totam. Modi cupiditate ut temporibus officiis iusto?</h1>
      <ul className="pagination">
        {pageNumbers.map((numbers) => (
          <li key={numbers} className="page-item">
            <a
              onClick={() => paginate(numbers)}
              href="#!"
              className="page-link"
            >
             <Chip color="info"
             key={numbers}
             label={numbers}>
             {/* {numbers} */}
             {/* onClick={() => paginate(numbers)} */}
             disabled={currentPage === numbers}
              </Chip>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;







