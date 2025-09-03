import React from 'react';

const UserPhysicalInfo = ({ userForm, onUserFormChange, isAdmin }) => {
  const handleChange = (field, value) => {
    onUserFormChange({
      ...userForm,
      [field]: value
    });
  };

  return (
    <div className="user-physical-info">
      <h3>Datos Físicos</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Altura (cm)</label>
          <input
            type="number"
            value={userForm?.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            disabled={!isAdmin}
          />
        </div>
        <div className="form-group">
          <label>Peso (kg)</label>
          <input
            type="number"
            value={userForm?.weight || ''}
            onChange={(e) => handleChange('weight', e.target.value)}
            disabled={!isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPhysicalInfo; 