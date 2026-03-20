function Header({ balance , toggleTheme }) {
  return (
    <div>
      <h1>Budget Tracker</h1>
      <h2>Balance: ₦{balance}</h2>
        <button onClick={toggleTheme}>Toggle Theme</button>
    </div>

    
  );
}

export default Header; 