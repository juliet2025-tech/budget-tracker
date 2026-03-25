import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const userId = user?.uid;

  // 🔐 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 📦 Fetch entries
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

  // ➕ Add entry
  const addEntry = async (entry) => {
    if (!userId) return;

    const docRef = await addDoc(
      collection(db, "users", userId, "entries"),
      entry
    );

    setEntries([...entries, { ...entry, id: docRef.id }]);
  };

  // 🗑 Delete entry
  const deleteEntry = async (id) => {
    if (!userId) return;

    const entryRef = doc(db, "users", userId, "entries", id);
    await deleteDoc(entryRef);
  };

  // ✏️ Edit entry
  const editEntry = async (id, updatedEntry) => {
    if (!userId) return;

    const entryRef = doc(db, "users", userId, "entries", id);
    await updateDoc(entryRef, updatedEntry);
  };

  // 🎨 Theme toggle
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 💰 Balance
  const totalBalance = entries.reduce((acc, entry) => {
    return entry.type === "income"
      ? acc + entry.amount
      : acc - entry.amount;
  }, 0);

  // 📅 Filter
  const filteredEntries = filterDate
    ? entries.filter((entry) => entry.date === filterDate)
    : entries;

  // 🔒 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className={`App ${theme}`}>

        <Routes>

          {/* Signup */}
          <Route path="/signup" element={<Signup />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Header
                    balance={totalBalance}
                    toggleTheme={toggleTheme}
                    user={user}
                  />

                  <EntryForm addEntry={addEntry} />

                  <EntryList
                    entries={filteredEntries}
                    setFilterDate={setFilterDate}
                    deleteEntry={deleteEntry}
                    editEntry={editEntry}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                  />

                  <CategorySummary entries={filteredEntries} />

                  <Chart entries={filteredEntries} />

                  <button onClick={() => signOut(auth)}>
                    Logout
                  </button>
                </>
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;