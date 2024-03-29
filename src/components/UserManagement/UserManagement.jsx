import {
  Container,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  Avatar,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function Record({ value, setFlag }) {
  const [update, setUpdate] = useState(false)
  const [role, setRole] = useState(value.role)
  function deleteUser(username) {
    axios.get(
      `http://localhost:8080/user/delete/${username}`
    )
      .then(res => {
        console.log(res.data)

      })
  }
  function updateUser() {
    axios.post(
      'http://localhost:8080/user/update',
      {
        username: value.username,
        role: role
      }
    )
      .then(res => {
        console.log(res.data)
        setFlag(flag => !flag)
      })
  }
  return (
    <Tr>
      <Td>
        <Avatar src={`http://localhost:8080/avatars/${value.avatar}`} />
      </Td>
      <Td>
        {value.username}
      </Td>
      <Td>
        {value.password}
      </Td>
      <Td>
        {
          update ?
          <Select 
            onChange={e => setRole(e.target.value)}
            defaultValue={role}
          >
            <option value={'USER'} >USER</option>
            <option value={'ADMIN'} >ADMIN</option>
          </Select>
          : 
          role
        }
      </Td>
      
      <Td>
        <Button
          colorScheme="blue"
          onClick={() => {
            if (update) {
              updateUser()
            }
            setUpdate(!update)
          }}
        >
          {update ? "Save" : "Update"}
        </Button>
        <Button
          colorScheme="red"
          ml={5}
          onClick={() => {
            deleteUser(value.username)
            setFlag(flag => !flag)
          }}
        >
          Delete
        </Button>
      </Td>
    </Tr>
  )
}

export default function UserManagement() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [userList, setUserList] = useState(null)
  const [flag, setFlag] = useState(false)
  function getUserList() {
    axios.get(
      'http://localhost:8080/user/all'
    )
      .then(res => {
        console.log(res.data)
        setUserList(res.data)
      })
  }
  function createUser() {
    axios.post(
      'http://localhost:8080/user/create',
      {
        username: username,
        password: password,
        role: role
      }
    )
      .then(res => {
        console.log(res.data)
        setFlag(flag => !flag)
        setPassword("")
        setUsername("")
      })
  }
  useEffect(() => {
    getUserList()
  }, [flag])
  return (
    <Container bg={'gray.300'} maxW={'full'} overflowY={'scroll'} h={'100vh'}>
      <TableContainer >
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th>Role</Th>
              <Th>Operation</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Avatar />
              </Td>
              <Td>
                <Input
                  bg={'white'}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  bg={'white'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Td>
              <Td>
                <Select onChange={e => setRole(e.target.value)} defaultValue={role}>
                  <option value="USER" >USER</option>
                  <option value="ADMIN" >ADMIN</option>
                </Select>
              </Td>
              
              <Td>
                <Button
                  colorScheme="green"
                  onClick={createUser}
                >
                  Add
                </Button>
              </Td>
            </Tr>
            { userList.map((i, index) => (
              <Record key={index} value={i} setFlag={setFlag} />
            )) }
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}