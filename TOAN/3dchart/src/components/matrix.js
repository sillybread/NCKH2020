// eslint-disable-next-line
import React, {useEffect, useRef, useState} from 'react';
import MySlice from './MySlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const TwoDimensionalChart = props => {
    const [container, setContainer] = useState(null);

    useEffect(()=>{
        if (!container) return;
        let table = document.createElement('table');
        table.className = 'table table-bordered text-center';
        for (let ii=0;ii<3;ii++){
            let row = document.createElement('tr');
            for(let jj=0;jj<3;jj++){
                let cell = document.createElement('td');
                cell.innerText = `(${ii},${jj})`;
                cell.onclick = () => {
                    alert(cell.innerText);
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    },[container])

    return(
        <div
            className="p-3"
            ref={
                e=>setContainer(e)
            }
        />
    )
}

const Matrix = (props) =>{
    const {w: iWidth, h: iHeight} = props;
    useEffect(()=>{
    },[])
    return(
        <>
            <TwoDimensionalChart w={iWidth} h={iHeight} />
            <div className='p-3'>
                <MySlice min={0} max={10} />
            </div>
        </>
    )
}
export default Matrix;

// eslint-disable-next-line
class MatrixHelper{
    constructor(props){
        this.opts = this.getApexChartOpts();
        this.series = (values)=>
            this.dataFrom2dArray(
                this.threeToTwo(values)
            );
        this.config = props.config;
        this.level = 0;
        this.axis = 'x';
        this.data = null;
    }
    getApexChartOpts = () => {
        return {
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 1,
            },
            chart: {
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        this.showLocation(config);
                    }
                },
                toolbar: {
                    show: false,
                },
                animations:{
                    enabled: false
                }
            },

            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return (
                        '<div ><span class="badge badge-light shadow p-3 border-dark">' +
                        series[seriesIndex][dataPointIndex] +
                        ' °C</span></div>'
                    );
                },
            },
        }
    };
    showLocation = (context) => {
        alert('x = ' + context.dataPointIndex + '\ny = ' + context.seriesIndex);
    };
    dataFrom2dArray(inp){
        return inp.map((value,index)=>({
            name: index,
            data: value.map((e,i)=>[i,e])
        }));
    }
    setSlice(axis, level){
        this.axis = axis;
        this.level = level;
    }
    threeToTwo(inp){
        let axis = this.axis;
        let level = this.level;
        let route = {
            x:{
                fast: 'z',
                slow: 'y',
                map: (a, i, f, s) => a[i][s][f]
            },
            y:{
                fast: 'x',
                slow: 'z',
                map: (a, i, f, s) => a[f][i][s]
            },
            z:{
                fast: 'x',
                slow: 'y',
                map: (a, i, f, s) => a[f][s][i]
            }
        }

        let ret = [], flatRet = [], size = this.config.size;
        let iFast = size[route[axis].fast];
        let iSlow = size[route[axis].slow];
        let iImmutable = size[axis]-level-1;
        for (let s=0;s<iSlow;s++){
            for(let f=0;f<iFast;f++){
                flatRet.push(
                    route[axis].map(inp,iImmutable,f,s)
                );
            }
            ret.push(flatRet);
            flatRet = [];
        }
        return ret;
    }

    updateMatrixFrom2D(inp){
        let aCell = document.querySelectorAll(".apexcharts-heatmap-rect");
        let iLen = aCell.length;
        this.data = this.threeToTwo(inp.values)
        let aReverse = this.data.reverse().flat();
        for (let c=0;c<iLen;c++)
            aCell[c].setAttribute('fill',`hsl(${
                (240 - 240 * (aReverse[c] - inp.min) / (inp.max - inp.min))
            },100%,50%`);
    }
}

/*
import Chart from 'react-apexcharts';
const Matrix = (props) => {
    const helper = new MatrixHelper(props);
    const [axis, setAxis] = useState('x');
    const [lv, setLv] = useState(0);
    const [series, setSeries] = useState(helper.series(props.data.values));
    const size = props.config.size;

    useEffect(()=>{
        helper.updateMatrixFrom2D(props.data)
    },[])
    useEffect(()=>{
        helper.setSlice(axis, lv);
        //setSeries(helper.series(props.data.values));
        helper.updateMatrixFrom2D(props.data)
    },[axis, lv])
    useEffect(()=>{
        setSeries(helper.series(props.data.values));
    },[axis])

    return (
        <>
            <Chart
                options={helper.opts}
                series={series}
                type="heatmap"
                className="heatmap-charts"
                height={300}
            />
            <MySlice
                min={0}
                max={size[axis]-1}
                onChangeValue={(v)=>setLv(v)}
                onChangeAxis={(a)=>setAxis(a)}
            />
        </>
    );
};
*/