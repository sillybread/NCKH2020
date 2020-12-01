import React from 'react'
import "components/matrix.js"

let Config = {
    size: {
        x: 53,
        y: 23,
        z: 26,
        tilesize: 5
    },
    door: {
        show: !0,
        direction: "C"
    },
    "axis-labels": {
        "axis-x": {
            show: !0,
            list: [0, 13, 26, 53]
        },
        "axis-y": {
            show: !0,
            list: [22, 10]
        },
        "axis-z": {
            show: !0,
            list: [23, 12, 18]
        }
    }
};

// function axiosTest() {
//   // create a promise for the axios request
//   const promise = Axios.get( BASE_URL + "api/room/data/getDemoData");

//   // using .then, create a new promise which extracts the data
//   const dataPromise = promise.then((response) => response.data)

//   // return it
//   return dataPromise
// }

const matrixView = () =>{
    // const [dat, setData] = useState(helper.initData(Config.size))

    // useEffect(()=>{
    //     axiosTest()
    //         .then(data => setData(data))
    //         .catch(err => console.log(err))
    // },[])
    // return(
    //     <MatrixChart config={Config} data={dat}/>
    // )
    return(
        <div/>
    );
}
export default matrixView;