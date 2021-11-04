import Mock from 'mockjs'

Mock.mock('api/contract/engineering_consult/queryData','post',{
    status:200,
    message:'查询成功',
    data:[1,2,3,4]
})
