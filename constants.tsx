
import { CodeLine } from './types';

// Generating demo data to simulate the user's 243 lines
export const DEMO_CODE: CodeLine[] = Array.from({ length: 243 }, (_, i) => {
  const lineNum = i + 1;
  
  // Create some realistic Python patterns
  let content = "";
  let explanation = "";
  let category: CodeLine['category'] = 'logic';

  if (lineNum === 1) {
    content = "import os";
    explanation = "导入操作系统接口模块，用于处理文件路径和系统命令。";
    category = 'import';
  } else if (lineNum === 2) {
    content = "import datetime";
    explanation = "导入日期时间模块，用于记录程序运行的时间戳。";
    category = 'import';
  } else if (lineNum === 5) {
    content = "def process_data(input_path: str):";
    explanation = "定义主处理函数，接收一个字符串类型的输入路径。这是程序的逻辑核心入口。";
    category = 'function';
  } else if (lineNum % 10 === 0) {
    content = `    logger.info("Processing step ${lineNum}...")`;
    explanation = `在第 ${lineNum} 行记录当前的进度日志，方便在调试时追踪长任务的执行状态。`;
  } else if (lineNum % 25 === 0) {
    content = "    if result is None:";
    explanation = "错误检查机制：如果处理结果为空，则需要抛出异常或进行回滚操作。";
  } else if (content === "") {
    content = `    # Line ${lineNum} of the 243-line implementation`;
    content += lineNum % 3 === 0 ? "    x = calculate_metric(i)" : "    print(f'Progress: {i}%')";
    explanation = `这是程序的第 ${lineNum} 行。在这一步中，我们正在执行具体的 Python 指令。点击这里可以查看此特定行的深入逻辑解析。`;
  }

  return {
    lineNumber: lineNum,
    content: content,
    explanation: explanation || `对第 ${lineNum} 行代码的详细业务逻辑解释。这里通常会包含为什么这么写，以及对上下游变量的影响。`,
    category
  };
});
