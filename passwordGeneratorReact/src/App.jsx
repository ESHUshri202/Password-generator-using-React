import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  //ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) {str1 = str1 +  "!@#$%^&*()_+=~`{}[]|:<>?";}
    if(numberAllowed) {str1 = str1 + "0123456789";}
    
    for(let i = 1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str1.length + 1);
      pass = pass + str1.charAt(char);
    }
    setPassword(pass);


  },[length,numberAllowed, charAllowed, setPassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);
  }, 
  [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg 
      px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-3xl text-center my-3 text-white'>
      Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' 
              value = {password} 
              className='outline-none w-full py-1 px-2' 
              placeholder='Password' 
              readOnly
              ref={passwordRef}

          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 
          text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev)=> !(prev));
            }}></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked = {charAllowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev)=> !(prev));
            }}></input>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
