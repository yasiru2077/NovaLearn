import React, { useEffect, useState } from 'react'
import './mainsidebar.css';
import axios from 'axios';
import QuizTitle from '../quiztitles/QuizTitle';
export default function MainSidebar() {
 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);
   

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdown1 = () => {
        setIsDropdownOpen1(!isDropdownOpen1);
      };

    const toggleDropdown2 = () => {
        setIsDropdownOpen2(!isDropdownOpen2);
      };  
    
    const toggleDropdown3 = () => {
        setIsDropdownOpen3(!isDropdownOpen3);
      };
    
    const toggleDropdown4 = () => {
        setIsDropdownOpen4(!isDropdownOpen4);
      };  
  
    const toggleDropdown5 = () => {
        setIsDropdownOpen5(!isDropdownOpen5);
      };  

      const [quiz,setQuiz]=useState([]);
  
      useEffect(() => {
        const fetchQuiz = async () => {
     
            const res = await axios.get("/quiz");
           setQuiz(res.data)
            
         
        }
    
        fetchQuiz();
      }, []);

   
  return (
    <div>

    
<button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" 
aria-controls="sidebar-multi-level-sidebar" type="button" 
onClick={toggleSidebar}
class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none 
focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside 
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-0 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      
      <ul class="space-y-2 font-medium">
        
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span class="ml-3">Dashboard</span>
            </a>
         </li>
         <li>
            <button type="button"  onClick={toggleDropdown} class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i class="fa-solid fa-graduation-cap"></i>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">Grade 6</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>1
                  </svg>
            </button>
            <ul id="dropdown-example" className={`${
                  isDropdownOpen ? 'block' : 'hidden'
                } py-2 space-y-2`}>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Review Questions</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Questions</a>
                  </li>
                 
            </ul>
         </li>
         <li>
            <button type="button"  onClick={toggleDropdown1} class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i class="fa-solid fa-graduation-cap"></i>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">Grade 7</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>1
                  </svg>
            </button>
            <ul id="dropdown-example" className={`${
                  isDropdownOpen1 ? 'block' : 'hidden'
                } py-2 space-y-2`}>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Review Questions</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Questions</a>
                  </li>
                 
            </ul>
         </li>
         <li>
            <button type="button"  onClick={toggleDropdown2} class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i class="fa-solid fa-graduation-cap"></i>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">Grade 8</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>1
                  </svg>
            </button>
            <ul id="dropdown-example" className={`${
                  isDropdownOpen2 ? 'block' : 'hidden'
                } py-2 space-y-2`}>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Review Questions</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Questions</a>
                  </li>
                 
            </ul>
         </li>
         <li>
            <button type="button"  onClick={toggleDropdown3} class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i class="fa-solid fa-graduation-cap"></i>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">Grade 9</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>1
                  </svg>
            </button>
            <ul id="dropdown-example" className={`${
                  isDropdownOpen3 ? 'block' : 'hidden'
                } py-2 space-y-2`}>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Review Questions</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Questions</a>
                  </li>
                 
            </ul>
         </li> 
         <li>
            <button type="button"  onClick={toggleDropdown4} class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i class="fa-solid fa-graduation-cap"></i>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">Grade 10</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>1
                  </svg>
            </button>
            <ul id="dropdown-example" className={`${
                  isDropdownOpen4 ? 'block' : 'hidden'
                } py-2 space-y-2`}>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Review Questions</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Questions</a>
                  </li>
                 
            </ul>
         </li>
         <li>
            <button type="button"  onClick={toggleDropdown5} class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i class="fa-solid fa-graduation-cap"></i>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">Grade 11</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>1
                  </svg>
            </button>
            <ul id="dropdown-example" className={`${
                  isDropdownOpen5 ? 'block' : 'hidden'
                } py-2 space-y-2`}>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Review Questions</a>
                  </li>
                  <li>
                     <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Questions</a>
                  </li>
                 
            </ul>
         </li>
        
      </ul>
   </div> 
</aside>

<div class="p-4 sm:ml-64"  onClick={closeSidebar}>
   <div class="p-12 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
   <QuizTitle quizes={quiz}/>
      
   </div>
</div>


    </div>
  )
}
