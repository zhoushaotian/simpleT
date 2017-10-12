import { tplReg, codeReg, arrayReg, overReg } from './enums/reg.js';

/**
 * 构造代码字符串
 * 
 * @param {string} line 代码字符串
 * @param {string} code 原代码字符串
 * @param {boolean} isCode 是否为语句
 *
 */
function buildCode(line, isCode = true) {
    //将line中的双引号转换为单引号
    line.replace(/"/g, '\'');
    //判断代码段类型
    if (isCode) { //如果是js代码
        //将代码中的#替换为for语句
        arrayReg.test(line) ? line = line.replace('#', 'for(var val of ') + ')' : line;
        switch (true) {
        case codeReg.test(line): //语句开始
            return line + '{\n';
        case overReg.test(line): //语句结束
            return '};';
        default:              //变量
            return 'r.push(' + line + ');\n';
        }
    } else { //普通html字符串
        return 'r.push("' + line + '");\n';
    }
}

/**
 * 引擎主函数
 * @return 执行编译的函数
 * @param {any} tpl 模板字符串 
 */
function simpleT(tpl) {
    let code = 'var r=[];\n';
    let cursor = 0; 
    while(tpl.match(tplReg) !== null) {
        let match = tpl.match(tplReg);
        code += buildCode(code.slice(cursor, match.index), false);
        code += buildCode(match[1], true);
        //移动游标
        cursor = match.index + match[0].length;
    }
    code += 'return r.join()';
    //function body构造完成
    //currying
    return function(data) {
        return new Function(code.replace(/[\t\r\n]/g, '')).apply(data);
    };
}
export default simpleT;
