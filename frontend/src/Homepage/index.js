import React from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Homepage = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    function createCampaign() {
        fetch('api/campaigns', {
            "headers": {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            "method": "post", 
          })
          .then((response) => {
              if(response.status === 200) 
                  return Promise.all([response.json(), response.headers]);
              else
                  return Promise.reject("not good");
          }).catch((message) => {
              alert(message);
          });
    }
    return (
        <div>
            <button onClick={() => createCampaign()}>Add campaign</button>
        </div>
    );
};

export default Homepage;