import React from 'react'

function Toolbar(props) {
  return (
    <div class="bg-violet-600 flex text-white justify-between items-center gap-2 pl-3 pr-3">
      <a class="text-inherit text-2xl">PokeDoc</a>
      <ul class="list-none p-0 m-0 flex gap-3">
        {
          props.links.map((value,index)=>{
            return(
              <li>
                <a class="list-none text-inherit hover:bg-purple-400 active:bg-purple-500">{value}</a>
              </li>
            )
        })}
      </ul>
    </div>
  );
}

export default Toolbar