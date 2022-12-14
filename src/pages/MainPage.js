import React, {useState, useEffect} from 'react';
import {Navbar, Container, ButtonGroup , Button, Form, Spinner} from 'react-bootstrap';
import TableUsers from '../components/TableUsers';

const MainPage=()=>{

    const [country, setCountry]=useState('en');
    const [errInp, setErrInp]=useState(0);
    const [seed, setSeed]=useState('');
    const [itemInPage, setItemInPage]=useState(20);
    const [fakeData, setFakeData]=useState([]);
    const [isLoad, setLoad]=useState(true);
    const size=300;
    const page=20;

    useEffect(()=>{
        fetch(`https://task5server-production.up.railway.app/api/data?seed=${seed}&page=${page}&size=${size}&err=${errInp}&local=${country}`)
        .then(response=>response.json())
        .then(data=>{setFakeData(data.users); setLoad(true)})
        .catch(err=>console.log(err))
        // eslint-disable-next-line
    },[country,seed,page,size, errInp]);

    const handleErr=(value)=>{
        let newErr=value>1000?1000:Number(value);
        setErrInp(newErr) 
    }

    const setRandomSeed=()=>{
        let min=0;
        let max=1000;
        let randSeed=min+Math.random()*(max+1-min);
        setSeed(Math.floor(randSeed))
    }


    return(
        <div>
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand style={{color:'white'}}>Task 5</Navbar.Brand>
             </Container>
        </Navbar>
        <div style={{display:'flex', flexDirection:'row', margin:'0 5% 0 5%', justifyContent:'space-around', alignItems:'center'}}>
        <div >
            <h4>Choose a country</h4>
        <ButtonGroup  className="mb-2" onClick={(event)=>{setCountry(event.target.name)}}>
        <Button variant="outline-dark" name={'en'}>USA</Button>
        <Button variant="outline-dark" name={'ru'}>Russia</Button>
        <Button variant="outline-dark" name={'fr'}>France</Button>
      </ButtonGroup>
        </div>
         <div style={{width:'30%'}}>
            <Form.Label>Your number of mistakes is {errInp}</Form.Label>
            <Form.Range step={0.5} min={0} max={10} value={errInp} onChange={(event)=>handleErr(event.target.value)}/>
            <Form.Control type="number" min={0} max={1000} 
              value={errInp} onChange={(event)=> handleErr(event.target.value)} placeholder='Enter the number of errors'/>
         </div>
         <div style={{width:'40%', display:'flex', flexDirection:'row'}}>
         <Form.Control style={{height:'2.5em'}} placeholder='Enter seed' value={seed} onChange={(event)=>setSeed(event.target.value)}/>
         <Button variant="dark"  style={{height:'2.5em'}} name='buttonRandom' onClick={()=>setRandomSeed()}>Random</Button>
         </div>
        </div>
        {isLoad?<TableUsers data={fakeData} itemsInPage={itemInPage} setItem={setItemInPage}/>:
          <Spinner animation="border" variant="dark" style={{position:'absolute', top:'50%', left:'50%'}}/>}
        </div>
    )
}

export default MainPage;