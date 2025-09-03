import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserBasicInfo from '../components/user/UserBasicInfo';
import UserPhysicalInfo from '../components/user/UserPhysicalInfo';
import UserAddressInfo from '../components/user/UserAddressInfo';
import UserBankCompanyInfo from '../components/user/UserBankCompanyInfo';
import userService from '../services/user';
import authService from '../services/auth';
import './UserView.scss';

const UserView = () => {
  const [userForm, setUserForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isProfile, setIsProfile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const steps = [
    'UserBasicInfo',
    'UserPhysicalInfo',
    'UserAddressInfo',
    'UserBankCompanyInfo'
  ];

  const stepLabels = [
    'Datos Básicos',
    'Datos Físicos',
    'Dirección',
    'Banco y Compañía'
  ];

  const sidebarIcons = [
    'fas fa-user',
    'fas fa-dumbbell',
    'fas fa-map-marker-alt',
    'fas fa-university'
  ];

  const currentStepComponent = steps[step - 1];

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    let userId = id;
    setIsProfile(!userId);
    const currentUser = authService.getUser();
    setIsAdmin(currentUser && currentUser.role === 'admin');
    
    if (!userId) {
      if (!currentUser || !currentUser.id) {
        toast.error('No se pudo obtener el usuario actual');
        navigate('/login');
        return;
      }
      userId = currentUser.id;
    }
    
    try {
      const res = await userService.getUser(userId);
      setUserForm(res.data.data);
    } catch (e) {
      toast.error('No se pudo cargar el usuario');
      if (isProfile) {
        navigate('/');
      } else {
        navigate('/admin/users');
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToStep = (idx) => {
    setStep(idx);
  };

  const saveUser = async () => {
    try {
      await userService.updateUser(userForm.id, userForm);
      toast.success('Perfil actualizado correctamente');
      if (isProfile) {
        navigate('/user');
      } else {
        navigate('/admin/users');
      }
    } catch (e) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleUserFormChange = (updatedForm) => {
    setUserForm(updatedForm);
  };

  const renderStepComponent = () => {
    const props = {
      userForm,
      onUserFormChange: handleUserFormChange,
      isAdmin
    };

    switch (currentStepComponent) {
      case 'UserBasicInfo':
        return <UserBasicInfo {...props} />;
      case 'UserPhysicalInfo':
        return <UserPhysicalInfo {...props} />;
      case 'UserAddressInfo':
        return <UserAddressInfo {...props} />;
      case 'UserBankCompanyInfo':
        return <UserBankCompanyInfo {...props} />;
      default:
        return <UserBasicInfo {...props} />;
    }
  };

  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <div className="users-section-modular">
      <div className="profile-sidebar">
        <ul>
          {stepLabels.map((stepName, idx) => (
            <li
              key={stepName}
              className={step === idx + 1 ? 'active' : ''}
              onClick={() => goToStep(idx + 1)}
            >
              <i className={`${sidebarIcons[idx]} sidebar-icon`}></i>
              {stepName}
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-content-panel">
        <div className="section-header">
          <h3>Mi Perfil</h3>
        </div>
        <div className="profile-form-panel">
          {userForm && renderStepComponent()}
          <div className="wizard-actions">
            <button onClick={prevStep} disabled={step === 1}>
              Anterior
            </button>
            {step < steps.length ? (
              <button onClick={nextStep}>Siguiente</button>
            ) : (
              <button onClick={saveUser}>Guardar Cambios</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView; 