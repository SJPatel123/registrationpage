import './App.css';
import RegistrationForm from './components/RegistrationForm';
import './components/RegistrationForm.css'

function App() {
  return (
    <>
      <div className="main">
        <div className="sign-up">
        <h1 className="font-catamaran">Sign Up</h1>
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

export default App;
