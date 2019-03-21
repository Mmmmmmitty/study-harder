export default {
  mounted() {
    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var go = this.go;
    var $ = go.GraphObject.make; // for conciseness in defining templates in this function

    var myDiagram = $(go.Diagram, "myDiagramDoubleTree", {
      initialContentAlignment: go.Spot.Center, // 居中显示内容
      "undoManager.isEnabled": false, // 打开 Ctrl-Z 和 Ctrl-Y 撤销重做功能
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelNone, //鼠标滚轮事件禁止
      isReadOnly: true, // 只读
      // layout: $(
      //   go.TreeLayout, // 1个特殊的树形排列 Diagram.layout布局
      //   { angle: 270, layerSpacing: 60 }
      // )
    });
    let mainNode = $(
      go.Node,
      "Horizontal",
      { background: "#fff" },
      $(
        go.Picture,
        { margin: 10, width: 50, height: 50, background: "#ddd" },
        new go.Binding("source")
      ),
      $(
        go.TextBlock,
        { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
        new go.Binding("text", "name")
      )
    );
    // 第三名节点
    let thirdNode = $(
      go.Node,
      "Horizontal",
      { background: "#fff",position: new go.Point(100, 100) },
      $(
        go.Picture,
        { margin: 10, width: 50, height: 50, background: "#ddd" },
        new go.Binding("source")
      ),
      $(
        go.TextBlock,
        { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
        new go.Binding("text", "name")
      )
    );
    // 第四名节点
    let fourthNode = $(
      go.Node,
      "Horizontal",
      { background: "#fff",position: new go.Point(-100, 100) },
      $(
        go.Picture,
        { margin: 10, width: 50, height: 50, background: "#ddd" },
        new go.Binding("source")
      ),
      $(
        go.TextBlock,
        { margin: 5, font: "bold 11px Helvetica, bold Arial, sans-serif" },
        new go.Binding("text", "name")
      )
    );
    myDiagram.nodeTemplateMap.add("mainNode", mainNode);
    myDiagram.nodeTemplateMap.add("thirdNode", thirdNode);
    myDiagram.nodeTemplateMap.add("fourthNode", fourthNode);
    // define the Link template
    myDiagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape, { strokeWidth: 2, stroke: "#555" }),
      $(go.TextBlock, new go.Binding("text", "text"))
    ); // the link shape

    // create the model for the double tree
    myDiagram.model = new go.TreeModel([
      // these node data are indented but not nested according to the depth in the tree
      { key: "Root", category: "mainNode" },
      {
        key: "L-1",
        parent: "Root",
        dir: "left",
        name: "L-1",
        category: "mainNode"
      },
      { key: "L-1-1", parent: "L-1", name: "L-1-1", category: "mainNode" },
      { key: "L-1-2", parent: "L-1", name: "L-1-2", category: "mainNode" },
      {
        key: "L-1-1-1",
        parent: "L-1-1",
        name: "L-1-1-1",
        category: "mainNode"
      },
      {
        key: "L-1-1-2",
        parent: "L-1-1",
        name: "L-1-1-2",
        category: "mainNode"
      },
      {
        key: "L-1-2-1",
        parent: "L-1-2",
        name: "L-1-2-1",
        category: "mainNode"
      },
      {
        key: "L-1-2-2",
        parent: "L-1-2",
        name: "L-1-2-2",
        category: "mainNode"
      },
      {
        key: "R-1",
        parent: "Root",
        dir: "right",
        name: "R-1",
        category: "mainNode"
      },
      { key: "R-1-1", parent: "R-1", name: "R-1-1", category: "mainNode" },
      { key: "R-1-2", parent: "R-1", name: "R-1-2", category: "mainNode" },
      {
        key: "R-1-1-1",
        parent: "R-1-1",
        name: "R-1-1-1",
        category: "mainNode"
      },
      {
        key: "R-1-1-2",
        parent: "R-1-1",
        name: "R-1-1-2",
        category: "mainNode"
      },
      {
        key: "R-1-2-1",
        parent: "R-1-2",
        name: "R-1-2-1",
        category: "mainNode"
      },
      {
        key: "R-1-2-2",
        parent: "R-1-2",
        name: "R-1-2-2",
        category: "mainNode"
      },
      { key: "third-1", name: "第三名", category: "thirdNode" },
      { key: "fourth-1", name: "第四名", category: "fourthNode" }
    ]);

    this.doubleTreeLayout(myDiagram);
  },
  methods: {
    doubleTreeLayout(diagram) {
      // Within this function override the definition of '$' from jQuery:
      var go = this.go;
      var $ = go.GraphObject.make; // for conciseness in defining templates
      diagram.startTransaction("Double Tree Layout");

      // split the nodes and links into two Sets, depending on direction
      var leftParts = new go.Set(/*go.Part*/);
      var rightParts = new go.Set(/*go.Part*/);
      this.separatePartsByLayout(diagram, leftParts, rightParts);
      // but the ROOT node will be in both collections

      // create and perform two TreeLayouts, one in each direction,
      // without moving the ROOT node, on the different subsets of nodes and links
      var layout1 = $(go.TreeLayout, {
        angle: 180,
        arrangement: go.TreeLayout.ArrangementFixedRoots,
        setsPortSpot: false
      });

      var layout2 = $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementFixedRoots,
        setsPortSpot: false
      });

      layout1.doLayout(leftParts);
      layout2.doLayout(rightParts);

      diagram.commitTransaction("Double Tree Layout");
    },
    separatePartsByLayout(diagram, leftParts, rightParts) {
      var root = diagram.findNodeForKey("Root");
      console.log(root)
      if (root === null) return;
      // the ROOT node is shared by both subtrees!
      leftParts.add(root);
      rightParts.add(root);
      // look at all of the immediate children of the ROOT node
      root.findTreeChildrenNodes().each(function(child) {
        // in what direction is this child growing?
        var dir = child.data.dir;
        var coll = dir === "left" ? leftParts : rightParts;
        // add the whole subtree starting with this child node
        coll.addAll(child.findTreeParts());
        // and also add the link from the ROOT node to this child node
        coll.add(child.findTreeParentLink());
      });
    }
  }
};