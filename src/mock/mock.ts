import Mock from 'mockjs'
Mock.setup({
    timeout: '500-800'
})

interface Resp {
    code: number;
    msg: string;
    data: any
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