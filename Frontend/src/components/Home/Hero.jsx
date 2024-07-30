import React from "react";

const Hero=()=>{ 
    return( <div className="md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
     <div className="w-full mb-12 mt-2 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start">
     <h1 className="text-4xl font-semibold text-yellow-100 text-center lg:text-left">Lose Yourself in a Book: Discover, Read, Repeat.</h1>
     <p className="mt-4 text-xl text zinc-300">Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
       <div className="mt-8">
        <button className="text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full">Discover Books</button>
    </div>
       </div>
     <div className="w-auto lg:w-3/6  h-auto lg:h-[100%]  flex items-right justify-center ">
        <img src="./images/home.png" alt= " " />
     </div>
    </div>
    );
};

export default Hero;