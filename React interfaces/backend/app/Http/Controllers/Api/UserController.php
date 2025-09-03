<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        try {
            // CAMBIO PRINCIPAL: Obtener TODOS los campos en lugar de solo los básicos
            $users = User::all(); // Esto traerá todos los campos definidos en $fillable
            
            return response()->json([
                'success' => true,
                'data' => $users
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching users', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener usuarios'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Log::info('UserController store called', ['request_data' => $request->all()]);

            // Validación básica primero
            $basicValidation = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users',
                'phone' => 'required|string|max:20',
                'username' => 'required|string|max:255|unique:users',
                'password' => 'required|string|min:6',
                'birthDate' => 'required|date|before:today',
                'gender' => 'required|in:male,female,other',
                'role' => 'required|in:admin,user',
            ]);

            Log::info('Basic validation passed');

            // Crear datos básicos del usuario
            $userData = [
                'name' => trim($basicValidation['firstName'] . ' ' . $basicValidation['lastName']),
                'first_name' => $basicValidation['firstName'],
                'last_name' => $basicValidation['lastName'],
                'email' => $basicValidation['email'],
                'phone' => $basicValidation['phone'],
                'username' => $basicValidation['username'],
                'password' => bcrypt($basicValidation['password']),
                'birth_date' => $basicValidation['birthDate'],
                'gender' => $basicValidation['gender'],
                'role' => $basicValidation['role'],
            ];

            // Calcular edad
            if (!empty($basicValidation['birthDate'])) {
                $birthDate = new \DateTime($basicValidation['birthDate']);
                $today = new \DateTime();
                $userData['age'] = $today->diff($birthDate)->y;
            }

            // Agregar campos opcionales si existen
            $optionalFields = [
                'maidenName' => 'maiden_name',
                'image' => 'image',
                'bloodGroup' => 'blood_group',
                'height' => 'height',
                'weight' => 'weight',
                'eyeColor' => 'eye_color',
                'ip' => 'ip',
                'macAddress' => 'mac_address',
                'university' => 'university',
                'ein' => 'ein',
                'ssn' => 'ssn',
                'userAgent' => 'user_agent',
            ];

            foreach ($optionalFields as $requestField => $dbField) {
                if ($request->has($requestField) && !empty($request->get($requestField))) {
                    $userData[$dbField] = $request->get($requestField);
                }
            }

            // Procesar campos JSON de forma segura
            $userData['hair'] = json_encode([
                'color' => $request->input('hair.color'),
                'type' => $request->input('hair.type'),
            ]);

            $userData['address'] = json_encode([
                'address' => $request->input('address.address'),
                'city' => $request->input('address.city'),
                'state' => $request->input('address.state'),
                'stateCode' => $request->input('address.stateCode'),
                'postalCode' => $request->input('address.postalCode'),
                'coordinates' => [
                    'lat' => $request->input('address.coordinates.lat'),
                    'lng' => $request->input('address.coordinates.lng'),
                ],
                'country' => $request->input('address.country'),
            ]);

            $userData['bank'] = json_encode([
                'cardExpire' => $request->input('bank.cardExpire'),
                'cardNumber' => $request->input('bank.cardNumber'),
                'cardType' => $request->input('bank.cardType'),
                'currency' => $request->input('bank.currency'),
                'iban' => $request->input('bank.iban'),
            ]);

            $userData['company'] = json_encode([
                'department' => $request->input('company.department'),
                'name' => $request->input('company.name'),
                'title' => $request->input('company.title'),
                'address' => [
                    'address' => $request->input('company.address.address'),
                    'city' => $request->input('company.address.city'),
                    'state' => $request->input('company.address.state'),
                    'stateCode' => $request->input('company.address.stateCode'),
                    'postalCode' => $request->input('company.address.postalCode'),
                    'coordinates' => [
                        'lat' => $request->input('company.address.coordinates.lat'),
                        'lng' => $request->input('company.address.coordinates.lng'),
                    ],
                    'country' => $request->input('company.address.country'),
                ],
            ]);

            $userData['crypto'] = json_encode([
                'coin' => $request->input('crypto.coin'),
                'wallet' => $request->input('crypto.wallet'),
                'network' => $request->input('crypto.network'),
            ]);

            Log::info('User data prepared', ['user_data_keys' => array_keys($userData)]);

            // Usar transacción para crear el usuario
            DB::beginTransaction();
            
            $user = User::create($userData);
            
            DB::commit();
            
            Log::info('User created successfully', ['user_id' => $user->id]);

            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => 'Usuario creado correctamente'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            Log::error('Database error', [
                'message' => $e->getMessage(),
                'sql' => $e->getSql() ?? 'N/A',
                'bindings' => $e->getBindings() ?? []
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Error de base de datos: ' . $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('General error creating user', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(User $user)
    {
        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        try {
            // Validación básica
            $basicValidation = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $user->id,
                'phone' => 'required|string|max:20',
                'username' => 'required|string|max:255|unique:users,username,' . $user->id,
                'password' => 'nullable|string|min:6',
                'birthDate' => 'required|date|before:today',
                'gender' => 'required|in:male,female,other',
                'role' => 'required|in:admin,user',
            ]);

            // Preparar datos para actualización (similar al store)
            $userData = [
                'name' => trim($basicValidation['firstName'] . ' ' . $basicValidation['lastName']),
                'first_name' => $basicValidation['firstName'],
                'last_name' => $basicValidation['lastName'],
                'email' => $basicValidation['email'],
                'phone' => $basicValidation['phone'],
                'username' => $basicValidation['username'],
                'birth_date' => $basicValidation['birthDate'],
                'gender' => $basicValidation['gender'],
                'role' => $basicValidation['role'],
            ];

            // Solo actualizar password si se proporciona
            if (!empty($basicValidation['password'])) {
                $userData['password'] = bcrypt($basicValidation['password']);
            }

            // Calcular edad
            if (!empty($basicValidation['birthDate'])) {
                $birthDate = new \DateTime($basicValidation['birthDate']);
                $today = new \DateTime();
                $userData['age'] = $today->diff($birthDate)->y;
            }

            // Agregar campos opcionales
            $optionalFields = [
                'maidenName' => 'maiden_name',
                'image' => 'image',
                'bloodGroup' => 'blood_group',
                'height' => 'height',
                'weight' => 'weight',
                'eyeColor' => 'eye_color',
                'ip' => 'ip',
                'macAddress' => 'mac_address',
                'university' => 'university',
                'ein' => 'ein',
                'ssn' => 'ssn',
                'userAgent' => 'user_agent',
            ];

            foreach ($optionalFields as $requestField => $dbField) {
                if ($request->has($requestField)) {
                    $userData[$dbField] = $request->get($requestField);
                }
            }

            // Procesar campos JSON
            $userData['hair'] = json_encode([
                'color' => $request->input('hair.color'),
                'type' => $request->input('hair.type'),
            ]);

            $userData['address'] = json_encode([
                'address' => $request->input('address.address'),
                'city' => $request->input('address.city'),
                'state' => $request->input('address.state'),
                'stateCode' => $request->input('address.stateCode'),
                'postalCode' => $request->input('address.postalCode'),
                'coordinates' => [
                    'lat' => $request->input('address.coordinates.lat'),
                    'lng' => $request->input('address.coordinates.lng'),
                ],
                'country' => $request->input('address.country'),
            ]);

            $userData['bank'] = json_encode([
                'cardExpire' => $request->input('bank.cardExpire'),
                'cardNumber' => $request->input('bank.cardNumber'),
                'cardType' => $request->input('bank.cardType'),
                'currency' => $request->input('bank.currency'),
                'iban' => $request->input('bank.iban'),
            ]);

            $userData['company'] = json_encode([
                'department' => $request->input('company.department'),
                'name' => $request->input('company.name'),
                'title' => $request->input('company.title'),
                'address' => [
                    'address' => $request->input('company.address.address'),
                    'city' => $request->input('company.address.city'),
                    'state' => $request->input('company.address.state'),
                    'stateCode' => $request->input('company.address.stateCode'),
                    'postalCode' => $request->input('company.address.postalCode'),
                    'coordinates' => [
                        'lat' => $request->input('company.address.coordinates.lat'),
                        'lng' => $request->input('company.address.coordinates.lng'),
                    ],
                    'country' => $request->input('company.address.country'),
                ],
            ]);

            $userData['crypto'] = json_encode([
                'coin' => $request->input('crypto.coin'),
                'wallet' => $request->input('crypto.wallet'),
                'network' => $request->input('crypto.network'),
            ]);

            $user->update($userData);

            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => 'Usuario actualizado correctamente'
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating user', [
                'message' => $e->getMessage(),
                'user_id' => $user->id
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => 'Usuario eliminado correctamente'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting user', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar usuario'
            ], 500);
        }
    }
}
