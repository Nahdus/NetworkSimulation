// import axios from 'axios';
// import {config} from 'dotenv';



const  raise = async (id,action)=>{

    fetch(process.env.TICKET_PULSE_URL, {
        method: "POST",
        body: JSON.stringify({
            nodeid: id,
            action: action,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
}

export {raise}
