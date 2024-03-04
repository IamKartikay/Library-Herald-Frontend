import React from "react";
import Tile from "./Tile";
import { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom'
import { HOST_ADDRESS } from '../constants';

const JournalTile = () => {
  const [data, setData] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year');
  const issue = queryParams.get('issue');
  const volume = queryParams.get('volume');
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${HOST_ADDRESS}/categories/?year=${year}&issue=${issue}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <div className="content">
          <div className="journal-tiles">
            {data.map((e, i) => (
              <Tile key={i} data={e} year={year} volume={volume} issue={issue}/>
            ))}
          </div>
        </div>
      ) : (
        <div className="content">
           <h1>Loading!</h1>
        </div>
      )}
    </>
  );
};

export default JournalTile;
