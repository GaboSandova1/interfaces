import React from 'react';

const UserAddressInfo = ({ userForm, onUserFormChange, isAdmin }) => {
  const handleChange = (field, value) => {
    onUserFormChange({
      ...userForm,
      [field]: value
    });
  };

  return (
    <div className="user-address-info">
      <h3>Dirección</h3>
      <div className="form-group">
        <label>Calle</label>
        <input
          type="text"
          value={userForm?.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          disabled={!isAdmin}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Ciudad</label>
          <input
            type="text"
            value={userForm?.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            disabled={!isAdmin}
          />
        </div>
        <div className="form-group">
          <label>Código Postal</label>
          <input
            type="text"
            value={userForm?.postal_code || ''}
            onChange={(e) => handleChange('postal_code', e.target.value)}
            disabled={!isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAddressInfo; 