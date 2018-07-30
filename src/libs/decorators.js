export function Buried(target, funcName, descriptor) {
  let oriMethods = Object.assign({},target.methods),
    oriComponents = Object.assign({},target.components),
    oriTarget = Object.assign({},target);
  console.log(target)
    //console.log(oriMethods,'oriMethods'+'.......'+JSON.stringify(oriTarget),'oriTarget')
  // methods方法中
  if(target.methods) {
    for(let name in target.methods) {
      target.methods[name] = function () {
        let result = oriMethods[name].call(this,...arguments);
        console.log(result,'result')
        // 如果方法中返回 noBuried 则不添加埋点
        if(typeof result === 'string' && result.includes('noBuried')) {
          console.log(name + '方法设置不添加埋点');
        } else if(result instanceof Promise) {
          result.then(res => {
            if(typeof res === 'string' && res.includes('noBuried')) { console.log(name + '方法设置不添加埋点'); return; };
            console.log('添加埋点在methods方法中：' , name.toUpperCase ());

            this.$log(name);
          });
        }else{
          console.log('添加埋点在methods方法中：' , name.toUpperCase ());
          console.log('result啥都不是')
          this.$log(name);
        };
        return result;
      }
    }
  }

  // 卞旭6.27加，判断点击什么组件
  if(oriComponents) {
    for(let name in oriComponents) {
      oriComponents[name] = function () {
        console.log('点击了：' , name);
      }
    }
  }


  // 钩子函数中
  const hookFun = (funName) => {
    target[funName] = function() {
      let result =  oriTarget[funName].call(this,...arguments);
      console.log('添加埋点，在钩子函数' + funName + '中：', 'VIEW');
      this.$log('VIEW');
      return result;
    }
  }
  // 钩子函数中 view
  if (target.activated) {
    return hookFun('activated');
  } else if (target.created) {
    return hookFun('created');
  } else if (target.mounted) {
    return hookFun('mounted');
  };
}

