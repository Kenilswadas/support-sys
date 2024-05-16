import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import VerticalNavbar from "./components/VerticalNavbar";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [ToggleView, setToggleView] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = () => {
      const unsubscribe = onSnapshot(collection(db, "UserDetails"), (snap) => {
        const userData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredUser = userData.find(
          (data) => data.Email === auth.currentUser?.email
        );
        setUser(filteredUser);
        setUpdatedUser(filteredUser); // Initialize updatedUser state with user data
      });

      return () => unsubscribe();
    };

    fetchUserProfile();
  }, [auth.currentUser]);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedUser(user); // Reset updatedUser to original user data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "UserDetails", user.id), updatedUser);
      console.log(e);
      updateProfile(auth?.currentUser, {
        displayName: updatedUser.Name,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigate("/adminDashboard");
        }
      }
    });
  }, []);
  return (
    <div className=" h-screen overflow-hidden">
      <Navbar />
      <VerticalNavbar ToggleView={ToggleView} setToggleView={setToggleView} />
      <div
        className={`flex-1 ${
          ToggleView ? "ml-24" : "ml-64"
        } transition-all duration-300`}
      >
        <div className="flex justify-center items-center h-full p-4 ">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl ring-4 ring-red-500 ring-opacity-40">
            {user ? (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-8 ">
                  <div className="flex items-center">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {user.Name || "User Name"}
                      </h2>
                      <p className="text-gray-600">{user.Email}</p>
                    </div>
                  </div>
                  {isEditing ? (
                    <div className="flex">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md py-2 px-4 mr-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        className="text-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEditClick}
                      className="text-blue-500 hover:underline"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Profile Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-gray-600">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="Name"
                        value={updatedUser?.Name || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={updatedUser?.Email || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-gray-600">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phoneNumber"
                        value={updatedUser?.Mobile || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="address" className="text-gray-600">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={updatedUser?.address || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;