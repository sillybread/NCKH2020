exports.Get = function (rows,index){
    let DataArray = new Array();
    for(let i=index;i<index+18;i++){
        let date = new Date(String(rows[i][1]).replace(' ','T')+'.000Z');

        DataArray.push({
            data_id: i,
            station_id: 8,
            datatype_id: String(rows[i][0]),
            sink_id: null,
            pond_id: 21,
            river_id: null,
            data_value: rows[i][2],
            data_createdDate: date,
            data_stationType: 1,
            threshold_level: 0
        })
    }
    return {
        Error:false,
        Message:"Success",
        data: DataArray,
        length: DataArray.length,
    }
};

