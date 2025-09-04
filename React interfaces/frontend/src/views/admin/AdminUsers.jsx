import React, { useEffect, useState } from 'react';
import userService from '../../services/user';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getUsers();
      setUsers(res.data || []);
    } catch (e) {
      setUsers([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    await userService.deleteUser(id);
    fetchUsers();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users.map(u => ({
      ID: u.id,
      Nombre: u.name,
      Email: u.email,
      Rol: u.role
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'usuarios.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Usuarios', 14, 10);
    autoTable(doc, {
      head: [['ID', 'Nombre', 'Email', 'Rol']],
      body: users.map(u => [u.id, u.name, u.email, u.role]),
      startY: 20
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div className="admin-users">
      <h2>Gestión de Usuarios</h2>
      <div style={{ marginBottom: 16 }}>
        <button 
          onClick={exportToExcel} 
          style={{ 
            marginRight: 8, 
            background: '#2563eb', // azul tailwind-600
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: 4, 
            cursor: 'pointer' 
          }}
        >
          Exportar Excel
        </button>
        <button 
          onClick={exportToPDF} 
          style={{ 
            background: '#2563eb', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: 4, 
            cursor: 'pointer' 
          }}
        >
          Exportar PDF
        </button>
      </div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #d1d5db' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>Nombre</th>
                <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>Rol</th>
                <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'center' }}>{user.id}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px' }}>{user.name}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textTransform: 'capitalize', textAlign: 'center' }}>{user.role}</td>
                  <td style={{ border: '1px solid #d1d5db', padding: '8px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleDelete(user.id)} 
                      style={{ 
                        background: '#ef4444', // rojo tailwind-500
                        color: 'white', 
                        border: 'none', 
                        padding: '8px 16px', 
                        borderRadius: 4, 
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;