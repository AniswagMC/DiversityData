import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import PieRechartComponent from './chart';

function GraphData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [select, setSelect] = useState(2);

    const runCall = async () => {
        let apiValue = await fetchData();
        const fchoice = apiValue.split('\n').slice(0).map(line => (line.split(',')))[select];
        const mchoice = apiValue.split('\n').slice(0).map(line => (line.split(',')))[select + 7];
        // console.log("This is " + fchoice);

        const optionList = [];
        const race = apiValue.split('\n').slice(1).map(line => (line.split(',').slice(2, 3)));
        // console.log(race);

        for (let i = 1; i < race.length/2; i++) {
            optionList.push({ label: race[i].reverse().join(":"),
                              value: i + 1});
        }

        const dataArr = [];

        //femalde datapoints
        const newFPoint = {};
        newFPoint.name = fchoice[1]; 
        newFPoint.value = parseInt(fchoice[3]);
        dataArr.push(newFPoint);

        //male data points
        const newMPoint = {};
        newMPoint.name = mchoice[1]; 
        newMPoint.value = parseInt(mchoice[3]);
        dataArr.push(newMPoint);

        // console.log(dataArr);

        // console.log(optionList);
        setIsLoading(false);
        setOptions(optionList);
        setData(dataArr);
        return null;
    }

    const fetchData = async () => {
        const requestOption = {
          method: "GET",
          redirect: "follow"
        }
    
        const apiUrl = `https://raw.githubusercontent.com/AniswagMC/DiversityData/main/NewData%20UTF.csv`
    
        try {
          const response = await fetch(apiUrl, requestOption);
          return response.ok ? response.text() : null
        } catch (err) {
          console.log(err);
          return null;
        }
    }

    useEffect(() => {
        runCall();
    }, [select]);

    const changed = (input) => {
        setSelect(input.value);
    }

    return (
        <div>
            {isLoading ? <div> loading... </div> : 
            <div> 
                <Select options = {options} onChange = {changed}/>
                <PieRechartComponent data = {data}/>  
            </div>}
        </div>
    )
}

export default GraphData;