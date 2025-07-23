import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumber] = useState(false);
  const [charAllow, setChar] = useState(false);
  const [password, setPass] = useState("");

const passwordRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str += "0123456789"
    if(charAllow) str += "!@#$%^&*{}[]_-+=";

    for(let i=1; i<=length; i++)
    {
      let char = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char);
    }

    setPass(pass);
     
  },
  [numberAllow, charAllow, length, setPass]) 

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => passwordGen(), [length,numberAllow,charAllow,passwordGen])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        placeholder='Password'
        value={password}
        className='outline-none w-full py-1 px-3 bg-white text-black'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0'>
          Copy
        </button>
        </div>
        <div className='flex test-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
            min = {8}
            max = {100}
            value = {length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <input 
          type='checkbox'
          defaultChecked = {numberAllow}
          id='numberInput'
          onChange={() => {
            setNumber((prev) => !prev);
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>
          <input 
          type='checkbox'
          defaultChecked = {charAllow}
          id='charInput'
          onChange={() => {
            setChar((prev) => !prev);
          }}
          />
          <label htmlFor='charInput'>Characters</label>
        </div>
      </div>
          <button 
          onClick={()=> {passwordGen()}}
          className='block mx-auto text-white bg-blue-600 px-4 py-2 rounded'>
          Generate New Password
          </button>

    </>
  )
}

export default App
