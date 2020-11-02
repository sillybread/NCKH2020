import Slider from 'rc-slider';
import React, { useState } from 'react';
import Select from 'react-select';
import { InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const MySlider = createSliderWithTooltip(Slider);
export default function MySlice(props) {
    const min = props.min ? props.min : 0;
    const max = props.max ? props.max : 10;
    const [value, setValue] = useState(min);
    const [axis, setAxis] = useState({ value: 'z', label: 'Axis Z' });

    const changeValue = () => {
        props.onChangeValue && props.onChangeValue(value);
    };
    const changeAxis = () => {
        props.onChangeAxis && props.onChangeAxis(axis.value);
    };
    return (
        <div className="mt-5 row">
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
                    changeAxis();
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
                        setValue(num >= min && num <= max ? num : num < min ? max : min);
                        changeValue();
                    }}
                />
            </InputGroup>
            <div className="col-12">
                <MySlider
                    min={min}
                    max={max}
                    value={value}
                    onChange={(value) => {
                        setValue(value);
                        changeValue();
                    }}></MySlider>
            </div>
        </div>
    );
}
