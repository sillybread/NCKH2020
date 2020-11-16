module.exports ={
    /* 2 option: real, fake */
    mode:"fake",
    rowsFake:400,
    fileName:"Data11.xlsx",
    baseURL:"http://iotlab.net.vn:3000/api/",
    api:{
        login:"auth/token",
        getValue:"data/gettopbystation/8",
        getStation:"station/getbyuser/40"
    },
    loginInfo:{
        username:"tester@kholanhctu",
        password:"tester@123",
        grant_type:"password"
    }
    
}