import React, {useState, useEffect} from 'react';
import axios from 'axios';

type Props = {
    className: string
}

const TableNutrientValues: React.FC<Props> = ({className}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/mean`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <div className={`card ${className}`}>
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Sum over nutrients per app and dish</span>
                </h3>
            </div>

            <div className='card-body py-3'>
                <div className='table-responsive'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                        <thead>
                        <tr className='fw-bold text-muted'>
                            <th className='min-w-150px'>app_id</th>
                            <th className='min-w-140px'>app_name</th>
                            <th className='min-w-120px'>dish_id</th>
                            <th className='min-w-120px'>dish_name</th>
                            <th className='min-w-120px'>sum_calories</th>
                            <th className='min-w-120px'>sum_sugars</th>
                            <th className='min-w-120px'>sum_protein</th>
                            <th className='min-w-100px'>sum_carbohydrates</th>
                            <th className='min-w-100px'>sum_fats</th>
                            <th className='min-w-100px'>sum_sodium</th>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row['app_id']}</td>
                                <td>{row['app_name']}</td>
                                <td>{row['dish_id']}</td>
                                <td>{row['dish_name']}</td>
                                <td>{parseFloat(row['sum_calories']).toFixed(3)}</td>
                                <td>{parseFloat(row['sum_sugars']).toFixed(3)}</td>
                                <td>{parseFloat(row['sum_protein']).toFixed(3)}</td>
                                <td>{parseFloat(row['sum_carbohydrates']).toFixed(3)}</td>
                                <td>{parseFloat(row['sum_fats']).toFixed(3)}</td>
                                <td>{parseFloat(row['sum_sodium']).toFixed(3)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export {TableNutrientValues}