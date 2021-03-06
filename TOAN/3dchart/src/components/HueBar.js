import React, {
    useState,
    useEffect,
    useRef
} from 'react';

class hueBarHelper{
    constructor(props){
        this.eBar = this.createElement('div');
        this.eMin = this.createElement('div',{
            innerText: props.min,
            style: `float: left;`,
        });
        this.eBar.appendChild(this.eMin);

        this.eMax = this.createElement('div',{
            innerText: props.max,
            style: `float: right;`,
        });
        this.eBar.appendChild(this.eMax);

        this.ePointer = this.createElement('div',{
            style: `margin: auto; width: 5em;`,
        });
        this.eBar.appendChild(this.ePointer);

        this.width = props.width + (isNaN(props.width)?'':'px');
        this.height = props.height + (isNaN(props.height)?'':'px');
        this.min = props.min;
        this.max = props.max;
        this.cell = [];
        this.previousSelected = 0;
    }
    updateExtreme(min, max){
        this.eMin.innerText = this.min = min;
        this.eMax.innerText = this.max = max;
    }
    createElement(tagName, attribute = {}){
        let e = document.createElement(tagName);
        Object.assign(e, attribute);
        return e;
    }
    makeTable(parent){
        const tableBar = this.createElement('table',{
            style: `border-spacing: 0;
                width:${this.width};
                height:${this.height};`
        });
        parent.appendChild(tableBar);
        parent.appendChild(this.eBar);

        const row = this.createElement('tr');
        tableBar.appendChild(row);
        this.cell = [];
        for (let ii = 240; ii >= 0; ii--) {
            let eCell = this.createElement('td',{
                width: "auto",
                height: "100%",
                style: `padding: 0;
                    background-color: ${this.hsl(ii)}`,
                onclick: ()=> this.onCellClick(ii),
            });
            this.cell.unshift(eCell);
            row.appendChild(eCell);
        }
    }
    onCellClick(index){
        //restore previous selected cell's color
        let pre = this.previousSelected;
        this.cell[pre].style.background = this.hsl(pre);

        //make selected turn into black
        let e = this.cell[index];
        e.style.background = "#000";
        this.previousSelected = index;

        //update new temperature for middle label
        this.ePointer.innerText = this.hue2temp(index);
    }
    hue2temp = (hue, min = this.min, max = this.max) => (max - hue / 240 * (max - min)).toFixed(2)
    hsl = (hue, saturation = "100%", lightness = "50%") => `hsl(${hue},${saturation},${lightness})`
}

const HueBar = (props) => {
    const [e, setElement] = useState(document.createElement('p'));
    const helper = useRef();

    useEffect(() => {
        helper.current = new hueBarHelper(props);
    },[props])

    useEffect(() => {
        helper.current.makeTable(e);
        window.t = helper.current.onCellClick.bind(helper.current);
    }, [e]);

    useEffect(() => {
        helper.current.updateExtreme(props.min, props.max);
    }, [props.min, props.max])

    return (
        <div ref = {e => setElement(e)}/>
    );
}

HueBar.defaultProps = {
    min: 0,
    max: 7749,
    width: "100%",
    height: 10
}

export default HueBar;