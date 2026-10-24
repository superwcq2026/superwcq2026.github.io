export interface KnowledgeSection {
  id: string;
  title: string;
  content: string[];
  formulas?: { name: string; formula: string }[];
}

export const knowledgeSections: KnowledgeSection[] = [
  {
    id: "solid-geometry",
    title: "立体图形公式",
    content: [
      "掌握立体图形的表面积和体积公式是解决几何问题的基础。",
    ],
    formulas: [
      { name: "长方体表面积", formula: "S = 2(ab + bc + ac)" },
      { name: "长方体体积", formula: "V = abc" },
      { name: "正方体表面积", formula: "S = 6a²" },
      { name: "正方体体积", formula: "V = a³" },
      { name: "圆柱侧面积", formula: "S侧 = 2πrh" },
      { name: "圆柱表面积", formula: "S表 = 2πrh + 2πr²" },
      { name: "圆柱体积", formula: "V = πr²h" },
      { name: "圆锥体积", formula: "V = (1/3)πr²h" },
    ],
  },
  {
    id: "word-problems",
    title: "综合应用问题",
    content: [
      "一般综合应用题无一定的解答规律，可以把它先分解成几个简单的一步应用题。",
      "分析法：从问题入手，逐步分析到题里的已知条件。",
      "综合法：从应用题的已知条件逐步推向未知，直到求出解。",
      "分析综合法：将分析法、综合法结合起来交替使用。",
      "解答步骤：①审清题意，找出已知条件和所求问题；②分析数量关系；③列式计算；④检验并写出答案。",
    ],
  },
  {
    id: "sum-difference",
    title: "和差倍问题",
    content: [
      "和差问题：已知大小两个数的和与差，求这两个数。",
      "和倍问题：已知两个数的和及它们之间的倍数关系，求两个数。",
      "差倍问题：已知两个数的差及它们之间的倍数关系，求两个数。",
    ],
    formulas: [
      { name: "大数", formula: "(和 + 差) ÷ 2 = 大数" },
      { name: "小数", formula: "(和 - 差) ÷ 2 = 小数" },
      { name: "和倍", formula: "和 ÷ (倍数 + 1) = 小数" },
      { name: "差倍", formula: "差 ÷ (倍数 - 1) = 小数" },
    ],
  },
  {
    id: "motion",
    title: "行程问题",
    content: [
      "行程问题涉及路程、时间、速度的计算。",
      "背向运动：路程 = 速度之和 × 时间",
      "相遇问题：路程 = 速度之和 × 时间",
      "追及问题：追及时间 = 路程之差 ÷ 速度之差",
    ],
    formulas: [
      { name: "路程", formula: "路程 = 速度 × 时间" },
      { name: "速度", formula: "速度 = 路程 ÷ 时间" },
      { name: "时间", formula: "时间 = 路程 ÷ 速度" },
    ],
  },
  {
    id: "engineering",
    title: "工程问题",
    content: [
      "把工作总量用'1'表示，工作效率用单位时间内做工作总量的'几分之一'表示。",
      "解题规律：总工作量 = 各分工作量之和",
    ],
    formulas: [
      { name: "工作时间", formula: "工作时间 = 工作量 ÷ 工作效率" },
      { name: "合作时间", formula: "合作时间 = 1 ÷ (效率之和)" },
    ],
  },
  {
    id: "fraction",
    title: "分数应用题",
    content: [
      "①已知一个数，求它的几分之几是多少，用乘法。",
      "②求一个数是另一个数的几分之几，用除法。",
      "③已知一个数的几分之几是多少，求这个数，用除法。",
    ],
    formulas: [
      { name: "单位1×分率", formula: "单位'1'的量 × 分率 = 分率所对应的量" },
      { name: "对应量÷单位1", formula: "分率对应的量 ÷ 单位'1'的量 = 对应分率" },
    ],
  },
  {
    id: "profit",
    title: "利润与折扣",
    content: [
      "几折就是标价的十分之几。",
      "利息 = 本金 × 利率 × 时间",
      "税后利息 = 本金 × 利率 × 时间 × (1-20%)",
    ],
    formulas: [
      { name: "利润", formula: "利润 = 售出价 - 成本" },
      { name: "利润率", formula: "利润率 = 利润 ÷ 成本 × 100%" },
      { name: "折扣", formula: "折扣 = 实际售价 ÷ 原售价 × 100%" },
    ],
  },
];
