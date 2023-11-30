import React from 'react'

 const isShowLoader= function (){
   let loaderDisplay = document.getElementsByClassName("loader")[0];
   if(loaderDisplay){
      loaderDisplay.style.display = "flex";
      document.getElementsByClassName("loader-container")[0].style.height = "50vh";
      document.getElementsByClassName("blur-bg-custom")[0].style.filter = "blur(8px)";
   }
}

const isHideLoader=  function (){
   let loaderDisplay = document.getElementsByClassName("loader")[0];
   if(loaderDisplay){
      loaderDisplay.style.display = "none";
      document.getElementsByClassName("loader-container")[0].style.height = "0";
      document.getElementsByClassName("blur-bg-custom")[0].style.filter = "blur(0px)";
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