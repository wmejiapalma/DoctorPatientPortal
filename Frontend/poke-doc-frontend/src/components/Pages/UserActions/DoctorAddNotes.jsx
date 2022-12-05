import React from 'react'

const DoctorAddNotes = () => {
  //create a div with a class of card that has a textarea input and a submit button
    return (
    <div>
        <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <div>
                <textarea className="textarea" placeholder="Notes"></textarea>
            </div>
        </div>
        </div>
    </div>
  )
}

export default DoctorAddNotes