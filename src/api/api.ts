import myHttp from './inithttp'

// 登录
export const login = (param: any): any => myHttp.post('/login', param).then(res => res.data)

// 获取 表格 数据
export const getTableData = (param: any): any => myHttp.get('/getTable', { params: param }).then(res => res.data)

// 删除一条数据
export const DeleteTableData = (id: number): any => myHttp.delete('/deleteTableItem', { params: { id: id } }).then(res => res.data)