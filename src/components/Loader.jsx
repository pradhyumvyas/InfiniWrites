import React from 'react'

 const isShowLoader= function (){
   let loaderDisplay = document.getElementsByClassName("loader")[0];
   if(loaderDisplay){
      loaderDisplay.style.display = "flex";
      document.getElementsByClassName("loader-container")[0].style.height = "50vh";
   }
}

const isHideLoader=  function (){
   let loaderDisplay = document.getElementsByClassName("loader")[0];
   if(loaderDisplay){
      loaderDisplay.style.display = "none";
      document.getElementsByClassName("loader-container")[0].style.height = "0";
   }
}

function Loader() {
  return (
   <div className="loader-container">
      <div className="loader"></div>
   </div>
  )
}

export {isShowLoader, isHideLoader}
export default Loader;