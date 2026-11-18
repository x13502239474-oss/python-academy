const o="/Users/1/AppData/Local/Programs/WorkBuddy/resources/vendor/PortableGit/python-academy/",_=`${o.endsWith("/")?o:o+"/"}pyodide/`;let a=null,r=null;function u(){return a?Promise.resolve(a):r||(r=(async()=>{try{const s=await(await import(`${_}pyodide.mjs`)).loadPyodide({indexURL:_});return a=s,self.postMessage({type:"ready"}),s}catch(t){throw self.postMessage({type:"load-error",message:String(t?.message||t)}),t}})(),r)}u().catch(()=>{});self.onmessage=async t=>{const{type:s,code:d,jobId:n,timeoutMs:l}=t.data;if(s==="run")try{const e=await u();e.globals.set("__pa_deadline",(Date.now()+l)/1e3);const p=`
import sys, io, time, traceback

_out = io.StringIO()
_err = io.StringIO()
sys.stdout = _out
sys.stderr = _err

def _pa_input(*a, **k):
    raise RuntimeError('浏览器环境不支持 input()，请改用变量直接赋值。')
_builtins = __import__('builtins')
_builtins_input = _builtins.input
_builtins.input = _pa_input

def _pa_guard(frame, event, arg):
    if event == 'line' and time.time() > __pa_deadline:
        raise TimeoutError('执行超时：可能存在死循环，已自动停止（限制 5 秒）。')
    return _pa_guard

_user_code = ${JSON.stringify(d)}
sys.settrace(_pa_guard)
try:
    exec(compile(_user_code, '<string>', 'exec'), globals())
except TimeoutError as _te:
    _err.write(str(_te) + '\\n')
except BaseException:
    _err.write(traceback.format_exc())
finally:
    sys.settrace(None)
    _builtins.input = _builtins_input
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

(_out.getvalue(), _err.getvalue())
`,i=await e.runPythonAsync(p),c=i.get(0)??"",y=i.get(1)??"";i.destroy(),self.postMessage({type:"result",jobId:n,stdout:String(c),stderr:String(y)})}catch(e){self.postMessage({type:"result",jobId:n,stdout:"",stderr:String(e?.message||e)})}};
