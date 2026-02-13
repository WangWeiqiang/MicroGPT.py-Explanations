
/**
 * 粘贴您的 JSON 解释数组到这里
 */
export interface ExplanationItem {
  line: number;
  explain: string;
}

export const EXPLANATIONS_DATA: ExplanationItem[] = [
  { "line": 1, "explain": "导入 os 模块，用于处理操作系统相关功能。" },
  { "line": 2, "explain": "导入 sys 模块，用于处理 Python 运行时环境。" },
  { "line": 3, "explain": "导入日期时间模块，用于生成日志时间戳。" },
  { "line": 5, "explain": "定义程序的主入口函数 main。" },
  { "line": 7, "explain": "向控制台输出初始化提示信息。" },
  { "line": 10, "explain": "循环 100 次，模拟批量数据处理过程。" },
  { "line": 11, "explain": "调用 process_step 函数处理当前索引的逻辑。" },
  { "line": 13, "explain": "定义具体的步骤处理函数，接收 step_id 参数。" },
  { "line": 15, "explain": "获取当前的系统精确时间。" },
  { "line": 16, "explain": "使用 f-string 格式化输出带时间戳的处理日志。" }
  // ... 继续添加至第 243 行
];
