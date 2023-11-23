import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AxiosService from '../common/Apiservice';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();  

  // Get the 'token' value from the query parameters
  const token = searchParams.get('token');
        
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);

      const res = await AxiosService.post(`/user/reset-password`, {
        newpassword,
        confirmpassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 201) {
        toast.success('Password updated');
        navigate('/login');
      }
    } catch (error) {

        if (error.response && error.response.status === 400) {
          toast.error('Invalid token or token has expired. Please request a new reset link.');
        } else {
          console.log(error);
        }

    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="container-fluid p-4 shadow" style={{ maxWidth: '400px' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">New Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                placeholder="enter your password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                placeholder="enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="btn btn-primary w-100 mt-3" onClick={(e) => resetPassword(e)} disabled={loading}>
              {
                loading ? (
                  <Spinner animation="border" role="status" variant='warning'>
                  <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) :(
                  'update password'
                )
              }
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

