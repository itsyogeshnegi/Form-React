import React, { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from "../firebase";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx"; // Import xlsx library

const database = getDatabase(app);

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const usersRef = ref(database);
    get(usersRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const usersArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          console.log(usersArray);
          setUsers(usersArray);
        } else {
          console.log("No Data Is Here");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Function to handle Excel download
  const handleExcelDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, ws, "UsersData");
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  // Function to handle search query change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    return (
      user.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="h-screen w-full flex flex-col  items-center">
      <div className="h-20 w-full bg-slate-300 flex justify-around items-center">
        <img src="/dashboard.png" className="h-[70%]" />
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-80 rounded-xl text-center  h-10"
        />
        <button
          className="bg-green-500 w-16 font-bold h-8 rounded-lg flex justify-evenly items-center"
          onClick={handleExcelDownload}
          title="Download Excel">
          <img src="/download.png" className="h-[80%]" />
        </button>
      </div>
      <div className="w-3/4 mt-10">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>State</th>
              <th>City</th>
              <th>Messages</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(user => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>{user.messages}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Pagination */}
        <div className="w-full flex justify-center items-center my-5">
          {filteredUsers.length > itemsPerPage && (
            <ul className="pagination">
              {Array(Math.ceil(filteredUsers.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
