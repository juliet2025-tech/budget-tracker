import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc, onSnapshot, query , deleteDoc, doc, updateDoc } from "firebase/firestore";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import CategorySummary from "./components/CategorySummary";
import Chart from "./components/Chart";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [theme, setTheme] = useState("light");
  const [showLogin, setShowLogin] = useState(false);

  // Get current user ID
  const userId = user?.uid;

  // 🔐 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

 useEffect(() => {
  if (!userId) return;

  const q = query(collection(db, "users", userId, "entries"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const userEntries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEntries(userEntries);
  });

  return () => unsubscribe();
}, [userId]);

  // ➕ Add entry to Firestore
  const addEntry = async (entry) => {
    if (!userId) return;

    try {
      const docRef = await addDoc(
        collection(db, "users", userId, "entries"),
        entry
      );

      setEntries([...entries, { ...entry, id: docRef.id }]);
    } catch (error) {
      console.error(error);
    }
  };

  // 🎨 Theme toggle
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 💰 Balance calculation
  const totalBalance = entries.reduce((acc, entry) => {
    return entry.type === "income"
      ? acc + entry.amount
      : acc - entry.amount;
  }, 0);

  const deleteEntry = async (id) => {
  if (!userId) return;

  try {
    const entryRef = doc(db, "users", userId, "entries", id);
    await deleteDoc(entryRef);
  } catch (error) {
    console.error(error);
  }
};

const editEntry = async (id, updatedEntry) => {
  console.log("Editing ID:", id);
  console.log("New Data:", updatedEntry);

  if (!userId) return;

  try {
    const entryRef = doc(db, "users", userId, "entries", id);
    await updateDoc(entryRef, updatedEntry);
    console.log("Update successful");
  } catch (error) {
    console.error("Error updating:", error);
  }
};
  // 📅 Filter entries by date
  const filteredEntries = filterDate
    ? entries.filter((entry) => entry.date === filterDate)
    : entries;

  return (
    <div className={`App ${theme}`}>
      
      {!user ? (
        <>
          {!showLogin ? <Signup /> : <Login />}

          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Go to Signup" : "Go to Login"}
          </button>
        </>
      ) : (
        <>
          

          <Header balance={totalBalance} toggleTheme={toggleTheme} />

          <EntryForm addEntry={addEntry} />

          <EntryList
            entries={filteredEntries}
            setFilterDate={setFilterDate}
             deleteEntry={deleteEntry}
  editEntry={editEntry}
          />

          <CategorySummary entries={filteredEntries} />

          <Chart entries={filteredEntries} />
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      )}

    </div>
  );
}

export default App;