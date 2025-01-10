// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: "AIzaSyBHhFbN52RBUxF8V1S_s49zA68Dt-YkRsk",
    authDomain: "car-catalogue-1ec07.firebaseapp.com",
    projectId: "car-catalogue-1ec07",
    storageBucket: "car-catalogue-1ec07.firebasestorage.app",
    messagingSenderId: "415584615180",
    appId: "1:415584615180:web:3871deb5b9cc809519a729",
    measurementId: "G-PE4JDWL7RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication Setup
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firebase Firestore Setup (for Car Brands, Models, User Data)
const db = getFirestore(app);

// Firebase Storage Setup (for storing user’s favorite cars data)
const storage = getStorage(app);

// Firebase Cloud Functions Setup (for sending email notifications)
const functions = getFunctions(app);

// Google Authentication Methods
export const signInWithGoogle = () => {
  return auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  return auth.signOut();
};

// Firestore Methods for Car Brands and Models
export const addCarBrand = async (brandId, brandData) => {
  try {
    await setDoc(doc(db, "carBrands", brandId), brandData);
    console.log("Car brand added!");
  } catch (error) {
    console.error("Error adding car brand: ", error);
  }
};

export const addCarModel = async (brandId, modelId, modelData) => {
  try {
    await setDoc(doc(db, "carBrands", brandId, "models", modelId), modelData);
    console.log("Car model added!");
  } catch (error) {
    console.error("Error adding car model: ", error);
  }
};

// Fetch car brands and models
export const getCarBrands = async () => {
  const querySnapshot = await getDocs(collection(db, "carBrands"));
  const brands = querySnapshot.docs.map(doc => doc.data());
  return brands;
};

export const getCarModels = async (brandId) => {
  const modelsRef = collection(db, "carBrands", brandId, "models");
  const querySnapshot = await getDocs(modelsRef);
  const models = querySnapshot.docs.map(doc => doc.data());
  return models;
};

// Firestore Methods for User’s Favorite Cars
export const addFavoriteCar = async (userId, carId, carData) => {
  try {
    const userFavoritesRef = doc(db, "users", userId, "favorites", carId);
    await setDoc(userFavoritesRef, carData);
    console.log("Favorite car added!");
  } catch (error) {
    console.error("Error adding favorite car: ", error);
  }
};

export const getUserFavorites = async (userId) => {
  const favoritesRef = collection(db, "users", userId, "favorites");
  const querySnapshot = await getDocs(favoritesRef);
  const favorites = querySnapshot.docs.map(doc => doc.data());
  return favorites;
};

// Cloud Function to Send Email Notification (When a car is added to favorites)
export const sendEmailNotification = async (email, carName) => {
  const sendEmail = httpsCallable(functions, 'sendEmailNotification');
  try {
    await sendEmail({ email, carName });
    console.log("Email sent!");
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

// Firebase Storage Methods (for managing user images or documents if needed)
export const uploadFile = async (filePath, file) => {
  const fileRef = ref(storage, filePath);
  try {
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    console.log("File uploaded successfully! Download URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
};

// Firebase Functions (For Cloud Function Calls)
export const triggerCloudFunction = async () => {
  const triggerFunction = httpsCallable(functions, 'triggerCloudFunction');
  try {
    await triggerFunction();
    console.log("Cloud function triggered!");
  } catch (error) {
    console.error("Error triggering cloud function: ", error);
  }
};
