import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddClientModal() {

  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {...state},
    update(cache, { data: { addClient }}) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient]
        },
      });
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addClient();
    setState({
      name: '',
      email: '',
      phone: '',
    });
  }

  return (
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <FaUser />{" "}
      <span>Add Client </span>
    </button>

<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={onSubmit} >
          <div className='mb-3'>
            <label className='form-label' >
              Name
            </label>
            <input 
              type="text"
              className='form-control'
              name='name'
              value={state.name}
              onChange={(e)=> setState(prevState => ({
                ...prevState,
                name:e.target.value,
              }))}/>
          </div>

          <div className='mb-3'>
            <label className='form-label' >
              Email
            </label>
            <input 
              type="email"
              className='form-control'
              name='email'
              value={state.email}
              onChange={(e)=> setState(prevState => ({
                ...prevState,
                email:e.target.value,
              }))}/>
          </div>

          <div className='mb-3'>
            <label className='form-label' >
              Phone
            </label>
            <input 
              type="text"
              className='form-control'
              name='phone'
              value={state.phone}
              onChange={(e)=> setState(prevState => ({
                ...prevState,
                phone:e.target.value,
              }))}/> 
          </div>
              <button data-bs-dismiss="modal" type="sbumit" className='btn btn-primary'>
              Submit
              </button>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
