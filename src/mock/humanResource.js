import Mock from "mockjs";
import qs from "qs";
import {
    groupBy,
    GetDateDiff
} from "../utils/auth";



const compare = (propertyName) => {
    return function (obj1, obj2) {
        let value1 = obj1[propertyName];
        let value2 = obj2[propertyName];
        if (value2 > value1)
            return 1;
        else if (value2 < value1)
            return -1;
        else
            return 0;
    }
}

const compareByType = (propertyName, types) => {
    return function (obj1, obj2) {
        let value1 = obj1[propertyName];
        let value2 = obj2[propertyName];
        if (types === "asc") {
            if (value2 > value1)
                return 1;
            else if (value2 < value1)
                return -1;
            else
                return 0;
        } else {
            if (value2 > value1)
                return -1;
            else if (value2 < value1)
                return 1;
            else
                return 0;
        }
    }

}



const count = 200;
let positionList = []; //人员基本信息
let recruitList = []; //招聘信息表
let tenderList = []; //投标备案信息表

for (let i = 0; i < count; i++) {
    positionList.push(Mock.mock({
        id: Mock.Random.guid(),        
        sortnum: i + 1,       
        userName: Mock.Random.cname(),
        birthDay:Mock.Random.date(),//出生年月
        phoneNum:/\d{13}/,//电话号码
        emergencyMan:Mock.Random.cname(),//紧急联系人
        emergencyManNum:/\d{13}/,//紧急联系人电话
        positionName:Mock.Random.duty(),//岗位
        rankLevel: Mock.Random.posLevel(),//商位等级
        belongOrg:Mock.Random.org(),//所属组织
        belongDept:Mock.Random.dept(),//所属部门
        contractType:Mock.Random.contractType(), //合同类型
        contractBeginTime:Mock.Random.date(),//合同开始时间
        contractEndTime:Mock.Random.date(),//合同结束时间
        isNDA:Mock.Random.yesOrNo(),//是否签订保密协议
        NDAdate:Mock.Random.date(),//保密协议签订时间
        isResponsibility:Mock.Random.yesOrNo(),//是否签订岗位职责
        ResponsibilityDate:Mock.Random.date(),//签订岗位职责时间
        isProhibition:Mock.Random.yesOrNo(),//是否签订禁业合同
        ProhibitionDate:Mock.Random.date(),//签订禁业合同时间
        IDCard:/\d{18}/,//身份证号
        IDCardDate:Mock.Random.date()//身份证有限时间
    }))
}


for (let i = 0; i < 80; i++) {
    recruitList.push(Mock.mock({
        id: Mock.Random.guid(),
        sortnum: i + 1,
        belongOrg:Mock.Random.org(),//所属组织
        belongDept:Mock.Random.dept(),//所属部门
        recruitType:Mock.Random.recruitType(),//招聘类型
        createTime:Mock.Random.date(),
        deptLeader:Mock.Random.cname(),
        deptNum:/\d{13}/ //部门电话
    }))
}




const mydata = {
    "List": positionList,
    "recruitList": recruitList,
    "tenderList": tenderList
};

export default {
    getqueryList: config => {
        const {
            page = 1, limit = 20, filter = {}
        } = JSON.parse(config.body);
        let keys = [];
        //过滤数组当中有空值就不要
        for (let f in filter) {
            if (filter[f] === "") {

            } else {
                keys.push(f);
            }
        }
        let mocklist = positionList.filter(item => {
            return keys.every(k => {
                return item[k].indexOf(filter[k]) !== -1
            });
        })


        const userlist = mocklist.filter((item, index) => {
            return index >= limit * (page - 1) && index < limit * page;
        });
        return {
            code: 200,
            total: mocklist.length,
            rows: userlist,
            totalRows: mocklist
        }
    },
    //得到资料数据
    getresourceList: config => {
        let mylist = [];
        let ls=Mock.Random.integer(1,9);
        for(let i=0;i<ls;i++){
            mylist.push(Mock.mock({
                id: Mock.Random.guid(),
                sortnum: i + 1,
                resourceName:Mock.Random.ctitle(4,12),
                createTime: Mock.Random.datetime(),
                resourceType: Mock.Random.resourceType()                
            }));
        }
     // mylist= mylist.sort(compareByType('createTime','desc'));
        return {
            code: 200,
            total: mylist.length,
            rows: mylist         
        }
    },    
    ///得到明细信息
    getDetail: config => {
        const { ts, ids } = JSON.parse(config.body);
        //console.log(JSON.stringify(mydata[ts]));
        let data = mydata[ts].filter(s => { return s.sortnum == ids });
        //console.log("datas:"+JSON.stringify(data[0]));
        return data[0];//JSON对象
    },
    getRecruitList:config=>{
        const {
            page = 1, limit = 20, filter = {}
        } = JSON.parse(config.body);
        let keys = [];
        //过滤数组当中有空值就不要
        for (let f in filter) {
            if (filter[f] === "") {

            } else {
                keys.push(f);
            }
        }
        let mocklist = recruitList.filter(item => {
            return keys.every(k => {
                return item[k].indexOf(filter[k]) !== -1
            });
        })


        const userlist = mocklist.filter((item, index) => {
            return index >= limit * (page - 1) && index < limit * page;
        });
        return {
            code: 200,
            total: mocklist.length,
            rows: userlist,
            totalRows: mocklist
        }
    }

}