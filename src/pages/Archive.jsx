import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./archive.css";
import DropdownButton from "../Components/DropdownButton";
import { HOST_ADDRESS } from '../constants';

const Archive = () => {
  const [Journals, setJournals] = useState(null);
  const [currentJournals, setCurrentJournals] = useState(null);
  const [allYears, setAllYears] = useState(null);

  const handleFetchByYear = async (year) => {
    await fetch(`${HOST_ADDRESS}/searhByYear/?year=${year}`)
      .then((res) => res.json())
      .then((data) => {
        setJournals(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchJournals = async () => {
    await fetch(`${HOST_ADDRESS}/allJournals`)
      .then((res) => res.json())
      .then((data) => {
        setJournals(data.allJournals);
        setCurrentJournals(data.currentJournal);
        setAllYears(data.years);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <>
      {Journals ? (
        <div className="content">
          <div className="arch-body">
            <div className="a1">
              <p
                style={{
                  fontSize: "22px",
                  lineHeight: "1.41em",
                  fontWeight: "bold",
                  color: "#3a54b4",
                  textAlign:'center'
                }}
              >
                Library Herald Archive Search
              </p>
              <DropdownButton data={allYears} handleClick={handleFetchByYear} />

              <div className="flex-table">
                <div className="flex-item" id= 'header' style={{background:'#3a54b4', color:'white', position:'sticky', top: 0}}>
                  <p className="flex-item-column1" >ISSUE</p>
                  <p className="flex-item-column2" >YEAR</p>
                </div>
                {Journals.map((elem, i) => (
                  <div className="flex-item" key={i}>
                    <Link
                      to={`/articles/?year=${elem.year}&issue=${elem.issue}&volume=${elem.volume}`}
                      className="flex-item-column1"
                      style={{ color: "#3a54b4"}}
                    >
                      Volume-{elem.volume}, Issue-{elem.issue} ({elem.month})
                    </Link>
                    <p className="flex-item-column2" style={{ color: "black"}}>{elem.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="a2">
              <p
                style={{
                  fontSize: "22px",
                  lineHeight: "1.41em",
                  fontWeight: "bold",
                  color: "#3a54b4",
                  textAlign:'center'
                }}
              >
                Current Publication
              </p>
              <div className="flex-table">
                <div className="flex-item" id= 'header' style={{background:'#3a54b4', color:'white'}}>
                  <p className="flex-item-column1">ISSUE</p>
                  <p className="flex-item-column2">YEAR</p>
                </div>
                {currentJournals.map((elem, i) => (
                  <div className="flex-item" key={i}>
                    <Link
                      to={`/articles/?year=${elem.year}&issue=${elem.issue}`}
                      className="flex-item-column1"
                      style={{ color: "#3a54b4" }}
                    >
                      Volume-{elem.volume}, Issue-{elem.issue} ({elem.month})
                    </Link>
                    <p className="flex-item-column2" style={{ color: "black" }}>{elem.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default Archive;
