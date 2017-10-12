let re = /{{([^}}]+)}}/g;
let codeRe = /^(if|else|for)(.*)?/g;
let overRe = /^\//g;
let arrayRe = /^(#)(.*)/g;
let str = `
    <h1>{{this.name}}</h1>
    {{if(this.isAdd)}}
    <p>xxx</p>
    {{/if}}
    <p>{{this.title}}222</p>
    {{#this.list}}
    <a>{{val}}</a>
    {{/}}
    <p>over</p>
`;
let match;
let code = 'var r = [];\n';
let cursor = 0;
function add(line, isVar) {
    //将字符串中的双引号替换为单引号
    line.replace(/"/g, '\'');
    //判断代码段类型
    if(isVar) { //如果是js代码
        //将代码中的#替换为for语句
        arrayRe.test(line) ? line = line.replace('#', 'for(var val of ') + ')' : line;
        switch (true) {
        case codeRe.test(line): //语句开始
            code += line + '{\n';
            break;
        case overRe.test(line): //语句结束
            code += '};';
            break;
        default:              //变量
            code += 'r.push(' + line + ');\n';
            break;
        }
    }else { //普通html字符串
        code += 'r.push("' + line + '");\n';
    }
}
while ((match = re.exec(str)) !== null) {
    console.log(match);
    add(str.slice(cursor, match.index), false);
    add(match[1], true);
    cursor = match.index + match[0].length;
}
add(str.substr(cursor, str.length - cursor), false);
code += 'return r.join("");';
console.log(code);
let complite = new Function(code.replace(/[\n\r\t]/g, '')).apply({
    name: 'zzz',
    title: 'demo',
    list: [
        '222',
        '333'
    ]
});
console.log(complite);

