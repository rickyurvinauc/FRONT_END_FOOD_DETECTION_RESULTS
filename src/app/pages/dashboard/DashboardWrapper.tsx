import clsx from 'clsx'
import React, {useState} from 'react'

import {TableNutrientValues} from "../../components/Tables/TableNutrientValues.tsx";
import {TableStatistics} from "../../components/Tables/TableStatistics.tsx";
import {TableMeanStatistics} from "../../components/Tables/TableMeanStatistics.tsx";

const DashboardWrapper: React.FC = () => {
    const [tab, setTab] = useState('Header')

    return (
        <>
            <div className='card card-custom'>
                <div className='card-header card-header-stretch overflow-auto'>
                    <ul
                        className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
                        role='tablist'
                    >
                        <li className='nav-item'>
                            <a
                                className={clsx(`nav-link cursor-pointer`, {active: tab === 'Header'})}
                                onClick={() => setTab('Header')}
                                role='tab'
                            >
                                All Nutrients Values
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className={clsx(`nav-link cursor-pointer`, {active: tab === 'Content'})}
                                onClick={() => setTab('Content')}
                                role='tab'
                            >
                                Statistics
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                                className={clsx(`nav-link cursor-pointer`, {active: tab === 'Aside'})}
                                onClick={() => setTab('Aside')}
                                role='tab'
                            >
                                Mean of Statistics
                            </a>
                        </li>


                    </ul>
                </div>

                <div className='card-body'>
                    <div className='tab-content pt-3'>
                        <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                            <TableNutrientValues className='mb-5 mb-xl-8'/>
                        </div>

                        <div className={clsx('tab-pane', {active: tab === 'Content'})}>
                            <div className='row mb-10'>
                                <TableStatistics className='mb-5 mb-xl-8'/>
                            </div>
                        </div>

                        <div className={clsx('tab-pane', {active: tab === 'Aside'})}>
                            <TableMeanStatistics className='mb-5 mb-xl-8'/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export {DashboardWrapper}
