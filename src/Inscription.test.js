import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { handleSubmit } from './Coponent/Inscription';
import SignUpForm from './Coponent/Inscription';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('handleSubmit', () => {
  const auth = { currentUser: { uid: '123' } };
  const setError = jest.fn();
  const navigate = jest.fn();
  const db = {};

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should set error if email is not valid', () => {
    handleSubmit({ preventDefault: jest.fn() }, auth, 'invalidEmail', 'password', setError, navigate, db);
    expect(setError).toHaveBeenCalledWith('Email is not valid');
  });

  it('should set error if password is less than 8 characters', () => {
    handleSubmit({ preventDefault: jest.fn() }, auth, 'valid@email.com', '1234567', setError, navigate, db);
    expect(setError).toHaveBeenCalledWith('Password must be at least 8 characters');
  });

  it('should create user and sign in if email and password are valid', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce();
    signInWithEmailAndPassword.mockResolvedValueOnce();
    setDoc.mockResolvedValueOnce();

    await handleSubmit({ preventDefault: jest.fn() }, auth, 'valid@email.com', 'password123', setError, navigate, db);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'valid@email.com', 'password123');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'valid@email.com', 'password123');
    expect(setDoc).toHaveBeenCalledWith(doc(db, 'favorite', '123'), { 1: false });
  });

  it('should set error if there is a problem creating or signing in the user', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce({ message: 'Error' });
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: 'Error' });

    await handleSubmit({ preventDefault: jest.fn() }, auth, 'valid@email.com', 'password123', setError, navigate, db);

  });
});