import { useEffect, useState } from 'react'
import './App.css'
import { idbDel, idbGet, idbSet, idbAll } from './utils/indexed-db'

const StitchCounter = () => {
  const [name, setName] = useState('Your Project Name')
  const [rowStitches, setCount] = useState(10)
  const [rows, setRows]: [number[], any] = useState([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const projects = await idbAll();
      if (projects.length) {
        const project = projects[0];
        setName(project.name);
        setRows(project.rows);
      }
    };
    asyncEffect();
  }, []);

  const addRow = async () => {
    const newRowArray = [...rows, rowStitches];
    setRows(newRowArray);
    await idbSet({ name, rows: newRowArray });
  }

  const updateName = async (newName: string) => {
    const existing = await idbGet(name);
    if (existing) {
      await idbDel(name);
    }
    await idbSet({ name: newName, rows });
    setName(newName);
  }
  

  let runningStitches = 0;

  return (
    <>
      <header>
        <input
          value={name}
          className='project-name-input'
          onChange={(e) => updateName(e.target.value)}
        />
        <div className='project-controls'>
          <button
            className='project-controls__button-minus'
            onClick={() => setCount(rowStitches - 1)}
          >
            ▽
          </button>
          <input
            type='number'
            value={rowStitches}
            style={{ width: `${String(rowStitches).length}ch` }}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button
            className='project-controls__button-plus'
            onClick={() => setCount(rowStitches + 1)}
          >
            △
          </button>
          <button className='project-controls__button-add-row' onClick={addRow}>Add</button>
        </div>
      </header>
      <main>
        {rows.map((stitches: number, i: number) => {
          runningStitches += stitches;
          const range = new Array(stitches).fill(0);
          return (
            <div key={`${i}-stitch-row`} className='stitches-row'>
              <div className='stitches-boxes'>
                { range.map((_, j) => (
                  <div key={`${i}-stitch-${j}`} className='stitch-box' />
                ))}
              </div>
              <div className='stitches-label'>
                #{i + 1} — {stitches}{i === rows.length - 1 && ` (${runningStitches})`}
              </div>
            </div>
          )
        })}
      </main>
      <footer>
        <div className='footer-div'>
          for drew <br/>
          ❤️
        </div>
      </footer>
    </>
  )
}

export default StitchCounter
