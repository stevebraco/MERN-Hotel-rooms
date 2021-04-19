import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { use } from "passport";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique pour pas avoir de double compte
  password: { type: String, required: true },
});


// Pré Hook - Avant d'enregistrer dans Mongo
UserSchema.pre('save', async function(next) {
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next();
})

// Ajouter une méthode pour vérifier le password

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
