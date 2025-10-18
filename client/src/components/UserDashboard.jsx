import React from "react";
import ruet_library  from "../assets/ruet-library.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../layout/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {

  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    );
  
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    );
  
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#adb5bd", "#151619"],
        hoverOffset: 4,
      },
    ],
  };


  return <>
 <main className="relative flex-1 p-6 pt-28">
  <Header/>
  <div className="flex flex-col xl:flex-row">
    {/* leftside - content area */}
    <div className="flex-[3] flex flex-col gap-7">
      {/* Borrowed Books Item */}
      <div className="flex items-center gap-3 bg-white p-5 min-h-[80px] rounded-lg">
        <span className="w-[2px] bg-black h-full"></span>
        <span className="bg-gray-300 h-16 w-16 flex justify-center items-center rounded-lg">
          <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
        </span>
        <p className="text-lg font-semibold">Your Borrowed Book List</p>
      </div>
      
      {/* Returned Books Item */}
      <div className="flex items-center gap-3 bg-white p-5 min-h-[80px] rounded-lg">
        <span className="w-[2px] bg-black h-full"></span>
        <span className="bg-gray-300 h-16 w-16 flex justify-center items-center rounded-lg">
          <img src={returnIcon} alt="book-icon" className="w-8 h-8" />
        </span>
        <p className="text-lg font-semibold">Your Returned Book List</p>
      </div>
      
      {/* Browse Books Item */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-white p-5 min-h-[80px] rounded-lg">
          <span className="w-[2px] bg-black h-full"></span>
          <span className="bg-gray-300 h-16 w-16 flex justify-center items-center rounded-lg">
            <img src={browseIcon} alt="book-icon" className="w-8 h-8" />
          </span>
          <p className="text-lg font-semibold">Let's browse books inventory</p>
        </div>
      </div>
      
      {/* Quote section */}
      <div className="bg-white p-7 flex-grow min-h-[200px] rounded-lg flex justify-center items-center">
        <p className="text-2xl">"Heaven's Light Is Our Guide"</p>
      </div>
      
      {/* Footer text */}
      <div className="flex justify-end mt-auto">
        <p className="text-sm text-gray-600">~RUET CENTRAL LIBRARY</p>
      </div>
    </div>
    
    {/* rightside - pie chart */}
    <div className="flex-[2] flex flex-col">
      {/* Chart legend at top */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-2 bg-gray-500"></span>
            <span className="text-sm">Total Borrowed Books</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-2 bg-black"></span>
            <span className="text-sm">Total Returned Books</span>
          </div>
        </div>
      </div>
      
      {/* Pie chart */}
      <div className="flex-grow">
        <Pie
          data={data}
          options={{
            cutout: 0,
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
          className="w-full h-auto max-h-[500px]"
        />
      </div>
    </div>
  </div>
</main>
  </>;
};

export default UserDashboard;
