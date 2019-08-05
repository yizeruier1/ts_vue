import Mock from 'mockjs'
const Random = Mock.Random
Mock.setup({
    timeout: '500-800'
})

interface Resp {
    code: number;
    msg: string;
    data: any
}

// 获取参数
const getParam = (url: string, pname: string): string | null => {
    var query = url.split('?')[1]
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] == pname) { return pair[1] }
    }
    return null
}

// 登录
Mock.mock('/login', 'post', (options: any): Resp => {
    let param = JSON.parse(options.body)
    if (param.username !== 'admin'){
        return {
            code: 201,
            msg: '用户名错误！',
            data: null
        }
    }
    if (param.password !== 'admin') {
        return {
            code: 201,
            msg: '密码错误！',
            data: null
        }
    }
    return {
        code: 200,
        msg: '登录成功',
        data: null
    }
})

let cnames: any = []
let ages: any = []
let addressArr: any = []
let dateArr: any = []
for(let i = 0; i < 100; i++){
    cnames.push(Random.cname())
    ages.push(Random.integer(10, 30))
    addressArr.push(Random.city(true))
    dateArr.push(Random.date())
}
let tableData = Mock.mock({
    'list|10': [{
        'list|10': [{
            'id|+1': 0,
            'createTime|1': dateArr,
            'name|1': cnames,
            'address|1': addressArr,
            'gender|1': [1, 2],
            'age|1': ages,
        }]
    }]
})
// 生成 数据表格getTable
Mock.mock(/getTable/, 'get', (options: any): Resp => {
    let pageNum: number = Number(getParam(options.url, 'pageNum') || 1)
    return {
        code: 200,
        msg: 'success',
        data: {
            pageSize: 10,
            pageNum: pageNum,
            total: 100,
            list: tableData.list[pageNum - 1].list
        }
    }
})

// 删除数据
Mock.mock(/deleteTableItem/, 'delete', (options: any): Resp => {
    let id: number = Number(getParam(options.url, 'id'))
    
    let row = Math.floor(id / 10)
    let item = id % 10

    tableData.list[row].list.splice(item, 1)
    tableData.list[row].list.push(Mock.mock({
        'id|+1': 0,
        'createTime|1': dateArr,
        'name|1': cnames,
        'address|1': addressArr,
        'gender|1': [1, 2],
        'age|1': ages,
    }))
    return {
        code: 200,
        msg: 'success',
        data: null
    }
})