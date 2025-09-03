import React from 'react';

const UserBasicInfo = ({ userForm, onUserFormChange, isAdmin }) => {
  const handleChange = (field, value) => {
    onUserFormChange({
      ...userForm,
      [field]: value
    });
  };

  return (
    <div className="user-basic-info">
      <h3>Datos Básicos</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={userForm?.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!isAdmin}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={userForm?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBasicInfo; 