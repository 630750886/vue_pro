import orgTreeHelper from "org-tree-helper";

// 树形数据必须保证有children, size属性（表示节点宽高的数组）
// 支持跨层数据，使用isEmpty: false表示
const treeData = {
  name: "1",
  size: [50, 50],
  children: [
    {
      name: "2",
      size: [100, 50],
      children: []
    },
    {
      name: "3",
      size: [20, 50],
      children: []
    }
  ]
};

// 节点之间左右和上下的间距，默认为[20, 20]
const spacing = [20, 40];
// 是否水平，默认为false
const horizontal = true;

// 返回线条信息、节点信息、布局边界信息
const { pathData, nodesData, layoutExtents } = orgTreeHelper(treeData, {
  spacing,
  horizontal
});
export default nodesData;
