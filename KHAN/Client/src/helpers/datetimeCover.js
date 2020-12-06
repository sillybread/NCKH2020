const dateToString = (data)=>{
    let date = new Date(data);
    return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' '+date.getDate()+'/'+date.getMonth()+'/'+date.getYear();
}
const timeToString = (data)=>{
    let date = new Date(data);
    return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

}
export { dateToString,timeToString}