import React, { useEffect, useState } from "react";
import ListTodo from "./ListTodo";
import './css/ListTodo.css';
// import ListTodo from './ListTodo';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Chip, Paper } from "@mui/material";
import pdfMake from 'pdfmake/build/pdfmake.min.js';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//to get data from local storage 
  const getLocalItems = () => {
    let list = localStorage.getItem('todos');
    console.log("todos: " + list);
    if (list){
      return JSON.parse(localStorage.getItem('todos'));
    }
    else{
          return [];
        }
  };


const InputTodo = () => {
  let list1 = localStorage.getItem('todos');
  const [todos, setTodos] = useState(getLocalItems());
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');
  const todosurl = `http://10.10.10.145:3000`; 
  const [searchList, setSearchList] = useState([]);
  const  [currentTodos, setCurrentTodos] = useState([]);

// Function to generate the PDF
const generatePDF = () => {
  const docDefinition = {
    content: [
      { text: 'PERN TODO', style: 'header' }, // Custom style for the header
      { text: 'Todo List:', style: 'subheader' }, // Custom style for the subheader
      ...todos.map((todo, index) => ({ text: `${index + 1}. ${todo.description}`, margin: [0, 5] })), // Render each todo item
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10], // Margin bottom of the header
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5], // Margin bottom of the subheader
      },
    },
  };

  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.open();
};






 //getting todos 
  const getTodos = async () => {
    try {
      const response = await fetch(`${todosurl}/todos`);
      const jsonData = await response.json();
            console.log("jsondata", jsonData);
      setTodos(jsonData);
      console.log(todos);
    } catch (error) {
      console.error(error.message);
    }
  };

                //delete todo function

  const deleteTodo = async (id) => {
    console.log("id")

    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if(confirmed){
      try {
        const deleteTodo = await fetch(`${todosurl}/todos/${id}`, {
          method: "DELETE",
        });
        setTodos(list1.filter((todo) => todo.todo_id !== id));
        console.log(deleteTodo);
      } catch (error) {
        console.error(error.message); 
      }
    };
    }
    
                //delete todo function

    
    //getTodos on page load
  // useEffect(() => {
  //   getTodos();
  // }, []);


      // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;



                                                                                                // const currentTodos = !searchList ? todos.slice(indexOfFirstTodo, indexOfLastTodo)
                                                                                                 //                                  : searchList.slice(indexOfFirstTodo, indexOfLastTodo);  

  useEffect(() => {
    setCurrentTodos(searchList.length === 0 ? todos.slice(indexOfFirstTodo, indexOfLastTodo) 
                                  : searchList.slice(indexOfFirstTodo, indexOfLastTodo));
                                
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchList,todos]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastTodo = pageNumber * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    setCurrentTodos(
      searchList.length === 0
        ? todos.slice(indexOfFirstTodo, indexOfLastTodo)
        : searchList.slice(indexOfFirstTodo, indexOfLastTodo)
    );
    
  };   



  const onSubmitForm = async (e) => {
    // console.log("event",e);
    e.preventDefault();

    //Prevent empty todo descrition
    if (description.trim() === "") {
      alert("Please enter a description");
      return;
    }


    try {
      const body = { description };
      const response = await fetch(`${todosurl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      // window.location = "/";
      if (response.status === 200) {
        getTodos();
        setSuccessMessage('Todo added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const [description, setDescription] = useState("");
  const settingdescription = (e) => {
    setDescription(e.target.value);
    
  };

      // add data local storage
      

  const handleAddTodos = (e) =>{
    setTodos([...todos,{todo_id:todos.length+1,description:description}])
    // localStorage.setItem('todos', JSON.stringify(todos));
    console.log("todos", JSON.stringify(todos));
  }
  return (
    <>

         
     
      <Paper 
      component="form"
      sx={{ p: '2px 4px', alignItems: 'center', width: 900 }}
      >
          {/* Search Function */}
      {/* searchbar component with props setSearchList setSearchList(todos.filter((todo) => todo.description.toLowerCase().includes(searchTerm.toLowerCase())) */}
      <div className="searchbar   " >   
      {/* If  */}
      <input type="text" placeholder="Search.."  onChange={(e) =>  {setSearchList(todos.filter((todo) => todo.description.toLowerCase().includes(e.target.value.toLowerCase())))}
    //  if(searchList.length === 0){
    //   setCurrentTodos(todos.slice(indexOfFirstTodo, indexOfLastTodo));
    // }

    }/>
      <Icon sx={{ color: green[500] }} fontSize="large">search</Icon>
      </div>
      {/* searchbar component with props setSearchList setSearchList(todos.filter((todo) => todo.description.toLowerCase().includes(searchTerm.toLowerCase())) */}
     


      <h1 className="text-center mt-5">PERN TODOS</h1>
      {successMessage && <div className='success-message'>{successMessage}</div>}
      <form className="d-flex mt-5" >
       
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={settingdescription}
        />
        <Button className=" "  onClick={handleAddTodos}>
          {" "}
          Add
        </Button>
        <Button onClick={generatePDF} className="btn-primary">
        Generate PDF
      </Button>
        
      </form>
      {todos.length > 0 && <ListTodo todos={currentTodos} deleteTodo={deleteTodo} />}

      <Pagination
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      

    {todos.length <= 0 && "NO DATA AVAILABLE to show"}
      </Paper>
    </>
  );
};

export default InputTodo;

// Pagination component
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






  
