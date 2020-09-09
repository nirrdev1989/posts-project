const { UserModel } = require('../sceama-models/userschema')


module.exports = {
    saveUser: async function (newUser) {
        return newUser.save()
    },
    findUserByEmail: async function (email) {
        return await UserModel.findOne({ email: email })
    },
    userUpDateEmail: async function (userId, newEmail) {
        console.log(newEmail)
        return await UserModel.updateOne({ _id: userId }, { email: newEmail })
    },
    userUpDateProfile: async function (userId, propertyName, value) {
        let options = {}
        options["profile." + propertyName] = value
        return await UserModel.updateOne({ _id: userId }, { $set: options })
    },
    findUserById: async function (userId) {
        return await UserModel.findById({ _id: userId })
    }
}