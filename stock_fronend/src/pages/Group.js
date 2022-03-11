import { useEffect, useState } from 'react'
import '../css/index.css'
import { getGroups, postGroups } from './getdata'
import AddStock from './AddStock'

const Group = () => {
  const [listGroups, setListGroups] = useState([])
  const [group, setGroup] = useState()
  const [addGroup, setAddGroup] = useState('')
  const [show, setShow] = useState(false)
  const [groupId, setGroupId] = useState('')

  const handleAddGroup = () => {
    setGroup(addGroup)
    setAddGroup('')
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    getGroups('http://localhost:3456/api/groups/', token)
      .then(body => {
        const data = body.data.groups
        setListGroups(data)
      });

    postGroups('http://localhost:3456/api/groups/', token, { groupName: group })
      .then(body => {
        console.log(body);
      });
  }, [group])

  return (
    <div>
      <label htmlFor='name'>Group name: </label>
      <input
        type='text' name='name' id='name' onChange={e => setAddGroup(e.target.value)} value={addGroup}
      />

      <button onClick={handleAddGroup}>Add new group</button>

      <ul className='groups'>
        {listGroups.map(group => (
          <button
            key={group._id}
            onClick={() => {
              setShow(!show)
              setGroupId(group._id)
            }}>
            {group.groupName}
            {console.log(group)}
          </button>
        ))}
      </ul>

      {show &&
        <AddStock id={groupId}> </AddStock>
      }
    </div>
  )
}

export default Group
