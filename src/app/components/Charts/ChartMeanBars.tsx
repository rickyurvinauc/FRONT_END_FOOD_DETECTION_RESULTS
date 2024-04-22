import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

type Props = {
    className: string
}

const ChartMeanBars: React.FC<Props> = ({className}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/statistics`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const getBarPlotData = (nutrient: string) => {
        const nutrientData = data.filter(item => item['nutrient'] === nutrient);
        const apps = [...new Set(nutrientData.map(item => item['app_name']))];
        return {
            x: apps,
            y: apps.map(app => {
                const appData = nutrientData.filter(item => item['app_name'] === app);
                return appData.reduce((sum, item) => sum + item['mean_error'], 0) / appData.length;
            }),
            type: 'bar',
            name: nutrient
        };
    };

    const nutrients = [...new Set(data.map(item => item['nutrient']))];

    return (
        <div className={`card ${className}`}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {nutrients.map(nutrient => (
                    <div key={nutrient} style={{flex: '0 0 50%'}}>
                        <h3>{`Mean Error for ${nutrient}`}</h3>
                        <Plot
                            data={[getBarPlotData(nutrient)]}
                            layout={{width: 520, height: 240, title: `Bar Plot for ${nutrient}`}}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export {ChartMeanBars}