import { useContext } from 'react'
import Spinner from '../icons/Spinner'
import { NotesContext } from '../context/NotesContext'

const Saving = () => {
  const { status } = useContext(NotesContext)
  return (
    <>
      {status && (
        <div className='card-saving'>
          <Spinner />
          <span>{status}...</span>
        </div>
      )}
    </>
  )
}
export default Saving
