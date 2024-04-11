import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  const [memberdata, setMemberdata] = useState([]);
  const [admindata, setAdmindata] = useState([]);
  const teamData = async () => {
    const response = await fetch("https://nijin-server.vercel.app/api/team-members",
      {
        method: "GET",
      });
    const data = await response.json();
    const admindata = data.filter((prevalue) => {
      return prevalue.role === "admin"
    });
    const memberdata = data.filter((prevalue) => {
      return prevalue.role === "member"
    });
    setAdmindata(admindata);
    setMemberdata(memberdata);
  }

  useEffect(() => {
    teamData();
  }, []);

  return (
    <div className="App">
      <header>
        <div className='headerView'>
          <span>Team</span>
          <div className='inputsearch'>
            <i class="fa fa-search"></i>
            <input type="search" placeholder='Search' />
          </div>
        </div>
      </header>
      <div className='bodydataView'>
        <h3>Administrators</h3>
        <div className='grid-container'>
          {admindata.map((currValue) => {
            return (
              <>
                <div className='grid-item'>
                  <img src={currValue.img} alt='currValue.img' />
                  <div className='user-info'>
                    <p>{currValue.first_name}{currValue.last_name}</p>
                    <p>{currValue.email}</p>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <hr />
        <h3>Members</h3>
        <div className='grid-container'>
          {memberdata.map((currValue) => {
            return (
              <>
                <div className='grid-item'>
                  <img src={currValue.img} alt='currValue.img' />
                  <div className='user-info'>
                    <p>{currValue.first_name}{currValue.last_name}</p>
                    <p>{currValue.email}</p>
                  </div>
                </div>
              </>
            )
          })}</div>
      </div>
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </div>
  );
}

export default App;
