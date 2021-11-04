import Mock from "mockjs";
export default {
  getCalendar: config => {
    const count = 100;
    // { date: "2019-11-10", thing: "this is test" },
    // { date: "2019-11-18", thing: "this is test" },
    // { date: "2019-11-22", thing: "this is test" },
    // { date: "2019-11-12", thing: "this is test" }
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(
        Mock.mock({
          id: Mock.Random.guid(),
          thing: Mock.Random.ctitle(2, 12),
          date: Mock.Random.date("yyyy-MM-dd")
        })
      );
    }

    return list;
  },
  getTaskList: config => {
    const count = 50;
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(
        Mock.mock({
          id: Mock.Random.guid(),
          title: Mock.Random.ctitle(2, 8),
          times: Mock.Random.date("yyyy-MM-dd")
        })
      );
    }
    const tasklist = {
      columns: [
        { key: "title", name: "标题", sort: false },
        { key: "times", name: "发布时间", sort: true }
      ],
      rows: list
    };
    return tasklist;
  }
};
