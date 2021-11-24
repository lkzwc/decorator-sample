import "./styles.css";

// 装饰器 @符号 实现 && HOC
const decorate = (sender) => (target, property, description) => {
  const older = description.value;
  description.value = (msg) => {
    msg = `${sender}| [${msg}]`;
    return older.apply(null, [msg]);
  };
};

class Demo2 {
  @decorate("Demo 2")
  print(mes: string) {
    console.log(mes);
  }
}

class Demo {
  print(mes: string) {
    console.log(mes);
  }
}

// 普通装饰器的实现
// const dec = (target, property) => {
//   const old = target.prototype[property];
//   target.prototype[property] = (msg: any) => {
//     msg = `[${msg}]`;
//     old(msg);
//   };
// };

// 装饰器优化 - > HOC
const createDec = (sender) => (target, property) => {
  const old = target.prototype[property];
  target.prototype[property] = (msg: any) => {
    msg = `${sender}: [${msg}]`;
    old(msg);
  };
};

const demo1 = new Demo();

const dec = createDec("Demo 1");
dec(Demo, "print");
demo1.print("hello");

const demo2 = new Demo();

demo2.print("hello");

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
