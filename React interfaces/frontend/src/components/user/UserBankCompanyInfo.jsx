import React from 'react';

const UserBankCompanyInfo = ({ userForm, onUserFormChange, isAdmin }) => {
  const handleChange = (field, value) => {
    onUserFormChange({
      ...userForm,
      [field]: value
    });
  };

  return (
    <div className="user-bank-company-info">
      <h3>Banco y Compañía</h3>
      <div className="form-group">
        <label>Banco</label>
        <input
          type="text"
          value={userForm?.bank || ''}
          onChange={(e) => handleChange('bank', e.target.value)}
          disabled={!isAdmin}
        />
      </div>
      <div className="form-group">
        <label>Compañía</label>
        <input
          type="text"
          value={userForm?.company || ''}
          onChange={(e) => handleChange('company', e.target.value)}
          disabled={!isAdmin}
        />
      </div>
    </div>
  );
};

export default UserBankCompanyInfo; 