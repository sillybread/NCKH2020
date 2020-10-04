import React, { useState, useEffect } from 'react';

export default function HueBar(props) {
    const [color, setColor] = useState([]);
    useEffect(() => {
        for (let i = 0; i < 10; i++) {
            let temp = color.slice();
            temp.push(i);
            setColor(temp);
        }
        return () => {};
    }, []);

    return (
        <>
            {color.map((i) => {
                return <div>{i}</div>;
            })}
        </>
    );
}
