import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

type Props = {
    className: string
}

const ChartNutrients: React.FC<Props> = ({className}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/statistics`)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const getBoxPlotData = (nutrient: string) => {
        const nutrientData = data.filter(item => item['nutrient'] === nutrient);
        const apps = [...new Set(nutrientData.map(item => item['app_name']))];
        return apps.map(app => {
            const appData = nutrientData.filter(item => item['app_name'] === app);
            return {
                y: [
                    appData[0]['min_error'],
                    appData[0]['mean_error'] - appData[0]['std_error'],
                    appData[0]['mean_error'],
                    appData[0]['mean_error'] + appData[0]['std_error'],
                    appData[0]['max_error']
                ],
                type: 'box',
                name: app
            };
        });
    };

    const nutrients = [...new Set(data.map(item => item['nutrient']))];

    return (
        <div className={`card ${className}`}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {nutrients.map((nutrient) => (
                    <div key={nutrient} style={{flex: '0 0 50%'}}>
                        <h3>{`Error for ${nutrient}`}</h3>
                        <Plot
                            data={getBoxPlotData(nutrient)}
                            layout={{width: 520, height: 240, title: `Box Plot for ${nutrient}`}}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export {ChartNutrients}