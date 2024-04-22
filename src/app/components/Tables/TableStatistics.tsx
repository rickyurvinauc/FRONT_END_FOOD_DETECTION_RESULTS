import React, {useState, useEffect} from 'react';
import axios from 'axios';

type Props = {
    className: string
}

const TableStatistics: React.FC<Props> = ({className}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/error-results`)
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
                    <span className='card-label fw-bold fs-3 mb-1'>Error by nutrient of dishes</span>
                </h3>
            </div>

            <div className='card-body py-3'>
                <div className='table-responsive'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                        <thead>
                        <tr className='fw-bold text-muted'>
                            <th className='min-w-140px'>app_name</th>
                            <th className='min-w-120px'>dish_id</th>
                            <th className='min-w-120px'>nutrient</th>
                            <th className='min-w-120px'>error</th>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row['app_name']}</td>
                                <td>{row['dish_id']}</td>
                                <td>{row['nutrient']}</td>
                                <td>{parseFloat(row['error']).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export {TableStatistics}