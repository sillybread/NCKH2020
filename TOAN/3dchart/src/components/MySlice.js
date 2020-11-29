 /* eslint-disable */
import Slider from 'rc-slider';
import React, { useState , useEffect} from 'react';
import Select from 'react-select';
import { InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const MySlider = createSliderWithTooltip(Slider);
const MySlice = (props) => {
    const min = props.min;
    const max = props.max;
    const [value, setValue] = useState(min);
    const [axis, setAxis] = useState({ value: 'x', label: 'Axis X' });

    const changeValue = (value) => {
        props.onChangeValue && props.onChangeValue(value);
        setValue(value);
    };
    const changeAxis = () => {
        props.onChangeAxis && props.onChangeAxis(axis.value);
    };
    useEffect(()=>{
        changeAxis();
    }, [axis]);

    return (
        <div className="row">
            <Select
                className="react-select bg-white col-6"
                classNamePrefix="react-select"
                value={axis}
                options={[
                    { value: 'x', label: 'Axis X' },
                    { value: 'y', label: 'Axis Y' },
                    { value: 'z', label: 'Axis Z' },
                ]}
                onChange={(data) => {
                    setAxis(data);
                }}></Select>
            <InputGroup className="col-6 mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Lớp hiện tại </InputGroupText>
                </InputGroupAddon>
                <Input
                    type="number"
                    value={value}
                    onChange={(event) => {
                        let num = event.target.value;
                        let val = num >= min && num <= max ? num : num < min ? max : min;
                        changeValue(val);
                    }}
                />
            </InputGroup>
            <div className="col-12">
                <MySlider
                    min={min}
                    max={max}
                    value={value}
                    onChange={(value) => {
                        changeValue(value);
                    }}></MySlider>
            </div>
        </div>
    );
}

MySlice.defaultProps = {
    min: 0,
    max: 10
}
export default MySlice;