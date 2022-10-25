import React from 'react'
function Toolbar(props) {
  return (
    <div class="bg-violet-600 flex text-white justify-between items-center gap-2 p-3">
      <a href = "/" class="text-inherit text-2xl">PokeDoc</a>
      <ul class="list-none p-0 m-0 flex gap-3">
        {
          props.links.map((value,index)=>{
            const link = "/"+value.toLowerCase().replace(" ","_")
            if (link == "/home"){
              //CHANGES LOGOUT COLOR TO RED
              return (
                <li>
                  <a href = {link} class="bg-violet-800 list-none text-lg hover:bg-purple-400 active:bg-purple-500 p-2 border-solid border-black border-2 rounded text-red">{value}</a>
                </li>
              )
            }
            return(
              <li>
                <a href={link} class="bg-violet-800 list-none text-lg hover:bg-purple-400 active:bg-purple-500 p-2 border-solid border-black border-2 rounded ">{value}</a>
              </li>
            )
        })}
      </ul>
    </div>
  );
}

export default Toolbar