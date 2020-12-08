// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
const {timeToString} = require('helpers/datetimeCover')

// StackedAreaChart
const StatusChart = () => {
    const apexAreaChart2Opts = {
        chart: {
            stacked: true,
            events: {
                selection: function (chart, e) {
                    console.log(new Date(e.xaxis.min));
                },
            },
        },
        dataLabels: {
            enabled: false,
        },

        stroke: {
            width: 2,
            curve: 'smooth',
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.6,
                opacityTo: 0.8,
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: {
                horizontal: 12,
                vertical: 5,
            },
        },
        xaxis: {
            type: 'text',
        },

        yaxis: {
            labels: {
                show: true,
                formatter: (value) => {
                    return value + '°C';
                },
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                },
            },
        ],
    };

    const generateDayWiseTimeSeries = (baseval, count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    };

    const apexAreaChart2Data = [
        {
            name: 'KV Cá Ngừ',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 50, {
                min: -20,
                max: 5,
            }),
        },
        {
            name: 'KV Cá Tra',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 50, {
                min: -18,
                max: 5,
            }),
        },

        {
            name: 'KV Tôm',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 50, {
                min: -18,
                max: 10,
            }),
        },
    ];

    const areaData = useSelector(state => state.RoomData.areaData);
    const data = ()=>{
        if(areaData){
            if(areaData.length>0)
            return areaData[0].areas.map((areaT,index)=>{
                return {
                    name: areaT.name,
                    data: areaData.map(data=>({
                        x:timeToString(data.time),
                        y:(data.areas[index].average)?data.areas[index].average:data.areas[index].value
                    })),
                }
            })
        }
        return []; 
    }
    const [crData,setCrData] = React.useState(data());
    React.useEffect(()=>{
        setCrData(data());
    },[areaData])

    return (
        <Chart
            options={apexAreaChart2Opts}
            series={crData}
            type="line"
            className="apex-charts"
            height={450}
        />
    );
};

export default StatusChart;
