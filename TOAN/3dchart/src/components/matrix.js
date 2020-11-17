/* eslint-disable react/style-prop-object*/
import React, {useEffect, useState} from 'react';
import MySlice from './MySlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const helper = {
    setProps(props){
        this.data = props.data;
        this.min = props.min;
        this.max = props.max;
        this.width = this.data[0].length;
        this.height = this.data.length;
        this.onClick = props.onClick;
    },
    createElement(tagName, attribute = {}){
        let e = document.createElement(tagName);
        Object.assign(e, attribute);
        return e;
    },
    createEmptyElement(){
        return this.createElement('p')
    },
    xRuler: document.createElement('span'),
    yRuler: document.createElement('span'),
    makeRow(rowNumber, container){
        const { data: DATA, min: MIN, max: MAX, width: WIDTH} = this;

        let row = this.createElement('tr');

        // row.appendChild(
        //         this.createElement('td', {
        //             style: "width: 8em; padding-right: 1.56em;",
        //             innerHTML: rowNumber,
        //             id: "r"+rowNumber,
        //         })
        // );

        for(let ix=0;ix<WIDTH;ix++){
            row.appendChild(
                this.createElement('td', {
                    onclick: () => this.onClick(ix,rowNumber),
                    onmouseenter: () => this.onMouseEnter(ix,rowNumber),
                    onmouseout: () => this.onMouseOut(ix,rowNumber),
                    style: `background: hsl(${(240 - 240 * (DATA[rowNumber][ix] - MIN) / (MAX - MIN))},100%,50%);`
                })
            );
        }
        container.appendChild(row);
    },
    makeLastRow(container){
        let row = this.createElement('tr', { style: "height: 1.5em; padding: 20px!important; margin: 20px!important;"});

        row.appendChild(
            this.createElement('td',{ innerHTML: "#"})
        );

        for(let ix=0;ix<this.width;ix++){
            row.appendChild(
                this.createElement('td',{
                    innerHTML: ix,
                    id: "c"+ix,
                    style: "height: 5em; width: 10em;"
                })
            );
        }
        container.appendChild(row);
    },
    makeTable(container){
        const table = helper.createElement('table', {
            className: 'text-center',
            style: "width: 100%; height: 100%;"
        })

        for(let iy=this.height-1;iy>=0;iy--){
            helper.makeRow(iy, table);
        }
        //helper.makeLastRow(table);

        container.innerHTML = '';
        container.appendChild(table);
        container.appendChild(this.xRuler);
        container.appendChild(this.yRuler)
    },
    onMouseEnter(x, y){
        this.xRuler.innerHTML = x;
        this.yRuler.innerHTML = y;
    },
    onMouseOut(x, y){
        delete [x, y];
    },
    handleRuler(container, event){
        this.xRuler.style = this.yRuler.style = 'display;';
        let x = event.clientX-this.xRuler.offsetWidth/2;
        this.xRuler.style = `background: #afa;
            position: absolute;
            margin: 3px;
            left: ${x}px;
            top: ${container.offsetHeight+container.offsetTop}px;`;

        let y = event.clientY-this.yRuler.offsetHeight/2;
        this.yRuler.style = `background: #faa;
            position: absolute;
            margin: 3px;
            left: ${container.offsetWidth+container.offsetLeft}px;
            top: ${y}px;`;
    },
    removeRuler(){
        this.xRuler.style.display = this.yRuler.style.display = 'none';
    },
    threeToTwo(inp, config, axis, level){
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

        let ret = [], flatRet = [], size = config.size;
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
}

const TwoDimensionalChart = (props) => {
    const [container, setContainer] = useState(helper.createEmptyElement());
    useEffect(()=>{
        helper.setProps(props);
        helper.makeTable(container);
        let parent = container.parentElement || container;
        let sm = (parent.offsetWidth<parent.offsetHeight)?parent.offsetWidth:parent.offsetHeight;
        const {width: WIDTH, height: HEIGHT} = helper
        Object.assign(container.style,{
            width: `${sm/HEIGHT*WIDTH}px`,
            height: `${sm}px`
        });
        console.info(parent, sm);
    },[container, props])

    return(
        <>
            <div
                ref={
                    e=>setContainer(e)
                }
                style={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
                onMouseOver={(event) => helper.handleRuler(container, event)}
                onMouseOut={()=>helper.removeRuler()}
            />
        </>
    )
}

TwoDimensionalChart.defaultProps = {
    onClick: (x, y)=>{console.log(x, y)},
}

const Matrix = (props) =>{
    const [dat, setData] = useState([[]]);
    const [axis, setAxis] = useState('x');
    const [sLv, setLevel] = useState(0);
    const min = props.data.min;
    const max = props.data.max;

    useEffect(()=>{
        let d = helper.threeToTwo(props.data.values, props.config, axis, sLv);
        setData(d);
        window.s = setLevel;
    },[props, axis, sLv])

    return(
        <>
            <br/>
            <TwoDimensionalChart data={dat} min={min} max={max}/>
            <br/>
            <div className="m-3">
                <MySlice min={0} max={props.config.size[axis]-1}
                    onChangeValue={(v)=>setLevel(v)}
                    onChangeAxis={(ax)=>setAxis(ax)}
                />
            </div>
        </>
    )
}
export default Matrix;